<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="../../imgs/logo.png" alt="" />
      </div>
      <div class="right">
        <a href="#" style="color: #fff">APP下载</a>
        <img class="phoneImg" src="../../imgs/phone.png" alt="" />
        <span class="sperotor">|</span>
        <!-- 账号 -->
        <span class="name">{{ accountName }}</span>
        <ul>
          <!-- 一级菜单 -->
          <li class="header">
            <img
              class="headImg"
              src="../../imgs/headphoto.png"
              alt=""
              @mouseover="hover = true"
            />
          </li>
          <!-- 二级菜单 -->

          <ul class="list" v-if="hover">
            <li class="quite" @click="quit">
              <UserSwitchOutlined />
              退出
            </li>
          </ul>
        </ul>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
          :items="menuItem"
          @click="handleMenuClick"
        >
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0" separator=">">
          <a-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            :to="{ path: item.path }"
            style="cursor: pointer"
          >
            {{ item.meta.title }}
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import LocalCatch from "../../utils/catch";
import { useRouter } from "vue-router";
import {
  HomeOutlined,
  FolderOutlined,
  LaptopOutlined,
  AndroidOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons-vue";
const router = useRouter();
const hover = ref(false);
const menuItem = [
  {
    key: "0",
    label: "首页",
  },
  {
    key: "1",
    label: "业务管理",
    children: [
      { key: "1-1", label: "商品管理" },
      { key: "1-2", label: "牲畜档案" },
      { key: "1-3", label: "喂养记录" },
      { key: "1-4", label: "免疫记录" },
    ],
  },
  {
    key: "2",
    label: "基础配置",
    children: [
      { key: "2-1", label: "牧场管理" },
      { key: "2-2", label: "围舍管理" },
      { key: "2-3", label: "围栏管理" },
      { key: "2-4", label: "数据字典" },
    ],
  },
  {
    key: "3",
    label: "系统管理",
    children: [
      { key: "3-1", label: "人员管理" },
      { key: "3-2", label: "角色管理" },
    ],
  },
];

//用户名渲染
const accountName = ref(router.currentRoute.value.query.userAccount);

const handleMenuClick = (menuItem) => {
  console.log(menuItem);
  if (menuItem.item.originItemValue.key === "2-1") {
    router.push({ path: "/basicConfig/pasture" });
  } else if (menuItem.item.originItemValue.key === "2-2") {
    router.push({ path: "/basicConfig/enclosure" });
  } else if (menuItem.item.originItemValue.key === "2-4") {
    router.push({ path: "/basicConfig/dataDict" });
  } else if (menuItem.item.originItemValue.key === "3-1") {
    router.push({ path: "/sysManage/users" });
  } else if (menuItem.item.originItemValue.key === "0") {
    router.push({ path: "/home" });
  }
};

const quit = () => {
  LocalCatch.deleteToken("token");
  router.push({ path: "/" });
};
</script>
<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
}
.list {
  // display: none;
  cursor: pointer;
  top: 38px;
  left: 20px;
  position: absolute;
  width: 90px;
  height: 40px;
  list-style: none;
  background-color: aliceblue;
}
.list .quite {
  // display: none;
  position: absolute;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 25px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}
#root,
body,
html {
  height: 100%;
}

.ant-layout {
  display: flex !important;
  width: 100% !important;
  min-height: 100% !important;
}
.logo img {
  vertical-align: middle;
  border-style: none;
  width: 100px;
  height: 27px;
  position: absolute;
  top: 10px;
}
.ant-layout .ant-layout-header {
  height: 48px;
  padding-inline: 50px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 48px;
  background: #001529;
}
.right {
  position: relative;
  top: 10px;
  float: right;
  right: 20px;
  width: 200px;
  height: 30px;
  line-height: 30px;
  /* border: 1px solid red; */
}
.right a {
  position: absolute;
  right: 5px;
}
.right .phoneImg {
  top: 5px;
  position: absolute;
  right: 70px;
}
.right .sperotor {
  position: absolute;
  color: gray;
  right: 90px;
  bottom: 1px;
}
.name {
  position: absolute;
  color: aliceblue;
  right: 110px;
}
.right .headImg {
  position: absolute;
  position: absolute;
  right: 160px;
  bottom: 3px;
}
</style>
