import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          // servers: ['http://localhost:4222'],
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
