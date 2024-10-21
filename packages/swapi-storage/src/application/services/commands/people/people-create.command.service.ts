import { Injectable, Inject } from '@nestjs/common'
import { CreatePeopleDto } from 'packages/swapi-storage/src/infrastructure/dtos/people/people-create.dto'

import { People } from '../../../../domain/entities/people.entity';
import { PeopleRepository } from '../../../../domain/repositories/people.repository'

@Injectable()
export class PeopleCreateCommandService {
  constructor(
    @Inject('PeopleMySQLRepository')
    private readonly peopleRepository: PeopleRepository,
  ) {}

  async handle(input: CreatePeopleDto) {

    const people = People.create({
      name: input.name,
      height: input.height,
      mass: input.mass,
      hair_color: input.hair_color,
      skin_color: input.skin_color,
      eye_color: input.eye_color,
      birth_year: input.birth_year,
      gender: input.gender,
      homeworld_url: input.homeworld_url
    })

    await this.peopleRepository.create(people, input.document)

  }
}
