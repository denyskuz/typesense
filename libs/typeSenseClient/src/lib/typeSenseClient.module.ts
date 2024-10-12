import { Module, DynamicModule } from '@nestjs/common';
import { TypeSenseClientService } from './typeSenseClient.service';

@Module({})
export class TypeSenseClientModule {
  static forRoot(config: {
    host: string;
    port: number;
    protocol: string;
    apiKey: string;
    connectionTimeoutSeconds: number;
  }): DynamicModule {
    return {
      module: TypeSenseClientModule,
      providers: [
        {
          provide: 'TYPESENSE_CONFIG',
          useValue: config,
        },
        TypeSenseClientService,
      ],
      exports: [TypeSenseClientService],
    };
  }
}
