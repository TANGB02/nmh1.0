<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-22 15:23:12
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 11:37:10
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
      <span class="title">{{ props.msg.pastureName }}</span>
      <p>
        <span class="stock">存栏量&ensp;&ensp;{{ props.msg.inventory }}</span>
      </p>
    </div>
    <div class="method">
      <span class="items" @click="() => getDetails(props.msg.pastureId)"
        >查看</span
      >
      <span class="items" @click="() => setPas(props.msg.pastureId)">修改</span>

      <span class="items" @click="() => setStatus(props.msg.pastureId)">{{
        states === 0 ? "停用" : "启用"
      }}</span>

      <span class="items" @click="() => delPas(props.msg.pastureId)">删除</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  msg: { type: Object },
});
const states = computed(() => props.msg.states);
const emit = defineEmits(["setStatus", "delPas", "setPas"]);
const setStatus = (id) => {
  emit("setStatus", id);
};
// 删除
const delPas = async (id) => {
  console.log(id);
  emit("delPas", id);
};
// 修改
const setPas = (pastureId) => {
  console.log(pastureId);
  router.push({
    path: "/basicConfig/pasture/addPasture",
    query: { pastureId },
  });
};
//查看详情
const getDetails = (id) => {
  console.log(id);
  router.push({
    path: "/basicConfig/pasture/pastureDetails",
    name: "pastureDetails",
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
