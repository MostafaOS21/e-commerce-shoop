import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { multerProductConfig } from 'config/multer-config';

@ApiTags('product')
@Controller('dashboard/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage(multerProductConfig),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadedFile,
  })
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadImage(file);
  }

  @Delete('image/:url')
  deleteImage(@Param('url') url: string) {
    return this.productService.deleteImage(url);
  }
}
