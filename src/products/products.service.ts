import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductNotFoundException } from 'src/common/exception/product-not-found.exception';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';
import { Not, Repository } from 'typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Product, ProductStatus } from './entities/product.entity';

/**
 * Servicio de productos
 * @Injectable es un decorador que define la clase como un servicio de Nest.js
 * Un servicio es una clase que contiene la lógica de negocio de una aplicación. Se encarga de procesar los datos y devolver una respuesta.
 * Los servicios son inyectables, lo que significa que pueden ser inyectados en otros componentes como controladores, otros servicios o módulos.
 * 
 */
@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(PriceHistory)
    private priceHistoryRepository: Repository<PriceHistory>,
    @InjectRepository(Supermarket)
    private supermarketRepository: Repository<Supermarket>,
  ) { }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: { status: Not(ProductStatus.DELETED) },
    });

   

    return Promise.all(products.map(async (product) => {

      const minPriceRecord = await this.priceHistoryRepository.findOne({
        where: { product: product },
        order: { price: 'ASC' },
        relations: ['supermarket']
      });


      const formattedPrice = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
      }).format(minPriceRecord.price);

      return {
        ...product,
        formatted_price: formattedPrice,
        latitude: minPriceRecord.supermarket.latitude,
        longitude: minPriceRecord.supermarket.longitude,
        google_maps_link: `https://www.google.com/maps?q=${minPriceRecord.supermarket.latitude},${minPriceRecord.supermarket.longitude}`,
        supermarket_name: minPriceRecord.supermarket.name || 'Sin supermercado',
      };
    }));
  }

  async getPriceHistory(productId: number): Promise<PriceHistory[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    const history = await this.priceHistoryRepository.find({
      where: { product },
      relations: ['supermarket'],
      order: { price: 'ASC' },
    });

    console.log(history)

    return history.map((product) => ({
      ...product,
      price: parseFloat(product.price.toString())
    }));
  }

  async createProduct(productData: {
    name: string;
    price: number;
    supermarketId?: number;
    supermarketName?: string;
    latitude: number;
    longitude: number;
  }): Promise<Product> {
    let supermarket;

    if (productData.supermarketId != null) {
      supermarket = await this.supermarketRepository.findOne({
        where: { id: productData.supermarketId },
      });
    }

    if (!supermarket && productData.supermarketName != null) {
      console.log('Se debe crear supermercado ' + productData.supermarketName)
      supermarket = this.supermarketRepository.create({
        name: productData.supermarketName,
        latitude: productData.latitude,
        longitude: productData.longitude
      });
      supermarket = await this.supermarketRepository.save(supermarket);
      console.log(supermarket)
    }


    const product = this.productRepository.create({
      name: productData.name,
      price: productData.price,

    });
    const savedProduct = await this.productRepository.save(product);

    this.addPriceWithExistentMarket(
      savedProduct,
      savedProduct.price,
      supermarket
    );

    return savedProduct;
  }

  async addPriceWithExistentMarket(
    product: Product,
    price: number,
    supermarket: Supermarket,
  ): Promise<PriceHistory> {
    
    const priceHistory = this.priceHistoryRepository.create({
      price,
      date: new Date(),
      supermarket,
      product,
    });

    const priceHistorySaved =
      await this.priceHistoryRepository.save(priceHistory);

    const lowestPriceWithLocation = await this.priceHistoryRepository
      .createQueryBuilder('priceHistory')
      .select([
        'priceHistory.price AS minprice'
      ])
      .where('priceHistory.productId = :productId', { productId: product.id  })
      .orderBy('priceHistory.price', 'ASC')
      .getRawOne();

    product.price = lowestPriceWithLocation.minprice;
    // product.latitude = lowestPriceWithLocation.latitude;
    // product.longitude = lowestPriceWithLocation.longitude;
    await this.productRepository.save(product);

    return priceHistorySaved;
  }




  async addPrice(
    productId: number,
    price: number,
    supermarketName: string,
    latitude: number,
    longitude: number,
  ): Promise<PriceHistory> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }


    let supermarket = this.supermarketRepository.create({
      name: supermarketName,
      latitude: latitude,
      longitude: longitude
    });
    supermarket = await this.supermarketRepository.save(supermarket);

    const priceHistory = this.priceHistoryRepository.create({
      price,
      date: new Date(),
      supermarket,
      product,
    });

    const priceHistorySaved =
      await this.priceHistoryRepository.save(priceHistory);

    const lowestPriceWithLocation = await this.priceHistoryRepository
      .createQueryBuilder('priceHistory')
      .select([
        'priceHistory.price AS minprice'
      ])
      .where('priceHistory.productId = :productId', { productId })
      .orderBy('priceHistory.price', 'ASC')
      .getRawOne();

    product.price = lowestPriceWithLocation.minprice;
    // product.latitude = lowestPriceWithLocation.latitude;
    // product.longitude = lowestPriceWithLocation.longitude;
    await this.productRepository.save(product);

    return priceHistorySaved;
  }

}
