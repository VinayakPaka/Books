
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://bookmanagementlive.netlify.app'],
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
