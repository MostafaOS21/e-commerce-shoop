import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

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
}
