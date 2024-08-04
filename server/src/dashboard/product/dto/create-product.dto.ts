import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    example: 'Product title',
  })
  title: string;

  @ApiProperty({
    example: 'Electronics',
  })
  category: string;

  @ApiProperty({
    example: 'Laptops and computers',
  })
  subCategory: string;

  @ApiProperty({
    example: '319.99',
  })
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 10,
  })
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  // list of images links
  @ApiProperty({
    description: 'List of images links',
    example: [
      'fca14651-f8f6-4e96-9050-635c29ab23b5.png',
      'zxw62345-r2a3-3w54-3800-184cs5lo23tg.png',
    ],
  })
  images: string[];
}
