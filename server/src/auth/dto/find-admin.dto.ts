import { PickType } from '@nestjs/swagger';
import { FindUserDto } from './find-user.dto';
import { IsNotEmpty, Length, minLength } from 'class-validator';

export class FindAdminDto extends PickType(FindUserDto, ['email']) {
  @IsNotEmpty()
  @Length(6, 6, {
    message: 'Passkey must be 6 characters long',
  })
  passkey: string;
}
