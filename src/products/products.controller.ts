import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { FormatDateInterceptor } from '../common/interceptors/format-date.interceptor';
import { PriceHistory } from './entities/price-history.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';

/**
 * Controlador de productos
 * @Controller es un decorador que define la clase como un controlador de Nest.js
 * @Controller('products') define la ruta base para todas las rutas definidas en este controlador
 */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService,
  ) { }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id/price-history')
  @UseInterceptors(FormatDateInterceptor)
  async getPriceHistory(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getPriceHistory(id);
  }

  @Post()
  async createProduct(@Body() productData: { name: string; price: number; supermarketId?: number; supermarketName?: string; latitude: number; longitude: number }): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Post(':id/price')
  async addPrice(
    @Param('id') id: number,
    @Body('price') price: number,
    @Body('supermarketName') supermarketName: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ): Promise<PriceHistory> {
    return this.productService.addPrice(id, price, supermarketName, latitude, longitude);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.markForDeletion(id);
    return {
      message: 'Producto marcado para eliminación.',
      data: {
        productId: id,
        status: 'MARKED_FOR_DELETION',
      },
    };
  }
}
