import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity';
import { DateFormatPipe } from './pipes/date-format.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() productData: { name: string; price: number }): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  @Post(':id/price')
  async addPrice(
    @Param('id') id: number,
    @Body('price') price: number,
    @Body('date', DateFormatPipe) date: Date,
    @Body('supermarket') supermarket: string,
  ): Promise<PriceHistory> {
    return this.productService.addPrice(id, price, date, supermarket);
  }
}
