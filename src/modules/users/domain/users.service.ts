import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/interfaces/users.repository.interface';
import { UserInputDTO } from '../http/dtos/user.input.dto';
import { UserOutputDTO } from '../http/dtos/user.output.dto';
import { UserAlreadyExistsError } from '../../../common/errors/types/user-already-existis.error';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async createUser(input: UserInputDTO): Promise<UserOutputDTO> {
    const existentUser = await this.usersRepository.findByEmail(input.email);
    if (existentUser) {
      throw new UserAlreadyExistsError();
    }
    return this.usersRepository.create(input);
  }
}
