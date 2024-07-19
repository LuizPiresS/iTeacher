// src/profile/repositories/profile.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from '../../../../common/base-repository/base-repository';
import { IProfileRepository } from '../interfaces/profile.repository.interface';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileRepository
  extends BaseRepository<Profile>
  implements IProfileRepository
{
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  protected getModelName(): string {
    return 'profile';
  }
}
