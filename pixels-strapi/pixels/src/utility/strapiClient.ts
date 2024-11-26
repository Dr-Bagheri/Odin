import axios from 'axios';

const STRAPI_API_URL = "http://localhost:3000/api"; 


export const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


strapiClient.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('f4a42d3145e9c7c09f69a4f6e22d8dfe47597ceb8b763db55dcc7515aeade3a61e278f6106d1e570607a9e43df8c3c651671ac2e1776c05468c7b301a4295c158a9f898641df17de79b872e55db17228009d5dd8a6bdbed67fc8dacc05cb2c3697205115b91cb66e7504a1829c38a7d2d3de6cb4d886fb33801cc7965c1b359b');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

strapiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    return Promise.reject(error);
  }
);

export default strapiClient; 