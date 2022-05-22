import { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import { LoginDataResponse } from './types';

export const getAccessToken = (
  code: string
): AxiosPromise<LoginDataResponse> => {
  return apiInstance.get(`/auth/${code}`);
};
