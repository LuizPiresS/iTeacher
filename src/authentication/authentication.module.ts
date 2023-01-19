import { Module } from '@nestjs/common';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '../authorization/strategies/local.strategy';
import { AuthController } from './authentication.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthService, LocalStrategy, PrismaService, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
