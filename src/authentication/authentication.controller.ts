import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { AuthenticationDto } from './dtos/authentication.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @Post('/auth/login')
  public async login(@Body() data: AuthenticationDto): Promise<any> {
    return await this.authService.validateUser(data);
  }
}
