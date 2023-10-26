<template>
  <div
    class="dialog-componment_wrap"
    v-show="isShowModuleFunc(config)"
    @click="clickCanvas"
  >
    <div v-if="isEdit" class="message-wrap" v-on:dblclick="handleDoubleClick">
      双击进入编辑
    </div>
    <div
      class="contenter-componment_main"
      :style="{ backgroundColor: isView() ? 'none' : '#636b73' }"
    >
      <el-button
        v-show="!isEdit && !isView()"
        type="primary"
        size="mini"
        class="delete-btn"
        @click="delContainer"
        icon="el-icon-delete"
        circle
      ></el-button>
      <el-button
        v-show="!isEdit && !isView()"
        type="primary"
        size="mini"
        class="close-btn"
        @click="changeComponmentStatus"
        icon="el-icon-close"
        circle
      ></el-button>

      <div class="canvas-main" :style="styleObj1">
        <div class="top" :style="styleObj2" v-show="config.header.show">
          <div class="top-left">
            <img
              :src="config.header.icon"
              v-if="config.header.icon"
              class="icon"
              :style="filterStyles"
            />
            <div
              :class="[
                'title',
                config.headerTxt.isShowColors ? 'gradient' : '',
              ]"
              :style="{
                background: config.headerTxt.isShowColors
                  ? config.headerTxt.background
                  : '',
              }"
            >
              {{ config.header.txt }}
            </div>
          </div>
          <div class="top-right" v-show="config.close.show">
            <div
              class="close"
              :style="{ ...styleObj3, ...filterStyles }"
              @click="config.isShowModule = false"
            ></div>
          </div>
        </div>
        <vue-drag-resize
          v-for="(item, index) in containterDrawingList"
          :key="item.id"
          :x="parseFloat(item.config.left || 0)"
          :y="parseFloat(item.config.top || 0)"
          :w="parseFloat(item.config.width || 300)"
          :h="parseFloat(item.config.height || 300)"
          :z="index"
          @resizestop="(e) => handleResizeStop(e, item)"
          @clicked="handleComponentClick($event, item)"
          @dragstop="(e) => handleDragStop(e, item)"
          @activated="(e) => onActivated(e, item)"
          :parentLimitation="true"
          :isActive="getIsActive(item)"
          :isDisabled="isView()"
          :parentScaleX="scale"
          :parentScaleY="scale"
          :parentW="config.width"
          :parentH="config.height"
        >
          <component
            :is="item.component"
            class="chart-wrapper"
            :ref="item.id"
            :config="item.config"
            :component="item.component"
          ></component>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            class="del-button"
            v-show="$store.state.currentConfig.id == item.id"
            @click.stop="removeComponent($event, item.id)"
          ></el-button>
        </vue-drag-resize>
      </div>
    </div>
    <div
      class="mask"
      :style="{ backgroundColor: config.maskBackgroundColor }"
      v-show="config.isMask && config.isShowModule && $route.path === '/view'"
    ></div>
  </div>
</template>

