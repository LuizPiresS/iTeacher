import { Controller, Post, Put, Body, Param, Inject } from '@nestjs/common';
import { ICreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { IUpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { UserCreateInputDto } from '../../application/dto/user.create.input.dto';
import { UserOutputDTO } from '../../application/dto/user.output.dto';
import { UserUpdateInputDto } from '../../application/dto/user.update.input.dto';
import {
  AnonymizeUserUseCaseToken,
  CreateUserUseCaseToken,
  UpdateUserUseCaseToken,
} from '../../domain/tokens/inject-tokens';
import { IAnonymizeUserUseCase } from '../../application/use-cases/anonymize-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserUseCaseToken)
    private readonly createUserUseCase: ICreateUserUseCase,

    @Inject(UpdateUserUseCaseToken)
    private readonly updateUserUseCase: IUpdateUserUseCase,

    @Inject(AnonymizeUserUseCaseToken)
    private readonly anonymizeUserUseCase: IAnonymizeUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: UserCreateInputDto,
  ): Promise<UserOutputDTO> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserDto: UserUpdateInputDto,
  ): Promise<UserOutputDTO> {
    return this.updateUserUseCase.execute(userId, updateUserDto);
  }

  @Post(':id/delete-user')
  async anonymize(@Param('id') userId: string): Promise<void> {
    return this.anonymizeUserUseCase.execute(userId);
  }
}
