import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validaciones con class-validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }));

  app.enableCors({
    origin: ['http://localhost', 'http://localhost:4200'],
    credentials: true,
  });  

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
