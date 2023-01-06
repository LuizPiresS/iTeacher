import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EmailAlreadyInUseErrorInterceptor } from './common/errors/interceptors/email-already-in-use-error.interceptor';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new EmailAlreadyInUseErrorInterceptor());
  await app.listen(+process.env.APP_PORT);
}
bootstrap();
