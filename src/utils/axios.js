import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: "https://apiapp.ezboss.tech" });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    refreshToken: '/api/auth/refresh-token',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  schedule: {
    appointment: {
      post: '/api/schedules/create',
      get: '/api/schedules/all',
      put: '/api/schedules/update',
      delete: '/api/schedules/delete/',
    },
    payment: {
      post: '/api/payments/create',
      get: '/api/payments/all',
      put: '/api/payments/update',
      delete: '/api/payments/delete/',
    },
    todo: {
      post: '/api/todos/create',
      get: '/api/todos/all',
      put: '/api/todos/update',
      delete: '/api/todos/delete/',
    },
    calendars: {
      post: '/api/calendars/create',
      get: '/api/calendars/all',
      put: '/api/calendars/update',
      delete: '/api/calendars/delete/',
    }
  }
};
