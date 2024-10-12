import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        // servers: ['http://localhost:4222'],
        servers: ['nats://nats:4222'],
      },
    }
  );
  await app.listen();
}
bootstrap();
