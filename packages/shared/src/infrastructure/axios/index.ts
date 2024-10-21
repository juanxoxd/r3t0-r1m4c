import axios, { AxiosInstance as Instance, RawAxiosRequestHeaders } from 'axios';

import { SOFTTEK_CONSTANTS } from '../../utils/constants';
import { AsyncContext, RequestAsyncContext } from '../../utils/context';

export type AxiosInstance = Instance;

export interface AxiosConfig {
  baseUrl: string;
  headers?: { Authorization?: string; 'Content-Type'?: string };
}

function getAxios(config: AxiosConfig) {
  const headers: RawAxiosRequestHeaders = {
    ...config.headers,
    Accept: 'application/json',
  };

  !headers['Content-Type'] && (headers['Content-Type'] = 'application/json');
  const client = axios.create({
    headers,
    baseURL: config.baseUrl,
  });

  client.interceptors.request.use(
    (request) => {
      const traceContext = AsyncContext.get<RequestAsyncContext>(
        SOFTTEK_CONSTANTS.ASYNCCONTEXT.REQUEST
      );
      if (!request.headers.Authorization && traceContext?.token) {
        request.headers.Authorization = `Bearer ${traceContext.token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}

export class AxiosClientFactory {
  private static instance: AxiosClientFactory;
  private client: AxiosInstance;

  private constructor(private readonly config: AxiosConfig) {
    this.client = getAxios(this.config);
  }

  static getInstance(config: AxiosConfig): AxiosInstance {
    if (!AxiosClientFactory.instance) {
      AxiosClientFactory.instance = new AxiosClientFactory(config);
    }

    return AxiosClientFactory.instance.client;
  }

  static getClient(config: AxiosConfig): AxiosInstance {
    return getAxios(config);
  }
}

// import axios from 'axios';

// import { SOFTTEK_CONSTANTS } from '../../utils/constants';
// import { AsyncContext, RequestAsyncContext } from '../../utils/context';

// interface AxiosConfig {
//   baseUrl: string;
//   headers?: { Authorization?: string; 'Content-Type'?: string };
// }

// export function getAxios(config: AxiosConfig) {
//   const headers = config.headers || {};
//   const client = axios.create({
//     headers: {
//       ...headers,
//       ...(!headers['Content-Type'] && { 'Content-Type': 'application/json' }),
//       Accept: 'application/json',
//     },
//     baseURL: config.baseUrl,
//   });

//   client.interceptors.request.use(
//     (request) => {
//       const traceContext = AsyncContext.get<RequestAsyncContext>(
//         SOFTTEK_CONSTANTS.ASYNCCONTEXT.REQUEST
//       );
//       if (!request.headers.Authorization && traceContext?.token) {
//         request.headers.Authorization = `Bearer ${traceContext.token}`;
//       }

//       return request;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   client.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   return client;
// }
