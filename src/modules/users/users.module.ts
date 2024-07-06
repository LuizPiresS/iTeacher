import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersRepository } from './domain/repositories/users.repository';
import { PrismaClient } from '@prisma/client';
import { UsersController } from './http/controllers/users.controller';
import { HashingService } from '../../common/hashing/domain/services/hashing.service';
import { UserMapperService } from './domain/services/user-mapper.service';
import { ValidatorService } from './domain/services/validator.service';
import { HashingModule } from '../../common/hashing/hashing.module';
import {
  HashServiceToken,
  UsersRepositoryToken,
  ValidatorServiceToken,
  UserMapperServiceToken,
} from './domain/tokens/inject-tokens';

@Module({
  imports: [HashingModule],
  providers: [
    PrismaClient,
    UsersService,
    { provide: UsersRepositoryToken, useClass: UsersRepository },
    { provide: HashServiceToken, useClass: HashingService },
    { provide: UserMapperServiceToken, useClass: UserMapperService },
    { provide: ValidatorServiceToken, useClass: ValidatorService },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
