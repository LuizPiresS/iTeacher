import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from '../../domain/services/profile.service';
import { ProfileInputDTO } from '../dtos/profile.input.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  public async createProfile(@Body() input: ProfileInputDTO) {
    return this.profileService.createProfile(input);
  }
}
