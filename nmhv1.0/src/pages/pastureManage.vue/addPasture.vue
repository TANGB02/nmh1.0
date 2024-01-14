<template>
  <div>
    <!--地图展示  -->
    <div>
      <Map
        @handleLatlng="handleLatlng"
        :address="address"
        @handleLnglat="handleLnglat"
        :lnglat="lnglat"
        @handleAddress="handleAddress"
      ></Map>
    </div>

    <!-- 添加表单 -->
    <div class="overlay">
      <div class="leftForm">
        <a-form layout="vertical" :model="formData" :rules="rules">
          <span class="title">{{
            router.currentRoute.value.query.pastureId ? "修改牧场" : "添加牧场"
          }}</span>
          <a-form-item
            label="牧场名称"
            name="pastureName"
            style="margin-top: 10px"
          >
            <a-input
              v-model:value="formData.pastureName"
              placeholder="输输入牧场名称"
              style="height: 32px"
            />
          </a-form-item>
          <a-form-item label="牧场规模" name="siteSize">
            <a-input
              v-model:value="formData.siteSize"
              placeholder="输输入牧场规模"
            />
          </a-form-item>
          <a-form-item label="养殖规模" name="cultivationSize">
            <a-input
              v-model:value="formData.cultivationSize"
              placeholder="输入养殖规模"
            />
          </a-form-item>
          <a-form-item label="地区">
            <a-form-item-rest>
              <a-select
                style="width: 126px"
                placeholder="输入省/市/区"
                ref="select"
                @change="handleChange"
              >
                <a-select-option
                  v-for="item in formData.preAddress"
                  :key="item"
                  :value="item"
                >
                </a-select-option>
              </a-select>
            </a-form-item-rest>

            <a-input
              v-model:value="formData.details"
              style="width: 183px; margin-left: 10px"
              placeholder="请输入详细信息  "
            />
          </a-form-item>
          <a-form-item label="位置">
            <a-input
              readOnly
              v-model:value="formData.location"
              style="
                background: #f5f5f5;
                box-sizing: border-box;
                border: 1px solid #d9d9da;
              "
            />
          </a-form-item>

          <a-form-item>
            <a-button
              style="
                position: absolute;
                width: 320px;

                background: #21b47c;
                color: #ffffff;

                border-color: white;
              "
              html-type="submit"
              @click="addPas"
            >
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import Map from "../../components/map/mymap.vue";
import {
  addPasture,
  getCity,
  updatePasture,
  getPastureById,
} from "../../service/api";
import { ref } from "vue";
import { stepProps } from "ant-design-vue/es/steps";
import { message } from "ant-design-vue";

const router = useRouter();
let formData = ref({});
const address = ref("");
let lnglat = ref([]);
// 点击获取经纬度
const handleLnglat = (Latlng) => {
  console.log(Latlng);
  formData.value.location = "";
  formData.value.location = "北纬" + Latlng[0] + "东经" + Latlng[1];
};
// 获取省市区
const getCitys = async () => {
  const res = await getCity({});
  formData.value.preAddress = res;
};
getCitys();

//添加、修改
const addPas = async () => {
  if (router.currentRoute.value.query.pastureId) {
    //修改

    let adr = `${formData.value.preAddress}${formData.value.details}`;
    const res = await updatePasture({
      pastureId: parseInt(router.currentRoute.value.query.pastureId),
      pastureName: formData.value.pastureName,
      siteSize: formData.value.siteSize,
      cultivationSize: parseInt(formData.value.cultivationSize),
      longitude: formData.value.lng,
      latitude: formData.value.lat,
      address: adr,
    });
    if (res.code === 1) {
      message.success("修改成功");
    } else message.error("修改失败");
  } else {
    // 添加
    address.value = `${formData.value.pro}${formData.value.details}`;
    message.success("添加成功");
    console.log(address.value);
  }
};
// 获取选中的地区
const handleChange = (val, option) => {
  formData.value.pro = val;
};
// 获取添加地区的经纬度并添加
const handleLatlng = async (position) => {
  console.log(position);
  formData.value.location = "北纬" + position[1] + "东经" + position[0];
  formData.value.lat = position[1];
  formData.value.lng = position[0];

  console.log(formData.value);

  const res = await addPasture({
    pastureName: formData.value.pastureName,
    cultivationSize: parseInt(formData.value.cultivationSize),
    siteSize: parseInt(formData.value.siteSize),
    address: address.value,
    longitude: formData.value.lng,
    latitude: formData.value.lat,
  });

  console.log(res);
};
//回显
const getPasture = async () => {
  formData.value = {};

  const res = await getPastureById({
    pastureId: router.currentRoute.value.query.pastureId,
  });
  console.log(res);
  formData.value.lng = res.data.longitude;
  formData.value.lat = res.data.latitude;
  formData.value.pastureName = res.data.pastureName;
  formData.value.siteSize = res.data.siteSize;
  formData.value.cultivationSize = res.data.cultivationSize;
  formData.value.location =
    "北纬" + res.data.latitude + "东经" + res.data.longitude;
  lnglat.value = [res.data.latitude, res.data.longitude];
};
if (router.currentRoute.value.query.pastureId) {
  getPasture();
}
// 回显地址处理
const handleAddress = (data) => {
  if (router.currentRoute.value.query.pastureId) {
    const { province, district, street } = data;
    formData.value.preAddress = [`${province}${district}`];
    formData.value.details = street;
  }
};
// 表单验证
const rules = {
  pastureName: [
    { required: true, message: "请输入牧场名", trigger: "blur" },
    { min: 1, message: "牧场名长度不能少于1个字符", trigger: "blur" },
    { max: 100, message: "用户名长度不能大于100个字符", trigger: "blur" },
  ],
  siteSize: [{ required: true, message: "请输入牧场规模", trigger: "blur" }],
  cultivationSize: [
    { required: true, message: "请输入养殖规模", trigger: "blur" },
  ],
};
</script>
<style>
.overlay {
  padding-left: 25px;
  position: fixed;
  left: 21px;
  top: 10px;
  width: 370px;
  /*height:5% ;*/
  font-size: 16px;
  background-color: white;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#7f000000, endColorstr=#7f000000);
}

.leftForm {
  position: absolute;
  width: 360px;
  top: 140px;
  /* top: 40%; */
  height: 600px;
  left: 240px;
  background: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1191);
  padding: 20px;
}

.ant-form-item {
  margin-bottom: 12px;
}

.ant-input {
  border-radius: 1px;
}

.ant-select-selector {
  border-radius: 1px !important;
}

.ant-btn-default {
  border-radius: 1px;
}
.title {
  /* 牧场信息 */

  opacity: 1;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  font-weight: normal;
  line-height: 19px;
  letter-spacing: 0px;

  color: #333333;
}
.search {
  position: absolute;
  left: 240px;
  top: 115px;
}
</style>
