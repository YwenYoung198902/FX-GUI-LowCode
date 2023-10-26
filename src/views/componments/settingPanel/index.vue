<template>
  <div
    class="setting-panel_wrap"
    @click="clickSetting"
  >
    <div
      class="setting-panel"
      :class="isExpand ? '' : 'hiddenSetting'"
    >
      <div class="panel-bar">
        <div
          v-for="item in siderList"
          @click="changeBar(item)"
          :key="item.key"
          class="bar-item"
          :class="{
            active: currectBar === item.key,
            disabled: isDisabled(item),
          }"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- <keep-alive> -->
      <component
        v-show="currectBar === 'setting'"
        :is="config.component"
        :ref="config.id"
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
        @changeValue="
          (param1, param2, val) => $emit('changeValue', param1, param2, val)
        "
      ></component>
      <!-- </keep-ali ve> -->
      <DataSource
        v-show="currectBar === 'dataSource'"
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      ></DataSource>
      <EventManagement
        :switchPage="switchPage"
        v-show="
          currectBar === 'interaction'
          // &&
          // ['numberCount', 'basicText'].includes(config.component)
        "
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      ></EventManagement>
    </div>
    <div
      class="setting_panel-img"
      @click="changeSettingStatus"
    >
      <img
        :src="
          isExpand
            ? require('@/assets/component/setting_left.png')
            : require('@/assets/component/setting_right.png')
        "
        alt=""
      />
    </div>
    <div
      class="layer_management-img"
      @click="changeLayerManagement"
    >
      <img
        :src="
          isShowLayerManagement
            ? require('@/assets/image/layer_management-active.png')
            : require('@/assets/image/layer_management.png')
        "
        alt=""
      />
    </div>
    <LayerManagement
      :drawingList="drawingList"
      v-if="isShowLayerManagement"
    ></LayerManagement>
  </div>
</template>

