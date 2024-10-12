import { Injectable } from '@nestjs/common';
import { TypeSenseClientService } from '@type-sense/typeSenseClient';

@Injectable()
export class SearchService {
  constructor(private readonly typeClient: TypeSenseClientService) {}
  async searchProducts(query: string) {
    console.log(query);

    return await this.typeClient.searchProducts(query);
  }

  async handleSearchProducts(query: string) {
    return this.searchProducts(query);
  }
}
