import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaClient } from '@prisma/client';
import { HashingModule } from './common/hashing/hashing.module';

@Module({
  imports: [UsersModule, HashingModule],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
