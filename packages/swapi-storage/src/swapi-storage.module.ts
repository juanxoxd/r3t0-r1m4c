import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { AppErrorFilter, SharedModule } from '@softtek/shared'



import { PeopleQueriesService } from './application/services/queries/people.queries.service'
import { PeopleDomainService } from './domain/services/people.domain.service'
import { PeopleCreateCommandService } from './application/services/commands/people/people-create.command.service'

import { envVariables } from './infrastructure/config'
import { SwapiStorageController } from './infrastructure/swapi-storage.controller'
import { PeopleMySQLRepository } from './infrastructure/repository/people-mysql.repository'


@Module({
  providers: [
    PeopleCreateCommandService,
    PeopleQueriesService,
    PeopleMySQLRepository,
    PeopleDomainService,
    {
      provide: 'PeopleMySQLRepository',
      useClass: PeopleMySQLRepository
    },
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: AppErrorFilter
    }
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [envVariables]
    }),
    forwardRef(() => SharedModule)
  ],
  exports: [
    PeopleCreateCommandService,
    PeopleMySQLRepository,
    PeopleQueriesService,
  ],
  controllers: [SwapiStorageController]
})
export class SwapiStorageModule {}
