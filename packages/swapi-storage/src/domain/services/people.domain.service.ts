import { Injectable } from '@nestjs/common'
import {
  AppError,
  ErrorTypes,
  Filters,
  Query,
  Criteria,
  UniqueId,
  Order,
  filterDeleted,
  Operator,
  QueryInput
} from '@softtek/shared'

import { PeopleMapper } from '../../infrastructure/mappers/people.mapper'
import { PeopleMySQLRepository } from '../../infrastructure/repository/people-mysql.repository'

@Injectable()
export class PeopleDomainService {
  constructor(
    private readonly peopleRepository: PeopleMySQLRepository,
  ) {}

  async getById(id: UniqueId) {
    const filterId: Map<string, string> = new Map([
      ['field', 'id'],
      ['operator', Operator.EQUAL],
      ['value', id]
    ])

    const { people = [] } = await this.matching({
      filters: [filterId, filterDeleted()]
    })
    if (!people || people.length === 0) {
      throw new AppError(
        ErrorTypes.NOT_FOUND,
        `People not found`,
        'ERR_PEOPLE_NOT_FOUND'
      )
    }

    return PeopleMapper.toPresentation(people[0])
  }

  async getByIdForStatusUpdate(id: UniqueId) {
    const filterId: Map<string, string> = new Map([
      ['field', 'id'],
      ['operator', Operator.EQUAL],
      ['value', id]
    ])

    const { people = [] } = await this.matching({
      filters: [filterId, filterDeleted()]
    })
    if (!people || people.length === 0) {
      throw new AppError(
        ErrorTypes.NOT_FOUND,
        `People not found`,
        'ERR_PEOPLE_NOT_FOUND'
      )
    }

    return people[0]
  }

  matching(input: QueryInput) {
    const query = new Query(
        input.filters,
        input.orderBy,
        input.orderType,
        input.page,
        input.take
      ),
      criteria = new Criteria(
        Filters.fromValues(query.filters),
        Order.fromValues(query.orderBy, query.orderType),
        query.page,
        query.take
      )

    return this.peopleRepository.matching(criteria, input.isTotal)
  }
}
