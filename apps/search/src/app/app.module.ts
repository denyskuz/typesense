import { Module } from '@nestjs/common';
import { SearchModule } from './serach/search.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SearchModule,
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
  controllers: [],
  providers: [],
})
export class AppModule {}
