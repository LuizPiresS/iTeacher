import { Injectable, Inject } from '@nestjs/common';
import { IProfileRepository } from '../interfaces/profile.repository.interface';
import { ProfileOutputDTO } from '../../http/dtos/profile.output.dto';
import { ProfileInputDTO } from '../../http/dtos/profile.input.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('IProfileRepository')
    private readonly profileRepository: IProfileRepository,
  ) {}

  public async createProfile(
    input: ProfileInputDTO,
  ): Promise<ProfileOutputDTO> {
    const existingProfile = await this.profileRepository.findById(input.userId);
    if (existingProfile) {
      return;
    }
    const newProfile = await this.profileRepository.create({
      name: input.name,
      cellPhone: input.cellPhone,
      userId: input.userId,
      street: input.address.street,
      number: input.address.number,
      neighborhood: input.address.neighborhood,
      photoUrl: input.photoUrl,
    });

    return this.toOutput(newProfile);
  }

  private toOutput(profile: any): ProfileOutputDTO {
    console.log(profile);

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
