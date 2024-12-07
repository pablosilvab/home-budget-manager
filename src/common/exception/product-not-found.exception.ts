import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(productId: number) {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Producto no encontrado`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
