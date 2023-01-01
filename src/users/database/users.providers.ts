import { UsersEntity } from '../entities/users.entity';
import { DataSource } from 'typeorm';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: ['DATA_SOURCE'],
  },
];
