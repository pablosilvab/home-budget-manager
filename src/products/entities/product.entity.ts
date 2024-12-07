import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceHistory } from './price-history.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product)
  priceHistories: PriceHistory[];
}
