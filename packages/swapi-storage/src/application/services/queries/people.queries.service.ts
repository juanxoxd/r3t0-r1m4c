import { Injectable } from '@nestjs/common'
import {
  UniqueId,
  QueryPage,
  filterDeleted,
  Operator,
  OrderTypes,
  getPeriodDates,
} from '@softtek/shared'

import { PeopleDomainService } from '../../../domain/services/people.domain.service'

export interface SearchQueryInput extends QueryPage {
  status?: string
  period?: string
  area?: string
  account?: string
  issueType?: string
}

@Injectable()
export class PeopleQueriesService {
  constructor(
    private readonly peopleDomainService: PeopleDomainService,
  ) {}

  getById(id: UniqueId) {
    return this.peopleDomainService.getById(id)
  }


  handle(input: SearchQueryInput) {
    const filters = [filterDeleted('p.deleted')]


    if (input.period) {
      const { startDate, endDate } = getPeriodDates(input.period, 90)

      const filterStartDate: Map<string, string> = new Map([
          ['field', 'p.created_at'],
          ['operator', Operator.GTE],
          ['value', `${startDate} 00:00:00`]
        ]),
        filterEndDate: Map<string, string> = new Map([
          ['field', 'p.created_at'],
          ['operator', Operator.LTE],
          ['value', `${endDate} 23:59:59`]
        ])

      filters.push(filterStartDate, filterEndDate)
    }

    return this.peopleDomainService.matching({
      filters,
      orderBy: 'p.created_at',
      orderType: OrderTypes.DESC,
      page: input.page,
      take: input.take
    })
  }
}
