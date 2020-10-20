import axois from "axios";
import getParams from "./params";

let baseURL = "http://localhost:3304";
switch (getParams("env")) {
  case "debug":
    baseURL = "http://localhost:3304";
    break;
  case "dev":
    baseURL = "https://t1.itaotuo.com/puzzle-server/";
    break;
  case "pro":
    baseURL = "https://game.itaotuo.com/puzzle-manager/";
    break;
  default:
    baseURL = "http://localhost:3304";
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