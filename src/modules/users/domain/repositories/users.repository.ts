import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { User } from '@prisma/client';
import { IUsersRepository } from './interfaces/users.repository.interface';

@Injectable()
export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  protected getModelName(): string {
    return 'user';
  }
}
