import {
  AppError,
  ErrorTypes,
  AxiosClientFactory
} from '@softtek/shared'

import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import {
  SwapiProxyPort,
  People,
  Film,
  Starship,
  Planet,
  Vehicle,
  Species
} from '../../domain/ports/swapiProxy.port'

import { PeopleMapper } from '../mappers/people.mapper'
import { FilmMapper } from '../mappers/film.mapper'

@Injectable()
export class SwapiProxyAdapter implements SwapiProxyPort {
  private axios
  private readonly logger = new Logger(SwapiProxyAdapter.name)

  constructor(private configService: ConfigService) {
    this.axios = AxiosClientFactory.getClient({
      baseUrl: this.configService.get<string>('SWAPI_BASE_URL')
    })
  }

  async getPeople(id: number): Promise<People> {
    try {
      const { data } = await this.axios.get(`/people/${id}`)
      return PeopleMapper.toDomain(data)
    } catch (error) {
      this.logger.error(`Error fetching person with id ${id}: ${error.message}`)
      throw new AppError(
        ErrorTypes.NOT_FOUND,
        'No se pudo obtener la persona',
        'ERR_PERSON_NOT_FOUND'
      )
    }
  }

  async getFilm(id: number): Promise<Film> {
    try {
      const { data } = await this.axios.get(`/films/${id}`)
      return FilmMapper.toDomain(data)
    } catch (error) {
      this.logger.error(`Error fetching film with id ${id}: ${error.message}`)
      throw new AppError(
        ErrorTypes.NOT_FOUND,
        'No se pudo obtener la película',
        'ERR_FILM_NOT_FOUND'
      )
    }
  }

  async getStarship(id: number): Promise<Starship> {
    try {
      const { data } = await this.axios.get(`/starships/${id}`)
      return data
    } catch (error) {
      this.logger.error(`Error fetching starship with id ${id}: ${error.message}`)
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'No se pudo obtener la nave',
        'ERR_STARSHIP_NOT_FOUND'
      )
    }
  }

  async getPlanet(id: number): Promise<Planet> {
    try {
      const { data } = await this.axios.get(`/planets/${id}`)
      return data
    } catch (error) {
      this.logger.error(`Error fetching planet with id ${id}: ${error.message}`)
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'No se pudo obtener el planeta',
        'ERR_PLANET_NOT_FOUND'
      )
    }
  }


  async getVehicle(id: number): Promise<Vehicle> {
    try {
      const { data } = await this.axios.get(`/vehicles/${id}`)
      return data
    } catch (error) {
      this.logger.error(
        `Error fetching vehicle with id ${id}: ${error.message}`
      )
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'No se pudo obtener el vehículo',
        'ERR_VEHICLE_NOT_FOUND'
      )
    }
  }

  async getSpecies(id: number): Promise<Species> {
    try {
      const { data } = await this.axios.get(`/species/${id}`)
      return data
    } catch (error) {
      this.logger.error(
        `Error fetching species with id ${id}: ${error.message}`
      )
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'No se pudo obtener la especie',
        'ERR_SPECIES_NOT_FOUND'
      )
    }
  }
}
