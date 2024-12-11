import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoPair } from '../entity/crypto.pair';

@Injectable()
export class CryptoPairService {
  constructor(
    @InjectRepository(CryptoPair)
    private readonly pairRepository: Repository<CryptoPair>,
  ) {}

  async createPair(dto: CryptoPair) {
    const pair = this.pairRepository.create(dto);
    return this.pairRepository.save(pair);
  }

  findAll(): Promise<CryptoPair[]> {
    return this.pairRepository.find();
  }

  async updatePair(id: number, dto: CryptoPair) {
    await this.pairRepository.update(id, dto);
    return this.pairRepository.findOneBy({ id });
  }

  deletePair(id: number) {
    return this.pairRepository.delete(id);
  }
}
