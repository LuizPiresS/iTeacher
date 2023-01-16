import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { CreateUser } from '../../types/users';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<CreateUser>;

  update(data: UpdateUserDto, id: string): Promise<UsersEntity>;

  findUserByEmail(email: string): Promise<UsersEntity>;

  findUserById(id: string): Promise<UsersEntity>;
}
