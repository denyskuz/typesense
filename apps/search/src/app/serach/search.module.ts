import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeSenseClientModule } from '@type-sense/typeSenseClient';

@Module({
  imports: [
    TypeSenseClientModule.forRoot({
      host: 'w6dgo5ba3rnv4u2cp-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
      connectionTimeoutSeconds: 2,
      apiKey: '0tZlv9LC8t7CCdVthNnVyh5xZrsHnrGO',
    }),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
