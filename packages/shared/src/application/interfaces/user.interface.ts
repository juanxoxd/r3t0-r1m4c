export interface UserDetails {
  Sub: string;
  NroDocumento: string;
  id: string;
  Names: string;
  LastNames: string;
  DocumentType: string;
  PhoneNumber: string;
  Email: string;
  Role: string;
  Status: string
}

export interface UserInfo {
  token: string;
  document: string;
  role: string;
  user: UserDetails;
}
