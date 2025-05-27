
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
// axiosClient.interceptors.request.use(
//   (config) => {
    
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    console.log(error, "error===========>")
    if (error.response && error.response.status === 403) {
      console.error('Unauthorized! Logging out...');
        //window.location.replace('/');
        localStorage.clear()
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;
