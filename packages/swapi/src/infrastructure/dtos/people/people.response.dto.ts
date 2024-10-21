import { ApiProperty } from '@nestjs/swagger'

export class PeopleResponseDto {
  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Luke Skywalker'
  })
  nombre: string

  @ApiProperty({
    description: 'Altura de la persona en centímetros',
    example: 172
  })
  altura: number

  @ApiProperty({ description: 'Peso de la persona en kilogramos', example: 77 })
  peso: number

  @ApiProperty({ description: 'Género de la persona', example: 'male' })
  genero: string

  @ApiProperty({
    description: 'Color de cabello de la persona',
    example: 'blond'
  })
  colorCabello: string

  @ApiProperty({
    description: 'Color de piel de la persona',
    example: 'fair'
  })
  colorPiel: string

  @ApiProperty({
    description: 'Color de ojos de la persona',
    example: 'blue'
  })
  colorOjos: string

  @ApiProperty({
    description: 'Año de nacimiento de la persona',
    example: '19BBY'
  })
  anhoNacimiento: string

  @ApiProperty({
    description: 'Planeta de origen de la persona',
    example: 'https://swapi.dev/api/planets/1/'
  })
  planetaOrigen: string

  @ApiProperty({
    description: 'Lista de URLs de películas en las que aparece la persona',
    example: ['https://swapi.dev/api/films/1/']
  })
  peliculas: string[]

  @ApiProperty({
    description: 'Lista de URLs de especies a las que pertenece la persona',
    example: ['https://swapi.dev/api/species/1/']
  })
  especies: string[]

  @ApiProperty({
    description: 'Lista de URLs de vehículos que ha conducido la persona',
    example: ['https://swapi.dev/api/vehicles/14/']
  })
  vehiculos: string[]

  @ApiProperty({
    description: 'Lista de URLs de naves que ha piloteado la persona',
    example: ['https://swapi.dev/api/starships/12/']
  })
  naves: string[]

  @ApiProperty({
    description: 'Fecha de creación del recurso',
    example: '2014-12-09T13:50:51.644000Z'
  })
  fechaCreacion: string

  @ApiProperty({
    description: 'Fecha de edición del recurso',
    example: '2014-12-20T21:17:56.891000Z'
  })
  fechaEdicion: string


  @ApiProperty({
    description: 'URL de la persona',
    example: 'https://swapi.dev/api/people/1/'
  })
  url: string
}
