

export interface BlackListRepository {
  addTokenToBlacklist(token: string, token_poyload: any): Promise<void>;
  isTokenBlacklisted(token: string): Promise<boolean>;
}
