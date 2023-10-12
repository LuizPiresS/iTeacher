import { UserAlreadyExistsError } from '../types/user-already-existis.error';
import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class UserAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof UserAlreadyExistsError) {
          throw new ConflictException('User already exists');
        } else {
          throw error;
        }
      }),
    );
  }
}
