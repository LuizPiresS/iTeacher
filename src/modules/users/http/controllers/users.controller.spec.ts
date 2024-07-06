import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../domain/services/users.service';
import { UserCreateInputDto } from '../dtos/user.create.input.dto';
import { UserAlreadyExistsError } from '../../../../common/errors/types/user-already-existis.error';

const usersServiceMock = {
  createUser: jest.fn(),
  updateUser: jest.fn(),
  anonymizeUser: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input: UserCreateInputDto = {
        email: 'test@example.com',
        password: 'P4$sword',
        confirmPassword: 'P4$sword',
      };

      const output = {
        id: '1',
        email: 'test@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      usersServiceMock.createUser.mockResolvedValueOnce(output);

      const result = await controller.createUser(input);
      expect(result).toEqual(output);
      expect(usersServiceMock.createUser).toHaveBeenCalledWith(input);
    });

    it('should throw an error if user already exists', async () => {
      const input: UserCreateInputDto = {
        email: 'test@example.com',
        password: 'P4$sword',
        confirmPassword: 'P4$sword',
      };

      usersServiceMock.createUser.mockRejectedValueOnce(
        new UserAlreadyExistsError(),
      );

      await expect(controller.createUser(input)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersServiceMock.createUser).toHaveBeenCalledWith(input);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const input: UserCreateInputDto = {
        email: 'updated@example.com',
        password: 'NewP4$sword',
        confirmPassword: 'NewP4$sword',
      };

      const output = {
        id: '1',
        email: 'updated@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      usersServiceMock.updateUser.mockResolvedValueOnce(output);

      const result = await controller.updateUser('1', input);
      expect(result).toEqual(output);
      expect(usersServiceMock.updateUser).toHaveBeenCalledWith('1', input);
    });

    it('should throw an error if user already exists', async () => {
      const input: UserCreateInputDto = {
        email: 'test@example.com',
        password: 'P4$sword',
        confirmPassword: 'P4$sword',
      };

      usersServiceMock.updateUser.mockRejectedValueOnce(
        new UserAlreadyExistsError(),
      );

      await expect(controller.updateUser('1', input)).rejects.toThrow(
        UserAlreadyExistsError,
      );
      expect(usersServiceMock.updateUser).toHaveBeenCalledWith('1', input);
    });
  });

  describe('anonymizeUser', () => {
    it('should anonymize a user', async () => {
      usersServiceMock.anonymizeUser.mockResolvedValueOnce(undefined);

      await controller.anonymizeUser('1');
      expect(usersServiceMock.anonymizeUser).toHaveBeenCalledWith('1');
    });
  });
});
