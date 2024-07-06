import { Body, Controller, Post, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { UserUpdateInputDto } from '../dtos/user.update.input.dto';
import { UserCreateInputDto } from '../dtos/user.create.input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() input: UserCreateInputDto) {
    return this.usersService.createUser(input);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') userId: string,
    @Body() input: UserUpdateInputDto,
  ) {
    return this.usersService.updateUser(userId, input);
  }

  @Delete(':id')
  public async anonymizeUser(@Param('id') userId: string) {
    return this.usersService.anonymizeUser(userId);
  }
}
