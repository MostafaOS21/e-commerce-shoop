import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [ProductModule],
  controllers: [DashboardController]
})
export class DashboardModule {}
