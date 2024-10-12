import { Module } from '@nestjs/common';
import { ETLModule } from './etl/etl.module';
import { ProductModule } from './products/product.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ETLModule,
    ProductModule,
    ClientsModule.register([
      {
        name: 'product',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
