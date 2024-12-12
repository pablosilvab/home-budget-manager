import { Body, Controller, Get, Post } from '@nestjs/common';
import { Supermarket } from './entities/supermarket.entity';
import { SupermarketsService } from './supermarkets.service';

@Controller('supermarket')
export class SupermarketsController {
  constructor(private readonly supermarketsService: SupermarketsService) { }

  @Post()
  async createSupermarket(@Body() requestData: { name: string; latitude: number; longitude: number }): Promise<Supermarket> {
    return this.supermarketsService.createSupermarket(requestData);
  }

  @Get()
  async getAllSupermarket(): Promise<Supermarket[]> {
    return this.supermarketsService.getAllSupermarket();
  }

}
