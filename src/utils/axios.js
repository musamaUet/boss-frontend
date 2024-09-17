import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });
const axiosInstance = axios.create({ baseURL: 'https://apiapp.ezboss.tech' });
// const axiosInstance = axios.create({ baseURL: 'http://localhost:3017' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 405 || error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

export default axiosInstance;

export const API_ENDPOINTS = {
  auth: {
    refreshToken: '/api/auth/refresh-token',
    login: '/api/auth/login',
    register: '/api/auth/register',
    contact: '/api/contactus/create',
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
    },
    invoices: {
      post: '/api/invoices/create',
      get: '/api/invoices/all',
      put: '/api/invoices/update',
      delete: '/api/invoices/delete/',
      singleData: '/api/invoices/show/',
    },
    upload_images: {
      post: '/api/invoices/upload-images',
    }
  }
};
