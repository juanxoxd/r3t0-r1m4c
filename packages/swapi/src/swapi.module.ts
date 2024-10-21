import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { AppErrorFilter, SharedModule } from '@softtek/shared'
import { CqrsModule } from '@nestjs/cqrs'

import { envVariables } from './infrastructure/config'
import { SwapiController } from './infrastructure/swapi.controller'
import { GetPeopleHandler } from './application/services/commands/people.command.service'
import { GetFilmHandler } from './application/services/commands/film.command.service'


import { SwapiProxyAdapter } from './infrastructure/adapters/swapiProxy-axios.adapter'

@Module({
  providers: [
    SwapiProxyAdapter,
    GetPeopleHandler,
    GetFilmHandler,
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter
    }
  ],
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [envVariables]
    }),
    forwardRef(() => SharedModule)
  ],
  exports: [],
  controllers: [SwapiController]
})
export class SwapiModule {}
