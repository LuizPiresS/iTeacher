import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDeletedException extends HttpException {
  constructor() {
    super(
      'This account has been deleted and cannot be modified.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
