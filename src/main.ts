import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';
import { EmailAlreadyInUseErrorInterceptor } from './common/errors/interceptors/email-already-in-use-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new EmailAlreadyInUseErrorInterceptor());
  await app.listen(+process.env.APP_PORT | 3000);
}
bootstrap();
