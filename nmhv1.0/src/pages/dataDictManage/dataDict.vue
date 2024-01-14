<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-21 11:44:51
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-22 18:47:28
 * @FilePath: \nmhv1.0\nmhv1.0\src\pages\dataDictManage\dataDict.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-layout style="height: 1000px">
    <a-layout-sider style="background-color: white">
      <a-menu
        mode="inline"
        v-model:openKeys="openKeys"
        :items="menuItem"
        @click="handleMenuClick"
      >
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="height: 100%; margin: 25px">
      <Search @handleSearch="handleSearch" @handleReset="handleReset" />
      <div>
        <a-button type="primary" @click="showModal" style="margin: 15px"
          >新增数据</a-button
        >

        <a-modal
          v-model:open="isOpen"
          @ok="handleFormSubmit"
          :title="`新增${columns[0].title}`"
        >
          <a-form :model="FormData">
            <a-form-item name="dictName" :label="columns[0].title">
              <a-input v-model:value="FormData.dictName" />
            </a-form-item>
          </a-form>
        </a-modal>

        <a-table
          :pagination="pagination"
          :columns="columns"
          :dataSource="dataSource"
          @change="handleTableChange"
        >
          <template #bodyCell="obj">
            <div v-if="obj.column.dataIndex === 'status'">
              {{ obj.record.status === "1" ? "启用" : "停用" }}
            </div>
            <div v-if="obj.column.dataIndex === 'method'">
              <a-popconfirm
                title="确定要停用吗?"
                ok-text="是"
                cancel-text="否"
                @confirm="() => confirm(obj.record.dictId, obj.record.dictName)"
                @cancel="cancel"
              >
                <a-button>
                  {{ obj.record.status === "1" ? "停用" : "启用" }}
                </a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
//左边导航栏部分
import { ref } from "vue";
import Search from "../../components/search/searchDict.vue";
import {
  getDictList,
  dictDetail,
  addDict,
  updateDdict,
  searchDict,
} from "../../service/api";
import { message } from "ant-design-vue";
const dataSource = ref([]);
const isOpen = ref(false);
const openKeys = ref([]);
const FormData = ref({});
const pagination = ref({
  current: 1,
  total: 0,
  pageSize: 10,
  defaultPageSize: 10,
  showTotal: (total) => `共 ${total} 条数据`,
  showSizeChanger: true, // 可以改变每页个数
  pageSizeOptions: ["2", "5", "10", "15"],
  showQuickJumper: true,
});
//表头
const columns = ref([
  { dataIndex: "dictName", title: "牲畜品种" },

  { dataIndex: "status", title: "状态" },
  { dataIndex: "method", title: "操作" },
]);
// const selectedKeys = ref([]);
const menuItem = ref([
  {
    key: "1",
    label: "数据管理",
    children: [{ label: "牲畜品种" }],
  },
]);
//数据详情接口--获取数据
const getDictDetail = async (dictType) => {
  const res = await dictDetail({
    dictType,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.current,
  });

  pagination.value.total = res.data.total;
  dataSource.value = res.data.records;
};
getDictDetail(menuItem.value[0].children[0].label);
//change事件监听分页器对象
const handleTableChange = (pageObj) => {
  //  点击跳转所在页面
  pagination.value.current = pageObj.current;
  getDictDetail(menuItem.value[0].children[0].label);
};
// 监听列表点击事件
const handleMenuClick = (keyObj) => {
  console.log(keyObj);
  //   1.获取点击的字符串
  const dictType = keyObj.item.originItemValue.label;
  //    2.请求接口
  getDictDetail(dictType);
  // 3.更改表头
  columns.value[0].title = dictType;
};

//获取列表
const dictList = async () => {
  const res = await getDictList();
  console.log(res);

  menuItem.value[0].children = res.data.map((item) => {
    return { label: item.dictType };
  });
};
dictList();

// 添加数据
const showModal = () => {
  isOpen.value = true;
  FormData.value = {};
};
const handleFormSubmit = async () => {
  // 判断dataSource有相同字符串则不能添加
  //查找到相同值则返回第一个相同的值
  const result = dataSource.value.find((item) => {
    return item.dictName === FormData.value.dictName;
  });

  if (result) {
    message.error(`${columns.value[0].title}重复`);
  } else {
    const res = await addDict({
      dictType: columns.value[0].title,
      dictName: FormData.value.dictName,
    });
    console.log(res);
    if (res.code === 1) {
      message.success("添加成功");
      getDictDetail(menuItem.value[0].children[0].label);
    } else {
      message.error(res.msg);
    }
  }
  FormData.value = {};
  pagination.value.current = 1;
  isOpen.value = false;
};
//修改状态
const confirm = async (dictId, dictName) => {
  dictId = parseInt(dictId);
  const res = await updateDdict({ dictId, dictName });
  console.log(res);
  getDictDetail(menuItem.value[0].children[0].label);
};

//search组件
const handleSearch = async (searchData) => {
  const { dictName, value } = searchData;
  //menuItem.value[0].children[0].label ---当前所查看的数据
  const dictType = menuItem.value[0].children[0].label;
  const res = await searchDict({
    pageNumber: pagination.value.current,
    pageSize: pagination.value.pageSize,
    dictName,
    dictStatus: value,
    dictType,
  });

  if (res) {
    dataSource.value = res.data.records;
  } else message.error("搜索失败");
};
const handleReset = (value) => {
  pagination.value.current = 1;
  pagination.value.pageSize = 10;
  getDictDetail(menuItem.value[0].children[0].label);
};
</script>
<style></style>
