import axios, { AxiosResponse } from 'axios';

export const client = axios.create({
  withCredentials: true,
});

export function get<T>(url: string, params: any, exceptionHandle?: () => void) {
  const result = client
    .get(url, {
      params,
    })
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(err);
      exceptionHandle && exceptionHandle();
    });

  return result;
}

export function post<B, R>(url: string, body: B) {
  const result = client
    .post(url, body)
    .then((res: AxiosResponse<R>) => res.data)
    .catch((err) => console.error(err));

  return result;
}
