<template>
  <div
    class="contenter-componment_wrap"
    v-show="isShowModuleFunc(config)"
    @click="clickCanvas"
  >
    <div
      v-if="isEdit"
      class="message-wrap"
      v-on:dblclick="handleDoubleClick"
    >
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

      <div class="canvas-main">
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
  </div>
</template>

<script>
import {
  barChart,
  lineChart,
  pieChart,
  liquidChart,
  gaugeChart,
  wordChart,
  radarChart,
  treeChart
} from '@/components/Charts';
import tabPanel from '@/components/title/tabPanel';
import vueDragResize from '../../views/componments/vueDragResize/vue-drag-resize.vue';
import DateComponent from '@/components/Date';
import NumberComponent from '@/components/Number';
import dateMap from '@/components/date';
import smallTitle from '@/components/title/smallTitle';
import progressBar from '@/components/List/progressBar.vue';
import PowerBarChart from '@/components/Charts/powerBarChart.vue';
import Statistic from '@/components/Statistic/statistic.vue';
import LayerControl from '@/components/LayerControl/layerControl.vue';
import CheckboxGroup from '@/components/LayerControl/checkboxGroup.vue';
import BasicText from '@/components/Text/text.vue';
import RichEditor from '@/components/Text/richEditor.vue';
import navigation from '@/components/Navigation';
import background from '@/components/Background';
import numberCount from '@/components/NumberCount';
import importCamera from '@/components/Camera/importCamera';
import splitCameraScreen from '@/components/Camera/splitCameraScreen';
import numberScroll from '@/components/NumberCount/numberScroll';
import eventList from '@/components/List/eventList.vue';
import buttonGroup from '@/components/NumberCount/buttonGroup';
import numberThree from '@/components/NumberCount/numberThree';
import CarouselPic from '@/components/CarouselPic/index.vue';
import AppraisingCard from '@/components/List/appraisingCard/appraisingCard.vue';
import NumberSteering from '@/components/NumberCount/numberSteering.vue';
import SwitchList from '@/components/List/switchList/index';
import eventDetail from '@/components/eventDetail';
import singleCamera from '@/components/SingleCamera/index';
import {
  commonTable,
  scrollTable,
  selectBox,
  dateTimePicker,
  searchBox,
  popupBox
} from '@/components/Table';
import stackedLine from '@/components/Charts/lineChart/stackedLine';
import groupBar from '@/components/Charts/barChart/groupBar.vue';
import Track from '@/components/Track/track';
import mixedLineandBar from '@/components/Charts/mixedLineandBar/index.vue';
import weather from '@/components/Weather';
export default {
  name: 'contenter',
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
    eventDetail,
    weather,
    singleCamera
  },
  props: {
    scale: {
      type: Number,
      default: 1
    },
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  data() {
    return {
      isShow: true,
      isEdit: true,
      containterDrawingList: [],
      currentContainterConfig: {
        drawingList: []
      },
      currentConfig: {}
    };
  },
  watch: {
    '$store.state.currentConfig': {
      handler(nVal, oVal) {
        console.log('nVal:::::::::::::::1', nVal, oVal);
        if (!location.hash.includes('view') && this.id === nVal.id) {
          console.log(nVal, this.$store.state.drawingList, this.id, '===watch');
          if (nVal.component === 'container') {
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
      immediate: true //立即执行
    }
    // id: {
    //   handler(nVal, oVal) {
    //     console.log(nVal, "===watch");
    //     // this.drawingList = nVal.drawingList;
    //   },
    //   deep: true,
    // },
  },
  computed: {
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
    //     console.log("drawingList::::::::::::::::::", this.$store.state.drawingList)
    //     return this.$store.state.drawingList
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
    console.log(
      'this.id::::::::::::::::',
      this.id,
      this.config,
      this.config.drawingList
    );
    if (location.hash.includes('view')) {
      this.isEdit = false;
    }
    this.containterDrawingList = this.config.drawingList;
  },
  methods: {
    delContainer(e) {
      e.stopPropagation();
      const drawingList = this.$store.state.drawingList.filter(
        (item) => item.id !== this.id
      );
      this.$store.commit('SET_DRAWING_LIST', drawingList);

      this.isEdit = true;
      this.$store.commit('SET_ISSHOWCONTAINERMASK', false);
      this.$store.commit('SET_CURRENT_CONFIG', {});
      this.$store.commit('SET_SELECTEDCONTAINERID', '');
    },
    getIsActive(item) {
      // console.log("this.$store.state.currentConfig.id == item.id::::::::::::", this.$store.state.currentConfig.id, item.id, this.$store.state.drawingList)
      return this.$store.state.currentConfig.id === item.id;
    },
    // 是否是查看状态
    isView() {
      return location.hash.includes('view');
    },
    // 点击容器组件
    clickCanvas(e) {
      //   e.stopPropagation();
      //   console.log("e:::::::::::::::", e);
      //   this.$store.commit("SET_CURRENT_CONFIG", {});
    },
    handleDoubleClick(e) {
      this.isEdit = false;
      this.$store.commit('SET_ISSHOWCONTAINERMASK', true);
      this.$store.commit('SET_SELECTEDCONTAINERID', this.id);
    },
    changeComponmentStatus(e) {
      e.stopPropagation();
      this.isEdit = true;
      this.$store.commit('SET_ISSHOWCONTAINERMASK', false);
      this.$store.commit('SET_CURRENT_CONFIG', {});
      this.$store.commit('SET_SELECTEDCONTAINERID', '');
    },
    //盒子自适应
    handleResizeStop(e, val) {
      this.$nextTick(() => {
        Object.assign(this.currentConfig, {
          width: e.width,
          height: e.height
        });
        val.config.width = e.width;
        val.config.height = e.height;
        if (!['date', 'table'].includes(val.config.series.type)) {
          this.$refs[val.id][0].myChart.resize();
        }
      });
    },
    //点击选中当前拖拽的组件
    handleComponentClick(e, item) {
      e.stopPropagation();
      console.log(item, '====currentConfig11111');
      //   if (item.id == this.currentConfig.id) return;
      this.$store.commit('SET_CURRENT_CONFIG', {
        id: item.id,
        ...item.config,
        component: item.component
      });
    },
    //拖拽移动停止
    handleDragStop(e, val) {
      Object.assign(this.currentConfig, {
        left: e.left,
        top: e.top
      });
      val.config.left = e.left;
      val.config.top = e.top;
      this.currentConfig = {
        id: val.id,
        ...val.config,
        component: val.component
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
      this.$store.commit('SET_CURRENT_CONFIG', {
        id: this.$store.state.drawingList[parentContainerIndex].id,
        ...this.$store.state.drawingList[parentContainerIndex].config,
        component: this.$store.state.drawingList[parentContainerIndex].component
      });
      //   this.currentConfig = {};
    }
  }
};
</script>
<style lang="scss" scoped>
.contenter-componment_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  // z-index: 9999;
  overflow: hidden;
  // pointer-events: all;

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
    background-color: rgba($color: #1f3a6e, $alpha: 0.4);
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
    // background-color: #636b73;
    font-size: 12px;

    .canvas-main {
      width: 100%;
      height: 100%;
      // background-color: #1f3a6e;
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
