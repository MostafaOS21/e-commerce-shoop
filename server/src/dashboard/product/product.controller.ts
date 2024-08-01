import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { multerProductConfig } from 'config/multer-config';

@ApiTags('product')
@Controller('dashboard/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage(multerProductConfig),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadImage(file);
  }
}
