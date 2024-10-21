import { AsyncLocalStorage } from 'async_hooks';

export interface UserAuthInfo {
  document: string;
  role: string;
}

export interface RequestAsyncContext {
  token?: string;
  user?: UserAuthInfo;
}

export class AsyncContext {
  private static storeContext = new AsyncLocalStorage();

  static get<T>(name: string): T | undefined {
    return (this.storeContext.getStore() as any)?.get(name) || undefined;
  }

  static set(name: string, value: unknown) {
    this.storeContext.enterWith(new Map([[name, value]]));
  }
}
