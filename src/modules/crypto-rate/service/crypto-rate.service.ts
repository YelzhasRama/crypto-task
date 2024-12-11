import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CryptoPairService } from '../../crypto-pair/service/crypto-pair.service';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoRate } from '../entity/crypto.rate';
import { ConfigService } from '@nestjs/config';
import { GetCryptoRatesQuery } from '../query/get-crypto-rates.query';
import { from, lastValueFrom, retry } from 'rxjs';

@Injectable()
export class CryptoRateService {
  private readonly API_URL: string;

  constructor(
    @InjectRepository(CryptoRate)
    private readonly rateRepository: Repository<CryptoRate>,
    private readonly cryptoPairService: CryptoPairService,
    private readonly configService: ConfigService,
  ) {
    this.API_URL = this.configService.get<string>('COINGECKO_API_URL') || 'https://api.coingecko.com/api/v3/simple/price';
    if (!this.API_URL) {
      throw new Error('COINGECKO_API_URL is not defined in environment variables');
    }
  }

  async fetchRate(base: string, quote: string): Promise<number | null> {
    try {
      const request$ = from(
        axios.get(this.API_URL, {
          params: {
            ids: base,
            vs_currencies: quote,
          },
        }),
      ).pipe(
        retry({
          count: 3,
          delay: 2000,
        }),
        // catchError((error) => {
        //   console.error(
        //     `Failed to fetch rate after retries for ${base}/${quote}:`,
        //     error.message,
        //   );
        //   throw error;
        // }),
      );

      const response = await lastValueFrom(request$);
      const data = response.data;

      if (data[base] && data[base][quote]) {
        return data[base][quote];
      } else {
        throw new Error(`Invalid response format for ${base}/${quote}`);
      }
    } catch (error) {
      console.error(`Error fetching rate for ${base}/${quote}:`, error);
      return null;
    }
  }

  @Cron('*/10 * * * *')
  async updateRates() {
    const pairs = await this.cryptoPairService.findAll();
    for (const pair of pairs) {
      try {
        const rate = await this.fetchRate(
          pair.baseCurrency.toLowerCase(),
          pair.quoteCurrency.toLowerCase(),
        );
        if (rate !== null) {
          console.log(
            `Updated rate for ${pair.baseCurrency}/${pair.quoteCurrency}: ${rate}`,
          );
          await this.rateRepository.save({
            pair,
            rate,
            timestamp: new Date(),
          });
        } else {
          console.log(
            `Failed to fetch rate for ${pair.baseCurrency}/${pair.quoteCurrency}`,
          );
        }
      } catch (error) {
        console.error(
          `Error updating rate for ${pair.baseCurrency}/${pair.quoteCurrency}:`,
          error,
        );
      }
    }
  }

  async getRates(filters: GetCryptoRatesQuery) {
    const query = this.rateRepository.createQueryBuilder('rate');

    if (filters.baseCurrency && filters.quoteCurrency) {
      query.innerJoinAndSelect(
        'rate.pair',
        'pair',
        'pair.baseCurrency = :baseCurrency AND pair.quoteCurrency = :quoteCurrency',
        {
          baseCurrency: filters.baseCurrency,
          quoteCurrency: filters.quoteCurrency,
        },
      );
    }

    if (filters.startDate) {
      query.andWhere('rate.timestamp >= :startDate', {
        startDate: filters.startDate,
      });
    }

    if (filters.endDate) {
      query.andWhere('rate.timestamp <= :endDate', {
        endDate: filters.endDate,
      });
    }

    if (filters.limit) {
      query.limit(filters.limit);
    }

    return query.getMany();
  }
}
