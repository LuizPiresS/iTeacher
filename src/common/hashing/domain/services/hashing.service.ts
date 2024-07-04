import { Injectable } from '@nestjs/common';
import { IHashingService } from './interfaces/hashing.service.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService implements IHashingService {
  public async hashingPassword(
    password: string,
    salt: number,
  ): Promise<string> {
    try {
      const saltRounds = bcrypt.genSaltSync(salt);
      return bcrypt.hashSync(password, saltRounds);
    } catch (error) {
      throw new Error('Failed to hash password');
    }
  }
}
