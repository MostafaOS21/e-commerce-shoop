import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  @ApiProperty({
    name: 'email',
    description: 'User email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty({
    message: 'Name is required',
  })
  @ApiProperty({
    name: 'name',
    description: 'User name',
    example: 'Folan Ibn Folan',
  })
  name: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @ApiProperty({
    name: 'password',
    description: 'User password',
    example: 'password',
  })
  password: string;

  @IsNotEmpty({
    message: 'Confirm password is required',
  })
  @ApiProperty({
    name: 'confirmPassword',
    description: 'User confirm password',
    example: 'password',
  })
  confirmPassword: string;
}
