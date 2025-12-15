import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

/**
 * Clase que define un pipe personalizado para validar y formatear fechas
 * @Injectable() es un decorador que define una clase como un proveedor de Nest.js
 * @PipeTransform es una interfaz que define el método transform, que se ejecuta cuando se aplica el pipe
 * Un pipe en NestJs es una clase que implementa la interfaz PipeTransform y que se utiliza para transformar datos de entrada en datos de salida
 * Este pipe tiene como objetivo validar y formatear fechas en formato dd/MM/yyyy
 */
@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(value: any) {

    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (typeof value !== 'string' || !regex.test(value)) {
      throw new BadRequestException('Invalid date format. Use dd/MM/yyyy');
    }

    const [day, month, year] = value.split('/');
    const formattedDate = new Date(+year, +month - 1, +day);

    if (isNaN(formattedDate.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    return formattedDate;
  }
}
