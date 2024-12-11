import { ApiProperty } from '@nestjs/swagger';
import { BaseCurrency } from '../../../common/constants/base.currency';
import { QuoteCurrency } from '../../../common/constants/quote.currency';

export class CryptoPairResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the crypto pair',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Base currency of the crypto pair',
    enum: BaseCurrency,
    example: BaseCurrency.BTC,
  })
  baseCurrency: BaseCurrency;

  @ApiProperty({
    description: 'Quote currency of the crypto pair',
    enum: QuoteCurrency,
    example: QuoteCurrency.USD,
  })
  quoteCurrency: QuoteCurrency;

  @ApiProperty({
    description: 'Indicates whether the crypto pair is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Interval in minutes at which the rate should be updated',
    example: 60,
  })
  updateInterval: number;
}
