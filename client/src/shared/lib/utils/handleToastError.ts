import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { parseAxiosError } from './parseAxiosError';

export const handleToastError = (error: any, fallbackMessage?: string) => {
  if (error instanceof AxiosError) {
    const { statusText, message } = parseAxiosError(error);

    toast(message || statusText, {
      type: 'error',
    });

    return;
  }

  toast(fallbackMessage || error.message, {
    type: 'error',
  });
};
