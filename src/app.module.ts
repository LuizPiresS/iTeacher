import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaClient } from '@prisma/client';
import { HashingModule } from './common/hashing/hashing.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation';
import AppConfig from './common/config/app.config';
import MailConfig from './common/config/mail.config';
import SwaggerConfig from './common/config/swagger.config';

@Module({
  imports: [
    UsersModule,
    HashingModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [AppConfig, MailConfig, SwaggerConfig],
    }),
  ],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
