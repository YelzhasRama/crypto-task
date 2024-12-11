import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const start = Date.now();

    this.logger.log(`Incoming request: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`Response: ${method} ${url} - ${duration}ms`);
      }),
    );
  }
}
