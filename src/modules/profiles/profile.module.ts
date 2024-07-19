import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GeocodingModule } from '../../common/geocoding/geocoding.module';
import { ProfileController } from './http/controllers/profile.controller';
import { ProfileService } from './domain/services/profile.service';
import { ProfileRepository } from './domain/repositories/profile.repository';

@Module({
  imports: [GeocodingModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    PrismaClient,
    {
      provide: 'IProfileRepository',
      useClass: ProfileRepository,
    },
  ],
})
export class ProfileModule {}
