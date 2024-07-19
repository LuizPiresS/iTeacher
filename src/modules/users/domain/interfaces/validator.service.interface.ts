import { UserCreateInputDto } from '../../presentation/dtos/user.create.input.dto';

export interface IValidatorService {
  validateUserInput(input: UserCreateInputDto): void;
}
