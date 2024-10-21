export interface QueryPage {
  page?: string;
  take?: string;
}

export interface QueryInput {
  filters: Array<Map<string, string>>;
  orderBy?: string;
  orderType?: string;
  page?: string;
  take?: string;
  isTotal?: boolean;
}


// export interface DynamoDBQueryInput {
//   take?: string;
//   page?: string;
//   orderBy?: string;
//   startKey?: Record<string, any>;
//   orderType?: 'ASC' | 'DESC';
//   filters?: Record<string, any>;
//   partitionKey?: string;
//   partitionValue?: string;
//   indexName?: string;
// }

export interface DynamoDBQueryInput {
  query: string;
  parameters: any[];
  take?: string;
  area?: string;
  lastKey?: string;
}

export class DynamoDBQuery {
  readonly filters?: Record<string, any>;
  readonly orderBy?: string;
  readonly orderType?: 'ASC' | 'DESC';
  readonly page?: string;
  readonly take?: string;
  readonly startKey?: Record<string, any>;

  constructor(
    filters?: Record<string, any>,
    orderBy?: string,
    orderType?: 'ASC' | 'DESC',
    page?: string,
    take?: string,
    startKey?: Record<string, any>
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.page = page;
    this.take = take;
    this.startKey = startKey;
  }
}

export class Query {
  readonly filters: Array<Map<string, string>>;
  readonly orderBy?: string;
  readonly orderType?: string;
  readonly page?: string;
  readonly take?: string;

  constructor(
    filters: Array<Map<string, string>>,
    orderBy?: string,
    orderType?: string,
    page?: string,
    take?: string
  ) {
    this.filters = filters;
    this.orderBy = orderBy;
    this.orderType = orderType;
    this.page = page;
    this.take = take;
  }
}
