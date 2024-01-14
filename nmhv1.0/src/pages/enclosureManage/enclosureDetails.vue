<template>
  <div class="wrap">
    <div class="header">
      <span class="text">基本信息</span>
    </div>
    <div class="content">
      <div class="mName">
        <span style="position: absolute; left: 20px"
          >牧场名称:&ensp;{{ formData.pastureName }}</span
        >
      </div>
      <span class="jName">圈舍名称:&ensp;{{ formData.circleName }}</span>
      <span class="num">存栏量:&ensp;{{ formData.inventory }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getElsById, getPastureById } from "../../service/api";
const router = useRouter();
const formData = ref({});

const getDetails = async () => {
  // 获取query中的id
  const id = router.currentRoute.value.query.id;
  const res = await getElsById({ id });
  formData.value = res.data;
  const pastureId = res.data.pastureId;
  const pasture = await getPastureById({ pastureId });
  formData.value.pastureName = pasture.data.pastureName;
};
getDetails();
</script>
<style scoped>
.wrap {
  /* 蒙版 */

  position: relative;
  left: 0px;
  top: 0px;
  width: 1240px;
  height: 158px;
  border-radius: 2px;
  opacity: 1;
  background: #ffffff;
}
.wrap .header {
  position: absolute;
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.wrap .header .text {
  position: absolute;
  left: 22px;
  top: 16px;
  width: 64px;
  height: 19px;
  opacity: 1;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;

  color: #333333;
}
.wrap .content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 51px;
  height: 107px;
  line-height: 50px;
  align-items: center;
}
.wrap .content .mName {
  width: 33%;
  height: 20px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: 0px;
  color: #333333;
}
.wrap .content .jName {
  /* 圈舍名称：1号圈舍 */
  width: 33%;
  height: 20px;

  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: 0px;
  color: #333333;
}
.wrap .content .num {
  /* 存栏量：200 */
  width: 33%;
  height: 20px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  letter-spacing: 0px;
  color: #333333;
}
</style>
