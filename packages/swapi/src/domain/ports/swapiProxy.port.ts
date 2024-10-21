// Interface para el puerto que define los métodos para interactuar con SWAPI
export interface SwapiProxyPort {
  getPeople(id: number): Promise<People>
  getFilm(id: number): Promise<Film>
  getStarship(id: number): Promise<Starship>
  getPlanet(id: number): Promise<Planet>
  getVehicle(id: number): Promise<Vehicle>
  getSpecies(id: number): Promise<Species>
}

export interface People {
  nombre: string
  altura: string
  peso: string
  colorCabello: string
  colorPiel: string
  colorOjos: string
  anhoNacimiento: string
  genero: string
  planetaOrigen: string
  peliculas: string[]
  naves: string[]
  vehiculos: string[]
  especies: string[]
}

export interface Film {
  titulo: string
  episodioId: number
  textoIntroductorio: string
  director: string
  productor: string
  fechaLanzamiento: string
  personajes: string[]
  planetas: string[]
  naves: string[]
  vehiculos: string[]
  especies: string[]
  fechaCreacion: string
  fechaEdicion: string
  url: string
}

export interface Planet {
  nombre: string
  diametro: string
  clima: string
  gravedad: string
  terreno: string
  poblacion: string
}

export interface Starship {
  nombre: string
  modelo: string
  fabricante: string
  costo: string
  longitud: string
  velocidad_maxima: string
  tripulacion: string
  pasajeros: string
  capacidad_carga: string
}

export interface Vehicle {
  nombre: string
  modelo: string
  fabricante: string
  costo: string
  longitud: string
  tripulacion: string
  pasajeros: string
  capacidad_carga: string
}

export interface Species {
  nombre: string
  clasificacion: string
  designacion: string
  altura_promedio: string
  color_piel: string
  color_cabello: string
  color_ojos: string
  promedio_vida: string
  lenguaje: string
  planeta_origen: string
}
