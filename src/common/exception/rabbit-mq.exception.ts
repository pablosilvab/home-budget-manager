import { HttpException, HttpStatus } from '@nestjs/common';

export class RabbitMQException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno. Intente más tarde.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
