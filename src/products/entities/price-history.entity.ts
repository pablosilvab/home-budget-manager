import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './product.entity';
import { Supermarket } from 'src/supermarkets/entities/supermarket.entity';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.priceHistories)
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  date: Date;

  @ManyToOne(() => Supermarket, (supermarket) => supermarket.priceHistories)
  supermarket: Supermarket;
}
