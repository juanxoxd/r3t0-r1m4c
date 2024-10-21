import { ApiProperty } from '@nestjs/swagger'

export class FilmResponseDto {
  @ApiProperty({
    description: 'Título de la película',
    example: 'A New Hope'
  })
  titulo: string

  @ApiProperty({
    description: 'ID del episodio',
    example: 4
  })
  episodioId: number

  @ApiProperty({
    description: 'Texto introductorio de la película',
    example: 'It is a period of civil war.'
  })
  textoIntroductorio: string

  @ApiProperty({
    description: 'Director de la película',
    example: 'George Lucas'
  })
  director: string

  @ApiProperty({
    description: 'Productor de la película',
    example: 'Gary Kurtz, Rick McCallum'
  })
  productor: string

  @ApiProperty({
    description: 'Fecha de lanzamiento de la película',
    example: '1977-05-25'
  })
  fechaLanzamiento: string

  @ApiProperty({
    description: 'Personajes de la película',
    example: ['https://swapi.dev/api/people/1/']
  })
  personajes: string[]

  @ApiProperty({
    description: 'Planetas de la película',
    example: ['https://swapi.dev/api/planets/1/']
  })
  planetas: string[]

  @ApiProperty({
    description: 'Naves de la película',
    example: ['https://swapi.dev/api/starships/2/']
  })
  naves: string[]

  @ApiProperty({
    description: 'Vehículos de la película',
    example: ['https://swapi.dev/api/vehicles/4/']
  })
  vehiculos: string[]

  @ApiProperty({
    description: 'Especies de la película',
    example: ['https://swapi.dev/api/species/1/']
  })
  especies: string[]

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2014-12-10T14:23:31.880000Z'
  })
  fechaCreacion: string

  @ApiProperty({
    description: 'Fecha de edición',
    example: '2014-12-20T19:49:45.256000Z'
  })
  fechaEdicion: string

  @ApiProperty({
    description: 'URL de la película',
    example: 'https://swapi.dev/api/films/1/'
  })
  url: string

}
