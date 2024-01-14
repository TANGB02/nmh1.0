/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:32:16
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-02 09:09:23
 * @FilePath: \nmhv1.0\nmhv1.0\src\router.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import routes from "./router/index";
import { createRouter, createWebHistory } from "vue-router";
import { message } from "ant-design-vue";
import LocalStorage from "./utils/catch";
const router = createRouter({
  // 这里使用hash模式路由
  history: createWebHistory(),
  routes,
});
//全局路由守卫
router.beforeEach((to, from, next) => {
  //访问需要授权的页面时，如果没有登录，则跳转到登录界面
  const token = LocalStorage.getToken("token");

  if (token || to.path === "/") {
    // console.log("已验证");
    next();
  } else {
    console.log("未验证，请先登录");
    message.error("您还没有登录，请先登录");
    return next("/");
  }
});
export default router;
