import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCryptoPairDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  baseCurrency?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  quoteCurrency?: string;

  @ApiProperty()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  updateInterval?: number;
}
