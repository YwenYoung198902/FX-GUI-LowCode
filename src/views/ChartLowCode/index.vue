<template>
  <div class="chart-container flex relative">
    <div class="btn-group">
      <el-popover
        placement="top-start"
        title=""
        width="612"
        trigger="click"
        popper-class="cockpit-popper"
      >
        <!-- <div slot="reference">
          <el-button disabled size="mini" type="primary" :loading="isLoading"
            >面板管理</el-button
          >
        </div> -->
        <div class="cockpit_wrap">
          <div class="cockpit-item">
            <div
              class="cockpit-item_cover"
              @click="addCockpit"
            >
              <img
                width="34"
                height="34"
                src="../../assets/image/add_cockpit.png"
              />
            </div>
          </div>
          <div
            class="cockpit-item"
            v-for="(item, index) in allCockpitList"
            :key="item.rowid"
            @click="changePanelBg(item)"
          >
            <div class="cockpit-item_cover">
              <img
                v-if="item.img_url"
                :src="JSON.parse(item.img_url)[0]['DownloadUrl']"
                :style="{ width: '100%', height: '100%' }"
                alt=""
                srcset=""
              />
              <img
                width="54"
                height="49"
                v-show="!item.img_url"
                :src="require('../../assets/image/cockpit_default.png')"
                alt=""
                srcset=""
              />
            </div>
            <div class="cockpit-item_title">{{ item.name }}</div>
          </div>
        </div>
      </el-popover>
      <el-popover
        placement="top-start"
        title=""
        trigger="hover"
        popper-class="page-btn"
        class="page-btn"
        style="
           {
            marginleft: 20px;
          }
        "
      >
        <div slot="reference">
          <el-button
            size="mini"
            :loading="isLoading"
            type="primary"
          >页面管理</el-button>
        </div>
        <div class="panel-page_wrap">
          <div class="panel-list">
            <div
              class="panel-item"
              v-for="(item, index) in currectPanelData"
              :key="item.rowid"
              :class="{ active: currectIndex === index }"
            >
              <div
                class="panel-item_title"
                @click="changePanelPage(item, index)"
              >
                <span v-show="editPageId !== item.id">{{ item.title }}</span>
                <el-col :span="16">
                  <el-input
                    size="mini"
                    width="150"
                    v-show="editPageId === item.id"
                    v-model="item.title"
                    @click.native="focusInput"
                    placeholder="请输入内容"
                    @keyup.enter.native="editPageId = -1"
                  ></el-input>
                </el-col>
              </div>
              <div class="panel-item_btns">
                <img
                  title="确认"
                  src="../../assets/image/sure_btn.png"
                  @click="editPageId = -1"
                  v-show="editPageId === item.id"
                />
                <img
                  title="编辑名称"
                  src="../../assets/image/edit_btn.png"
                  @click="editPage(item)"
                  v-show="editPageId !== item.id"
                />
                <img
                  title="选择场景"
                  src="../../assets/image/scence_btn.png"
                  @click="changeScene(item)"
                />
                <img
                  title="复制页面"
                  src="../../assets/image/copy.png"
                  @click="copyPage(item)"
                />
                <img
                  title="删除页面"
                  src="../../assets/image/delete.png"
                  @click="deletePage(item)"
                />
              </div>
            </div>
          </div>
          <div
            class="add-item"
            @click="addPanelPage()"
          >
            <img src="../../assets/image/add_icon.png" />
            添加页面
          </div>
        </div>
      </el-popover>

      <div class="panel-btn">
        <el-button
          size="mini"
          @click="panelPreview"
          plain
          :loading="isLoading"
        >
          <img src="../../assets/image/Preview.png" />
          预览
        </el-button>
      </div>
      <!-- <div class="panel-btn">
        <el-button size="mini" @click="toSaveData" :loading="isLoading">
          <img src="../../assets/image/save.png" />
          保存
        </el-button>
      </div> -->
      <div class="panel-btn">
        <el-dropdown
          size="mini"
          split-button
          @click="toSaveData"
          @command="toSaveSnapshot"
          :disabled="isLoading"
          class="save-btn"
          trigger="click"
        >
          <img src="../../assets/image/save.png" />
          保存
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>封面截图</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="panel-btn">
        <el-button
          size="mini"
          @click="goBack"
          :loading="isLoading"
        >
          <img src="../../assets/image/goback.png" />
          返回
        </el-button>
      </div>
    </div>

    <SilderBar
      @moveEnd="handleEnd"
      @cloneComponent="cloneComponent"
    ></SilderBar>

    <div
      class="chart-main-container flex"
      id="wrapper"
    >
      <sketch-rule
        :lang="language"
        :thick="thick"
        :scale="scale"
        :width="width"
        :height="height"
        :startX="startX"
        :startY="startY"
        :shadow="shadow"
        :palette="palette"
        :horLineArr="lines.h"
        :verLineArr="lines.v"
        :isShowReferLine="true"
        :cornerActive="true"
        v-if="true"
        @handleLine="handleLine"
      >
      </sketch-rule>
      <!-- <CanvasTools v-if="false"></CanvasTools> -->
      <div
        ref="screensRef"
        id="screens"
        @mousedown.stop="dragMousedown"
        @mouseup="dragMouseup"
        @mousemove="dragMousemove"
        @wheel="handleWheel"
        @scroll="handleScroll"
      >
        <div
          ref="containerRef"
          id="screen-container"
          @click="clickCanvas"
        >
          <div
            id="wrapperCanvas"
            ref="canvaswrap"
            :style="canvasStyle"
          >
            <div
              class="center flex-sub relative"
              :style="{
                background: '#232424',
                // backgroundImage: `url(${currectPanelBg})`
              }"
              ref="cutScreen"
            >
              <img
                :src="currectPanelBg"
                alt=""
                class="bgImg"
                srcset=""
              />
              <draggable
                group="componentDrag"
                animation="340"
                v-model="drawingList"
                ghostClass="ghost"
                style="height: 100%; position: absolute; width: 100%"
              >
                <vue-drag-resize
                  v-for="(item, index) in drawingList"
                  :scale="scale"
                  :key="item.id"
                  :x="parseFloat(item.config.left || 0)"
                  :y="parseFloat(item.config.top || 0)"
                  :w="parseFloat(item.config.width || 300)"
                  :h="parseFloat(item.config.height || 300)"
                  :z="selectedContainerId === item.id ? 999 : index"
                  @resizestop="(e) => handleResizeStop(e, item)"
                  @clicked="handleComponentClick($event, item)"
                  @dragstop="(e) => handleDragStop(e, item, index)"
                  @deactivated="onDeactivated"
                  @activated="onActivated(item)"
                  :parentLimitation="true"
                  :isActive="currentConfig.id == item.id"
                  :parentScaleX="scale"
                  :parentScaleY="scale"
                  v-show="item.config.isShow"
                  :isDisabled="item.config.isLock"
                  :ref="'container_' + item.id"
                >
                  <component
                    :is="item.component"
                    class="chart-wrapper"
                    :ref="item.id"
                    :id="item.id"
                    :config="item.config"
                    :component="item.component"
                    :scale="scale"
                    @changeSize="changeSize"
                  ></component>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    size="mini"
                    class="del-button"
                    v-show="
                      currentConfig.id == item.id &&
                        !containerCom.includes(item.component)
                    "
                    @click.stop="removeComponent($event, item)"
                  ></el-button>
                </vue-drag-resize>
              </draggable>
              <div
                v-show="
                  // currentConfig.component === 'container' ||
                  // currentConfig.parentId
                  isShowContainerMask
                "
                @click.stop="clickMask"
                :style="maskMaskStyle"
                class="mask"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SettingPanel
      :drawingList="drawingList"
      v-if="currentConfig.id"
      :config="currentConfig"
      @changeSize="changeSize"
      @changeValue="changeValue"
      :switchPage="currectPanelData"
    ></SettingPanel>

    <AddDialog
      title="数据配置"
      :dialogVisible="isShowAddDialog"
      @closeDialog="closeDialog"
    ></AddDialog>

    <!-- 场景选择器弹窗 -->
    <SceneSelector
      @onClose="onClose"
      @onSure="onSure"
      :scenceList="scenceList"
      :dialogVisible="isShowSceneSelector"
      :sceneId="currectSceneId"
    ></SceneSelector>
  </div>
