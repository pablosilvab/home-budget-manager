import { BadRequestException } from '@nestjs/common';
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should throw BadRequestException for invalid date format', () => {
    const invalidDate = '2024-12-08';
    expect(() => pipe.transform(invalidDate)).toThrow(
      new BadRequestException('Invalid date format. Use dd/MM/yyyy')
    );
  });

  it('should return a valid Date object for a valid date format', () => {
    const validDate = '08/12/2024';
    const result = pipe.transform(validDate);
    expect(result).toBeInstanceOf(Date);
    expect(result.getDate()).toBe(8);
    expect(result.getMonth()).toBe(11);
    expect(result.getFullYear()).toBe(2024);
  });
});
