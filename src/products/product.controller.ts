import { Controller, Get, Post, Body, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity';
import { DateFormatPipe } from '../common/pipes/date-format.pipe';
import { FormatDateInterceptor } from '../common/interceptors/format-date.interceptor';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

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
}
