import { Injectable } from '@nestjs/common';
import { UserInputDTO } from '../../http/dtos/user.input.dto';
import { IValidatorService } from '../interfaces/validator.service.interface';

@Injectable()
export class ValidatorService implements IValidatorService {
  public validateUserInput(input: UserInputDTO): void {
    if (!input.email || !input.password || !input.confirmPassword) {
      throw new Error('Invalid input data');
    }

    if (input.password !== input.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }
}
