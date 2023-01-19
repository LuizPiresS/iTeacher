import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @ApiHeader({ name: 'authorization' })
  @ApiResponse({
    status: 200,
    description: 'Return profile data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - invalid id',
  })
  @Get('/profile/:id')
  public async profile(@Param() id: listProfileDto): Promise<UsersEntity> {
    return this.usersService.getProfile(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Return user data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - invalid id',
  })
  @Patch()
  public async update(@Body() data: UpdateUserDto): Promise<UsersEntity> {
    return this.usersService.update(data);
  }
}
