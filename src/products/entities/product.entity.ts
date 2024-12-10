import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceHistory } from './price-history.entity';


export enum ProductStatus {
  CREATED = 'CREATED',
  MARKED_FOR_DELETION = 'MARKED_FOR_DELETION',
  DELETED = 'DELETED',
}

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

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.CREATED, // Valor por defecto
  })
  status: ProductStatus;

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.product)
  priceHistories: PriceHistory[];
}

