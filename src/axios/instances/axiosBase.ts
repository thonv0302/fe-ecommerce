import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class AxiosBase {
  protected axiosInstance: AxiosInstance;
  protected axiosConfig: AxiosRequestConfig;

  constructor(interceptors: Array<any>, baseUrl: string) {
    this.axiosConfig = {
      baseURL: baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-api-key': import.meta.env.VITE_X_API_KEY,
      },
    };

    this.axiosInstance = axios.create(this.axiosConfig);

    if (interceptors) {
      for (const interceptor of interceptors) {
        interceptor(this.axiosInstance);
      }
    }
  }
}
