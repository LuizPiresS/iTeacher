import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let prismaService: PrismaService;
  const mockedData = {
    id: 'uuidv4',
    email: 'random@ramdon.com',
    firstName: 'Random',
    lastName: 'Random',
    password: 'R@aNd0mP@ssw0rd',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepository, PrismaService],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('#create', () => {
    it('should create new user', async () => {
      const mockedPrismaCreate = (prismaService.user.create = jest
        .fn()
        .mockResolvedValue({}));

      const usersRepository = new UsersRepository(prismaService);

      const result = await usersRepository.create({
        email: mockedData.email,
        firstName: mockedData.firstName,
        lastName: mockedData.lastName,
        password: mockedData.password,
      });

      expect(result).toEqual({});
      expect(mockedPrismaCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#update', () => {
    it('should update user', async () => {
      const mockedPrismaUpdate = (prismaService.user.update = jest
        .fn()
        .mockResolvedValue({}));

      const usersRepository = new UsersRepository(prismaService);

      const result = await usersRepository.update(mockedData);

      expect(result).toEqual({});
      expect(mockedPrismaUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#findByEmail', () => {
    it('should find user by email', async () => {
      const mockedPrismaFindUnique = (prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({}));

      const usersRepository = new UsersRepository(prismaService);

      const result = await usersRepository.findUserByEmail(mockedData.email);

      expect(result).toEqual({});
      expect(mockedPrismaFindUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('#findById', () => {
    it('should find user by id', async () => {
      const mockedPrismaFindUnique = (prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValue({}));

      const usersRepository = new UsersRepository(prismaService);

      const result = await usersRepository.findUserById(mockedData.id);

      expect(result).toEqual({});
      expect(mockedPrismaFindUnique).toHaveBeenCalledTimes(1);
    });
  });
});
