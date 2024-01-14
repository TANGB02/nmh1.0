<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 20:01:19
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 14:42:16
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\usersManage\usersTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <Search @handleSearch="handleSearch" @handleReset="handleReset" />
  <div>
    <a-button type="primary" @click="showModal" class="btn">添加人员</a-button>
    <a-modal
      v-model:open="isOpen"
      :title="formData.userId ? '修改用户' : '新增用户'"
      @ok="handleOk"
    >
      <a-form :model="formData" :rules="rules">
        <a-form-item name="userName" label="人员名称">
          <a-input v-model:value="formData.userName"></a-input>
        </a-form-item>
        <a-form-item name="userPhone" label="手机号">
          <a-input v-model:value="formData.userPhone"></a-input>
        </a-form-item>
        <a-form-item name="userStates" label="用户状态">
          <a-radio-group v-model:value="formData.userStates">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">停用</a-radio>
          </a-radio-group>
          <!-- <a-input v-model:value="formData.userStates"> </a-input> -->
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <div>
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="obj">
        <div v-if="obj.column.dataIndex === 'todo'">
          <a-button @click="() => editUser(obj.record)">修改</a-button>
          <a-popconfirm
            :title="
              obj.record.userStates === 0 ? '确定启用吗？' : '确定停用吗？'
            "
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => confirm(obj.record.userId)"
            @cancel="cancel"
          >
            <a-button>
              {{ obj.record.userStates ? "停用" : "启用" }}
            </a-button>
          </a-popconfirm>
        </div>
        <div v-if="obj.column.dataIndex === 'userStates'">
          {{ obj.record.userStates ? "启用" : "停用" }}
          <!-- {{ obj }} -->
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { message } from "ant-design-vue";
import Search from "../search/searchUser.vue";
import {
  getUsers,
  addUsers,
  updateUsers,
  updateStates,
} from "../../service/api";
const value = ref(1);
const columns = [
  {
    title: "登录账号",
    dataIndex: "userAccount",
  },
  {
    title: "人员名称",
    dataIndex: "userName",
  },

  {
    title: "手机号",
    dataIndex: "userPhone",
  },
  {
    title: "用户状态",
    dataIndex: "userStates",
  },

  {
    title: "操作",
    dataIndex: "todo",
  },
];
const pagination = ref({
  current: 1,
  total: 0,
  pageSize: 10,
  defaultPageSize: 10,
  showTotal: (total) => `共 ${total} 条数据`,
  showSizeChanger: true, // 可以改变每页个数
  pageSizeOptions: ["10", "20", "30", "40"],
  showQuickJumper: true,
});
const dataSource = ref([]);

const getData = async () => {
  const res = await getUsers({
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.current,
  });
  console.log(res);
  dataSource.value = res.data.records;
  pagination.value.total = res.data.total;
};
getData();

const handleTableChange = (pageObj) => {
  // console.log(pageObj);
  pagination.value = pageObj;
  getData();
};

const formData = ref({});
const isOpen = ref(false);
const showModal = () => {
  isOpen.value = true;
};
// 回显
const editUser = (record) => {
  isOpen.value = true;
  console.log(record);
  record.userStates = record.userStates ? "启用" : "停用";
  formData.value = { ...record };
};
// 判断  新增/修改  (id)
const handleOk = async () => {
  if (formData.value.userId) {
    //编辑
    formData.value.userStates = formData.value.userStates === "启用" ? 1 : 0;
    const res = await updateUsers({ ...formData.value });
    if (res) {
      message.success("修改成功");
    }
  } else {
    // 新增

    formData.value.userStates = formData.value.userStates === "启用" ? 1 : 0;
    await addUsers(formData.value);
    pagination.current = 1;
    message.success("新增成功");
  }
  getData();
  isOpen.value = false;
  formData.value = {};
};
const confirm = async (userId) => {
  console.log(userId);
  const res = await updateStates(userId);
  // console.log(res);
  if (res.code === 1) {
    message.success("状态修改成功！");
  }
  getData();
};

//search组件
const handleSearch = async (searchData) => {
  const { userName, userPhone, value } = searchData;
  const res = await getUsers({
    userName,
    userPhone,
    userStates: value,
    pageSize: pagination.value.pageSize,
    pageNumber: pagination.value.current,
  });
  console.log(res);
  dataSource.value = res.data.records;
  pagination.value.total = res.data.total;
  // dataSource.value = res;
};
const handleReset = (value) => {
  pagination.value.current = 1;
  pagination.value.pageSize = 10;
  getData();
};

//校验规则

// 电话校验
const validatorUserPhone = (rule, value, callback) => {
  if (!/^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/.test(value))
    return callback(new Error("请输入正确格式的手机号！"));
  callback();
};
//姓名校验
const validatorUserName = (rule, value, callback) => {
  //验证名字的正则表达式
  const regName = /^([\\u4e00-\\u9fa5]{1,20}|[a-zA-Z\\.\\s]{1,20})$/;
  if (regName.test(value)) {
    //正确的名字
    return callback();
  }
  callback(new Error("请输入正确的名字"));
};
const rules = {
  userName: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      validator: validatorUserName,
      min: 2,
      max: 8,
      message: "请输入正确的名字",
      trigger: "blur",
    },
  ],
  userPhone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: validatorUserPhone, trigger: "blur" },
  ],
};
</script>
<style scoped>
.ant-modal .ant-modal-content {
  padding: 28px 24px;
}
</style>
