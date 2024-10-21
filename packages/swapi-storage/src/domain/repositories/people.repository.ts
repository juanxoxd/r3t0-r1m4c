import { Criteria } from '@softtek/shared'

import { People } from '../entities/people.entity'

export interface FilterResponse {
  people: People[]
  total: number
  page: number
  take: number
  totalPages: number
}

export interface FilteredPeople {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld_url: string
}

export interface PeopleRepository {
  matching(criteria: Criteria, isTotal?: boolean): Promise<FilterResponse>
  create(input: People, document: string): Promise<void>
}
