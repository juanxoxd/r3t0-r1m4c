import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { SwapiProxyAdapter } from '../../../infrastructure/adapters/swapiProxy-axios.adapter' // Asegúrate de importar el adaptador o servicio

export class GetPeopleCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(GetPeopleCommand)
@Injectable()
export class GetPeopleHandler implements ICommandHandler<GetPeopleCommand> {
  constructor(private readonly swapiProxyAdapter: SwapiProxyAdapter) {}

  async execute(command: GetPeopleCommand): Promise<any> {
    const { id } = command
    return await this.swapiProxyAdapter.getPeople(id)
  }
}
