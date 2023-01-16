import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';

jest.mock('@nestjs-modules/mailer');
describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let prismaService: PrismaService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [MailerService, UsersService, UsersRepository, PrismaService], // Add
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersRepository = moduleRef.get<UsersRepository>(UsersRepository);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    mailerService = moduleRef.get<MailerService>(MailerService);
  });

  describe('#defined', () => {
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });
  });

  describe('#create', () => {
    it('should create neu user', async () => {
      const data: CreateUserDto = {
        email: 'random@random.com',
        password: 'R@nd0m',
        firstName: 'Random',
        lastName: 'Random',
      };

      const mockedCreate = (usersRepository.create = jest
        .fn()
        .mockImplementation(() => {
          return {};
        }));

      const usersService = new UsersService(usersRepository, mailerService);

      const user = await usersService.create(data);

      expect(user).toEqual({});
      expect(mockedCreate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#update', () => {
    it('should update user', async () => {
      const data: UpdateUserDto = {
        email: 'random@random.com',
        password: 'R@nd0m',
        firstName: 'Random',
        lastName: 'Random',
      };

      const mockedUpdate = (usersRepository.create = jest
        .fn()
        .mockImplementation(() => {
          return {};
        }));

      const usersService = new UsersService(usersRepository, mailerService);

      const user = await usersService.create(data);

      expect(user).toEqual({});
      expect(mockedUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getProfile', () => {
    it('should get user profile', async () => {
      const mockedFindUserById = (usersRepository.findUserById = jest
        .fn()
        .mockImplementation(() => {
          return {};
        }));

      const usersService = new UsersService(usersRepository, mailerService);

      const user = await usersService.profile({ id: 'uuidv4' });

      expect(user).toEqual({});
      expect(mockedFindUserById).toHaveBeenCalledTimes(1);
    });
  });
});
