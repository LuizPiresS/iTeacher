import { ConflictError } from './conflict-error';
import { PrismaClientError } from './prisma-client-error';

export class UniqueConstraintError extends ConflictError {
  constructor(error: PrismaClientError) {
    const uniqueField = error.meta.target;
    super(`A record with that ${uniqueField} already exists.`);
  }
}
