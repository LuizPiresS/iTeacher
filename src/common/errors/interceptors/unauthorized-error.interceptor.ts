import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { UnauthorizedError } from '../types/unauthorized-error';
import { UserNotFoundError } from '../types/user-not-found-error';

@Injectable()
export class UserNotFoundErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserNotFoundError) {
          throw new HttpException(error.message, 400);
        } else {
          throw error;
        }
      }),
    );
  }
}
