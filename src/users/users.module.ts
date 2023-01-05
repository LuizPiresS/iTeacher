import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  providers: [UsersService, PrismaService, UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
