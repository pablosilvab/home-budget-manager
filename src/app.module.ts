import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SupermarketsModule } from './supermarkets/supermarkets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermarket } from './supermarkets/entities/supermarket.entity';
import { Product } from './products/entities/product.entity';
import { PriceHistory } from './products/entities/price-history.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [Product, PriceHistory, Supermarket, User],
    synchronize: process.env.TYPEORM_SYNC === 'true',
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false
  }),
  ProductsModule, SupermarketsModule, AuthModule, UsersModule],
  controllers: [],
  providers: []
})

export class AppModule { }
