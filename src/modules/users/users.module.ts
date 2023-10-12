import { Module } from '@nestjs/common';
import { UsersService } from './domain/users.service';
import { UsersRepository } from './domain/repositories/users.repository';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './http/controllers/users.controller';
import { HashingService } from '../../common/hashing/domain/services/hashing.service';

@Module({
  providers: [
    PrismaClient,
    UsersService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
    { provide: 'IHashService', useClass: HashingService },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
