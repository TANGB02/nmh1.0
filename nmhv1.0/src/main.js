/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:21:02
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-19 12:48:08
 * @FilePath: \nmhv1.0\nmhv1.0\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 *
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import AntdV from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import router from "./router.config.js";
const app = createApp(App);
app.use(AntdV);
app.use(router);
app.mount("#app");
