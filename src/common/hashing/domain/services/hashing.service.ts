import { Injectable } from '@nestjs/common';
import { IHashingService } from './interfaces/hashing.service..interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashingService implements IHashingService {
  public async hashingPassword(
    password: string,
    salt: number,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
