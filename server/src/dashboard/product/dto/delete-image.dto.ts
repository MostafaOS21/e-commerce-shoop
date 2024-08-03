import { ApiProperty } from '@nestjs/swagger';

export class DeleteImageDto {
  @ApiProperty({
    type: 'string',
    description: 'Image URL',
    example: 'uuid.jpg',
  })
  url: string;
}
