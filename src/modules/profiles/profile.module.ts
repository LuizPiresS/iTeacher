import { Module } from '@nestjs/common';
import { ProfileService } from './domain/services/profile.service';
import { ProfileController } from './http/controllers/profile.controller';
import { ProfileRepository } from './domain/repositories/profile.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProfileController],
  providers: [
    PrismaClient,
    ProfileService,
    {
      provide: 'IProfileRepository',
      useClass: ProfileRepository,
    },
  ],
})
export class ProfileModule {}
