import axios, { AxiosError, AxiosResponse } from 'axios';

export const client = axios.create({
  withCredentials: true,
});

export function get<T>(
  url: string,
  params: any,
  authenticationExceptionHandler?: () => void,
) {
  const result = client
    .get(url, {
      params,
    })
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(err);

      if (err.response?.status === 401) {
        authenticationExceptionHandler && authenticationExceptionHandler();
      }

      throw err;
    });

  return result;
}

export function post<B, R>(
  url: string,
  body: B,
  authenticationExceptionHandler?: () => void,
) {
  const result = client
    .post(url, body)
    .then((res: AxiosResponse<R>) => res.data)
    .catch((err: AxiosError<any>) => {
      console.error(err);

      if (err.response?.status === 401) {
        authenticationExceptionHandler && authenticationExceptionHandler();
      }

      throw err;
    });

  return result;
}

export function putCall<B, R>(
  url: string,
  body: B,
  authenticationExceptionHandler?: () => void,
) {
  const result = client
    .put(url, body)
    .then((res: AxiosResponse<R>) => res.data)
    .catch((err) => {
      console.error(err);

      throw err;
    });

  return result;
}

export function deleteCall<B, R>(
  url: string,
  authenticationExceptionHandler?: () => void,
) {
  const result = client
    .delete(url)
    .then((res: AxiosResponse<R>) => res.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });

  return result;
}
