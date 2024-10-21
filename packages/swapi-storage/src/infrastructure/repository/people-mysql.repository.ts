import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  AppError,
  Criteria,
  SqlCriteriaConverter,
  ErrorTypes,
  MysqlClientFactory,
  SqlConverterResult
} from '@softtek/shared'
import { RowDataPacket } from 'mysql2/promise'

import { People } from '../../domain/entities/people.entity'
import {
  PeopleRepository,
  FilterResponse
} from '../../domain/repositories/people.repository'
import { PeopleMapper } from '../mappers/people.mapper'

@Injectable()
export class PeopleMySQLRepository implements PeopleRepository {
  private readonly tableName: string
  private readonly logger = new Logger(PeopleMySQLRepository.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly db: MysqlClientFactory,
    private readonly criteriaConverter: SqlCriteriaConverter
  ) {
    this.tableName = this.configService.get('PEOPLE_TABLE_NAME')
  }

  async matching(criteria: Criteria, isTotal = false): Promise<FilterResponse> {
    try {
      const query = this.criteriaConverter.convert<SqlConverterResult>(criteria)
      const queryTables = `
        FROM ${this.tableName} AS p`

      const filter = query.filter
        .replace(/\b(?<!p\.)Deleted\b/g, 'p.deleted')
        .replace(/\bid\b/g, 'p.id')

      const sql = `
        SELECT p.id,
               p.name,
               p.height,
               p.mass,
               p.hair_color,
               p.skin_color,
               p.eye_color,
               p.birth_year,
               p.gender,
               p.homeworld_url,
               DATE_FORMAT(p.created_at, '%Y-%m-%d %H:%i:%s') as created_at,
               p.created_by,
               p.updated_by,
               DATE_FORMAT(p.updated_at, '%Y-%m-%d %H:%i:%s') as updated_at,
               p.deleted_by,
               DATE_FORMAT(p.deleted_at, '%Y-%m-%d %H:%i:%s') as deleted_at,
               p.deleted
        ${queryTables}
        ${filter}
        GROUP BY p.id
        ${query.sort}
        ${isTotal ? '' : query.pagination}`

      const [rows = []] = await this.db.query<RowDataPacket[]>({
        sql,
        values: query.values
      })

      const totalQuery = `
        SELECT COUNT(DISTINCT p.id) as total
        ${queryTables}
        ${filter}`

      const [totalResult] = await this.db.query<RowDataPacket[]>({
        sql: totalQuery,
        values: query.values
      })

      const total = totalResult?.[0]?.total || 0

      return {
        people: rows.map(row => PeopleMapper.toDomain(row)),
        total,
        page: query.page,
        take: query.take,
        totalPages: Math.ceil(total / query.take)
      }
    } catch (error) {
      this.logger.error(
        `Error in PeopleRepository of matching: ${JSON.stringify(error)}`
      )
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Database unavailable',
        'ERR_DATABASE'
      )
    }
  }

  async create(input: People, document: string): Promise<void> {
    try {
      input.createNewEntryAudit(document)

      const values = []
      const columns = []

      for (const [key, value] of Object.entries(
        PeopleMapper.toCreatePersistence(input)
      )) {
        columns.push(key)
        values.push(value)
      }

      const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${values.map(_ => '?').join(', ')})`

      await this.db.query({ sql, values })
    } catch (error) {
      this.logger.error(
        `Error in PeopleySQLRepository of create: ${JSON.stringify(error)}`
      )
      throw new AppError(
        ErrorTypes.BAD_REQUEST,
        'Database unavailable',
        'ERR_DATABASE'
      )
    }
  }

  // async update(input: People, user: any): Promise<void> {
  //   try {
  //     const userToUse = Array.isArray(user) ? user[0] : user

  //     input.createUpdateEntryAudit(userToUse.NroDocumento)

  //     const updateData = PeopleMapper.toUpdatePersistence(input)
  //     const setClause = []
  //     const values: unknown[] = []

  //     // Construye la cláusula SET dinámicamente
  //     for (const [key, value] of Object.entries(updateData)) {
  //       setClause.push(`${key} = ?`)
  //       values.push(value)
  //     }

  //     values.push(input.id.valueOf())

  //     // Construye la consulta SQL
  //     const sql = `UPDATE people SET ${setClause.join(', ')} WHERE id = ?`

  //     // Ejecuta la consulta
  //     await this.db.query({
  //       sql,
  //       values
  //     })
  //   } catch (error) {
  //     this.logger.error(
  //       `Error in PostulationRepository of update: ${JSON.stringify(error)}`
  //     )
  //     console.log('error', error)
  //     throw new AppError(
  //       ErrorTypes.BAD_REQUEST,
  //       'Database unavailable',
  //       'ERR_DATABASE'
  //     )
  //   }
  // }
}
