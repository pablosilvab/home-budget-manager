import { PriceHistory } from 'src/products/entities/price-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supermarket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.supermarket)
  priceHistories: PriceHistory[];
}

