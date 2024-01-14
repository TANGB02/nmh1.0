<template>
  <a-layout style="min-height: 100vh">
    <!-- <router-view
      v-if="pathName === '/basicConfig/enclosure/elsDatails'"
    ></router-view> -->
    <!-- 左边 -->

    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      style="height: 100%; background-color: #ffffff"
    >
      <div class="logo" />
      <a-menu
        mode="inline"
        v-model:openKeys="openKeys"
        :items="menuItem"
        @click="handleMenuClick"
      >
      </a-menu>
    </a-layout-sider>
    <!-- 右边 -->

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
        @click="showModal"
      >
        添加圈舍
      </a-button>
      <a-layout-content style="margin: 16px">
        <div
          :style="{ padding: '16px', background: '#fff', minHeight: '360px' }"
        >
          <SearchEnclosure
            @handleSearch="handleSearch"
            @handleReset="handleReset"
          />

          <!-- content -->
          <div class="content">
            <div v-for="(item, index) in dataDetail" style="width: 440px">
              <div v-if="dataDetail.length > 0">
                <ElsBasket
                  style="width: 45%"
                  :msg="item"
                  @setStatus="setStatus"
                  @delEls="delEls"
                  @setEls="setEls"
                />
              </div>
            </div>
            <div v-if="dataDetail.length > 0">
              <a-pagination
                v-model:current="pagination.current"
                show-quick-jumper
                v-model:pageSize="pagination.pageSize"
                v-model:total="pagination.total"
                :hideOnSinglePage="true"
                @change="onChange"
              />
            </div>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <!-- 模态框 -->
    <a-modal
      v-model:open="isOpen"
      :title="formData.id ? '修改圈舍' : '新增圈舍'"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="formData" :rules="rules">
        <a-form-item label="圈舍名称" name="circleName">
          <a-input
            placeholder="请输入圈舍名称"
            v-model:value="formData.circleName"
          />
        </a-form-item>
        <a-form-item label="存栏量" name="inventory">
          <a-input
            placeholder="请输入存栏量"
            v-model:value="formData.inventory"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import {
  getEnclosureList,
  getEnclosureDetals,
  addEnclosure,
  updateElsStatus,
  deleteElsStatus,
  updateEls,
  getElsById,
} from "../../service/api";
import ElsBasket from "../../components/basket/elsBasket.vue";
import SearchEnclosure from "../../components/search/searchEnclosure.vue";
import noData from "../../components/noData/noData.vue";
import { message } from "ant-design-vue";
const collapsed = ref(false);
const data = ref({});
const isOpen = ref(false);
const dataDetail = ref([]);
const pastureId = ref();
const formData = ref({});
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
});

const showModal = () => {
  isOpen.value = true;
};

const menuItem = ref([
  {
    key: "1",
    label: "圈舍管理",
    style: "border-radius:0",
    children: [],
  },
]);
//分页器change事件监听
const onChange = (page) => {
  pagination.value.current = page;
};

//获取列表
const enclosureList = async () => {
  const res = await getEnclosureList();
  console.log(" 牧场列表信息");
  menuItem.value[0].children = res.data.map((item) => {
    return { label: item.pastureName, livestockId: item.livestockId };
  });
};
enclosureList();

//监听列表点击事件
const handleMenuClick = async (keyObj) => {
  console.log(keyObj);
  // 1.获取点击的字符串
  pastureId.value = keyObj.item.originItemValue.livestockId;
  // 2.请求接口---参数 pastureId,pigeSize,pageNumver
  const res = await getEnclosureDetals(
    pagination.value.current,
    pagination.value.pageSize,
    { pastureId: pastureId.value }
  );
  console.log(res);
  //3.获取牧场对应的圈舍信息
  // 3.1 绑定圈舍信息->dataDetail
  dataDetail.value = res.data.records;
  pagination.value.total = res.total;
};
// 获取牧场信息
const getElsDetals = async () => {
  // 2.请求接口---参数 pastureId,pigeSize,pageNumver
  const res = await getEnclosureDetals(
    pagination.value.current,
    pagination.value.pageSize,
    { pastureId: pastureId.value }
  );

  //3.获取牧场对应的圈舍信息
  // 3.1 绑定圈舍信息->dataDetail
  dataDetail.value = res.data.records;
  pagination.value.total = res.total;
};

// 接收搜索的数据
const handleSearch = async (searchData) => {
  const state = searchData.value;
  const circleName = searchData.circleName;
  const pId = pastureId.value;
  const res = await getEnclosureDetals(
    pagination.value.current,
    pagination.value.pageSize,
    { pastureId: pId, state, circleName }
  );
  if (res.code === 1) {
    pagination.value.current = 1;
    pagination.value.total = res.data.total;
    dataDetail.value = res.data.records;
  } else message.error("搜索失败");
};
// 重置
const handleReset = async (v) => {
  pagination.value.current = 1;
  pagination.value.pageSize = 10;

  const res = await getEnclosureDetals(
    pagination.value.current,
    pagination.value.pageSize,
    { pastureId: pastureId.value }
  );
  dataDetail.value = res.data.records;
  pagination.value.total = res.data.total;
};
// 添加圈舍/修改
const handleOk = async () => {
  if (formData.value.id) {
    const res = await updateEls({ ...formData.value });
    console.log(res);
    if (res === 1) {
      message.success("修改成功");
    } else message.error("请勿输入重复的圈舍名称");
  } else {
    const res = await addEnclosure({
      pastureId: pastureId.value,
      ...formData.value,
    });
    pagination.value.current = 1;
  }
  getElsDetals();
  formData.value = {};
  isOpen.value = false;
};
//修改状态
const setStatus = async (id) => {
  const res = await updateElsStatus({ id });
  if (res.code === 1) {
    getElsDetals();
    message.success("修改成功");
  } else message.error("修改失败");
};
//删除
const delEls = async (id) => {
  // console.log(id);
  const res = await deleteElsStatus({ id });
  console.log(res);
  getElsDetals();
};

//修改圈舍--子组件传参

const setEls = async (idItem) => {
  isOpen.value = true;
  formData.value.id = idItem;
  const res = await getElsById({ id: idItem });
  const { circleName, inventory, id } = res.data;
  formData.value = { circleName, inventory, id };
};

//存栏量校验
const validatorInventory = (rule, value, callback) => {
  if (Number(value) && value % 1 === 0 && value >= 0) {
    console.log(value);
    callback();
  } else {
    return callback(new Error("请输入正整数！"));
  }
};
//检验规则
const rules = {
  circleName: [
    { min: 2, max: 8, message: "请输入正确的圈舍名", trigger: "blur" },
    { required: true, message: "请输入圈舍名", trigger: "blur" },
  ],
  inventory: [
    {
      validator: validatorInventory,
      trigger: "blur",
    },
    { required: true, message: "请输入存栏量", trigger: "blur" },
  ],
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
