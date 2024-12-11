import { IsOptional, IsString, IsDate, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCryptoRatesDto {
  @IsString()
  @IsOptional()
  baseCurrency?: string;

  @IsString()
  @IsOptional()
  quoteCurrency?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  sort?: 'asc' | 'desc';
}
