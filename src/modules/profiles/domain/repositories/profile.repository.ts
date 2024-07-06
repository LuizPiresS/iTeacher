import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { IProfileRepository } from '../interfaces/profile.repository.interface';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileRepository
  extends BaseRepository<Profile>
  implements IProfileRepository
{
  protected getModelName(): string {
    return 'Profile';
  }
}
