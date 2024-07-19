import { Test, TestingModule } from '@nestjs/testing';
import { UserMapperService } from './user-mapper.service';
import { User } from '@prisma/client';
import { UserOutputDTO } from '../../presentation/dtos/user.output.dto';

describe('UserMapperService', () => {
  let service: UserMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMapperService],
    }).compile();

    service = module.get<UserMapperService>(UserMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('toOutput', () => {
    it('should map User to UserOutputDTO', () => {
      const user: User = {
        id: '1',
        isDeleted: false,
        email: 'test@example.com',
        password: 'hashedPassword',
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      };

      const expectedOutput: UserOutputDTO = {
        id: '1',
        email: 'test@example.com',
        createdAt: new Date('2023-01-01T00:00:00.000Z'),
        updatedAt: new Date('2023-01-02T00:00:00.000Z'),
      };

      const result = service.toOutput(user);

      expect(result).toEqual(expectedOutput);
    });
  });
});
