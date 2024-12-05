// src/entities/price-history.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.priceHistories)
  product: Product;

  @Column('decimal')
  price: number;

  @Column()
  date: Date;

  @Column()
  supermarket: string;
}
