import { ApiProperty } from '@nestjs/swagger';
import { CryptoRateResponseDto } from './crypto-rate.response';

export class AllCryptoRateResponse {
  @ApiProperty({
    description: 'Crypto rate objects array',
    type: [CryptoRateResponseDto],
  })
  cryptoRateResponse: CryptoRateResponseDto[];
}
