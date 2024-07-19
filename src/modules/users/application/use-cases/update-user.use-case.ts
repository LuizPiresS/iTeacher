import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from '../../domain/interfaces/users.repository.interface';
import { IHashingService } from '../../../../common/hashing/domain/services/interfaces/hashing.service.interface';
import { ConfigService } from '@nestjs/config';
import { IUserMapperService } from '../../domain/interfaces/user-mapper.service.interface';
import { UserAlreadyExistsError } from '@libs/errors/user-already-existis.error';
import { UserDeletedException } from '../../../../common/errors/exceptions/user-deleted.exception';
import {
  HashServiceToken,
  UserMapperServiceToken,
  UsersRepositoryToken,
} from '../../domain/tokens/inject-tokens';
import { UserUpdateInputDto } from '../../presentation/dtos/user.update.input.dto';
import { UserOutputDTO } from '../../presentation/dtos/user.output.dto';

// Definindo interfaces específicas para este use case
export interface IUpdateUserUseCase {
  execute(userId: string, input: UserUpdateInputDto): Promise<UserOutputDTO>;
}

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: IUsersRepository,

    @Inject(HashServiceToken)
    private readonly hashService: IHashingService,

    private readonly configService: ConfigService,

    @Inject(UserMapperServiceToken)
    private readonly userMapperService: IUserMapperService,
  ) {}

  public async execute(
    userId: string,
    input: UserUpdateInputDto,
  ): Promise<UserOutputDTO> {
    const user = await this.usersRepository.findById(userId);
    if (user.isDeleted) {
      throw new UserDeletedException();
    }

    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser && existentUser.id !== userId) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hashService.hashingPassword(
      input.password,
      this.configService.get<number>('SALT_ROUNDS'),
    );

    const updatedUser = await this.usersRepository.update(userId, {
      email: input.email,
      password: hashedPassword,
    });

    return this.userMapperService.toOutput(updatedUser);
  }
}
