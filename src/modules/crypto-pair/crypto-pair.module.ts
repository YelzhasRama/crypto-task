import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPairService } from './service/crypto-pair.service';
import { CryptoPairController } from './controller/crypto-pair.controller';
import { CryptoPair } from './entity/crypto.pair';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoPair])],
  controllers: [CryptoPairService],
  providers: [CryptoPairService, CryptoPairController],
  exports: [CryptoPairService],
})
export class CryptoPairModule {}
