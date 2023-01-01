import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/dto';
import { UsersService } from './users.service';
import { CreateUserResponse } from './database/repository/users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(
    @Body() data: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return this.usersService.create(data);
  }
}
