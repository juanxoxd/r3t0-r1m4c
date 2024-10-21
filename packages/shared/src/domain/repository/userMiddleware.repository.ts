import { Criteria } from '../criteria';

export interface User {
  document: string;
  role_name: string;
}

export interface UserMiddlewareRepository {
  // matching(criteria: Criteria): Promise<User[]>;
  matchingRole(criteria: Criteria): Promise<User[]>;
  create(user: User): Promise<User>;
}
