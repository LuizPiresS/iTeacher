import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/interfaces/users.repository.interface';
import { UserInputDTO } from '../http/dtos/user.input.dto';
import { UserOutputDTO } from '../http/dtos/user.output.dto';
import { UserAlreadyExistsError } from '../../../common/errors/types/user-already-existis.error';
import { IHashingService } from '../../../common/hashing/domain/services/interfaces/hashing.service.interface';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IHashService')
    private readonly hashService: IHashingService,

    private readonly configService: ConfigService,
  ) {}

  public async createUser(input: UserInputDTO): Promise<UserOutputDTO> {
    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser) {
      throw new UserAlreadyExistsError();
    }
    const newUser = await this.usersRepository.create({
      ...input,
      password: await this.hashService.hashingPassword(
        input.password,
        this.configService.get<number>('SALT_ROUNDS'),
      ),
    });

    return this.userToOutput(newUser);
  }

  private userToOutput(user: User): UserOutputDTO {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
