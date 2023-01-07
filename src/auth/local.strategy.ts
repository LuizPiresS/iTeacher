import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUserDto } from './dtos/dto';
import { UnauthorizedError } from '../common/errors/types/unauthorized-error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(data: AuthUserDto): Promise<any> {
    const user = await this.authService.validateUser(data);
    if (!user) {
      throw new UnauthorizedError('Unauthorized user');
    }
    return user;
  }
}
