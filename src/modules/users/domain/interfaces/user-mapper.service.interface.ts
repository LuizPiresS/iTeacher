import { User } from '@prisma/client';
import { UserOutputDTO } from '../../application/dto/user.output.dto';

export interface IUserMapperService {
  toOutput(user: User): UserOutputDTO;
}
