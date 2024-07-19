// src/profile/profile.service.ts
import { Injectable, Inject, Logger } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/profile.repository.interface';
import { ProfileOutputDTO } from '../../http/dtos/profile.output.dto';
import { ProfileInputDTO } from '../../http/dtos/profile.input.dto';
import { GeocodingService } from '../../../../common/geocoding/domain/services/geocoding.service';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository,
    private readonly geocodingService: GeocodingService,
  ) {}

  public async createProfile(
    input: ProfileInputDTO,
  ): Promise<ProfileOutputDTO> {
    const existingProfile = await this.profileRepository.findById(input.userId);
    if (existingProfile) {
      return;
    }

    const address = `${input.address.street}, ${input.address.number}, ${input.address.neighborhood}`;
    const { lat, lng } = await this.geocodingService.getCoordinates(address);

    const newProfile = await this.profileRepository.create({
      name: input.name,
      cellPhone: input.cellPhone,
      userId: input.userId,
      street: input.address.street,
      number: input.address.number,
      neighborhood: input.address.neighborhood,
      photoUrl: input.photoUrl,
      latitude: lat,
      longitude: lng,
    });

    return this.toOutput(newProfile);
  }

  private toOutput(profile: any): ProfileOutputDTO {
    return {
      id: profile.id,
      name: profile.name,
      cellPhone: profile.cellPhone,
      photoUrl: profile.photoUrl,
      address: {
        street: profile.street,
        number: profile.number,
        neighborhood: profile.neighborhood,
      },
    };
  }
}
