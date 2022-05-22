import { AxiosPromise } from 'axios';
import { apiInstance } from './base';
import { GithubUser } from './models';

const BASE_URL = '/user';

export const getUser = (): AxiosPromise<GithubUser> => {
  return apiInstance.get(BASE_URL);
};
