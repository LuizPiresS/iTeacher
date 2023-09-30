import { User } from '@prisma/client';
import { IBaseRepository } from '../../../../../common/base-repository/interfaces/base-repository.interface';

export type IUsersRepository = IBaseRepository<User>;
