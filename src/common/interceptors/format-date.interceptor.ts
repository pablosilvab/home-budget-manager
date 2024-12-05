import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import * as moment from 'moment';
  
  @Injectable()
  export class FormatDateInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          return this.formatDates(data);
        }),
      );
    }
  
    private formatDates(data: any): any {
      if (Array.isArray(data)) {
        return data.map((item) => this.formatDates(item));
      } else if (data && typeof data === 'object') {
        return Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            value instanceof Date ? moment(value).format('DD/MM/YYYY') : value,
          ]),
        );
      }
      return data;
    }
  }
  