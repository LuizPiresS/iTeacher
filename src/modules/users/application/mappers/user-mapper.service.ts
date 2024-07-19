import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserOutputDTO } from '../../presentation/dtos/user.output.dto';
import { IUserMapperService } from '../../domain/interfaces/user-mapper.service.interface';

@Injectable()
export class UserMapperService implements IUserMapperService {
  public toOutput(user: User): UserOutputDTO {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
