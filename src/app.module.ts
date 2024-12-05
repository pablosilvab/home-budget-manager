import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { PriceHistory } from './entities/price-history.entity';  // Importa la entidad PriceHistory
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de configuración estén disponibles globalmente.
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,  // Puedes configurar esto como 'false' para no rechazar certificados no verificados
      },
      entities: [Product, PriceHistory],
      synchronize: process.env.TYPEORM_SYNC === 'true',
    }),
    TypeOrmModule.forFeature([Product, PriceHistory]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule { }
