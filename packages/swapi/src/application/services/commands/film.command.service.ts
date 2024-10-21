import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { SwapiProxyAdapter } from '../../../infrastructure/adapters/swapiProxy-axios.adapter' // Asegúrate de importar el adaptador o servicio

export class GetFilmCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(GetFilmCommand)
@Injectable()
export class GetFilmHandler implements ICommandHandler<GetFilmCommand> {
  constructor(private readonly swapiProxyAdapter: SwapiProxyAdapter) {}

  async execute(command: GetFilmCommand): Promise<any> {
    const { id } = command
    return await this.swapiProxyAdapter.getFilm(id)
  }
}
