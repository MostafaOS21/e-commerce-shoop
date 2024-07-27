import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserDto {
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
    message: 'Password is required',
  })
  @ApiProperty({
    name: 'password',
    description: 'User password',
    example: 'password',
  })
  password: string;
}
