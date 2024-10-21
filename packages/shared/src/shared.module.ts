import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envVariables } from './infrastructure/config';
import { APP_FILTER } from '@nestjs/core';
import { AppErrorFilter } from './infrastructure/filters/app-error.filter';
import { MysqlClientFactory } from './infrastructure/persistence/mysql/clientFactory';
import { SqlCriteriaConverter } from './infrastructure/persistence/sql/criteriaConverter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envVariables],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter,
    },
    {
      provide: MysqlClientFactory,
      useFactory: (configService: ConfigService) => {
        const config = {
          DATABASE_HOST: configService.get<string>('DATABASE_HOST') || 'localhost',
          DATABASE_PORT: configService.get<number>('DATABASE_PORT') || 3306,
          DATABASE_USER: configService.get<string>('DATABASE_USER') || 'root',
          DATABASE_PASSWORD: configService.get<string>('DATABASE_PASSWORD') || 'root',
          DATABASE_NAME: configService.get<string>('DATABASE_NAME') || 'SWAPI',
        };
        return new MysqlClientFactory(config);
      },
      inject: [ConfigService],
    },
    SqlCriteriaConverter,
  ],
  exports: [
    MysqlClientFactory,
    SqlCriteriaConverter,
    ConfigModule,
  ],
})
export class SharedModule {}
