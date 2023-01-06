import { PrismaClientError } from '../types/prisma-client-error';
import { UniqueConstraintError } from '../types/unique-constraint-error';
import { DatabaseError } from '../types/database-error';

enum PrismaErrors {
  UniqueConstraintViolation = 'P2002',
}

export const handleDatabaseErrors = (error: PrismaClientError) => {
  switch (error.code) {
    case PrismaErrors.UniqueConstraintViolation:
      return new UniqueConstraintError(error);
    default:
      return new DatabaseError(error.message);
  }
};
