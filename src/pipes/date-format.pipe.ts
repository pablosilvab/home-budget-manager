// src/pipes/date-format.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(value: any) {
    // Verifica si la fecha está en el formato dd/MM/yyyy
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (typeof value !== 'string' || !regex.test(value)) {
      throw new BadRequestException('Invalid date format. Use dd/MM/yyyy');
    }

    // Convierte el string a un objeto Date
    const [day, month, year] = value.split('/');
    const formattedDate = new Date(+year, +month - 1, +day);

    // Verifica si la fecha es válida
    if (isNaN(formattedDate.getTime())) {
      throw new BadRequestException('Invalid date');
    }

    return formattedDate;
  }
}
