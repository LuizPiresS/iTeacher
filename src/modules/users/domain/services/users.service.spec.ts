import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsError } from '../../../../common/errors/types/user-already-existis.error';
import { UserInputDTO } from '../../http/dtos/user.input.dto';

const usersRepositoryMock = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const hashServiceMock = {
  hashingPassword: jest.fn(),
};

const configServiceMock = {
  get: jest.fn(),
};

const validatorServiceMock = {
  validateUserInput: jest.fn(),
};

const userMapperServiceMock = {
  toOutput: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'IUsersRepository',
          useValue: usersRepositoryMock,
        },
        {
          provide: 'IHashService',
          useValue: hashServiceMock,
        },
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
        {
          provide: 'IValidatorService',
          useValue: validatorServiceMock,
        },
        {
          provide: 'IUserMapperService',
          useValue: userMapperServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should throw UserAlreadyExistsError if user already exists', async () => {
      usersRepositoryMock.findByEmail.mockResolvedValueOnce({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      const input: UserInputDTO = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(service.createUser(input)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should create a new user if user does not exist', async () => {
      usersRepositoryMock.findByEmail.mockResolvedValueOnce(null);
      hashServiceMock.hashingPassword.mockResolvedValueOnce('hashedPassword');
      configServiceMock.get.mockReturnValue(10);
      usersRepositoryMock.create.mockResolvedValueOnce({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      userMapperServiceMock.toOutput.mockReturnValue({
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: UserInputDTO = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await service.createUser(input);

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(validatorServiceMock.validateUserInput).toHaveBeenCalledWith(
        input,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(hashServiceMock.hashingPassword).toHaveBeenCalledWith(
        'password123',
        10,
      );
      expect(usersRepositoryMock.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      expect(userMapperServiceMock.toOutput).toHaveBeenCalledWith({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('updateUser', () => {
    it('should throw UserAlreadyExistsError if email is already used by another user', async () => {
      usersRepositoryMock.findByEmail.mockResolvedValueOnce({
        id: '2',
        email: 'test@example.com',
        password: 'hashedPassword',
      });

      const input: UserInputDTO = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(service.updateUser('1', input)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should update the user if email is not used by another user', async () => {
      usersRepositoryMock.findByEmail.mockResolvedValueOnce(null);
      hashServiceMock.hashingPassword.mockResolvedValueOnce('hashedPassword');
      configServiceMock.get.mockReturnValue(10);
      usersRepositoryMock.update.mockResolvedValueOnce({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      userMapperServiceMock.toOutput.mockReturnValue({
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const input: UserInputDTO = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const result = await service.updateUser('1', input);

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(validatorServiceMock.validateUserInput).toHaveBeenCalledWith(
        input,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(hashServiceMock.hashingPassword).toHaveBeenCalledWith(
        'password123',
        10,
      );
      expect(usersRepositoryMock.update).toHaveBeenCalledWith('1', {
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      expect(userMapperServiceMock.toOutput).toHaveBeenCalledWith({
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });
});
