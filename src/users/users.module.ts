import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './database/users.providers';
import { UsersRepository } from './database/repository/users.repository';

@Module({
  imports: [DatabaseModule],
  exports: [UsersRepository],
  providers: [UsersService, UsersRepository, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
