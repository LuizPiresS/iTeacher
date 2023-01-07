import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 409,
    description: 'Conflict - email already exists',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @Post()
  public async create(@Body() data: CreateUserDto): Promise<UsersEntity> {
    return this.usersService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Return profile data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - invalid id',
  })
  @Get('/profile/:id')
  public async profile(@Param() id: ProfileDto): Promise<UsersEntity> {
    return this.usersService.getProfile(id);
  }
}
