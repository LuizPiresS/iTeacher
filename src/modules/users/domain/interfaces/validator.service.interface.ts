import { UserInputDTO } from '../../http/dtos/user.input.dto';

export interface IValidatorService {
  validateUserInput(input: UserInputDTO): void;
}
