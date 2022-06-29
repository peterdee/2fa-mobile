import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BACKEND_URL } from '../constants';
import { getValue, KEYS } from './storage';

interface RequestOptions {
  data?: object;
  method: string;
  url: string;
  withToken?: boolean;
}

const METHODS = {
  delete: 'DELETE',
  get: 'GET',
  patch: 'PATCH',
  post: 'POST',
};

export const ENDPOINTS = {
  changePassword: {
    method: METHODS.post,
    url: '/api/password',
  },
  deleteProfile: {
    method: METHODS.delete,
    url: '/api/profile',
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

export default async function request(options: RequestOptions): Promise<AxiosResponse<any>> {
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
