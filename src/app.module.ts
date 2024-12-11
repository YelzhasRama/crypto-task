import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CryptoPairModule } from './modules/crypto-pair/crypto-pair.module';
import { CryptoRateModule } from './modules/crypto-rate/crypto-rate.module';
import { ScheduleModule } from '@nestjs/schedule';
import { getDatabaseConfig } from './configs/database.config';
import { ConfigModule } from '@nestjs/config';
import { CryptoRate } from './modules/crypto-rate/entity/crypto.rate';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { getRedisConfig } from './configs/redis.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoPair } from './modules/crypto-pair/entity/crypto.pair';

@Module({
  imports: [
    CryptoPairModule,
    CryptoRateModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([CryptoRate, CryptoPair]),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      ...getDatabaseConfig,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CacheModule.register({
      ttl: 300,
      useFactory: () => {
        const config = getRedisConfig();

        return {
          redis: config,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
