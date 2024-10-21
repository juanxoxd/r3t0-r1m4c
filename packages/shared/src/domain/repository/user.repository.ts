import { Criteria } from '../criteria';
export interface User {
  id: string;
  Names: string;
  LastNames: string;
  DocumentType: string;
  Email: string;
  NroDocumento: string;
  Sub: string;
  PhoneNumber: string;
  Role: string;
  Status: string;
}

export interface UserMiddlewareRepository {
  getUserByDocument(document: string): Promise<User | null>;
  // matching(criteria: Criteria): Promise<User[]>;
  createUser(user: User): Promise<User>;
}
