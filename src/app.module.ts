import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PrismaClient],
})
export class AppModule {}
