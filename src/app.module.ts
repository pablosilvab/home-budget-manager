import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity'; 
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Product, PriceHistory],
      synchronize: process.env.TYPEORM_SYNC === 'true',
      ssl: process.env.NODE_ENV === 'production' ? true : false, // SSL solo en producción
    }),
    TypeOrmModule.forFeature([Product, PriceHistory]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule { }
