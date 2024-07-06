import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { IHashingService } from '../../../../common/hashing/domain/services/interfaces/hashing.service.interface';
import { ConfigService } from '@nestjs/config';
import { IValidatorService } from '../interfaces/validator.service.interface';
import { IUserMapperService } from '../interfaces/user-mapper.service.interface';
import { UserOutputDTO } from '../../http/dtos/user.output.dto';
import { UserAlreadyExistsError } from '../../../../common/errors/types/user-already-existis.error';
import { UserDeletedException } from '../../../../common/errors/exceptions/user-deleted.exception';
import { UserCreateInputDto } from '../../http/dtos/user.create.input.dto';
import { UserUpdateInputDto } from '../../http/dtos/user.update.input.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IHashService')
    private readonly hashService: IHashingService,

    private readonly configService: ConfigService,

    @Inject('IValidatorService')
    private readonly validatorService: IValidatorService,

    @Inject('IUserMapperService')
    private readonly userMapperService: IUserMapperService,
  ) {}

  public async createUser(input: UserCreateInputDto): Promise<UserOutputDTO> {
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

  public async updateUser(
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

  public async anonymizeUser(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (user.isDeleted) {
      throw new UserDeletedException();
    }

    const anonymizedData = {
      email: `deleted_user_${userId}@example.com`,
      password: '', // Optionally set to a hashed version of a known value
      isDeleted: true,
      // Other fields that need to be anonymized
    };

    await this.usersRepository.update(userId, anonymizedData);
  }
}
