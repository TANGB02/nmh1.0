<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-30 23:55:05
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-03 00:11:06
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\search\mapSearch.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="search_wrap">
    <div>
      <a-input v-model:value="searchData" placeholder="输入关键字"  @keyup.enter="handleKeyUp">
        <template #prefix>
          <SearchOutlined />
        </template>
        <template
          #suffix
          style="
            position: absolute;
            left: 299px;
            /* margin-bottom: 5px; */
            /* top: 0px; */
            border-radius: 25px;
            top: -1px;
            width: 60px;
            height: 100%;
            border-radius: 0px 2px 2px 0px;
            opacity: 1;
            background: #21b47c;
            line-height: 100%;
            contain-intrinsic-block-size: AUTO 100px;
          "
        >
          <span class="search" @click="search"
            >搜索</span
          >
        </template>
      </a-input>
    </div>
  </div>
</template>

<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, defineEmits } from "vue";
const searchData = ref("");
const emit = defineEmits(["handleSearch", "handleKeyUp"]);
const search = () => {
  emit("handleSearch", searchData.value);
 
};
const handleKeyUp = () => { 
  emit("handleKeyUp",searchData.value)
}
</script>
<style scoped>
.search_wrap {
  /* 矩形 */

  width: 365px;
  height: 46px;
  border-radius: 2px;
  opacity: 1;

  background: #ffffff;

  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1191);
}
.search {
  position: absolute;
  left: 303px;
  cursor: pointer;
  border-radius: 25px;
  top: 0px;
  width: 61px;
  height: 100%;
  text-align: center;

  border-radius: 0px 2px 2px 0px;
  opacity: 1;
  background: #21b47c;
  line-height: 28px;
  contain-intrinsic-block-size: AUTO 100px;
}
</style>
