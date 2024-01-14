/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:27:43
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 11:43:33
 * @FilePath: \nmhv1.0\nmhv1.0\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:27:43
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-21 16:15:13
 * @FilePath: \nmhv1.0\nmhv1.0\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:27:43
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-19 09:44:26
 * @FilePath: \nmhv1.0\nmhv1.0\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("../pages/login/login.vue"),
    //守卫
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/home/index.vue"),
    meta: { title: "首页" },
    children: [
      //   二级路由
      {
        path: "",
        name: "",
        component: () => import("../pages/default/default.vue"),
        meta: { title: "默认页" },
      },
    ],
  },
  {
    path: "/sysManage",
    name: "sysManage",
    component: () => import("../pages/home/index.vue"),
    meta: { title: "系统管理" },
    children: [
      //   二级路由
      {
        path: "users",
        name: "users",
        component: () => import("../pages/userManage/users.vue"),
        meta: { title: "人员管理" },
      },
    ],
  },
  // 基础配置
  {
    path: "/basicConfig",
    name: "basicConfig",
    component: () => import("../pages/home/index.vue"),
    meta: { title: "基础配置" },
    children: [
      //   二级路由
      {
        path: "pasture",
        name: "pasture",
        component: () => import("../pages/pastureManage.vue/pasture.vue"),
        meta: { title: "牧场管理" },
        children: [
          {
            path: "pastureDetails",
            name: "pastureDetails",
            component: () =>
              import("../pages/pastureManage.vue/pastureDetails.vue"),
            meta: { title: "查看牧场" },
          },
          {
            path: "addPasture",
            name: "addPasture",
            component: () =>
              import("../pages/pastureManage.vue/addPasture.vue"),
          
            meta: { title: "添加牧场" },
          },
          {
            path: "updatePasture",
            name: "updatePasture",
            component: () =>
              import("../pages/pastureManage.vue/updatePasture.vue"),
            meta: { title: "修改牧场" },
          },
        ],
      },

      {
        path: "enclosure",
        name: "enclosure",
        component: () => import("../pages/enclosureManage/enclosure.vue"),
        meta: { title: "围舍管理" },
      },
      {
        path: "elsDatails",
        name: "elsDatails",
        component: () =>
          import("../pages/enclosureManage/enclosureDetails.vue"),
        meta: { title: "查看圈舍" },
      },

      {
        path: "dataDict",
        name: "dataDict",
        component: () => import("../pages/dataDictManage/dataDict.vue"),
        meta: { title: "数据字典" },
      },
    ],
  },
];
export default routes;
