import { CriteriaConverter } from '../../../domain/criteria/converter';
import { Criteria } from '../../../domain/criteria';
import { Filter } from '../../../domain/criteria/filter';
import { Filters } from '../../../domain/criteria/filters';
import { Order } from '../../../domain/criteria/order';
import { sqlPaginationResolver } from './pagination';
import { Operator } from '../../../domain/criteria/filterOperator';
import { AppError, ErrorTypes } from '../../../domain/error/index';

export type SqlValue = string | number;
type SqlFilter = { field: string; value: string | number | string[] | number[] };
type SqlGenerateFilter = { filters: string; values: SqlValue[] };

export function filterDeleted(column = 'Deleted'): Map<string, string> {
  return new Map([
    ['field', column],
    ['operator', Operator.EQUAL],
    ['value', '0'],
  ]);
}

export interface SqlConverterResult {
  filter: string;
  values: SqlValue[];
  sort: string;
  pagination: string;
  page: number;
  take: number;
}

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class SqlCriteriaConverter implements CriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, SqlFilter>>;
  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, SqlFilter>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.GTE, this.greaterThanEqualFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.LTE, this.lowerThanEqualFilter],
      [Operator.IN, this.inFilter],
      [Operator.NOT_IN, this.notInFilter],
      [Operator.LIKE, this.likeFilter],
    ]);
  }

  convert<SqlConverterResult>(criteria: Criteria): SqlConverterResult {
    const { page, offset, limit } = sqlPaginationResolver(criteria.page, criteria.take);
    const { filters, values: filterValues } = this.generateFilter(criteria.filters);

    const values = [...filterValues, limit];
    offset && values.push(offset);

    return {
      filter: criteria.hasFilters() ? filters : '',
      values,
      sort: criteria.order.hasOrder() ? this.generateSort(criteria.order) : '',
      pagination: this.generatePagination(offset),
      page: page,
      take: limit,
    } as SqlConverterResult;
  }

  protected generateFilter(filters: Filters): SqlGenerateFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);
      if (!transformer) {
        throw new AppError(
          ErrorTypes.BAD_REQUEST,
          `Unexpected operator value ${filter.operator.value}`,
          'ERR_UNEXPECTED_OPERATOR'
        );
      }

      return transformer(filter);
    });

    return {
      filters: `WHERE ${filter.map((e) => e.field).join(' AND ')}`,
      values: filter.map((e) => e.value).flat(),
    };
  }

  protected generateSort(order: Order): string {
    return `ORDER BY ${order.orderBy.value} ${order.orderType.value}`;
  }

  protected generatePagination(offset?: number): string {
    return offset ? `LIMIT ? OFFSET ?` : `LIMIT ?`;
  }

  private equalFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }

  private notEqualFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }

  private greaterThanFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }

  private greaterThanEqualFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }
  private lowerThanFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }

  private lowerThanEqualFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: filter.value.value,
    };
  }

  private inFilter(filter: Filter): SqlFilter {
    const values = filter.value.value.split(',').map((v) => v.trim());
    return {
      field: `${filter.field.value} ${filter.operator.value} (${Array(values.length)
        .fill('?')
        .join(', ')})`,
      value: values,
    };
  }

  private notInFilter(filter: Filter): SqlFilter {
    const values = filter.value.value.split(',').map((v) => v.trim());
    return {
      field: `${filter.field.value} ${filter.operator.value} (${Array(values.length)
        .fill('?')
        .join(', ')})`,
      value: values,
    };
  }

  private likeFilter(filter: Filter): SqlFilter {
    return {
      field: `${filter.field.value} ${filter.operator.value} ?`,
      value: `%${filter.value.value}%`,
    };
  }
}
