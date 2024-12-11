import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CryptoRateService } from '../service/crypto-rate.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetCryptoRatesQuery } from '../query/get-crypto-rates.query';
import { AllCryptoRateResponse } from '../swagger/all-crypto-rate.response';
import { ApiNotFoundExceptionResponse } from '../../../common/decorators/api-not-found-exception.response';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Crypto Rates')
@Controller('rates')
export class CryptoRateController {
  constructor(private readonly cryptoRateService: CryptoRateService) {}

  @ApiOkResponse({
    description: 'All feed items successfully fetched',
    type: AllCryptoRateResponse,
  })
  @ApiNotFoundExceptionResponse({
    message: 'Exception indicated that some resource was not found',
  })
  @ApiQuery({ name: 'filters', type: GetCryptoRatesQuery, required: false })
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getRates(@Query() filters: GetCryptoRatesQuery) {
    return this.cryptoRateService.getRates(filters);
  }
}
