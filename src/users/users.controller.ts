import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUser, Profile, UpdateUser } from './types/users';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 409,
    description: 'Conflict - email already exists',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - unfilled fields',
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
  })
  @Post()
  public async create(@Body() data: CreateUserDto): Promise<CreateUser> {
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
  public async profile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Profile> {
    return this.usersService.profile(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Return user data',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - invalid id',
  })
  @Patch(':id')
  public async update(
    @Body() data: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UpdateUser> {
    return this.usersService.update(data, id);
  }
}
