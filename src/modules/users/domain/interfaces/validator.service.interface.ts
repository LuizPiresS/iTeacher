import { UserCreateInputDto } from '../../application/dto/user.create.input.dto';

export interface IValidatorService {
  validateUserInput(input: UserCreateInputDto): void;
}
