import { People } from '../../domain/entities/people.entity'

export class PeopleMapper {
  static toDomain(data: any): People {
    return {
      nombre: data.name,
      altura: data.height,
      peso: data.mass,
      colorCabello: data.hair_color,
      colorPiel: data.skin_color,
      colorOjos: data.eye_color,
      anhoNacimiento: data.birth_year,
      genero: data.gender,
      planetaOrigen: data.homeworld,
      peliculas: data.films,
      especies: data.species,
      vehiculos: data.vehicles,
      naves: data.starships,
      fechaCreacion: data.created,
      fechaEdicion: data.edited,
      url: data.url
    }
  }
}
