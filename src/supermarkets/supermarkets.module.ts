import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supermarket } from './entities/supermarket.entity';
import { SupermarketsController } from './supermarkets.controller';
import { SupermarketsService } from './supermarkets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supermarket]),
  ],
  controllers: [SupermarketsController],
  providers: [SupermarketsService],
})
export class SupermarketsModule { }
