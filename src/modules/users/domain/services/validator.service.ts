import { Injectable } from '@nestjs/common';
import { UserCreateInputDto } from '../../http/dtos/user.create.input.dto';
import { IValidatorService } from '../interfaces/validator.service.interface';

@Injectable()
export class ValidatorService implements IValidatorService {
  public validateUserInput(input: UserCreateInputDto): void {
    if (!input.email || !input.password || !input.confirmPassword) {
      throw new Error('Invalid input data');
    }

    if (input.password !== input.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }
}
