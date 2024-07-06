import { Test, TestingModule } from '@nestjs/testing';
import { ValidatorService } from './validator.service';
import { UserCreateInputDto } from '../../http/dtos/user.create.input.dto';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatorService],
    }).compile();

    service = module.get<ValidatorService>(ValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUserInput', () => {
    it('should throw an error if email is missing', () => {
      const input: UserCreateInputDto = {
        email: '',
        password: 'P4$sword',
        confirmPassword: 'P4$sword',
      };

      expect(() => service.validateUserInput(input)).toThrow(
        'Invalid input data',
      );
    });

    it('should throw an error if password is missing', () => {
      const input: UserCreateInputDto = {
        email: 'random@random.com',
        password: '',
        confirmPassword: 'P4$sword',
      };

      expect(() => service.validateUserInput(input)).toThrow(
        'Invalid input data',
      );
    });

    it('should throw an error if passwords do not match', () => {
      const input: UserCreateInputDto = {
        email: 'random@random.com',
        password: 'P4$sword',
        confirmPassword: 'P4$sword123',
      };

      expect(() => service.validateUserInput(input)).toThrow(
        'Passwords do not match',
      );
    });

    it('should not throw an error if email and password are provided and passwords match', () => {
      const input: UserCreateInputDto = {
        email: 'random@random.com',
        password: 'P4$sword',
        confirmPassword: 'P4$sword',
      };

      expect(() => service.validateUserInput(input)).not.toThrow();
    });
  });
});
