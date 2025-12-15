import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Product } from './entities/product.entity';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';

/**
 * Módulo de productos
 * @Module es un decorador que define la clase como un módulo de Nest.js
 * Un Módulo es una clase que agrupa un conjunto de controladores, servicios, proveedores y otros módulos relacionados
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Product, PriceHistory, Supermarket]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule { }
