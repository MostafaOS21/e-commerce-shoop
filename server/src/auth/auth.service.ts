import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  create(createUserDto: CreateUserDto) {
    Logger.log(createUserDto.name);
  }
}
