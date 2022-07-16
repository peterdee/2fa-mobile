import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { BACKEND_URL } from '../constants';
import { getValue, KEYS } from './storage';

interface RequestOptions {
  data?: object;
  method: string;
  url: string;
  withToken?: boolean;
}

export interface ResponsePayload<T = null> {
  data?: T;
  datetime: number;
  handling: number;
  info: string;
  request: string;
  status: number;
}

const METHODS = {
  delete: 'DELETE',
  get: 'GET',
  patch: 'PATCH',
  post: 'POST',
};

export const ENDPOINTS = {
  changePassword: {
    method: METHODS.patch,
    url: '/api/password',
  },
  deleteProfile: {
    method: METHODS.delete,
    url: '/api/profile',
  },
  logout: {
    method: METHODS.get,
    url: '/api/auth/logout',
  },
  recoveryCheck: {
    method: METHODS.post,
    url: '/api/recovery/check',
  },
  recoveryUpdate: {
    method: METHODS.patch,
    url: '/api/recovery/update',
  },
  signIn: {
    method: METHODS.post,
    url: '/api/auth/sign-in',
  },
  signUp: {
    method: METHODS.post,
    url: '/api/auth/sign-up',
  },
};

export default async function request<T = null>(
  options: RequestOptions,
): Promise<AxiosResponse<ResponsePayload<T>>> {
  const config: AxiosRequestConfig = {
    method: options.method,
    url: `${BACKEND_URL}${options.url}`,
  };

  if (options.data) {
    config.data = options.data;
  }
  if (options.withToken) {
    const token = await getValue<string>(KEYS.token);
    config.headers = {
      Authorization: token as string,
    };
  }

  return axios({
    ...config,
  });
}
