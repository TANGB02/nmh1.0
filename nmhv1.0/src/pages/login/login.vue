<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 09:28:02
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 09:32:02
 * @FilePath: \nmhv1.0\nmhv1.0\src\pages\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="building">
      <div class="wrap">
        <span class="title">欢迎登录农牧慧养殖系统</span>
        <a-form
          :rules="rules"
          :model="formState"
          name="horizontal_login"
          layout="base"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item name="userAccount" class="username">
            <a-input
              v-model:value="formState.userAccount"
              placeholder="请输入登录账号"
              class="text"
            >
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="userPassword" class="password">
            <a-input-password
              v-model:value="formState.userPassword"
              placeholder="请输入密码"
              class="text"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" class="login"
              >登录</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import { login } from "../../service/api";
import LocalCatch from "../../utils/catch";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const formState = reactive({
  userAccount: "",
  userPassword: "",
});
const onFinish = (values) => {
  console.log("Success:", values);
  login({ ...values }).then(
    (res) => {
      console.log(res);
      if (res.code === 1) {
        router.push({
          path: "/home",
          query: { userAccount: values.userAccount },
        });
        const token = res.data;
        LocalCatch.setToken("token", token);
        message.success("登录成功");
      }
    },
    (err) => {
      console.log(err);
    }
  );
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// 校验规则
const rules = {
  userAccount: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, message: "用户名长度不能少于4个字符", trigger: "blur" },
    { max: 18, message: "用户名长度不能大于18个字符", trigger: "blur" },
  ],
  userPassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, message: "密码长度不能少于6个字符", trigger: "blur" },
    { max: 18, message: "密码长度不能大于18个字符", trigger: "blur" },
  ],
};
</script>
<style scoped>
.username {
  /* 矩形 */
  position: absolute;
  left: 38px;
  top: 120px;
  width: 340px;
  height: 50px;
  border-radius: 1px;
  opacity: 1;

  background: #f4f4f4;
}
.password {
  /* 矩形 */

  position: absolute;
  left: 38px;

  top: 180px;
  width: 340px;
  height: 50px;
  border-radius: 1px;
  opacity: 1;
  background: #f4f4f4;
}
.username .text {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;

  color: #a8a8a8;
}
.password .text {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;

  color: #a8a8a8;
}
.wrap .title {
  /* 欢迎您登录智慧养殖系统 */

  position: absolute;
  left: 89px;
  top: 48px;
  width: 242px;
  height: 30px;
  opacity: 1;

  font-family: PingFangSC-Semibold;
  font-size: 22px;
  font-weight: normal;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0px;

  color: #333333;
}
.wrap {
  /* 矩形 */
  position: absolute;
  left: 35%;
  top: 23%;
  width: 420px;
  height: 368px;
  border-radius: 4px;
  opacity: 1;
  /* border: 1px solid red; */
  background: #ffffff;
}
.wrap .login {
  position: absolute;
  left: 38px;
  top: 240px;
  width: 340px;
  height: 50px;
  border-radius: 1px;
  opacity: 1;

  /* 21B47C */
  background: #21b47c;
}
.building {
  /* 登录背景图 */
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1600px;
  height: 900px;
  opacity: 1;
  object-fit: cover;
  background: url("../../imgs//background.png") no-repeat center;
  background-size: 100% 100%;
}
</style>
