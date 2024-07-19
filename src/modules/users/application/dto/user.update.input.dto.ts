import { PartialType } from '@nestjs/swagger';
import { UserCreateInputDto } from './user.create.input.dto';

export class UserUpdateInputDto extends PartialType(UserCreateInputDto) {}