<script>
import './index.scss';
import lineChart from './componments/Setting/chart';
import DataSource from './componments/DataSource';
import smallTitle from './componments/Setting/title/smallTitlePeizhi';
import dateMap from './componments/Setting/date';
import progressBar from './componments/Setting/progressBar.vue';
import statistic from './componments/Setting/statistic.vue';
const barChart = lineChart;
const pieChart = lineChart;
const radarChart = lineChart;
const powerBarChart = lineChart;
import stackedLine from "./componments/Setting/chart/lineChart/stackedLine";
import groupBar from "./componments/Setting/chart/barChart/groupBar";
import mixedLineandBar from "./componments/Setting/chart/mixedLineandBar/index";
import customLegendPie from "./componments/Setting/chart/pie/customLegendPie";
import navigation from "./componments/Setting/navigation";
import background from "./componments/Setting/background";
import numberCount from "./componments/Setting/numberCount";
import importCamera from "./componments/Setting/camera/importCamera";
import splitCameraScreen from "./componments/Setting/camera/splitCameraScreen";
import layerControl from "./componments/Setting/layerControl.vue";
import numberScroll from "./componments/Setting/numberCount/numberScroll";
import eventList from "./componments/Setting/list/eventList";
import BasicText from "./componments/Setting/text/text.vue";
import RichEditor from "./componments/Setting/text/richEditor.vue";
import LayerManagement from "./componments/LayerManagement";
import EventManagement from "./componments/EventManagement";
import carouselPic from "./componments/Setting/carouselPic/carouselPic.vue";
import appraisingCard from "./componments/Setting/list/appraisingCard.vue";
import buttonGroup from "./componments/Setting/numberCount/buttonGroup";
import numberThree from "./componments/Setting/numberCount/numberThree";
import commonTable from "./componments/Setting/table/commonTable";
import scrollTable from "./componments/Setting/table/scrollTable";
import container from "./componments/Setting/container";
import selectBox from "./componments/Setting/table/select";
import dateTimePicker from "./componments/Setting/table/dateTimePicker";
import searchBox from "./componments/Setting/table/search";
import popupBox from "./componments/Setting/table/popupBox";
import numberSteering from "./componments/Setting/numberCount/numberSteering.vue";
import tabPanel from "./componments/Setting/title/tabPanel";
import checkboxGroup from "./componments/Setting/layerControl/checkboxGroup.vue";
import SwitchList from "./componments/Setting/list/switchList.vue";
import numberFive from "./componments/Setting/numberCount/numberFive";
import numberSix from "./componments/Setting/numberCount/numberSix";
import canvasConfig from "./componments/Setting/canvas";
import Track from "./componments/Setting/track";
import eventDetail from "./componments/Setting/eventDetail/index.vue";
import buttonOne from "./componments/Setting/numberCount/buttonOne";
import danbing from "./componments/Setting/camera/danbing";
import weather from "./componments/Setting/weather";
import singleCamera from './componments/Setting/singleCamera/index.vue';
import personnelHouse from './componments/Setting/table/personnelHouse.vue'
export default {
  name: 'siderBar',
  components: {
    customLegendPie,
    mixedLineandBar,
    canvasConfig,
    groupBar,
    stackedLine,
    container,
    EventManagement,
    lineChart,
    barChart,
    pieChart,
    radarChart,
    powerBarChart,
    DataSource,
    smallTitle,
    dateMap,
    progressBar,
    statistic,
    navigation,
    background,
    numberCount,
    importCamera,
    splitCameraScreen,
    layerControl,
    numberScroll,
    eventList,
    BasicText,
    RichEditor,
    buttonGroup,
    numberThree,
    LayerManagement,
    carouselPic,
    appraisingCard,
    tabPanel,
    powerBarChart,
    commonTable,
    scrollTable,
    selectBox,
    dateTimePicker,
    searchBox,
    popupBox,
    numberFive,
    numberSix,
    numberSteering,
    checkboxGroup,
    SwitchList,
    Track,
    eventDetail,
    buttonOne,
    danbing,
    weather,
    singleCamera,
    personnelHouse,
  },
  data() {
    return {
      dataSourceDisableList: ['container', 'popupBox', 'canvasConfig'],
      eventDisableList: ['canvasConfig'],
      siderList: [
        { key: 'setting', title: '配置' },
        { key: 'dataSource', title: '数据' },
        { key: 'interaction', title: '交互' }
      ],
      currectBar: 'setting',
      isExpand: true
      // isShowLayerManagement: true
    };
  },
  props: {
    switchPage: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // config: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
    drawingList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    // SET_LAYER_MANAGEMENT
    isShowLayerManagement() {
      return this.$store.state.isShowLayerManagement;
    },
    config: {
      get() {
        return this.$store.state.currentConfig;
      },
      set(newvalue) {
        console.log('newvalue::::::::::::::::::::', newvalue);
        this.$store.commit('SET_CURRENT_CONFIG', newvalue);
      }
    }
  },
  // watch: {

  // },
  mounted() {
    console.log('config:::::::::', this.config);
    console.log(this.config);
    this.setSiderList();
  },
  methods: {
    isDisabled(item) {
      if (item.key === 'dataSource') {
        return this.dataSourceDisableList.includes(this.config.component);
      }
      if (item.key === 'interaction') {
        return this.eventDisableList.includes(this.config.component);
      }
      return false;
    },
    clickSetting(e) {
      e.stopPropagation();
    },
    setSiderList() {
      if (this.config && this.config.component == 'dateMap') {
        this.siderList = [
          { key: 'setting', title: '配置' },
          { key: 'interaction', title: '交互' }
        ];
      } else {
        this.siderList = [
          { key: 'setting', title: '配置' },
          { key: 'dataSource', title: '数据' },
          { key: 'interaction', title: '交互' }
        ];
      }
      this.currectBar = 'setting';
    },
    changeSettingStatus() {
      this.isExpand = !this.isExpand;
    },
    changeLayerManagement() {
      // this.isShowLayerManagement = !this.isShowLayerManagement;
      this.$store.commit('SET_LAYER_MANAGEMENT', !this.isShowLayerManagement);
    },
    changeBar(data) {
      console.log(
        'this.isDisabled(data):::::::::::::::',
        this.isDisabled(data)
      );
      if (this.isDisabled(data)) {
        return;
      }
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss">
.setting-panel {
  width: 340px;
  height: calc(100% - 20px);
  background-color: #25262a;
  border: 1px solid #0c0d0d;
  border-top-width: 0px;
  box-sizing: border-box;

  .panel-bar {
    display: flex;
    .bar-item {
      cursor: pointer;
      text-align: center;
      height: 43px;
      line-height: 43px;
      flex: 1;
      background-color: rgba(0, 0, 0, 0.3);
      border-top: 2px solid rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid #0c0d0d;

      &.active {
        border-top: 2px solid #2879ff;
        background-color: #25262a;
      }

      &.disabled {
        cursor: not-allowed;
      }
    }
  }

  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;

    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }
  }
}
</style>
