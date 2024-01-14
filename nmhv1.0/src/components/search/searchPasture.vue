<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-24 00:40:10
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2023-12-29 09:34:56
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\search\searchEnclosure.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    style="
      margin: 0px 10px 20px 10px;
      border-bottom: 1px solid #d3d3d3;
      padding-bottom: 20px;
    "
  >
    <!-- nav-->
    <a-form
      class="searchEnclosure"
      ref="formRef"
      :model="searchData"
      layout="inline"
    >
      <a-form-item name="pastureName" label="牧场名称">
        <a-input v-model:value="searchData.pastureName" />
      </a-form-item>
      <a-form-item name="state" label="状态">
        <a-select
          v-model:value="valueSlect"
          label-in-value
          style="width: 180px; border-radius: 1px !important"
          :options="options"
          @change="handleChange"
        />
      </a-form-item>

      <!-- 重置、查询按钮 -->
      <div class="button">
        <a-form-item class="button">
          <a-space>
            <a-button
              @click="search"
              style="
                background-color: #21b47c;
                height: 32px;
                border-radius: 1px;
                opacity: 1;
                color: black;
                border-radius: 5%;
              "
            >
              <SearchOutlined />查询</a-button
            >
            <a-button
              @click="reset"
              style="
                height: 32px;
                border-radius: 1px;
                opacity: 1;
                color: black;
                border-radius: 5%;
              "
              ><RedoOutlined />重置</a-button
            >
          </a-space>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { SearchOutlined, RedoOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
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
const searchData = ref({});
const datas = ref({});
const formRef = ref();
// 发送搜索字段
const emit = defineEmits(["handleSearch", "handleReset"]);

const search = () => {
  datas.value = { ...searchData.value, ...valueSlect.value };
  emit("handleSearch", datas.value);
};

const reset = () => {
  formRef.value.resetFields();
  emit("handleReset", "");
};
</script>
<style scoped>
.button {
  position: absolute;
  right: 70px;
}
</style>
