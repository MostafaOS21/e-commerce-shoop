import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { Image } from 'src/entities/image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  // Upload image
  async uploadImage(file: Express.Multer.File) {
    const image = await this.imageModel.create({
      url: '/uploads/products/' + file.filename,
    });

    return {
      message: 'Image uploaded successfully',
      data: image.url,
    };
  }
}
