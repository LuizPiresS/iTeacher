import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 400,
    description: 'Bad request - email already exists',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(data);
  }
}
