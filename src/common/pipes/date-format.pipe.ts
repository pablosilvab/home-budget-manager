import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

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
