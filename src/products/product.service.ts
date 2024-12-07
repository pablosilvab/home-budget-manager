import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity';
import { ProductNotFoundException } from 'src/common/exception/product-not-found.exception';

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
      google_maps_link: `https://www.google.com/maps?q=${product.latitude},${product.longitude}`
    }));
  }


  async getPriceHistory(productId: number): Promise<PriceHistory[]> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    const history = await this.priceHistoryRepository.find({ where: { product }, order: { price: 'ASC' } });


    return history.map(product => ({
      ...product,
      price: parseFloat(product.price.toString()),
    }));
  }

  async createProduct(productData: { name: string; price: number; supermarket: string; latitude: number; longitude: number }): Promise<Product> {
    const product = this.productRepository.create(productData);

    const savedProduct = await this.productRepository.save(product);

    this.addPrice(savedProduct.id, savedProduct.price, productData.supermarket, productData.latitude, productData.longitude);

    return savedProduct;
  }

  async addPrice(productId: number, price: number, supermarket: string, latitude: number, longitude: number): Promise<PriceHistory> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundException(productId)
    }

    const priceHistory = this.priceHistoryRepository.create({
      price,
      date: new Date(),
      supermarket,
      product,
      latitude,
      longitude
    });

    const priceHistorySaved = await this.priceHistoryRepository.save(priceHistory);

    const lowestPriceWithLocation = await this.priceHistoryRepository
      .createQueryBuilder('priceHistory')
      .select([
        'priceHistory.price AS minprice',
        'priceHistory.latitude AS latitude',
        'priceHistory.longitude AS longitude',
      ])
      .where('priceHistory.productId = :productId', { productId })
      .orderBy('priceHistory.price', 'ASC')
      .getRawOne();


    product.price = lowestPriceWithLocation.minprice;
    product.latitude = lowestPriceWithLocation.latitude;
    product.longitude = lowestPriceWithLocation.longitude;


    await this.productRepository.save(product)

    return priceHistorySaved;
  }
}
