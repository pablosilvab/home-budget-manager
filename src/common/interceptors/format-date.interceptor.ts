import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

/**
 * Clase que define un interceptor personalizado para formatear fechas
 * @Injectable() es un decorador que define una clase como un proveedor de Nest.js
 * @NestInterceptor() es un decorador que define una clase como un interceptor de Nest.js
 * Un interceptor en NestJs es una clase que implementa la interfaz NestInterceptor y que se utiliza para modificar la respuesta de un controlador
 * Este interceptor tiene como objetivo formatear las fechas en formato dd/MM/yyyy
 */
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
