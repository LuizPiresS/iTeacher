import { User } from '@prisma/client';
import { UserOutputDTO } from '../../http/dtos/user.output.dto';

export interface IUserMapperService {
  toOutput(user: User): UserOutputDTO;
}
