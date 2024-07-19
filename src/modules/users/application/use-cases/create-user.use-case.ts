import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from '../../domain/interfaces/users.repository.interface';
import { IHashingService } from '../../../../common/hashing/domain/services/interfaces/hashing.service.interface';
import { ConfigService } from '@nestjs/config';
import { IValidatorService } from '../../domain/interfaces/validator.service.interface';
import { IUserMapperService } from '../../domain/interfaces/user-mapper.service.interface';
import { UserAlreadyExistsError } from '@libs/errors/user-already-existis.error';
import {
  HashServiceToken,
  UserMapperServiceToken,
  UsersRepositoryToken,
  ValidatorServiceToken,
} from '../../domain/tokens/inject-tokens';
import { UserCreateInputDto } from '../../presentation/dtos/user.create.input.dto';
import { UserOutputDTO } from '../../presentation/dtos/user.output.dto';

// Definindo interfaces específicas para este use case
export interface ICreateUserUseCase {
  execute(input: UserCreateInputDto): Promise<UserOutputDTO>;
}

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: IUsersRepository,

    @Inject(HashServiceToken)
    private readonly hashService: IHashingService,

    private readonly configService: ConfigService,

    @Inject(ValidatorServiceToken)
    private readonly validatorService: IValidatorService,

    @Inject(UserMapperServiceToken)
    private readonly userMapperService: IUserMapperService,
  ) {}

  public async execute(input: UserCreateInputDto): Promise<UserOutputDTO> {
    this.validatorService.validateUserInput(input);

    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser) {
      throw new UserAlreadyExistsError();
    }

    const saltRounds = this.configService.get<number>('SALT_ROUNDS');
    if (!saltRounds) {
      throw new Error('SALT_ROUNDS is not defined');
    }

    const hashedPassword = await this.hashService.hashingPassword(
      input.password,
      saltRounds,
    );

    const newUser = await this.usersRepository.create({
      email: input.email,
      password: hashedPassword,
    });

    return this.userMapperService.toOutput(newUser);
  }
}
