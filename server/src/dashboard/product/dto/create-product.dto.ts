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
}
