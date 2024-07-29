import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ReusableDecorator } from 'src/utils/reusable-decorator';
import { createUserSwagger } from './auth.decorator';
import { FindUserDto } from './dto/find-user.dto';
import { FindAdminDto } from './dto/find-admin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ReusableDecorator({ httpCode: 201, responses: createUserSwagger })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('log-in')
  @ReusableDecorator({ httpCode: 200, responses: createUserSwagger })
  async logIn(@Body() findUserDto: FindUserDto) {
    return this.authService.logIn(findUserDto);
  }

  @Post('admin')
  @ReusableDecorator({ httpCode: 200, responses: createUserSwagger })
  async admin(@Body() findAdminDto: FindAdminDto) {
    return this.authService.admin(findAdminDto);
  }
}
