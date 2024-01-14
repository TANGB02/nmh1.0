<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:44:34
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-02 11:29:37
 * @FilePath: \nmhv1.0\nmhv1.0\src\pages\default\default.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login-wrapper">
    <span class="welcome">欢迎登录</span>
    <img class="bg" :src="welcomeImg" />
  </div>
</template>

<script setup>
import welcomeImg from "../../imgs/welcome.png";
</script>
<style lang="less" scoped>
.login-wrapper {
  height: 100%;
  border-radius: 2px;
  background: #f7fffc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .welcome {
    font-size: 40px;
    line-height: 48px;
    color: black;
    margin-bottom: 12px;
  }
  .bg {
    width: 854px;
    height: 493px;
  }
}
</style>
