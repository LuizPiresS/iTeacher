import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../../domain/users.service';
import { UserInputDTO } from '../dtos/user.input.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() input: UserInputDTO) {
    return this.usersService.createUser(input);
  }
}
