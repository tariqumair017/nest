import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Automatic routes validation via Global Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,      // Remove non-whitelisted properties
    forbidNonWhitelisted: true,   // Throw error for non-whitelisted
    transform: true,      // Transform payloads to DTO instances
    transformOptions: { enableImplicitConversion: true }
  }));
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 8001);
}
bootstrap();
