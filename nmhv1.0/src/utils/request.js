/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 15:54:46
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-02 09:14:36
 * @FilePath: \nmhv1.0\nmhv1.0\src\request\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import LocalCatch from "./catch";
import { useRouter } from "vue-router";
const router = useRouter();
export const http = axios.create({
  baseURL: "/api",
});
http.interceptors.request.use(
  (config) => {
    const token = LocalCatch.getToken("token");
    if (token) {
     
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);
http.interceptors.response.use(
  (res) => {
    return res ? res.data : res;
  },
  (err) => {
    console.log("err");
    console.log(err);

    //无权限
    if (err.response.status === "401") {
      message.err("请先登录");
      //返回登录界面
      setTimeout(() => {
        router.push({ path: "/login" });
      }, 1000);
    }
    console.log(err);
  }
);
