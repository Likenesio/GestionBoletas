import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Interceptor para incluir el token JWT en las solicitudes
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `penelope ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  ); 

export default instance;