import { IUsersRepository } from '../interfaces/users.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IHashingService } from '../../../../common/hashing/domain/services/interfaces/hashing.service.interface';
import { ConfigService } from '@nestjs/config';
import { IValidatorService } from '../interfaces/validator.service.interface';
import { IUserMapperService } from '../interfaces/user-mapper.service.interface';
import { UserInputDTO } from '../../http/dtos/user.input.dto';
import { UserOutputDTO } from '../../http/dtos/user.output.dto';
import { UserAlreadyExistsError } from '../../../../common/errors/types/user-already-existis.error';

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

  public async createUser(input: UserInputDTO): Promise<UserOutputDTO> {
    this.validatorService.validateUserInput(input);

    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hashService.hashingPassword(
      input.password,
      this.configService.get<number>('SALT_ROUNDS'),
    );

    const newUser = await this.usersRepository.create({
      ...input,
      password: hashedPassword,
    });

    return this.userMapperService.toOutput(newUser);
  }
}
