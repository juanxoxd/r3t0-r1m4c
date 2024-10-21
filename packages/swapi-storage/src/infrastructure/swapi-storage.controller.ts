import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  UsePipes,
  Param,
  Query
} from '@nestjs/common'
import {
  CustomValidationPipe,
  UUIDValidationPipe,
  CustomValidationPipePeriod,
} from '@softtek/shared'

import { IssuesPaginationDto } from './dtos/people/people-pagination.dto'
import { CreatePeopleDto } from './dtos/people/people-create.dto'
import { PeopleCreateCommandService } from '../application/services/commands/people/people-create.command.service'

import { PeopleQueriesService } from '../application/services/queries/people.queries.service'
import { PeopleMapper } from './mappers/people.mapper'

@Controller('storage')
export class SwapiStorageController {
  private readonly logger = new Logger(SwapiStorageController.name)

  constructor(
    private readonly peopleCreateCommandService: PeopleCreateCommandService,
    private readonly peopleQueriesService: PeopleQueriesService,
  ) {}

  @Post('create')
  @UsePipes(new CustomValidationPipe())
  createIssue(
    @Body() peopleCreateDto: CreatePeopleDto,
  ) {
    this.logger.log('Service Create People Called')
    return this.peopleCreateCommandService.handle(peopleCreateDto)
  }

  @Get('search')
  @UsePipes(CustomValidationPipe, CustomValidationPipePeriod)
  @UsePipes(new CustomValidationPipe())
  async getIssuesPagination(@Query() query: IssuesPaginationDto) {
    const { people, total, page, take, totalPages } =
      await this.peopleQueriesService.handle(query)

    return {
      data: people.map(person => PeopleMapper.toPresentation(person)),
      total,
      page,
      take,
      totalPages
    }
  }

  @Get(':id')
  @UsePipes(new UUIDValidationPipe())
  getIssueById(@Param('id') id: string) {
    this.logger.log('Service Get Issue By Id Called')
    return this.peopleQueriesService.getById(id)
  }

  @Get('hello-world')
  helloWorld() {
    this.logger.log('Hello World Endpoint Called')
    return { message: 'Hello World' }
  }
}
