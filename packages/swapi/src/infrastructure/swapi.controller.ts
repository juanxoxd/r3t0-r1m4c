import {
  Controller,
  Get,
  Logger,
  Param,
  UsePipes
} from '@nestjs/common'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'

import {
  CustomValidationPipe,
} from '@softtek/shared'

import { CommandBus } from '@nestjs/cqrs'
import { GetPeopleCommand } from '../application/services/commands/people.command.service'
import { GetFilmCommand } from '../application/services/commands/film.command.service'
import { SwapiDto } from './dtos/swapi.dto'
import { PeopleResponseDto } from './dtos/people/people.response.dto'
import { FilmResponseDto } from './dtos/film/film.response.dto'


@ApiTags('Swapi')
@Controller('swapi')
export class SwapiController {
  private readonly logger = new Logger(SwapiController.name)

  constructor(private readonly commandBus: CommandBus) {}

  @Get('people/:id')
  @ApiOperation({ summary: 'Obtener información de una persona por ID' })
  @ApiResponse({
    status: 200,
    description: 'Información de la persona obtenida con éxito',
    type: PeopleResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud no válida'
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada'
  })
  @UsePipes(new CustomValidationPipe())
  async getPerson(@Param() params: SwapiDto) {
    const { id } = params
    this.logger.log(`Fetching person with ID: ${id}`)
    return this.commandBus.execute(new GetPeopleCommand(id))
  }

  @Get('films/:id')
  @ApiOperation({ summary: 'Obtener información de una película por ID' })
  @ApiResponse({
    status: 200,
    description: 'Información de la película obtenida con éxito',
    type: FilmResponseDto
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud no válida'
  })
  @ApiResponse({
    status: 404,
    description: 'Película no encontrada'
  })
  async getFilm(@Param() params: SwapiDto) {
    const { id } = params
    this.logger.log(`Fetching film with ID: ${id}`)
    return this.commandBus.execute(new GetFilmCommand(id))
  }

}
