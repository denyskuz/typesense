import { Controller, Post, Inject, Get, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('update')
  async updateProducts(): Promise<any> {
    return await this.natsClient.send({ cmd: 'etl.getProducts' }, {});
  }

  @Post('import-products')
  async importProducts() {
    this.natsClient.emit({ cmd: 'etl.importProducts' }, {});
    return { message: 'Import process started' };
  }

  @Get('search-products')
  async searchProducts(@Query('q') query: string) {
    const result = await this.natsClient
      .send({ cmd: 'search.products' }, query)
      .toPromise();
    return result;
  }
}
