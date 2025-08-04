import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});

// // Add interceptors if needed
// axiosInstance.interceptors.request.use((config) => {
//   // You can modify requests here
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle errors
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
