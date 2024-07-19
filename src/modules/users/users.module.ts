import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { AnonymizeUserUseCase } from './application/use-cases/anonymize-user.use-case';
import { UsersService } from './infrastructure/services/users.service';
import { UserController } from './infrastructure/controllers/users.controller';
import { HashingService } from '../../common/hashing/domain/services/hashing.service';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { ValidatorService } from './infrastructure/services/validator.service';
import { UserMapperService } from './infrastructure/mappers/user-mapper.service';
import {
  AnonymizeUserUseCaseToken,
  CreateUserUseCaseToken,
  HashServiceToken,
  UpdateUserUseCaseToken,
  UserMapperServiceToken,
  UsersRepositoryToken,
  ValidatorServiceToken,
} from './domain/tokens/inject-tokens';
import { HashingModule } from '../../common/hashing/hashing.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [HashingModule],
  controllers: [UserController],
  providers: [
    {
      provide: CreateUserUseCaseToken,
      useClass: CreateUserUseCase,
    },
    {
      provide: UpdateUserUseCaseToken,
      useClass: UpdateUserUseCase,
    },
    {
      provide: AnonymizeUserUseCaseToken,
      useClass: AnonymizeUserUseCase,
    },
    {
      provide: UsersRepositoryToken,
      useClass: UsersRepository,
    },
    {
      provide: HashServiceToken,
      useClass: HashingService,
    },
    {
      provide: ValidatorServiceToken,
      useClass: ValidatorService,
    },
    {
      provide: UserMapperServiceToken,
      useClass: UserMapperService,
    },
    PrismaClient,
    UsersService,
  ],
})
export class UserModule {}
