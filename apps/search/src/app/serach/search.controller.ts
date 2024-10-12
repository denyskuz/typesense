import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ cmd: 'search.products' })
  async searchByQuery(data: string) {
    return await this.searchService.searchProducts(data);
  }
}
