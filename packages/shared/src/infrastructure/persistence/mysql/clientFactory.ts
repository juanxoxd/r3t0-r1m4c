import { Injectable, Logger } from '@nestjs/common';
import { createPool, FieldPacket, Pool, QueryOptions, QueryResult } from 'mysql2/promise';

interface ConfigDb {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
}

@Injectable()
export class MysqlClientFactory {
  private client: Pool;
  private readonly logger = new Logger(MysqlClientFactory.name);

  constructor(
    private readonly config: ConfigDb
  ) {
    this.client = this.createPool(this.config);
  }

  private createPool(config: ConfigDb): Pool {
    this.logger.log(`Database pool created`);
    return createPool({
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT || 3306,
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      connectionLimit: 10000,
      connectTimeout: 20000,
      idleTimeout: 20000,
    });
  }

  async query<T extends QueryResult>(options: QueryOptions): Promise<[T, FieldPacket[]]> {
    return this.client.query<T>(options);
  }
}
