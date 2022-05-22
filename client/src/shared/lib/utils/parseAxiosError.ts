import { AxiosError } from 'axios';

type ParsedReturnData = {
  message?: string;
  status: number;
  statusText: string;
};

type AxiosErrorResponse = {
  message: string;
  errors: string[];
};

export const parseAxiosError = (
  e: AxiosError<AxiosErrorResponse>
): ParsedReturnData => {
  if (e.response) {
    return {
      message: e.response.data.message,
      status: e.response.status,
      statusText: e.response.statusText,
    };
  }
  return {
    ...e.request,
  };
};
