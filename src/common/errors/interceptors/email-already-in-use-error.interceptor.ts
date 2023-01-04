import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { EmailAlreadyInUseError } from '../types/email-already-in-use-error';

@Injectable()
export class EmailAlreadyInUseErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EmailAlreadyInUseError) {
          throw new HttpException(error.message, 400);
        } else {
          throw error;
        }
      }),
    );
  }
}
