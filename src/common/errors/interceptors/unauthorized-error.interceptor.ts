import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UnauthorizedError } from '../types/unauthorized-error';

@Injectable()
export class UnauthorizedErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UnauthorizedError) {
          throw new HttpException(error.message, 400);
        } else {
          throw error;
        }
      }),
    );
  }
}
