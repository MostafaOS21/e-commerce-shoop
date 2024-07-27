import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ReusableDecorator } from 'src/utils/reusable-decorator';
import { createUserSwagger } from './auth.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ReusableDecorator({ httpCode: 201, responses: createUserSwagger })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
