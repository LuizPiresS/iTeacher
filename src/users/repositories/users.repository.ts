import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateUserDto): Promise<UsersEntity> {
    return this.prisma.user.create({
      data: data,
    });
  }

  public async update(data: UpdateUserDto): Promise<UsersEntity> {
    return this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  public async findUserByEmail(email: string): Promise<UsersEntity> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
