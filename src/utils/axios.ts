import axios, {
  AxiosError,
  AxiosInterceptorOptions,
  AxiosResponse,
} from 'axios';
import Toast from 'react-native-toast-message';
import { mapValidationErrors } from './MapValidationErrors';

export const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  withCredentials: true,
});

http.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json';
    config.params = { api_key: '6b4357c41d9c606e4d7ebe2f4a8850ea' };
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export const isAxiosError = (error: AxiosError) => {
  return axios.isAxiosError(error);
};

export const handleError = (error: AxiosError, options?: any) => {
  const serverResponse = error.response;

  if (serverResponse) {
    handleErrorResponse(serverResponse, options);
  } else if (error.request) {
    handleErrorRequest(error.request);
  } else {
    handleErrorRequest(error.request);
  }
  return true;
};

export const handleErrorRequest = (request: any) => {
  Toast.show({
    type: 'error',
    text1: 'check your internet',
  });
};

export const handleErrorResponse = (response: AxiosResponse, options: any) => {
  const status = response.status;

  switch (status) {
    case 401:
      break;
    case 403:
      break;
    case 413:
      Toast.show({
        type: 'error',
        text1: 'Files exceeded server size limit',
      });
      break;
    case 422:
      handleUnprocessableEntity(response.data.errors, status, options);
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      handleServerError();
      break;
    default:
      handleServerError();
      break;
  }
};

export const handleUnprocessableEntity = (
  errors: AxiosError,
  options: any,
  message: string,
) => {
  if (errors) {
    if (options && options.setErrors) {
      Toast.show({
        type: 'error',
        text1: 'Some data are incorrect',
      });
      const setError = options.setError;
      mapValidationErrors(errors).forEach(({ key, message }) => {
        setError(key, { message });
      });
    } else {
      mapValidationErrors(errors).forEach(({ key, message }) => {
        Toast.show({
          type: 'error',
          text1: message,
        });
      });
    }
  } else {
    Toast.show({
      type: 'error',
      text1: message,
    });
  }
};
const handleServerError = () => {
  Toast.show({
    type: 'error',
    text1: `Server Error`,
  });
};
