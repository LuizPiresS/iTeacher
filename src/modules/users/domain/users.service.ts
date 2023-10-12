import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/interfaces/users.repository.interface';
import { UserInputDTO } from '../http/dtos/user.input.dto';
import { UserOutputDTO } from '../http/dtos/user.output.dto';
import { UserAlreadyExistsError } from '../../../common/errors/types/user-already-existis.error';
import { IHashingService } from '../../../common/hashing/domain/services/interfaces/hashing.service.interface';
@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,

    @Inject('IHashService')
    private readonly hashService: IHashingService,
  ) {}

  public async createUser(input: UserInputDTO): Promise<UserOutputDTO> {
    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser) {
      throw new UserAlreadyExistsError();
    }
    return this.usersRepository.create({
      ...input,
      password: await this.hashService.hashingPassword(input.password, 13),
    });
  }
}
