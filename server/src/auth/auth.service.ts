import { FindAdminDto } from './dto/find-admin.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { FindUserDto } from './dto/find-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    let user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) {
      const isMatched = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );

      if (!isMatched) throw new BadRequestException('Invalid credentials');

      user.name = createUserDto.name;

      await user.save();

      return {
        data: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
          role: user.role,
        },
        message: 'User updated',
      };
    }

    user = new this.userModel(createUserDto);

    user.username = user.name
      .toLowerCase()
      .replaceAll(' ', '_')
      .concat('_')
      .concat(user._id.toString().slice(0, 8));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    return {
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
      },
      message: 'User created',
    };
  }

  async logIn(findUserDto: FindUserDto) {
    const user = await this.userModel.findOne({ email: findUserDto.email });

    if (!user)
      throw new NotFoundException('User not found', {
        description: 'Please sign up',
      });

    const isMatched = await bcrypt.compare(findUserDto.password, user.password);

    if (!isMatched) throw new BadRequestException('Invalid credentials');

    return {
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
        role: user.role,
      },
      message: 'User logged in',
    };
  }

  async admin(findAdminDto: FindAdminDto) {
    const { passkey, email } = findAdminDto;
    const isSamePasskey = process.env.passkey === passkey;

    if (!isSamePasskey) throw new BadRequestException('Invalid passkey');

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = new this.userModel({ email });
      user.password = uuidv4();
      user.username = '_admin' + user.email.split('@')[0] + user._id.toString();
      user.role = UserRole.ADMIN;
      user.name = user.email.split('@')[0];
      await user.save();
    }

    return {
      data: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
        role: 'admin',
      },
      message: 'Admin logged in',
    };
  }
}
