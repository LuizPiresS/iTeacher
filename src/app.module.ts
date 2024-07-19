import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HashingModule } from './common/hashing/hashing.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation';
import AppConfig from './common/config/app.config';
import MailConfig from './common/config/mail.config';
import SwaggerConfig from './common/config/swagger.config';
import { ProfileModule } from './modules/profiles/profile.module';
import geocodingConfig from './common/config/geocoding.config';
import { GeocodingModule } from './common/geocoding/geocoding.module';
import { UserModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [AppConfig, MailConfig, SwaggerConfig, geocodingConfig],
    }),
    UserModule,
    ProfileModule,
    HashingModule,
    GeocodingModule,
  ],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
