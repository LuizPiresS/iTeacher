import { Body, Injectable } from '@nestjs/common';
import { AuthUserDto } from './dtos/authentication-user.dto';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from '../common/errors/types/user-not-found-error';
import { UnauthorizedError } from '../common/errors/types/unauthorized-error';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersEntity } from '../users/entities/users.entity';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(data: AuthUserDto): Promise<UsersEntity> {
    const user = await this.usersRepository.findUserByEmail(data.email);
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (isPasswordValid) {
      return user;
    }

    throw new UnauthorizedError('Unauthorized user');
  }

  // public async login(
  //   @Body() data: AuthUserDto,
  // ): Promise<{ accessToken: string }> {}

  private async tokenGenerator(
    user: UsersEntity,
  ): Promise<{ accessToken: string }> {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }
}
