<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-22 15:23:12
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-30 19:58:55
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\basket\enclosures.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="wrap">
    <div class="imgs">
      <img
        src="../../imgs/enclosures.png"
        alt=""
        style="width: 67px; height: 58.13px; margin: 10px 5px"
      />
    </div>
    <div class="msg">
      <span class="title">{{ props.msg.circleName }}</span>
      <p>
        <span class="stock">存栏量</span>
        <span class="num">{{ props.msg.inventory }}</span>
      </p>
    </div>
    <div class="method">
      <span class="items" @click="() => getDetails(props.msg.id)">查看</span>
      <span class="items" @click="() => setEls(props.msg.id)">修改</span>

      <span class="items" @click="() => setStatus(props.msg.id)">{{
        props.msg.state === 0 ? "启用" : "停用"
      }}</span>

      <span class="items" @click="() => delEls(props.msg.id)">删除</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  msg: { type: Object },
});

const emit = defineEmits(["setStatus", "delEls", "setEls"]);
const setStatus = (id) => {
  emit("setStatus", id);
};

const delEls = async (id) => {
  console.log(id);
  emit("delEls", id);
};
const setEls = (id) => {
  console.log(id);
  emit("setEls", id);
};
//查看详情
const getDetails = (id) => {
  router.push({
    path: "/basicConfig/elsDatails",
    name: "elsDatails",
    query: { id },
  });
};
</script>
<style scoped>
.wrap {
  /* 矩形备份 19 */
  width: 530px;
  height: 102px;
  display: flex;
  background: #ffffff;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.imgs {
  display: flex;
  width: 82px;
  height: 82px;
  opacity: 1;
  flex: 0 0 82px;
  margin: 10px;
  background: #ffffff;
}
.msg {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  height: 82px;
  margin: 10px 0px;
  background: #ffffff;
  flex: 0 0 100px;
}
.method {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 186px;
  height: 82px;
  opacity: 1;
  flex: 0 0 170px;
  margin: 10px;
  background: #ffffff;
}
.title {
  position: absolute;
  font-family: PingFangSC-Semibold;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;
  color: #333333;
  top: 10px;
}
.stock {
  position: absolute;
  top: 55px;
  left: 0px;

  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0px;

  color: #a8a8a8;
}
.num {
  position: absolute;
  top: 55px;
  left: 50px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0px;
  color: #333333;
}
.items {
  display: flex;
  width: 28px;
  height: 20px;
  flex: 0 0 28px;

  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: 0px;
  margin-top: 10px;
  color: #21b47c;

  cursor: pointer;
}
</style>
