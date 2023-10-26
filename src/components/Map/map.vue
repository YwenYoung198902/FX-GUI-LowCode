<!--
 * @Author: your name
 * @Date: 2022-06-01 09:20:05
 * @LastEditTime: 2023-10-13 13:39:39
 * @LastEditors: ydl
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \product.tianfuyun\src\components\map\Map.vue
-->
<template>
  <div id="mapContainer" class="map-container">
    <!-- <Track v-if="$store.state.jinshanVehicles.isMapShow" /> -->
    <!-- <InfoWindow
      v-show="isShowWindow"
      ref="InfoWindow"
      @closeInfoWindow="closeInfoWindow"
    /> -->
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import { mapInit } from "./mapInit";
// import Track from "./track/track.vue";
// import InfoWindow from "./infowindow.vue";

export default {
  name: "Map",
  components: {
    // Track,
    // InfoWindow,
  },
  props: {
    project: {
      type: String,
      default: "",
    },
    config: {
      type: Object,
    },
  },
  data() {
    return {
      mapLoad: null,
      isShowWindow: false,
    };
  },
  computed: {},
  beforeMount() {
    if (!this.mapLoad) {
      this.mapLoad = this.loadAMap();
    } else {
      this.$emit("loadComplete");
    }
  },
  async mounted() {
    if (this.mapLoad instanceof Promise) {
      const AMap = await this.mapLoad;
      const mapStyle = this.config.box.map;
      // const mapStyle = "";
      const aMap = mapInit(this, {
        AMap,
        container: "mapContainer",
        mapStyle,
        center: [121.16756121947716, 31.09851659914124],
      });
      this.$emit("loadComplete");
    }
  },
  methods: {
    loadAMap() {
      return new Promise((resolve, reject) => {
        AMapLoader.load({
          key: "3bef987526df87000eb6235dedc4ad66", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: [
            "AMap.Geocoder",
            "AMap.MouseTool",
            "AMap.LineSearch",
            "AMap.DistrictSearch",
            "AMap.HawkEye",
            "AMap.ControlBar",
            "AMap.ToolBar",
            "AMap.MoveAnimation",
            "AMap.GraspRoad",
            "AMap.Transfer",
            "AMap.HeatMap",
          ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          AMapUI: {
            // 是否加载 AMapUI，缺省不加载
            version: "1.1", // AMapUI 缺省 1.1
            plugins: [], // 需要加载的 AMapUI ui插件
          },
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "2.0.0", // Loca 版本，缺省 1.3.2
          },
        })
          .then((AMap) => {
            window.AMap = AMap;
            resolve(AMap);
            // this.$emit("loadComplete");
          })
          .catch((e) => {
            // this.$emit("loadComplete");
          });
      });
    },
    closeInfoWindow() {
      if (this.isShowWindow) {
        this.isShowWindow = false;
      }
    },
    // initialize(e) {
    //   this.overlay = e.overlay;
    //   this.infoWindow = e.infoWindow;
    // },
  },
};
</script>

<style lang="scss">
.map-container {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}
</style>
