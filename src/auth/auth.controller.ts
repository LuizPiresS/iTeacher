import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/login')
  public async login(
    @Body() data: AuthUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.validateUser(data);
  }
}
