import { AxiosPromise } from 'axios';
import { User } from './models';
import { apiInstance } from './base';
import { CreateUserDto } from './types';

const BASE_URL = '/users';

export const checkUser = (login: string): AxiosPromise<User | null> => {
  return apiInstance.get(`${BASE_URL}/${login}`);
};

export const createNewUser = (userDto: CreateUserDto): AxiosPromise<User> => {
  return apiInstance.post(BASE_URL, userDto);
};
