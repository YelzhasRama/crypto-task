import { ApiProperty } from '@nestjs/swagger';
import { CryptoPairResponseDto } from './crypto-pair.response';

export class AllCryptoPairResponse {
  @ApiProperty({
    description: 'Crypto pair objects array',
    type: [CryptoPairResponseDto],
  })
  cryptoPairResponse: CryptoPairResponseDto[];
}
