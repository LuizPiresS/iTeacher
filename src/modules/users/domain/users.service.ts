import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './repositories/interfaces/users.repository.interface';
import { UserInputDTO } from '../http/dtos/user.input.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async createUser(input: UserInputDTO) {
    return this.usersRepository.create(input);
  }
}
