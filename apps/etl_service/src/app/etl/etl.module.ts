import { Module } from '@nestjs/common';
import { ETLService } from './etl.service';
import { EtlMicroserviceController } from './etl.controller';
import { TypeSenseClientModule } from '@type-sense/typeSenseClient';

@Module({
  imports: [
    TypeSenseClientModule.forRoot({
      host: 'w6dgo5ba3rnv4u2cp-1.a1.typesense.net',
      port: 443,
      protocol: 'https',
      connectionTimeoutSeconds: 2,
      apiKey: '6lFcTDcuv388hUfPVXsRqVgZKzBC4HqF',
    }),
  ],
  providers: [ETLService],
  controllers: [EtlMicroserviceController],
})
export class ETLModule {}
