import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { BaseRepository } from '../../../../common/base-repository/base-repository';

@Injectable()
export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  protected getModelName(): string {
    return 'user';
  }
}