<script>
import { setStyleObj, getFilterStyles } from "@/utils/index.js";
import {
  barChart,
  lineChart,
  pieChart,
  liquidChart,
  gaugeChart,
  wordChart,
  radarChart,
  treeChart,
} from "@/components/Charts";
import mixedLineandBar from "@/components/Charts/mixedLineandBar/index.vue";
import tabPanel from "@/components/title/tabPanel";
import vueDragResize from "../../views/componments/vueDragResize/vue-drag-resize.vue";
import DateComponent from "@/components/Date";
import NumberComponent from "@/components/Number";
import dateMap from "@/components/date";
import smallTitle from "@/components/title/smallTitle";
import progressBar from "@/components/List/progressBar.vue";
import PowerBarChart from "@/components/Charts/powerBarChart.vue";
import Statistic from "@/components/Statistic/statistic.vue";
import LayerControl from "@/components/LayerControl/layerControl.vue";
import CheckboxGroup from "@/components/LayerControl/checkboxGroup.vue";
import BasicText from "@/components/Text/text.vue";
import RichEditor from "@/components/Text/richEditor.vue";
import navigation from "@/components/Navigation";
import background from "@/components/Background";
import numberCount from "@/components/NumberCount";
import importCamera from "@/components/Camera/importCamera";
import splitCameraScreen from "@/components/Camera/splitCameraScreen";
import numberScroll from "@/components/NumberCount/numberScroll";
import eventList from "@/components/List/eventList.vue";
import buttonGroup from "@/components/NumberCount/buttonGroup";
import numberThree from "@/components/NumberCount/numberThree";
import CarouselPic from "@/components/CarouselPic/index.vue";
import AppraisingCard from "@/components/List/appraisingCard/appraisingCard.vue";
import NumberSteering from "@/components/NumberCount/numberSteering.vue";
import SwitchList from "@/components/List/switchList/index";
import {
  commonTable,
  scrollTable,
  selectBox,
  dateTimePicker,
  searchBox,
  popupBox,
} from "@/components/Table";
import stackedLine from "@/components/Charts/lineChart/stackedLine";
import groupBar from "@/components/Charts/barChart/groupBar.vue";
import Track from "@/components/Track/track";
import weather from "@/components/Weather";
export default {
  name: "dialog",
  components: {
    mixedLineandBar,
    stackedLine,
    groupBar,
    tabPanel,
    barChart,
    lineChart,
    pieChart,
    liquidChart,
    gaugeChart,
    wordChart,
    radarChart,
    treeChart,
    vueDragResize,
    DateComponent,
    NumberComponent,
    dateMap,
    smallTitle,
    progressBar,
    Statistic,
    LayerControl,
    BasicText,
    RichEditor,
    navigation,
    background,
    numberCount,
    importCamera,
    splitCameraScreen,
    numberScroll,
    eventList,
    buttonGroup,
    numberThree,
    CarouselPic,
    AppraisingCard,
    commonTable,
    scrollTable,
    selectBox,
    dateTimePicker,
    searchBox,
    popupBox,
    PowerBarChart,
    CheckboxGroup,
    NumberSteering,
    SwitchList,
    Track,
    weather,
  },
  props: {
    scale: {
      type: Number,
      default: 1,
    },
    config: {
      type: Object,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      isShow: true,
      isEdit: true,
      containterDrawingList: [],
      currentContainterConfig: {
        drawingList: [],
      },
      currentConfig: {},
    };
  },
  watch: {
    "$store.state.currentConfig": {
      handler(nVal, oVal) {
        if (!location.hash.includes("view") && this.id === nVal.id) {
          if (nVal.component === "popupBox") {
            this.containterDrawingList = nVal.drawingList;
          }
          if (nVal.parentId) {
            this.containterDrawingList = this.$store.state.drawingList.find(
              (item) => item.id === nVal.parentId
            ).config.drawingList;
          }
        }
        // this.currentConfig = nVal;
      },
      deep: true,
      immediate: true, //立即执行
    },
    // id: {
    //   handler(nVal, oVal) {
    //     console.log(nVal, "===watch");
    //     // this.drawingList = nVal.drawingList;
    //   },
    //   deep: true,
    // },
  },
  computed: {
    filterStyles() {
      return getFilterStyles(this.config);
    },
    styleObj1() {
      let c = { ...this.config };
      let d = setStyleObj(c);
      let b = c.box;
      if (b.isShowBackgroundImg) {
        b.background && (d.background = `url(${b.background}) no-repeat`);
      } else {
        b.background && (d.background = b.background);
        b.borderWidth && (d.borderWidth = b.borderWidth + "px");
        b.borderStyle && (d.borderStyle = b.borderStyle);
        if (b.isShowColors) {
          b.borderImage && (d.borderImage = b.borderImage);
        } else {
          b.borderColor && (d.borderColor = b.borderColor);
        }
      }
      return d;
    },
    styleObj2() {
      let d = setStyleObj({ ...this.config.header });
      d.display = d.display === "block" ? "flex" : "none";
      return d;
    },
    styleObj3() {
      let d = setStyleObj({ ...this.config.close });
      return d;
    },
    // currentConfig: {
    //   get() {
    //     console.log(
    //       "currentConfig::::::::::::::",
    //       this.$store.state.currentConfig
    //     );
    //     // this.containterDrawingList = this.$store.state.currentConfig.drawingList
    //     return this.$store.state.currentConfig;
    //   },
    //   set(newvalue) {
    //     console.log("newvalue:::::::::::", newvalue);
    //     this.$store.commit("SET_CURRENT_CONFIG", newvalue);
    //   },
    // },
    // drawingList: {
    //   get() {
    //     return this.$store.state.drawingList.filter(
    //       (item) => item.parentId === this.id
    //     );
    //   },
    //   set(newvalue) {
    //     console.log("newvalue:======>>>>>>>>22", newvalue);
    //     this.$store.commit("SET_DRAWING_LIST", newvalue);
    //     // return newvalue
    //   },
    // },
  },
  created() {},
  mounted() {
    if (location.hash.includes("view")) {
      this.isEdit = false;
    }
    this.containterDrawingList = this.config.drawingList;
  },
  methods: {
    onActivated(e, item) {
      // 下拉框组件单独处理
      if (item.component === "selectBox") {
        this.$store.commit("SET_CURRENT_CONFIG", {
          id: item.id,
          ...item.config,
          component: item.component,
        });
      }
    },
    delContainer(e) {
      e.stopPropagation();
      const drawingList = this.$store.state.drawingList.filter(
        (item) => item.id !== this.id
      );
      this.$store.commit("SET_DRAWING_LIST", drawingList);

      this.isEdit = true;
      this.$store.commit("SET_ISSHOWCONTAINERMASK", false);
      this.$store.commit("SET_CURRENT_CONFIG", {});
      this.$store.commit("SET_SELECTEDCONTAINERID", "");
    },
    getIsActive(item) {
      // console.log("this.$store.state.currentConfig.id == item.id::::::::::::", this.$store.state.currentConfig.id, item.id, this.$store.state.drawingList)
      return this.$store.state.currentConfig.id === item.id;
    },
    // 是否是查看状态
    isView() {
      return location.hash.includes("view");
    },
    // 点击容器组件
    clickCanvas(e) {
      //   e.stopPropagation();
      //   console.log("e:::::::::::::::", e);
      //   this.$store.commit("SET_CURRENT_CONFIG", {});
    },
    handleDoubleClick(e) {
      this.isEdit = false;
      this.$store.commit("SET_ISSHOWCONTAINERMASK", true);
      this.$store.commit("SET_SELECTEDCONTAINERID", this.id);
    },
    changeComponmentStatus(e) {
      e.stopPropagation();
      this.isEdit = true;
      this.$store.commit("SET_ISSHOWCONTAINERMASK", false);
      this.$store.commit("SET_CURRENT_CONFIG", {});
      this.$store.commit("SET_SELECTEDCONTAINERID", "");
    },
    //盒子自适应
    handleResizeStop(e, val) {
      this.$nextTick(() => {
        Object.assign(this.currentConfig, {
          width: e.width,
          height: e.height,
        });
        val.config.width = e.width;
        val.config.height = e.height;
        if (!["date", "table"].includes(val.config.series.type)) {
          this.$refs[val.id][0].myChart.resize();
        }
      });
    },
    //点击选中当前拖拽的组件
    handleComponentClick(e, item) {
      e.stopPropagation();
      console.log(item, "====currentConfig11111");

      //   if (item.id == this.currentConfig.id) return;
      this.$store.commit("SET_CURRENT_CONFIG", {
        id: item.id,
        ...item.config,
        component: item.component,
      });
    },
    //拖拽移动停止
    handleDragStop(e, val) {
      console.log("val:::::::::::::::::", e, val);
      Object.assign(this.currentConfig, {
        left: e.left,
        top: e.top,
      });
      val.config.left = e.left;
      val.config.top = e.top;
      this.currentConfig = {
        id: val.id,
        ...val.config,
        component: val.component,
      };
    },
    //删除当前图
    removeComponent(e, id) {
      const { parentId } = this.$store.state.currentConfig;
      const parentContainerIndex = this.$store.state.drawingList.findIndex(
        (item) => item.id === parentId
      );
      const currentConfigIndex = this.$store.state.drawingList[
        parentContainerIndex
      ].config.drawingList.findIndex((item) => item.id === id);
      this.$store.state.drawingList[
        parentContainerIndex
      ].config.drawingList.splice(currentConfigIndex, 1);
      //   console.log("this.drawingList::::::::::::::::::::", this.drawingList);
      // this.drawingList = this.drawingList.filter((item) => item.id !== id);
      //   this.drawingList.splice(
      //     this.drawingList.findIndex((item) => item.id === id),
      //     1
      //   );
      this.$store.commit("SET_CURRENT_CONFIG", {
        id: this.$store.state.drawingList[parentContainerIndex].id,
        ...this.$store.state.drawingList[parentContainerIndex].config,
        component: this.$store.state.drawingList[parentContainerIndex]
          .component,
      });
      //   this.currentConfig = {};
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-componment_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  pointer-events: all;

  .mask {
    position: fixed;
    inset: 1;
    z-index: 998;
  }
  .del-button {
    position: absolute;
    right: 0;
    z-index: 9999;
  }
  .message-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: rgba($color: #1f3a6e, $alpha: 0.4);
    color: #7a8190;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
  }

  .contenter-componment_main {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
    // background-color: #636b73;
    font-size: 12px;

    .canvas-main {
      width: 100%;
      height: 100%;
      background-size: 100% 100% !important;
      // background-color: #1f3a6e;

      .top {
        width: 100%;
        background-size: 100% 100% !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-left {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 15px;
          }
        }
        &-right {
          display: flex;
          align-items: center;
          .tab-list {
            width: 64px;
            height: 32px;
            display: flex;
            cursor: pointer;
            margin-right: 20px;

            > span {
              width: 32px;
              height: 32px;
            }

            > span:nth-child(1) {
              background: url("../../assets/image/xiaokunshan/icon1.png")
                no-repeat;
              background-size: 100% 100%;
            }

            > span:nth-child(2) {
              background: url("../../assets/image/xiaokunshan/icon2.png")
                no-repeat;
              background-size: 100% 100%;
            }

            > span:nth-child(1).hight1 {
              background: url("../../assets/image/xiaokunshan/aicon1.png")
                no-repeat;
              background-size: 100% 100%;
            }

            > span:nth-child(2).hight2 {
              background: url("../../assets/image/xiaokunshan/aicon2.png")
                no-repeat;
              background-size: 100% 100%;
            }
          }
          .close {
            background-size: 100% 100% !important;
            cursor: pointer;
          }
        }
      }
      .gradient {
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
      }
    }
    .mask {
    }
    .close-btn,
    .delete-btn {
      position: absolute;
      top: 0px;
      right: 0;
      z-index: 9999;
    }

    .delete-btn {
      right: 30px;
    }
  }
}
</style>
