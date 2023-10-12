import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaClient } from '@prisma/client';
import { HashingModule } from './common/hashing/hashing.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/env.validation';

@Module({
  imports: [
    UsersModule,
    HashingModule,
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
