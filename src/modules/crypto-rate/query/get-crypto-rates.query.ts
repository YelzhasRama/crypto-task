import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class GetCryptoRatesQuery {
  @ApiPropertyOptional({
    type: String,
    description: 'Base currency (e.g. USD, EUR)',
  })
  @IsOptional()
  @IsString()
  baseCurrency?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Quote currency (e.g. BTC, ETH)',
  })
  @IsOptional()
  @IsString()
  quoteCurrency?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Start date for the rates (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'End date for the rates (ISO format)',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Limit the number of results',
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: 'Sort order for the results',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sort?: 'asc' | 'desc';
}
