import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(productData: { name: string; price: number }): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async addPrice(productId: number, price: number, date: Date, supermarket: string): Promise<PriceHistory> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const priceHistory = this.priceHistoryRepository.create({
      price,
      date,
      supermarket,
      product,
    });

    return await this.priceHistoryRepository.save(priceHistory);
  }
}
