import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(data);
  }
}
