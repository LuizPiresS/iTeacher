import { Body, Controller, Post, Delete, Param, Put } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import { UserInputDTO } from '../dtos/user.input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() input: UserInputDTO) {
    return this.usersService.createUser(input);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') userId: string,
    @Body() input: UserInputDTO,
  ) {
    return this.usersService.updateUser(userId, input);
  }

  @Delete(':id')
  public async anonymizeUser(@Param('id') userId: string) {
    return this.usersService.anonymizeUser(userId);
  }
}
