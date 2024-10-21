import { UniqueEntityId, UniqueId } from '@softtek/shared'

import { People, PeopleCreateProps } from '../../domain/entities/people.entity'

interface PeopleCreatePersistence extends PeopleCreateProps {
  id: UniqueId
}

export interface PeoplePresentation {
  id: string
  nombre: string
  altura?: string
  peso?: string
  colorCabello?: string
  colorPiel?: string
  colorOjos?: string
  anhoNacimiento?: string
  genero?: string
  planetaOrigen?: string
}

export class PeopleMapper {
  static toDomain(input: any): People {
    const people = People.create(
      {
        name: input.name,
        height: input.height,
        mass: input.mass,
        hair_color: input.hair_color,
        skin_color: input.skin_color,
        eye_color: input.eye_color,
        birth_year: input.birth_year,
        gender: input.gender,
        homeworld_url: input.homeworld_url
      },
      new UniqueEntityId(input.id)
    )
    return people
  }

  static toCreatePersistence(people: People): Record<string, string | number> {
    return {
      id: people.id.toString(),
      name: people.name,
      height: people.height,
      mass: people.mass,
      hair_color: people.hair_color,
      skin_color: people.skin_color,
      eye_color: people.eye_color,
      birth_year: people.birth_year,
      gender: people.gender,
      homeworld_url: people.homeworld_url,

      ...people.newEntryAudit,
    }
  }

  // static toUpdatePersistence(issues: Issue): Partial<PeopleCreatePersistence> {
  //   return {
  //     IssueType: issues.IssueType.value,
  //     Subject: issues.Subject,
  //     Area: issues.Area,
  //     Description: issues.Description,
  //     Request: issues.Request,
  //     StatusID: issues.StatusID,
  //     IsReactivated: issues.IsReactivated,

  //     ...issues.updateEntryAudit
  //   }
  // }

  static toPresentation(people: People): PeoplePresentation {
    return {
      id: people.id,
      nombre: people.name,
      altura: people.height,
      peso: people.mass,
      colorCabello: people.hair_color,
      colorPiel: people.skin_color,
      colorOjos: people.eye_color,
      anhoNacimiento: people.birth_year,
      genero: people.gender,
      planetaOrigen: people.homeworld_url
    }
  }
}
