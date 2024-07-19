import { Injectable } from '@nestjs/common';
import { IUsersRepository } from '../../domain/interfaces/users.repository.interface';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository
  extends BaseRepository<UserEntity>
  implements IUsersRepository
{
  protected getModelName(): string {
    return 'user';
  }
}
