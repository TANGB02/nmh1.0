<template>
  <a-layout style="min-height: 100vh">
    <!-- 添加牧场 -->

    <router-view
      v-if="router.currentRoute.value.name === 'addPasture'"
    ></router-view>

    <!-- 牧场详情 -->

    <router-view
      v-if="router.currentRoute.value.name === 'pastureDetails'"
    ></router-view>

    <!-- 牧场首页-->
    <div v-if="router.currentRoute.value.name === 'pasture'">
      <a-layout>
        <a-button
          type="priasmary"
          style="
            color: #ffffff;
            border-radius: 0;
            margin: 15px 0px 0px 32px;
            width: 80px;
            height: 32px;
            border-radius: 1px;
            opacity: 1;

            /* 21B47C */
            background: #21b47c;
          "
          @click="addPasture"
        >
          添加牧场
        </a-button>
        <a-layout-content style="margin: 16px">
          <div
            :style="{ padding: '16px', background: '#fff', minHeight: '360px' }"
          >
            <searchPasture
              @handleSearch="handleSearch"
              @handleReset="handleReset"
            />

            <!-- content -->
            <div class="content">
              <div v-for="(item, index) in dataDetail" style="width: 440px">
                <div v-if="dataDetail.length > 0">
                  <PstureBasket
                    style="width: 45%"
                    :msg="item"
                    @setStatus="setStatus"
                    @delPas="delPas"
                    @setPas="setPas"
                  />

                  <a-pagination
                    v-model:current="pagination.current"
                    show-quick-jumper
                    v-model:pageSize="pagination.pageSize"
                    v-model:total="pagination.total"
                    :hideOnSinglePage="true"
                    @change="onChange"
                  />
                </div>
                <div v-if="dataDetail.length === 0">
                  <noData />
                </div>
              </div>
            </div>
          </div>
        </a-layout-content>
      </a-layout>
    </div>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import { getPasture, deletePasture, setPasStates } from "../../service/api";
import PstureBasket from "../../components/basket/pastureBasket.vue";
import searchPasture from "../../components/search/searchPasture.vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dataDetail = ref([]);
//修改标识
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 添加牧场
const addPasture = () => {
  router.push({ path: "/basicConfig/pasture/addPasture" });
  console.log(router.currentRoute.value);
};

//分页器change事件监听
const onChange = (page) => {
  pagination.value.current = page;
};

const handleChange = (value) => {
  console.log(value);
};

// 获取牧场信息
const getPastureData = async () => {
  // 2.请求接口---参数 ]pastureId,status,pastureName
  const res = await getPasture({});
  console.log(res);
  dataDetail.value = res.data.records;
  pagination.value.current = 1;
  pagination.value.total = res.data.records.length;
};
getPastureData();

// 接收搜索的数据
const handleSearch = async (searchData) => {
  const states = searchData.value;
  const pastureName = searchData.pastureName;
  const res = await getPasture({ states, pastureName });
  if (res.code === 1) {
    pagination.value.current = 1;
    pagination.value.total = res.data.records.length;
    dataDetail.value = res.data.records;
  } else message.error("搜索失败");
};
// 重置
const handleReset = async (v) => {
  pagination.value.pageSize = 10;
  getPastureData();
};

//修改状态
const setStatus = async (id) => {
  const res = await setPasStates({ PastureId: id });
  if (res.code === 1) {
    getPastureData();
    setTimeout(() => {
      message.success("修改成功");
    }, 1000);
  } else if (res.code === 0) {
    message.error("请将牧场出栏量清零");
  } else message.error("修改失败");
};
//删除
const delPas = async (id) => {
  console.log(id);
  const res = await getPasture({ pastureId: id });
  const states = res.data.records[0].states;
  // 启用不能删除
  if (states === 1) {
    const delRes = await deletePasture({ pastureId: id });
    console.log(delRes);
    if (delRes.code === 1) {
      pagination.value.current = 1;
      message.success("删除成功");
      getPastureData();
    } else message.error("删除失败");
  } else message.error("该牧场正在使用");
};

//修改圈舍--子组件传参

const setPas = async (idItem) => {
  // isOpen.value = true;
  // formData.value.id = idItem;
  // const res = await getElsById({ id: idItem });
  // const { circleName, inventory, id } = res.data;
  // formData.value = { circleName, inventory, id };
};
</script>
<style scoped>
.ant-form-horizontal .ant-form-item-label {
  flex-grow: 0;
  width: 71px;
}
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.searchEnclosure {
  height: 55px;
  border-radius: 2px;
  opacity: 1;
  margin-left: 10px;
}
.ant-input {
  border-radius: 1px;
}
/* 重置、查询按钮 */
.button {
  margin: 0 10px 0 auto;
}
.ant-select {
  border-radius: 0;
}

.searchEnclosure[data-v-f77ab53e] {
  border-bottom: 1px solid #d7d7d7;
}

.content {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
.ant-layout-sider-trigger {
  background: red;
}
</style>
