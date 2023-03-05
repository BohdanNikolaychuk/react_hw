import axios, { AxiosRequestConfig } from 'axios';

const instans = axios.create({
  baseURL: 'http://localhost:4000',
});

instans.interceptors.request.use(async (config: AxiosRequestConfig) => {
  config.headers = config.headers ?? {};

  config.headers.Authorization = window.localStorage.getItem('userToken');

  return config;
});

export default instans;
