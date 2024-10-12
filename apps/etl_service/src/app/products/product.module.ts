import { Module } from '@nestjs/common';
import { ProductMicroserviceController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [],
  controllers: [ProductMicroserviceController],
  providers: [ProductService],
})
export class ProductModule {}
