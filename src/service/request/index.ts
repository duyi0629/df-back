import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class DFRequest {
  instance: AxiosInstance;
  constructor(baseURL: string, timeout: number) {
    console.log(BASE_URL, import.meta.env , 'BASE_URL')
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    this.instance.interceptors.request.use((config: any) => {
      const token = localStorage.getItem('token')
      if(token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use((res: { data: AxiosResponse }) => {
      return res.data;
    });
  }

  reuest<T = any>(config: AxiosRequestConfig) {
    return this.instance.request(config) as Promise<T>;
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.instance.request({ ...config, method: "get" }) as Promise<T>;
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.instance.request({ ...config, method: "post" }) as Promise<T>;
  }
}

export default new DFRequest(BASE_URL, TIMEOUT);
