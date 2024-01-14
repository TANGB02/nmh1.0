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
      <span class="jName">场地规模:&ensp;{{ formData.siteSize }}m²</span>
      <span class="num">养殖规模:&ensp;{{ formData.cultivationSize }}</span>
      <span class="num">地址:&ensp;{{ formData.address }}</span>
    </div>
  </div>
  <!-- table -->
  <div class="table">
    <div class="headerEls">
      <span class="list">圈舍信息</span>
    </div>
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getPastureById } from "../../service/api";
const router = useRouter();
const formData = ref({});
const dataSource = ref([]);
const columns = [
  {
    title: "圈舍名称",
    dataIndex: "circleName",
  },
  {
    title: "存栏量",
    dataIndex: "inventory",
  },
  {
    title: "状态",
    dataIndex: "state",
  },
];
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});
const getDetails = async () => {
  // 获取query中的id
  const id = router.currentRoute.value.query.id;
  const res = await getPastureById({ pastureId: id });
  formData.value = res.data;
  dataSource.value = res.data.circleList;
  pagination.value.total = res.data.circleList.length;
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
.ant-table-wrapper .ant-table-thead > tr > th,
:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper
  .ant-table-tbody
  > tr
  > td,
:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper tfoot > tr > th,
.table {
  margin-top: 20px;
}
.table .headerEls {
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.table .list {
  position: absolute;
  left: 270px;

  font-family: PingFangSC-Medium;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;
  color: #333333;
}
</style>
