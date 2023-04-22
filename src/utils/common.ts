import axios, { AxiosResponse } from 'axios';

export const client = axios.create({
  withCredentials: true,
});

export function get<T>(url: string, exceptionHandle: () => void) {
  const result = client
    .get(url)
    .then((res: AxiosResponse<T>) => res.data)
    .catch((err) => {
      console.error(err);
      exceptionHandle();
    });

  return result;
}