</template>

<script>
import CanvasTools from '../componments/canvasTools';
import componentList from '@/assets/component/list';
import draggable from 'vuedraggable';
// import vueDragResize from "vue-drag-resize";
import vueDragResize from '../componments/vueDragResize/vue-drag-resize.vue';
import { deepClone, guid } from '@/utils/index.js';
import { appKey, sign } from '@/utils/const.js';
import html2canvas from 'html2canvas';
import sketchRule from 'vue-sketch-ruler';
import { mapGetters } from 'vuex';
import apiDataProcessing from '../componments/apiDataProcessing.js';
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
import stackedLine from "@/components/Charts/lineChart/stackedLine";
import customLegendPie from "@/components/Charts/pie/pieChart";
import "./index.scss";
import { scatterMap, seriesMap } from "@/components/Map";
import { editSceneJson, getFilterRows } from "@/utils/api";
import { containerCom } from "@/utils/const";
import DateComponent from "@/components/Date";
import NumberComponent from "@/components/Number";
import SilderBar from "../componments/sideBar";
import SettingPanel from "../componments/settingPanel";
import AddDialog from "../componments/addDialog";
import dateMap from "@/components/date";
import smallTitle from "@/components/title/smallTitle";
import progressBar from "../../components/List/progressBar.vue";
import Statistic from "../../components/Statistic/statistic.vue";
import SceneSelector from "../componments/SceneSelector";
import LayerControl from "../../components/LayerControl/layerControl.vue";
import BasicText from "../../components/Text/text.vue";
import RichEditor from "../../components/Text/richEditor.vue";
import navigation from '@/components/Navigation';
import background from '@/components/Background';
import numberCount from '@/components/NumberCount';
import importCamera from '@/components/Camera/importCamera';
import splitCameraScreen from '@/components/Camera/splitCameraScreen';
import numberScroll from '@/components/NumberCount/numberScroll';
import eventList from '@/components/List/eventList.vue';
import buttonGroup from '@/components/NumberCount/buttonGroup';
import numberThree from '@/components/NumberCount/numberThree';
import numberSteering from '@/components/NumberCount/numberSteering';
import CarouselPic from '../../components/CarouselPic/index.vue';
import AppraisingCard from '../../components/List/appraisingCard/appraisingCard.vue';
import tabPanel from '@/components/title/tabPanel';
import container from '@/components/contenter';
import powerBarChart from '@/components/Charts/powerBarChart.vue';
import groupBar from '@/components/Charts/barChart/groupBar.vue';
import mixedLineandBar from '@/components/Charts/mixedLineandBar/index.vue';
import checkboxGroup from '../../components/LayerControl/checkboxGroup.vue';
import SwitchList from '../../components/List/switchList/index.vue';
import numberFive from '@/components/NumberCount/numberFive';
import numberSix from '@/components/NumberCount/numberSix';
import buttonOne from '@/components/NumberCount/buttonOne';
import {
  commonTable,
  scrollTable,
  selectBox,
  dateTimePicker,
  searchBox,
  popupBox
} from '@/components/Table';
import Track from '@/components/Track/track';
import eventDetail from '@/components/eventDetail';
import danbing from '@/components/Camera/danbing';
import weather from '@/components/Weather';
import singleCamera from '@/components/SingleCamera';
import personnelHouse from '@/components/Table/personnelHouse';
export default {
  name: 'Chat',
  components: {
    customLegendPie,
    mixedLineandBar,
    groupBar,
    stackedLine,
    container,
    sketchRule,
    draggable,
    vueDragResize,
    barChart,
    lineChart,
    pieChart,
    liquidChart,
    powerBarChart,
    gaugeChart,
    wordChart,
    radarChart,
    treeChart,
    scatterMap,
    seriesMap,
    DateComponent,
    NumberComponent,
    SilderBar,
    AddDialog,
    SettingPanel,
    dateMap,
    smallTitle,
    progressBar,
    Statistic,
    SceneSelector,
    navigation,
    background,
    numberCount,
    importCamera,
    splitCameraScreen,
    LayerControl,
    numberScroll,
    eventList,
    BasicText,
    RichEditor,
    buttonGroup,
    numberThree,
    CarouselPic,
    AppraisingCard,
    tabPanel,
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
    CanvasTools,
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
      currentIcon: 'echarts',
      //当前拖拽的盒子
      currentMove: '',
      //画布盒子list
      // drawingList: [],
      //当前配置项
      // currentConfig: {},
      //数据来源dialog
      dialogTableShow: false,
      //预览显示
      previewShow: false,
      isShowAddDialog: false, // 新建组件弹框
      currentData: {}, // 当前添加的数据
      isLoading: false,
      allCockpitList: [],
      currectPanelBg: '', // 当前面板使用的  场景图
      currectPanelData: [], // 当前面板数据
      currectPanelPageId: '', // 当前页面数据
      currectIndex: 0, // 当前页面index
      snapshotUrl: '', // 预览图快照
      isShowPreviewDialog: false, // 是否展示预览弹窗
      // 刻度尺
      language: 'zh',
      thick: 20,
      startX: -90,
      startY: -90,
      width: 500,
      height: 800,
      history: {
        quash: [],
        recover: []
      },
      setting: {
        ruler: ['ruler'],
        disposition: 'screen'
      },
      active: {
        plugin: 0
      },
      // 辅助线
      visual: {
        zoom: [100],
        lines: [
          {
            h: [0, 0],
            v: [0, 0]
          }
        ]
      },
      project: {
        name: 'test',
        author: {
          name: 'test',
          email: '',
          url: ''
        },
        entrance: 0,
        views: [
          {
            name: '页面一',
            plugins: [],
            duration: 100,
            width: 3840,
            height: 962,
            style: {
              opacity: 100,
              backgroundColor: '#fff'
            },
            attr: {
              src: ''
            }
          }
        ],
        config: {}
      },
      sceneViews: {
        width: 3840,
        height: 962,
        name: '页面一',
        plugins: [],
        duration: 100,
        style: {
          opacity: 100,
          backgroundColor: '#fff'
        },
        attr: {
          src: ''
        }
      },
      keys: {
        ctrl: false
      },
      isShowSceneSelector: false,
      scenceList: [], // 场景列表
      currectSceneId: '',
      editPageId: -1,
      containerCom: [],
      selectPage: {}
    };
  },
  async mounted() {
    // 刷新页面的时候监听是否有未保存的
    window.onbeforeunload = (e) => {
      console.log('e::::::::::::::::::', e);
      //   if (false) {
      //     // e = e || window.event;
      //     // // 兼容IE8和Firefox 4之前的版本
      //     // if (e) {
      //     //   e.returnValue = "关闭提示";
      //     // }
      //     // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return '关闭提示';
      //   } else {
      //     window.onbeforeunload = null;
      //   }
    };
    // const loading = this.$loading({
    //   lock: true,
    //   text: "Loading",
    //   spinner: "el-icon-loading",
    //   background: "rgba(255, 255, 255, 1)",
    // });
    this.containerCom = containerCom;
    this.initScreens();
    this.listen();
    this.initSize();
    try {
      this.$nextTick(async () => {
        await this.loadAllScene();
        await this.loadAllCockpit();
      });
    } catch (error) {}
    // loading.close();
  },
  computed: {
    // 容器组件的遮罩层
    maskMaskStyle() {
      let styleObj = {};
      // 当前组件如果是弹窗组件
      if (this.currentConfig.component === 'popupBox') {
        if (this.currentConfig.isMask) {
          styleObj = {
            backgroundColor: this.currentConfig.maskBackgroundColor
          };
        }
      }

      // 当前组件的父组件是弹窗组件
      if (this.currentConfig.parentId) {
        const {
          config: { isMask, maskBackgroundColor }
        } = this.drawingList.find(
          (item) => item.id === this.currentConfig.parentId
        );
        if (isMask) {
          styleObj = {
            backgroundColor: maskBackgroundColor
          };
        }
      }

      return styleObj;
    },
    selectedContainerId() {
      return this.$store.state.selectedContainerId;
    },
    isShowContainerMask() {
      return this.$store.state.isShowContainerMask;
    },
    isClickUndoTools() {
      return this.$store.state.isClickUndoTools;
    },
    isClickAdvanceTools() {
      return this.$store.state.isClickAdvanceTools;
    },
    currentConfig: {
      get() {
        return this.$store.state.currentConfig;
      },
      set(newvalue) {
        this.$store.commit('SET_CURRENT_CONFIG', newvalue);
      }
    },
    drawingList: {
      get() {
        return this.$store.state.drawingList;
      },
      set(newvalue) {
        this.$store.commit('SET_DRAWING_LIST', newvalue);
        // return newvalue
      }
    },
    lines() {
      return this.visual.lines[this.entrance];
    },
    scale() {
      this.handleWheel({});
      return this.visual.zoom[this.entrance] / 100;
    },
    canvasStyle() {
      return {
        width: this.views.width + 'px',
        height: this.views.height + 'px',
        transform: `scale(${this.scale})`,
        backgroundSize: '60% auto',
        opacity: this.views.style.opacity / 100,
        background: `url(${this.views.attr.src}) no-repeat 50% ${this.views.style.backgroundColor}`
      };
    },
    entrance() {
      return this.project.entrance;
    },
    projectViews() {
      return this.project.views;
    },
    referLineStatus() {
      return this.setting.ruler.includes('referLine');
    },
    views() {
      // return this.sceneViews;
      return this.$store.state.canvasConfig;
    },
    // 刻度尺样式
    palette() {
      return {
        bgColor: '#2b2b2b', // 刻度尺背景颜色
        longfgColor: '#fff', // 每个数字对应的刻度颜色
        shortfgColor: '#4092ff ', // 刻度尺刻度颜色
        fontColor: '#fff', // 刻度尺数字颜色
        shadowColor: 'rgba(64, 146, 255, .1)', // 画布映射的刻度尺背景
        lineColor: 'rgba(64, 146, 255, .5)', // 辅助线颜色
        borderColor: '#f0f0f0', // 重叠部分的边框线条颜色
        cornerActiveColor: '#4092ff' // 角活动颜色
      };
    },
    shadow() {
      return {
        x: 0,
        y: 0,
        width: this.views.width,
        height: this.views.height
      };
    },
    rulerStatus: () => {
      return this.setting.ruler.includes('ruler');
    },
    screen() {
      return {
        width: this.views.width * 4 + 1000,
        height: this.views.height * 4 + 1000
      };
    },
    leftList() {
      return componentList.map((item) => item.icon);
    },
    comList() {
      let index = this.leftList.indexOf(this.currentIcon);
      if (index !== -1) {
        return componentList[index].children;
      }
      return [];
    }
  },
  watch: {
    // drawingList(newvalue) {
    //   console.log("newvalue:::::::::", newvalue)
    // }
    // "$store.state.currentConfig.isShow"(newVal) {
    //   this.$refs[
    //     "container_" + this.$store.state.currentConfig.id
    //   ][0].$el.style.display = newVal ? "block" : "none";
    //   console.log(
    //     "newVal::::::::::::::::::::",
    //     this.$store.state.currentConfig.id,
    //     this.$refs
    //   );
    // },
  },
  methods: {
    focusInput(e) {
      e.stopPropagation();
    },
    // 点击容器组件遮罩层
    clickMask(e) {
      e.stopPropagation();
    },
    // 修改页信息
    editPage(data) {
      this.editPageId = data.id;
    },
    // 导出成图片
    async exportImg() {
      const boxDom = this.$refs.canvaswrap;
      const result = await html2canvas(boxDom, { allowTaint: true });
      // .then((res) => {
      //   console.log('res:::::::::::::::::', res)
      //   var dataUrl = res.toDataURL("image/png", 2.0);
      //   this.snapshotUrl = dataUrl;
      //   this.isShowPreviewDialog = true;
      // });
      return result.toDataURL('image/png', 1.0);
    },
    // 保存快照
    async toSaveSnapshot() {
      try {
        if (this.isLoading) {
          return;
        }
        this.isLoading = true;
        const snapshotImg = await this.exportImg();

        const rowId = sessionStorage.getItem('rowid');
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: 'cockpit',
          rowId,
          controls: [
            {
              controlId: 'img_url',
              value: snapshotImg,
              editType: 0,
              valueType: 2,
              controlFiles: [
                {
                  baseFile: snapshotImg,
                  fileName: rowId + '.png'
                }
              ]
            }
          ]
        };
        const result = await editSceneJson(data);
        if (result.success) {
          this.$message.success('保存成功');
        } else {
          this.$message.error('保存失败');
        }
        this.isLoading = false;
      } catch (error) {
        console.log('error:::::::::::::::', error);
        this.$message.error('保存失败');
        this.isLoading = false;
      }
    },
    // 判断当前是否在容器组件内编辑
    isContainerEdit() {
      return this.$store.state.isShowContainerMask;
      // return (
      //   containerCom.includes(this.currentConfig.component) ||
      //   this.$store.state.isShowContainerMask ||
      //   this.currentConfig.parentId
      // );
    },
    // 点击画布
    clickCanvas(e) {
      console.log('点击画布:::::::::::::::::::');
      this.currentConfig = {
        name: '画布',
        id: 'canvasConfig',
        component: 'canvasConfig'
      };
    },
    onActivated(item) {
      // 下拉框组件单独处理
      if (item.component === 'selectBox') {
        this.$store.commit('SET_CURRENT_CONFIG', {
          id: item.id,
          ...item.config,
          component: item.component
        });
      }
    },
    onDeactivated(data) {
      console.log('onDeactivated:::::::::::::::::', data);
    },
    // 辅助线回调事件
    getRefLineParams(params) {
      const { vLine, hLine } = params;
      let id = 0;
      this.vLine = vLine.map((item) => {
        item['id'] = ++id;
        return item;
      });
      this.hLine = hLine.map((item) => {
        item['id'] = ++id;
        return item;
      });
    },
    onSure({ rowid }) {
      this.currectSceneId = rowid;

      const currectIndex = this.currectPanelData.findIndex(
        (item) => item.id === this.selectPage.id
      );
      this.currectPanelData[currectIndex].sceneId = rowid;
      if (currectIndex === this.currectIndex) {
        const { scene_snapshot } = this.scenceList.find(
          (item) => item.rowid === rowid
        );
        const panelBg =
          scene_snapshot && JSON.parse(scene_snapshot)[0]['DownloadUrl'];
        this.currectPanelBg = panelBg;
      }

      this.isShowSceneSelector = false;
    },
    onClose() {
      this.isShowSceneSelector = false;
    },
    // 添加场景
    addCockpit() {
      console.log('添加场景');
    },
    // 切换场景
    changeScene(item) {
      this.currectSceneId = item.sceneId;
      this.isShowSceneSelector = true;
      this.selectPage = item;
    },
    // 复制页面
    copyPage(data) {
      const pageId = guid();
      this.currectPanelData.push({
        content: data.content,
        title: data.title + ' copy',
        id: pageId
      });
      this.currectIndex = this.currectPanelData.length - 1;
      this.currectPanelPageId = pageId;
     
      const currectPageData = data.content ? JSON.parse(data.content) : [];
      const copyPageData = [];
      // 复制页面时组件重新生成id
      for (let index = 0; index < currectPageData.length; index++) {
        let pageEle = currectPageData[index]
        if (currectPageData[index].drawingList && currectPageData[index].drawingList.length) {
          let eleDrawingList = [];
          for (let inx = 0; inx < currectPageData[index].drawingList.length; inx++) {
            eleDrawingList.push({
              ...currectPageData[index].drawingList[inx],
              id: guid()
            })
          }
          pageEle.drawingList = eleDrawingList
        }
        pageEle.id = guid()
        copyPageData.push(pageEle)
      }

      this.drawingList = copyPageData;
    },
    // 删除页面
    deletePage(data) {
      this.$confirm('删除页面后无法找回，是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.currectPanelData = this.currectPanelData.filter(
            (item) => item.id !== data.id
          );
          try {
            const data = {
              appKey: appKey,
              sign: sign,
              worksheetId: 'cockpit',
              rowId: sessionStorage.getItem('rowid'),
              controls: [
                {
                  controlId: 'kbjson',
                  value: JSON.stringify(this.currectPanelData)
                }
              ]
            };
            const result = await editSceneJson(data);
            if (result.success) {
              this.$message.success('删除成功');
            } else {
              this.$message.error('删除失败');
            }
          } catch (error) {
            this.$message.error('删除失败');
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    /**********
     *
     */
    listen() {
      document.onkeydown = (e) => {
        this.keys.ctrl = e.keyCode === 17;
        if (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT')
          return;
        // 按下空格键
        if (e.keyCode == 32) {
          e.preventDefault();
          this.keys.space = true;
        }
      };
      document.onkeyup = () => {
        this.keys.ctrl = false;
      };
    },
    handleScroll() {
      const screensRect = document
        .querySelector('#screens')
        .getBoundingClientRect();
      const canvasRect = document
        .querySelector('#wrapperCanvas')
        .getBoundingClientRect();
      // 标尺开始的刻度
      const startX =
        (screensRect.left + this.thick - canvasRect.left) / this.scale;
      const startY =
        (screensRect.top + this.thick - canvasRect.top) / this.scale;
      this.startX = startX >> 0;
      this.startY = startY >> 0;
    },
    UPDATE_VISUAL(payload) {
      const { index, number, key, value } = payload;
      if ((index || index === 0) && number && value) {
        this.visual[key].splice(index, number, value);
      } else if ((index || index === 0) && number) {
        this.visual[key].splice(index, number);
      } else if (value) {
        this.visual[key].push(JSON.parse(JSON.stringify(value)));
      }
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.UPDATE_VISUAL({
          index: this.entrance,
          number: 1,
          key: 'zoom',
          value: parseInt(nextScale * 100 >= 400 ? 400 : nextScale * 100)
        });
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    // 鼠标移动
    dragMousemove(e) {
      if (this.dragSlide) {
        let x = e.clientX - window.stardragEvent.clientX;
        let y = e.clientY - window.stardragEvent.clientY;
        this.$refs.screensRef.scrollLeft = window.startSlideX - x;
        this.$refs.screensRef.scrollTop = window.startSlideY - y;
      }
    },
    //鼠标抬起
    dragMouseup() {
      this.dragSlide = false;
      this.keys.space = false;
    },
    dragMousedown(e) {
      // 如果按下了空格键,且按下鼠标左键,那么鼠标变抓手,开启滚动条随鼠标拖动的操作
      if (this.keys.space) {
        this.dragSlide = true;
        window.stardragEvent = e;
        window.startSlideX = this.$refs.screensRef.scrollLeft;
        window.startSlideY = this.$refs.screensRef.scrollTop;
      }
    },
    handleLine(lines) {
      // if (this.referLineStatus) {
      let visual = JSON.parse(JSON.stringify(this.visual));
      visual.lines[this.project.entrance] = lines;
      this.visual = visual;
      // }
    },
    initSize() {
      const wrapperRect = document
        .querySelector('#wrapper')
        .getBoundingClientRect();
      const borderWidth = 1;
      this.width = wrapperRect.width + 400;
      this.height = wrapperRect.height - this.thick - borderWidth;
    },
    initScreens() {
      // 定义视图
      let screen = document.getElementById('screen-container');
      screen.style.width = this.screen.width + 'px';
      screen.style.height = this.screen.height + 'px';
      // 初始画布位置
      this.reposition();
    },
    reposition() {
      let canvas = document.getElementById('wrapperCanvas');
      let width = (this.screen.width - this.views.width) / 2;
      let height = (this.screen.height - this.views.height) / 2;
      //canvas.style.left = width + "px";
      canvas.style.top = height + 'px';

      const { scrollWidth, offsetWidth, scrollHeight, offsetHeight } =
        this.$refs.screensRef;
      let scrollLeft = (scrollWidth - offsetWidth) / 2;
      let scrollTop = (scrollHeight - offsetHeight) / 2;

      //this.$refs.screensRef.scrollLeft = scrollLeft;
      let left = canvas.getBoundingClientRect().left;
      //让画布横向居中
      canvas.style.left = '40px';

      this.$refs.screensRef.scrollTop = scrollTop;
      let top = canvas.getBoundingClientRect().top;
      this.$refs.screensRef.scrollTop = scrollTop + top - 80;
      // this.$refs.screensRef.scrollLeft = -50;
    },
    /****************
     */
    // 预览
    panelPreview() {
      this.currectPanelData[this.currectIndex].content = JSON.stringify(
        this.drawingList
      );
      // return
      sessionStorage.setItem(
        'panelData',
        JSON.stringify(this.currectPanelData)
      );
      sessionStorage.setItem('rowid', sessionStorage.getItem('rowid'));
      window.open('/cockpitView/#/view');
      // this.exportImg();
      // console.log("panelPreview");
    },
    // 增加面板页面
    addPanelPage() {
      const pageId = guid();
      this.currectPanelData.push({ title: '新增页面', id: pageId });
    },
    // 切换大屏页面
    changePanelPage(data, index) {
      console.log('data::::::::::', data);
      if (this.currectPanelPageId !== data.id) {
        this.currectPanelData[this.currectIndex].content = JSON.stringify(
          this.drawingList
        );
        this.editPageId = -1;
        this.currectIndex = index;
        this.currectPanelPageId = data.id;
        this.drawingList = data.content ? JSON.parse(data.content) : [];
        this.currectSceneId = data.sceneId;
        const { scene_snapshot } =
          this.scenceList.find((item) => item.rowid === data.sceneId) || {};
        const panelBg =
          scene_snapshot && JSON.parse(scene_snapshot)[0]['DownloadUrl'];
        this.currectPanelBg = panelBg;
      }
    },
    // 修改面板背景
    changePanelBg(data) {
      const panelBg =
        data.img_url && JSON.parse(data.img_url)[0]['DownloadUrl'];
      this.currectPanelBg = panelBg;
    },
    // 获取所有场景
    async loadAllScene() {
      try {
        const {
          data: { rows }
        } = await getFilterRows({
          appKey: appKey,
          sign: sign,
          // worksheetId: "cockpit",
          worksheetId: 'scene',
          pageSize: 100,
          pageIndex: 1,
          notGetTotal: true
        });
        this.scenceList = rows;
      } catch (error) {}
    },
    // 获取所有驾驶舱
    async loadAllCockpit() {
      try {
        const {
          data: { rows }
        } = await getFilterRows({
          appKey: appKey,
          sign: sign,
          worksheetId: 'cockpit',
          // worksheetId: "scene",
          pageSize: 50,
          pageIndex: 1,
          notGetTotal: true
        });
        this.allCockpitList = rows;
        const {
          kbjson = '',
          kuan = 1920,
          gao = 1080,
          cjjson = ''
        } = rows.find(
          (item) => item.rowid === sessionStorage.getItem('rowid')
        ) || {};

        const canvasConfig = this.$store.state.canvasConfig;
        this.$store.commit('SET_CANVASCONFIG', {
          ...canvasConfig,
          width: +kuan,
          height: +gao
        });

        this.sceneViews.width = +kuan;
        this.sceneViews.height = +gao;

        if (kbjson) {
          this.currectPanelData = JSON.parse(kbjson);
          this.currectPanelPageId = JSON.parse(kbjson)[0].id;

          this.drawingList = JSON.parse(JSON.parse(kbjson)[0].content);

          const { scene_snapshot } =
            this.scenceList.find(
              (item) => item.rowid === this.currectPanelData[0].sceneId
            ) || {};
          this.currectPanelBg =
            scene_snapshot && JSON.parse(scene_snapshot)[0]['DownloadUrl'];
          console.log(
            'this.currectPanelData[0]:::::::::::::::::::',
            this.currectPanelData[0]
          );
          this.currectSceneId = this.currectPanelData[0].sceneId;
        } else {
          this.currectPanelData = [{ title: '页面一', id: guid() }];
          this.drawingList = [];
        }
      } catch (error) {
        this.currectPanelData = [{ title: '页面一', id: guid() }];
        this.drawingList = [];
      }
    },
    // 保存数据
    async toSaveData() {
      this.isLoading = true;
      const panelData = this.currectPanelData;
      panelData[this.currectIndex].content = JSON.stringify(this.drawingList);
      const { width, height } = this.$store.state.canvasConfig;
      try {
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: 'cockpit',
          rowId: sessionStorage.getItem('rowid'),
          controls: [
            {
              controlId: 'cjjson',
              value: this.currectSceneId
            },
            {
              controlId: 'kbjson',
              value: JSON.stringify(panelData)
            },
            {
              controlId: 'id',
              value: guid()
            },
            {
              controlId: 'kuan',
              value: width
            },
            {
              controlId: 'gao',
              value: height
            }
          ]
        };
        const result = await editSceneJson(data);
        if (result.success) {
          this.$message.success('保存成功');
        } else {
          this.$message.error('保存失败');
        }
        this.isLoading = false;
      } catch (error) {
        this.$message.error('保存失败');
        this.isLoading = false;
      }
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    closeDialog(status) {
      this.isShowAddDialog = status;
      this.currentData = {};
    },
    //盒子移动到指定盒子
    handleEnd(e) {
      // 判断是否拖拽到画布内
      if (!e.originalEvent.cancelable) {
        this.currentMove = {};
        return;
      }
      // this.currentConfig = {};
      let { component, id, config } = this.currentMove;

      if (this.isContainerEdit()) {
        // const data = this.currentConfig.drawingList.push({
        //   component,
        //   id,
        //   config: deepClone(config),
        // });
        if (containerCom.includes(this.currentConfig.component)) {
          const dom = this.$refs[this.currentConfig.id][0];
          const height = dom.offsetHeight - 300;
          const width = dom.offsetWidth - 300;
          //这里是为了防止拖拽到边界，图形显示不全
          config.left =
            e.originalEvent.offsetX > width ? width : e.originalEvent.offsetX;
          config.top =
            e.originalEvent.offsetY > height ? height : e.originalEvent.offsetY;
          const { drawingList } = this.currentConfig;
          const newDrawingList = drawingList;
          newDrawingList.push({
            component,
            id,
            config: { ...deepClone(config), parentId: this.currentConfig.id }
          });
          this.changeSize('drawingList', newDrawingList);
        } else {
          const { parentId } = this.currentConfig;
          const parentContainerIndex = this.$store.state.drawingList.findIndex(
            (item) => item.id === parentId
          );
          this.drawingList[parentContainerIndex].config.drawingList.push({
            component,
            id,
            config: { ...deepClone(config), parentId }
          });
          const dom = this.$refs[parentId][0].$refs[this.currentConfig.id][0];
          const height = dom.offsetHeight - 300;
          const width = dom.offsetWidth - 300;
          //这里是为了防止拖拽到边界，图形显示不全
          config.left =
            e.originalEvent.offsetX > width ? width : e.originalEvent.offsetX;
          config.top =
            e.originalEvent.offsetY > height ? height : e.originalEvent.offsetY;
        }

        // this.drawingList.push({
        //   component,
        //   id,
        //   config: { ...deepClone(config), parentId: this.currentConfig.id },
        // });
        // console.log(
        //   "this.currentConfig======================",
        //   this.currentConfig
        // );
        // this.$store.commit("SET_CURRENT_CONFIG", data);
      } else {
        const dom = this.$refs.cutScreen;
        const height = dom.offsetHeight - 300;
        const width = dom.offsetWidth - 300;

        //这里是为了防止拖拽到边界，图形显示不全
        // config.left =
        //   e.originalEvent.x > width ? width : e.originalEvent.x;
        // config.top =
        //   e.originalEvent.y > height ? height : e.originalEvent.y;
        config.left =
          (e.originalEvent.x - dom.getBoundingClientRect().left) / this.scale;
        config.top =
          (e.originalEvent.y - dom.getBoundingClientRect().top) / this.scale;

        // console.log("currentMove::::::::::::::::::::2222", , height, width, e,  e.originalEvent.offsetX, e.originalEvent.offsetY);
        if (!this.isClickUndoTools) {
          this.$store.commit('ADD_OPERATIONSTACKLIST', {
            type: 'add',
            id,
            data: this.currentMove
          });
          this.$store.commit('SET_isClickUndoTools', false);
        }

        this.drawingList.push({
          component,
          id,
          config: deepClone(config)
        });
      }
    },
    //克隆盒子
    cloneComponent(e) {
      this.currentMove = {
        id: 'box_' + new Date().getTime(),
        ...e
      };
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
        if (
          val.config.series &&
          !['date', 'table'].includes(val.config.series.type)
        ) {
          this.$refs[val.id][0].myChart.resize();
        }
      });
    },
    //拖拽移动停止
    handleDragStop(e, val, index) {
      val.config.left = e.left;
      val.config.top = e.top;

      this.currentConfig = {
        id: val.id,
        ...val.config,
        component: val.component
      };
    },
    //删除当前图
    removeComponent(e, data) {
      e.stopPropagation();

      // this.drawingList = this.drawingList.filter((item) => item.id !== id);
      // if (this.isClickUndoTools) {
      //   this.$store.commit("ADD_OPERATIONADVANCESTACKLIST", {
      //     type: "add",
      //     id: data.id,
      //     data: data,
      //   });
      //   this.$store.commit("SET_isClickUndoTools", false);
      //   console.log(
      //     "isClickUndoTools:::::::::::::::::22",
      //     this.$store.state.operationAdvanceStackList
      //   );
      // }

      if (!this.isClickUndoTools) {
        this.$store.commit('ADD_OPERATIONSTACKLIST', {
          type: 'delete',
          id: data.id,
          data: data
        });
        this.$store.commit('SET_ISCLICKADVANCETOOLS', false);
      }

      this.drawingList.splice(
        this.drawingList.findIndex((item) => item.id === data.id),
        1
      );
      this.currentConfig = {};
    },
    //点击选中当前拖拽的组件
    handleComponentClick(e, item) {
      e.stopPropagation();

      if (item.id == this.currentConfig.id) return;
      this.currentConfig = {
        id: item.id,
        ...item.config,
        component: item.component
      };
      this.$store.commit('SET_CONTAINTERCONFIG', this.currentConfig);
    },
    //修改setting
    changeSize(key, value) {
      // this.$refs[
      //   "container_" + this.$store.state.currentConfig.id
      // ][0].$el.style.display = newVal ? "block" : "none";
      
      if (
        this.isContainerEdit() &&
        !containerCom.includes(this.currentConfig.component)
      ) {
        const { parentId, id } = this.currentConfig;
        const parentContainerIndex = this.$store.state.drawingList.findIndex(
          (item) => item.id === parentId
        );
        this.currentConfig[key] = value;
        const currentConfigIndex = this.drawingList[
          parentContainerIndex
        ].config.drawingList.findIndex((item) => item.id === id);
        this.drawingList[parentContainerIndex].config.drawingList[
          currentConfigIndex
        ].config[key] = value;
      } else {
        this.drawingList.forEach((item) => {
          if (item.id === this.currentConfig.id) {
            item.config[key] = value;
            console.log("item::::::", item)
            this.currentConfig = {
              id: item.id,
              ...item.config,
              component: item.component
            };
          }
        });
      }
      // console.log("key:::::", key, value)
      this.drawingList.forEach((item, index) => {
        if (item.id == this.currentConfig.id) {
          this.drawingList[index].config[key] = value;
        }
      });
    },
    changeValue(param1, param2, value) {
      if (
        this.isContainerEdit() &&
        !containerCom.includes(this.currentConfig.component)
      ) {
        const { parentId, id } = this.currentConfig;
        const parentContainerIndex = this.$store.state.drawingList.findIndex(
          (item) => item.id === parentId
        );
        this.currentConfig[param1][param2] = value;
        const currentConfigIndex = this.drawingList[
          parentContainerIndex
        ].config.drawingList.findIndex((item) => item.id === id);
        this.drawingList[parentContainerIndex].config.drawingList[
          currentConfigIndex
        ].config[param1][param2] = value;
      } else {
        this.drawingList.forEach((item) => {
          if (item.id == this.currentConfig.id) {
            item.config[param1][param2] = value;
          }
        });
      }
    },
    //清除所有
    handleClear() {
      this.drawingList = [];
      this.currentConfig = {};
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  }
};
</script>
