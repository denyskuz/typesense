import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductMicroserviceController {
  constructor(private productService: ProductService) {}

  @MessagePattern({ cmd: 'etl.getProducts' })
  async createUser() {
    return await this.productService.downloadAndExtractArchive();
  }

}
