import axois from "axios";
import getParams from "./params";

let baseURL = "http://localhost:3304";
switch (getParams("env")) {
  case "debug":
    baseURL = "http://localhost:3304";
    break;
  case "test":
    baseURL = "https://t1.itaotuo.com/puzzle/";
    break;
  default:
    baseURL = "https://game.itaotuo.com/puzzle-manager/";
}
const service = axois.create({
  baseURL,
  timeout: 5000
});

service.interceptors.response.use(
  response => {
    const res = response.data.data;
    return res;
  },
  error => {
    console.log("出错了：", error);
    return Promise.reject(error);
  }
);
export default service;
