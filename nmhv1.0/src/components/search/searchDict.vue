<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-19 20:02:17
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-22 12:03:03
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <a-form
    class="searchPeople"
    ref="formRef"
    :model="searchData"
    layout="inline"
  >
    <a-form-item name="dictName" label="名称">
      <a-input style="width: 250px" v-model:value="searchData.dictName" />
    </a-form-item>

    <a-form-item name="dictStatus" label="状态">
      <a-select
        v-model:value="valueSlect"
        label-in-value
        style="width: 180px; border-radius: 1px !important"
        :options="options"
        @change="handleChange"
      />
    </a-form-item>

    <div class="button">
      <a-space>
        <a-button
          @click="searchDict"
          style="
            height: 32px;
            border-radius: 1px;
            opacity: 1;
            color: black;
            border-radius: 10%;
          "
        >
          <SearchOutlined />
          查询
        </a-button>
        <a-button @click="handleReset" style="color: black"
          ><RedoOutlined />重置</a-button
        >
      </a-space>
    </div>
  </a-form>
</template>

<script setup>
import { ref } from "vue";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons-vue";
import { defineEmits } from "vue";
const formRef = ref();
const searchData = ref({});
const search = ref({});
const valueSlect = ref({
  value: "",
  label: "全部",
});
const options = ref([
  {
    value: "",
    label: "全部",
  },
  {
    value: "1",
    label: "启用",
  },
  {
    value: "0",
    label: "停用",
  },
]);

//子组件传参
const emit = defineEmits(["handleSearch", "handleReset"]);
const searchDict = () => {
  search.value = { ...searchData.value, ...valueSlect.value };
  emit("handleSearch", search.value);
};
const handleReset = () => {
  formRef.value.resetFields();
  emit("handleReset", "");
};
const handleChange = (value) => {
  console.log(value); // { key: "all", label: "全部" }
};
</script>
<style scoped>
.searchPeople[data-v-146e7ef3] {
  height: 46px;
  border-radius: 2px;
  opacity: 1;
  margin-top: 20px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 20px;
}
.ant-input {
  border-radius: 1px;
}
.button {
  margin: 0 10px 0 auto;
}
.ant-select {
  border-radius: 0;
}
</style>
