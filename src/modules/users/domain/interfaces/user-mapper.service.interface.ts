import { User } from '@prisma/client';
import { UserOutputDTO } from '../../presentation/dtos/user.output.dto';

export interface IUserMapperService {
  toOutput(user: User): UserOutputDTO;
}
