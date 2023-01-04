import { Inject } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/dto';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';

export type CreateUserResponse = {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
};

export class UsersRepository extends Repository<UsersEntity> {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
    super(
      usersRepository.target,
      usersRepository.manager,
      usersRepository.queryRunner,
    );
  }

  public async createNewUser(data: CreateUserDto): Promise<CreateUserResponse> {
    await this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(data);
    return this.usersEntityToUserResponse(newUser);
  }

  public async findUserByEmail(email: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  private usersEntityToUserResponse(user: UsersEntity): CreateUserResponse {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
