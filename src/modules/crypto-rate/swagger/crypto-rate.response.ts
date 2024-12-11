import { ApiProperty } from '@nestjs/swagger';
import { CryptoPairResponseDto } from '../../crypto-pair/swagger/crypto-pair.response';

export class CryptoRateResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the crypto rate',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The associated crypto pair',
    type: CryptoPairResponseDto,
  })
  pair: CryptoPairResponseDto;

  @ApiProperty({
    description: 'Current rate for the crypto pair',
    example: 25000.5,
  })
  rate: number;

  @ApiProperty({
    description: 'Timestamp of when the rate was recorded',
    example: '2023-12-27T12:00:00Z',
  })
  timestamp: Date;
}
