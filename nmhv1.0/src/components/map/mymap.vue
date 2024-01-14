<!--
 * @Author: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @Date: 2023-12-30 23:31:18
 * @LastEditors: TANGB02 13233582+Ace-Tang@user.noreply.gitee.com
 * @LastEditTime: 2024-01-04 13:10:17
 * @FilePath: \nmhv1.0\nmhv1.0\src\components\map\mymap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div id="amapcontainer" style="width: 1210px; height: 620px"></div>
    <div class="search">
      <Search @handleSearch="handleSearch" @handleKeyUp="handleKeyUp" />
      <div id="my-panel" class="searchList"></div>
    </div>
  </div>
</template>

<script setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, ref, defineEmits, defineProps, watch, computed } from "vue";
import Search from "../../components/search/mapSearch.vue";
import { message } from "ant-design-vue";
const emit = defineEmits(["handleLatlng", "handleLnglat", "handleAddress"]);
const props = defineProps({
  address: { type: String },
  lnglat: { type: Object },
});
// 点击获取地图的坐标实例
const latlng = ref([]);
console.log(props.lnglat);

// 监听地理编码
watch(
  () => props.address,
  (newV, oldV) => {
    const zoom = 10; // 添加 zoom 变量并为其赋值
    window._AMapSecurityConfig = {
      securityJsCode: "904a1146e0bdfd3614f4dfb316cbacb7",
    };
    AMapLoader.load({
      key: "9196afcbf26c83a6efbf2f5813be3951",
      version: "2.0",
    })
      .then((AMap) => {
        // 设置地图的id
        const map = new AMap.Map("amapcontainer", {
          resizeEnable: true,
          zoom: zoom,
          viewMode: "3D",
          zoomEnable: true,
          dragEnable: true,
          doubleClickZoom: true,
          center: [106.55547, 29.60894],
        });

        //       //异步加载控件
        AMap.plugin(
          [
            "AMap.Geocoder",
            "AMap.Marker",
            "AMap.Scale",
            "AMap.ToolBar",
            "AMap.HawkEye",
            "AMap.MapType",
            "AMap.Geolocation",
            "AMap.AutoComplete",
          ],
          function () {
            map.addControl(new AMap.Scale());
            map.addControl(new AMap.ToolBar());
            map.addControl(new AMap.HawkEye());
            map.addControl(new AMap.MapType());
            map.addControl(new AMap.Geolocation());

            // 生成地图标点的实例
            const marker = new AMap.Marker();

            //地址——>坐标

            // 生成地址转坐标的工具实例
            var geocoder = new AMap.Geocoder({
              city: "全国", // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            });
            geocoder.getLocation(newV, function (status, result) {
              if (status === "complete" && result.info === "OK") {
                // result中对应详细地理坐标信息
                console.log(status);
                console.log(result);
                let lng = result.geocodes[0].location.lng;
                let lat = result.geocodes[0].location.lat;
                let lnglat = [lng, lat];
                // 设置坐标点
                marker.setPosition(lnglat);
                map.add(marker);
                map.setFitView(marker);
                emit("handleLatlng", lnglat);
              }
            });
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }
);

// 初始化
onMounted(() => {
  const zoom = 10; // 添加 zoom 变量并为其赋值
  window._AMapSecurityConfig = {
    securityJsCode: "904a1146e0bdfd3614f4dfb316cbacb7",
  };
  AMapLoader.load({
    key: "9196afcbf26c83a6efbf2f5813be3951",
    version: "2.0",
  })
    .then((AMap) => {
      // 设置地图的id
      const map = new AMap.Map("amapcontainer", {
        resizeEnable: true,
        zoom: zoom,
        viewMode: "3D",
        zoomEnable: true,
        dragEnable: true,
        doubleClickZoom: true,
        center: [106.55547, 29.60894],
      });

      //       //异步加载控件
      AMap.plugin(
        [
          "AMap.Geocoder",
          "AMap.Marker",
          "AMap.Scale",
          "AMap.ToolBar",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
        ],
        function () {
          map.addControl(new AMap.Scale());
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.HawkEye());
          map.addControl(new AMap.MapType());
          map.addControl(new AMap.Geolocation());
          const PlaceSearchOptions = {
            // pageSize: 5, //单页显示结果条数
            // pageIndex: 1, //页码
            city: "010", //兴趣点城市
            // citylimit: true, //是否强制限制在设置的城市内搜索
            map: map, //展现结果的地图实例
            // panel: "my-panel", //结果列表将在此容器中进行展示。
            autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
          };
          // 生成地图标点的实例
          const marker = new AMap.Marker();

          //逆地理编码

          // 生成地址转坐标的工具实例
          const geocoder = new AMap.Geocoder({
            city: "全国", // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          });

          let l = [props.lnglat[1], props.lnglat[0]];
          console.log(l);
          // let lnglat = [2908413.8594059898, 12280020.7176841];
          //  let lnglat = [116.396574, 39.992706]

          geocoder.getAddress(l, function (status, result) {
            if (status === "complete" && result.info === "OK") {
              // result为对应的地理位置详细信息
              console.log(result);
              console.log(status);

              marker.setPosition(l);
              map.add(marker);
              map.setFitView(marker);
              //发送地址
              emit("handleAddress", result.regeocode.addressComponent);
            } else {
              // message.error("逆地理编码失败");
              console.log("逆地理编码失败");
            }
          });
        }
      );

      // 点击地图获取坐标
      map.on("click", (e) => {
        console.log(e);
        let all = "";
        const lat = e.lnglat.lat;
        const lng = e.lnglat.lng;
        all = e.lnglat.lng + "," + e.lnglat.lat;
        console.log("该值为" + all);
        // 点击回显坐标
        latlng.value = [lat, lng];
        emit("handleLatlng", latlng.value);
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// 搜索
const handleSearch = (data) => {
  const zoom = 10; // 添加 zoom 变量并为其赋值
  window._AMapSecurityConfig = {
    securityJsCode: "904a1146e0bdfd3614f4dfb316cbacb7",
  };
  AMapLoader.load({
    key: "9196afcbf26c83a6efbf2f5813be3951",
    version: "2.0",
  })
    .then((AMap) => {
      // 设置地图的id
      const map = new AMap.Map("amapcontainer", {
        resizeEnable: true,
        zoom: zoom,
        viewMode: "3D",
        zoomEnable: true,
        dragEnable: true,
        doubleClickZoom: true,
        center: [106.55547, 29.60894],
      });

      //异步加载控件
      AMap.plugin(
        [
          "AMap.ElasticMarker",
          "AMap.Scale",
          "AMap.ToolBar",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
        ],
        function () {
          map.addControl(new AMap.ElasticMarker());
          map.addControl(new AMap.Scale());
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.HawkEye());
          map.addControl(new AMap.MapType());
          map.addControl(new AMap.Geolocation());
          //marker

          const PlaceSearchOptions = {
            pageSize: 5, //单页显示结果条数
            pageIndex: 1, //页码
            city: "010", //兴趣点城市
            citylimit: false, //是否强制限制在设置的城市内搜索
            map: map, //展现结果的地图实例
            panel: "my-panel", //结果列表将在此容器中进行展示。
            autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
          };
          const placeSearch = new AMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
          // placeSearch一般与panel一起用 -- 搜索列表功能
          placeSearch.search(data, (status, result) => {
            console.log(status);
            console.log(result);

            if (status === "complete" && result.info === "OK") {
              const pois = result.poiList.pois;
              if (pois.length > 0) {
                const { location } = pois[0];
                map.setCenter(location);

                map.center = [location.lat, location.lng];
              }
            } else {
              console.log("搜索失败或无结果");
            }
          });
        }
      );
    })
    .catch((e) => {
      // isOpen.value = false;
      console.log(e);
    });
};
// 空格搜索
const handleKeyUp = (data) => {
  console.log(data);

  const zoom = 10; // 添加 zoom 变量并为其赋值
  window._AMapSecurityConfig = {
    securityJsCode: "904a1146e0bdfd3614f4dfb316cbacb7",
  };
  AMapLoader.load({
    key: "9196afcbf26c83a6efbf2f5813be3951",
    version: "2.0",
  })
    .then((AMap) => {
      // 设置地图的id
      const map = new AMap.Map("amapcontainer", {
        resizeEnable: true,
        zoom: zoom,
        viewMode: "3D",
        zoomEnable: true,
        dragEnable: true,
        doubleClickZoom: true,
        center: [106.55547, 29.60894],
      });

      //异步加载控件
      AMap.plugin(
        [
          "AMap.ElasticMarker",
          "AMap.Scale",
          "AMap.ToolBar",
          "AMap.HawkEye",
          "AMap.MapType",
          "AMap.Geolocation",
          "AMap.AutoComplete",
          "AMap.PlaceSearch",
        ],
        function () {
          map.addControl(new AMap.ElasticMarker());
          map.addControl(new AMap.Scale());
          map.addControl(new AMap.ToolBar());
          map.addControl(new AMap.HawkEye());
          map.addControl(new AMap.MapType());
          map.addControl(new AMap.Geolocation());

          const PlaceSearchOptions = {
            pageSize: 5, //单页显示结果条数
            pageIndex: 1, //页码
            city: "010", //兴趣点城市
            citylimit: false, //是否强制限制在设置的城市内搜索
            map: map, //展现结果的地图实例
            panel: "my-panel", //结果列表将在此容器中进行展示。
            autoFitView: true, //是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围
          };
          const placeSearch = new AMap.PlaceSearch(PlaceSearchOptions); //构造PlaceSearch类
          // placeSearch一般与panel一起用 -- 搜索列表功能
          placeSearch.search(data, (status, result) => {
            console.log(status);
            console.log(result);

            if (status === "complete" && result.info === "OK") {
              const pois = result.poiList.pois;
              if (pois.length > 0) {
                const { location } = pois[0];
                map.setCenter(location);
              }
            } else {
              console.log("搜索失败或无结果");
            }
          });
        }
      );
    })
    .catch((e) => {
      // isOpen.value = false;
      console.log(e);
    });
};
</script>
<style scoped>
.search {
  position: absolute;
  left: 240px;
  top: 115px;
}
.searchList {
  position: absolute;
  left: 900px;
  top: 25%;
}
/* masker */
.custom-content-marker {
  position: relative;
  width: 25px;
  height: 34px;
}

.custom-content-marker img {
  width: 100%;
  height: 100%;
}
html,
body,
#container {
  height: 100%;
  width: 100%;
}

.amap-icon img,
.amap-marker-content img {
  width: 25px;
  height: 34px;
}

.marker {
  position: absolute;
  top: -20px;
  right: -118px;
  color: #fff;
  padding: 4px 10px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.2);
  white-space: nowrap;
  font-size: 12px;
  font-family: "";
  background-color: #25a5f7;
  border-radius: 3px;
}

.input-card {
  width: 18rem;
  z-index: 170;
}

.input-card .btn {
  margin-right: 0.8rem;
}

.input-card .btn:last-child {
  margin-right: 0;
}
</style>
