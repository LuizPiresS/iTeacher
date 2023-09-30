import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersRepository } from './domain/repositories/users.repository';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './http/controllers/users.controller';

@Module({
  providers: [
    PrismaClient,
    UsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
