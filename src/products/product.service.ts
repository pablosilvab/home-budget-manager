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
  ) { }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products.map(product => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));
  }


  async getPriceHistory(productId: number): Promise<PriceHistory[]> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }
    const history = await this.priceHistoryRepository.find({ where: { product }, order: { price: 'ASC' } });


    return history.map(product => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));
  }

  async createProduct(productData: { name: string; price: number; supermarket: string }): Promise<Product> {
    const product = this.productRepository.create(productData);

    const savedProduct = await this.productRepository.save(product);

    this.addPrice(savedProduct.id, savedProduct.price, productData.supermarket);

    return savedProduct;
  }

  async addPrice(productId: number, price: number, supermarket: string): Promise<PriceHistory> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new Error('Product not found');
    }

    const priceHistory = this.priceHistoryRepository.create({
      price,
      date: new Date(),
      supermarket,
      product,
    });

    const priceHistorySaved = await this.priceHistoryRepository.save(priceHistory);

    const lowestPrice = await this.priceHistoryRepository
      .createQueryBuilder('priceHistory')
      .select('MIN(priceHistory.price)', 'minPrice')
      .where('priceHistory.productId = :productId', { productId })
      .getRawOne();

    product.price = lowestPrice.minPrice;

    await this.productRepository.save(product)

    return priceHistorySaved;
  }
}
