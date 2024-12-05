// src/entities/product.entity.ts
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

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product)
  priceHistories: PriceHistory[];
}
