import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.auth';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthService, LocalStrategy, PrismaService, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
