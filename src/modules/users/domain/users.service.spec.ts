import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
export const usersRepositoryMock = {
  update: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  findUserById: jest.fn(),
  findUsersByFilters: jest.fn(),
  findUserByEmail: jest.fn(),
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
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('should be defined', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('createUser', () => {
    it('', async () => {});
  });
});
