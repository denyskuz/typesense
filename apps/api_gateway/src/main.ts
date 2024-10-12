import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  const PORT = process.env.PORT || 8080;

  await app.listen(PORT, '0.0.0.0', () =>
    console.log(`Running on PORT: ${PORT}`)
  );
}
bootstrap();
