import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { FormatDateInterceptor } from '../common/interceptors/format-date.interceptor';
import { PriceHistory } from './entities/price-history.entity';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';

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
    let priceHistory = this.productService.getPriceHistory(id);
    return priceHistory;
  }

  @Post()
  async createProduct(@Body() productData: { name: string; price: number; supermarket: string; latitude: number; longitude: number }): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Post(':id/price')
  async addPrice(
    @Param('id') id: number,
    @Body('price') price: number,
    @Body('supermarket') supermarket: string,
    @Body('latitude') latitude: number,
    @Body('longitude') longitude: number,
  ): Promise<PriceHistory> {
    return this.productService.addPrice(id, price, supermarket, latitude, longitude);
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
