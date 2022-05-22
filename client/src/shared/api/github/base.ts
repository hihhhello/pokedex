import axios, { AxiosRequestConfig } from 'axios';
import { GITHUB_TOKEN_KEY } from 'shared/lib';

export const apiInstance = axios.create({
  baseURL: 'https://api.github.com',
});

export const baseInstance = axios.create({
  baseURL: 'https://github.com',
});

apiInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem(GITHUB_TOKEN_KEY);

  let auth = '';

  if (token) {
    const parsedToken = JSON.parse(token);

    auth = `token ${parsedToken}`;
  }

  // @ts-ignore
  config.headers.common['Authorization'] = auth;
  return config;
});
