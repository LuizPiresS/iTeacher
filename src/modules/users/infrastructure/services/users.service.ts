import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../domain/interfaces/users.repository.interface';
import { UsersRepositoryToken } from '../../../../common/inject-tokens/users.tokens';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  public async findById(id: string) {
    return this.usersRepository.findById(id);
  }

  public async create(user: { email: string; password: string }) {
    return this.usersRepository.create(user);
  }

  public async update(
    id: string,
    updateData: Partial<{ email: string; password: string }>,
  ) {
    return this.usersRepository.update(id, updateData);
  }
}
