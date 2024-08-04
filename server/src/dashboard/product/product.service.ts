import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { Image } from 'src/entities/image.entity';
import { DeleteImageDto } from './dto/delete-image.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Image.name) private imageModel: Model<Image>,
  ) {}

  // Create product
  async createProduct(createProductDto: CreateProductDto) {
    const allImagesLinks = createProductDto.images;
    // Check if all images exist
    const images = await this.imageModel.find({ url: { $in: allImagesLinks } });
    if (images.length !== allImagesLinks.length) {
      throw new NotFoundException('All images must exist');
    }
    // Create product
    const product = await this.productModel.create(createProductDto);
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  // Upload image
  async uploadImage(file: Express.Multer.File) {
    const image = await this.imageModel.create({
      url: file.filename,
    });

    return {
      message: 'Image uploaded successfully',
      data: image.url,
    };
  }

  // Delete image
  async deleteImage(url: string) {
    // Find image by URL
    const image = await this.imageModel.findOne({ url });

    // If image not found, return error
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Delete image
    await this.imageModel.findByIdAndDelete(image._id);

    return {
      message: 'Image deleted successfully',
      data: image.url,
    };
  }
}
