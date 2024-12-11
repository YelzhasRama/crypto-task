import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CryptoPairService } from '../service/crypto-pair.service';
import { CryptoPair } from '../entity/crypto.pair';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AllCryptoPairResponse } from '../swagger/all-crypto-pair.response';

@ApiTags('Crypto Pairs')
@Controller('pairs')
export class CryptoPairController {
  constructor(private readonly service: CryptoPairService) {}

  @ApiOperation({ summary: 'Create a new crypto pair' })
  @ApiResponse({
    status: 201,
    description: 'The crypto pair has been successfully created.',
    type: CryptoPair,
  })
  @Post()
  create(@Body() dto: CryptoPair) {
    return this.service.createPair(dto);
  }

  @ApiOperation({ summary: 'Get all crypto pairs' })
  @ApiResponse({
    status: 200,
    description: 'All crypto pairs retrieved successfully.',
    type: AllCryptoPairResponse,
  })
  @Get()
  findAll(): Promise<CryptoPair[]> {
    return this.service.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing crypto pair' })
  @ApiResponse({
    status: 200,
    description: 'The crypto pair has been successfully updated.',
    type: CryptoPair,
  })
  update(@Param('id') id: number, @Body() dto: CryptoPair) {
    return this.service.updatePair(id, dto);
  }

  @ApiOperation({ summary: 'Delete a crypto pair' })
  @ApiResponse({
    status: 200,
    description: 'The crypto pair has been successfully deleted.',
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.deletePair(id);
  }
}
