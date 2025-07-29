/// <reference types="vite/client" />
import axios, { InternalAxiosRequestConfig } from 'axios';


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
});

API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
