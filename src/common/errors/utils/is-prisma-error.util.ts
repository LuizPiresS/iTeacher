import { PrismaClientError } from '../types/prisma-client-error';

export const isPrismaErrorUtil = (error: PrismaClientError) => {
  return (
    typeof error.code === 'string' &&
    typeof error.clientVersion === 'string' &&
    (typeof error.meta === 'object' || typeof error.meta === 'undefined')
  );
};
