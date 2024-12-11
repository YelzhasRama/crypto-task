import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoRate } from './entity/crypto.rate';
import { CryptoRateService } from './service/crypto-rate.service';
import { CryptoRateController } from './controller/crypto-rate.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CryptoRate])],
  controllers: [CryptoRateService],
  providers: [CryptoRateService, CryptoRateController],
  exports: [CryptoRateService],
})
export class CryptoRateModule {}
