import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCryptoPairDto {
  @ApiProperty()
  @IsString()
  baseCurrency: string;

  @ApiProperty()
  @IsString()
  quoteCurrency: string;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  updateInterval?: number;
}
