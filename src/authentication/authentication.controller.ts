import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @Post('/auth/login')
  public async login(@Body() data: AuthUserDto): Promise<any> {
    return await this.authService.validateUser(data);
  }
}
