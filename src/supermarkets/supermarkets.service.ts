import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supermarket } from './entities/supermarket.entity';

@Injectable()
export class SupermarketsService {
    constructor(
        @InjectRepository(Supermarket)
        private supermarketRepository: Repository<Supermarket>,

    ) { }

    async createSupermarket(requestData: {
        name: string;
        latitude: number;
        longitude: number;
    }): Promise<Supermarket> {
        console.log(requestData)
        const supermarket = this.supermarketRepository.create(requestData);
        console.log(supermarket)
        return await this.supermarketRepository.save(supermarket);
    }

    
  async getAllSupermarket(): Promise<Supermarket[]> {
    return await this.supermarketRepository.find(); 
  }

}
