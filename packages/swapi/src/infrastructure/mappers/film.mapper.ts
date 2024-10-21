import { Film } from '../../domain/entities/film.entity'

export class FilmMapper {
  static toDomain(data: any): Film {
    return {
      titulo: data.title,
      episodioId: data.episode_id,
      textoIntroductorio: data.opening_crawl,
      director: data.director,
      productor: data.producer,
      fechaLanzamiento: data.release_date,
      personajes: data.characters,
      planetas: data.planets,
      naves: data.starships,
      vehiculos: data.vehicles,
      especies: data.species,
      fechaCreacion: data.created,
      fechaEdicion: data.edited,
      url: data.url
    }
  }
}

