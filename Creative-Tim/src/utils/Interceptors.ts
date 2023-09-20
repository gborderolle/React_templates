// Clase 162: https://www.udemy.com/course/desarrollando-aplicaciones-en-react-y-aspnet-core/learn/lecture/26135740#notes

import axios from "axios";
import { getToken } from "../auth/ManageJWT";

export function setupInterceptor() {
  axios.interceptors.request.use(
    function (config) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}
