// src/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceHistory } from './price-history.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number; // El precio actual del producto

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product)
  priceHistories: PriceHistory[]; // Relación con el historial de precios
}
