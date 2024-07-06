import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsError } from '../../../../common/errors/types/user-already-existis.error';
import { UserDeletedException } from '../../../../common/errors/exceptions/user-deleted.exception';
import { UserCreateInputDto } from '../../http/dtos/user.create.input.dto';
import { UserUpdateInputDto } from '../../http/dtos/user.update.input.dto';

const mockUser = {
  id: '1',
  email: 'test@example.com',
  password: 'hashedPassword',
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false,
};

const mockDeletedUser = {
  ...mockUser,
  email: 'deleted_user_1@example.com',
  password: '',
  isDeleted: true,
};

const createInput: UserCreateInputDto = {
  email: 'test@example.com',
  password: 'password123',
  confirmPassword: 'password123',
};

const updateInput: UserUpdateInputDto = {
  email: 'test@example.com',
  password: 'password123',
};

const usersRepositoryMock = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
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
      usersRepositoryMock.findByEmail.mockResolvedValueOnce(mockUser);

      await expect(service.createUser(createInput)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        createInput.email,
      );
    });

    it('should create a new user if user does not exist', async () => {
      usersRepositoryMock.findByEmail.mockResolvedValueOnce(null);
      hashServiceMock.hashingPassword.mockResolvedValueOnce('hashedPassword');
      configServiceMock.get.mockReturnValue(10);
      usersRepositoryMock.create.mockResolvedValueOnce(mockUser);
      userMapperServiceMock.toOutput.mockReturnValue({
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.createUser(createInput);

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
      expect(validatorServiceMock.validateUserInput).toHaveBeenCalledWith(
        createInput,
      );
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        createInput.email,
      );
      expect(hashServiceMock.hashingPassword).toHaveBeenCalledWith(
        createInput.password,
        10,
      );
      expect(usersRepositoryMock.create).toHaveBeenCalledWith({
        email: createInput.email,
        password: 'hashedPassword',
      });
      expect(userMapperServiceMock.toOutput).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should throw UserDeletedException if user is deleted', async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(mockDeletedUser);

      await expect(service.updateUser('1', updateInput)).rejects.toThrow(
        UserDeletedException,
      );
      expect(usersRepositoryMock.findById).toHaveBeenCalledWith('1');
    });

    it('should throw UserAlreadyExistsError if email is already used by another user', async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(mockUser);
      usersRepositoryMock.findByEmail.mockResolvedValueOnce({
        ...mockUser,
        id: '2',
      });

      await expect(service.updateUser('1', updateInput)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersRepositoryMock.findById).toHaveBeenCalledWith('1');
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        updateInput.email,
      );
    });

    it('should update the user if email is not used by another user', async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(mockUser);
      usersRepositoryMock.findByEmail.mockResolvedValueOnce(null);
      hashServiceMock.hashingPassword.mockResolvedValueOnce('hashedPassword');
      configServiceMock.get.mockReturnValue(10);
      usersRepositoryMock.update.mockResolvedValueOnce({
        ...mockUser,
        email: updateInput.email,
      });
      userMapperServiceMock.toOutput.mockReturnValue({
        id: '1',
        email: 'test@example.com',
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.updateUser('1', updateInput);

      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        isDeleted: false,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(usersRepositoryMock.findById).toHaveBeenCalledWith('1');
      expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith(
        updateInput.email,
      );
      expect(hashServiceMock.hashingPassword).toHaveBeenCalledWith(
        updateInput.password,
        10,
      );
      expect(usersRepositoryMock.update).toHaveBeenCalledWith('1', {
        email: updateInput.email,
        password: 'hashedPassword',
      });
      expect(userMapperServiceMock.toOutput).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          email: updateInput.email,
          password: 'hashedPassword',
          isDeleted: false,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  describe('anonymizeUser', () => {
    it('should throw UserDeletedException if user is already deleted', async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(mockDeletedUser);

      await expect(service.anonymizeUser('1')).rejects.toThrow(
        UserDeletedException,
      );
      expect(usersRepositoryMock.findById).toHaveBeenCalledWith('1');
    });

    it('should anonymize a user', async () => {
      usersRepositoryMock.findById.mockResolvedValueOnce(mockUser);
      usersRepositoryMock.update.mockResolvedValueOnce(mockDeletedUser);

      await service.anonymizeUser('1');

      expect(usersRepositoryMock.findById).toHaveBeenCalledWith('1');
      expect(usersRepositoryMock.update).toHaveBeenCalledWith('1', {
        email: `deleted_user_1@example.com`,
        password: '',
        isDeleted: true,
      });
    });
  });
});
