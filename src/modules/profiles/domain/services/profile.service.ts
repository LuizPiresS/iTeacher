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
    const existingProfile = this.profileRepository.findById(input.userId);
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
    });

    return this.toOutput(newProfile);
  }

  private toOutput(profile: any): ProfileOutputDTO {
    return {
      id: profile.id,
      name: profile.name,
      cellPhone: profile.cellPhone,
      address: {
        street: profile.address.street,
        number: profile.address.number,
        neighborhood: profile.address.neighborhood,
      },
    };
  }
}
