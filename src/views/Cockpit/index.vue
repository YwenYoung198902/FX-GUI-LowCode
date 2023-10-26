<template>
  <div class="cockpitBg">
    <div ref="earthContainer" id="earthContainerCockpit">
      <div class="messageDialog" id="messageDialog"></div>
    </div>
    <div class="preview" ref="preview">
      <component v-for="item in drawingList" :key="item.id" :is="item.component" :config="item.config"
        :style="getStyle(item.config)" :ref="item.id" class="absolute" :isEdit="false" :component="item.component">
      </component>
    </div>
  </div>
</template>

<script>
import stackedLine from "@/components/Charts/lineChart/stackedLine";
import groupBar from "@/components/Charts/barChart/groupBar.vue";
import draggable from "vuedraggable";
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
import smallTitle from "@/components/title/smallTitle";
import Statistic from "@/components/Statistic/statistic.vue";
import SceneSelector from "../componments/SceneSelector";
import navigation from "@/components/Navigation";
import background from "@/components/Background";
import progressBar from "@/components/List/progressBar";
import LayerControl from "@/components/LayerControl/layerControl.vue";
import BasicText from "@/components/Text/text.vue";
import RichEditor from "@/components/Text/richEditor.vue";
import numberCount from "@/components/numberCount";
import importCamera from "@/components/Camera/importCamera";
import splitCameraScreen from "@/components/Camera/splitCameraScreen";
import dateMap from "@/components/date";
import {
  getRowDetail,
  products,
  loadCustomApiData,
  getFilterRows,
} from "@/utils/api";
import { getAppInfo } from "@/utils/index";
import { appKey, sign, multieventComList, formFiled, businessComList } from "@/utils/const.js";
import apiDataProcessing from "../componments/apiDataProcessing";
import reportIdDataProcessing from "../componments/reportIdDataProcessing";
import CarouselPic from "../../components/CarouselPic/index.vue";
import AppraisingCard from "../../components/List/appraisingCard/appraisingCard.vue";
import eventList from "@/components/List/eventList.vue";
import commonTable from "@/components/table/commonTable";
import scrollTable from "@/components/table/scrollTable";
import container from "@/components/contenter";
import selectBox from "@/components/table/select";
import dateTimePicker from "@/components/table/dateTimePicker";
import searchBox from "@/components/table/search";
import popupBox from "@/components/table/popupBox";
import numberScroll from "@/components/NumberCount/numberScroll";
import buttonGroup from "@/components/NumberCount/buttonGroup";
import numberThree from "@/components/NumberCount/numberThree";
import tabPanel from "@/components/title/tabPanel";
import numberFive from "@/components/NumberCount/numberFive";
import numberSix from "@/components/NumberCount/numberSix";
import NumberSteering from "@/components/NumberCount/numberSteering.vue";
import CheckboxGroup from "@/components/LayerControl/checkboxGroup.vue";
import SwitchList from "@/components/List/switchList/index";
import powerBarChart from "@/components/Charts/powerBarChart.vue";
import Track from "@/components/Track/track";
import eventDetail from "@/components/eventDetail";
import danbing from "@/components/Camera/danbing";
import mixedLineandBar from "@/components/Charts/mixedLineandBar/index.vue";
import buttonOne from "@/components/NumberCount/buttonOne";
import weather from "@/components/Weather";
import singleCamera from "@/components/SingleCamera";
import customLegendPie from "@/components/Charts/pie/pieChart";

import personnelHouse from '@/components/Table/personnelHouse';
export default {
  name: "Earth",
  components: {
    customLegendPie,
    mixedLineandBar,
    stackedLine,
    groupBar,
    dateTimePicker,
    NumberSteering,
    CheckboxGroup,
    eventList,
    importCamera,
    splitCameraScreen,
    LayerControl,
    numberCount,
    smallTitle,
    Statistic,
    SceneSelector,
    navigation,
    background,
    dateMap,
    progressBar,
    draggable,
    barChart,
    lineChart,
    pieChart,
    liquidChart,
    gaugeChart,
    wordChart,
    radarChart,
    treeChart,
    BasicText,
    RichEditor,
    numberScroll,
    buttonGroup,
    numberThree,
    tabPanel,
    CarouselPic,
    AppraisingCard,
    commonTable,
    scrollTable,
    container,
    searchBox,
    selectBox,
    popupBox,
    powerBarChart,
    SwitchList,
    numberFive,
    numberSix,
    powerBarChart,
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
      message: "页面加载于 " + new Date().toLocaleString(),
      _earth: undefined, // 注意：Earth和Cesium的相关变量放在vue中，必须使用下划线作为前缀！
      _bgImagery: undefined,
      //画布盒子list
      drawingList: [],
      pageList: [],
      sceneId: "",
      floatDrawingList: [],
      czmObject: {},
      billBoardList: [],
    };
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      customClass: 'loading',
      spinner: "el-icon-loading",
      background: "rgba(4,21,27, 0.7)",
    });
    
    this.loadPanel(() => {
      loading.close();
    });
  },
  beforeDestroy() {
    this._earth && this._earth.labScene.destroy();
  },
  methods: {
    // 讲面板数据扁平化
    floatDrawingListFunc(data) {
      data.forEach((item) => {
        if (item.config.drawingList && item.config.drawingList.length) {
          this.floatDrawingList.push(item);
          this.floatDrawingListFunc(item.config.drawingList);
        } else {
          this.floatDrawingList.push(item);
        }
      });
    },
    // 初始化earth插件
    loadEarth(cb) {
      let cloneXbsjEarthUI = null;
      if (this.$store.state.XbsjEarthUI) {
        cloneXbsjEarthUI = this.$lodash.cloneDeep(
          this.$store.state.XbsjEarthUI
        );
      } else {
        this.$store.commit("SET_XBSJEARTHUI", XbsjEarthUI);
        cloneXbsjEarthUI = XbsjEarthUI;
      }

      cloneXbsjEarthUI.create("earthContainerCockpit").then(async (earthUI) => {
        this._earth = earthUI;
        earthUI.controls.mainBar.show = false;
        earthUI._vm.$refs.mainUI.$refs.statusBarControl.show = false;
        // 隐藏图层管理
        earthUI.tools.sceneTree.show = false;
        // 监听鼠标事件
        earthUI._earthApi.watchLeftClick(this.watchLeftClick);
        earthUI._earthApi.watchMouseMove(this.watchMouseMove);
        cb && cb();
        // const rowId = sessionStorage.getItem("rowid");
        // await this._earth.labScene.loadScene(rowId);
      });
    },
    // 监听地球鼠标悬浮事件
    watchMouseMove(pick) {
      if (pick && pick.id.canvasPosition) {
        if (pick.id.customAttribute.showTitle) {
          const { title } = pick.id.customAttribute;
          const messageDialog = document.getElementById("messageDialog");
          messageDialog.innerHTML = `${this.contentReplacement(
            title.text,
            pick.id.customAttribute
          )}`;
          messageDialog.style.cssText = `
                  position: absolute;
                  width: ${title.width}px;
                  height: ${title.height}px;
                  color: ${title.color};
                  top: ${pick.id.canvasPosition.y - title.offsetY}px;
                  left: ${pick.id.canvasPosition.x - title.width / 2}px;
                  z-index: 99;
                  overflow: hidden;
                  text-align: ${title.textAlign};
                  background-image: url('${title.bgImg}');
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;
                  line-height: ${title.height}px;
              `;
          messageDialog.style.display = "block";
        }
      } else {
        messageDialog.style.display = "none";
      }
    },
    // 监听地球鼠标点击事件
    watchLeftClick(pick) {
      if (pick && pick.id) {
        const poiDialog = this.drawingList.find(
          (item) =>
            item.config.isRelationPoi &&
            item.config.relationLayerId.includes(
              pick.id.customAttribute.layerRowid
            )
        );

        const clickObj = this.billBoardList.find(
          (item) => item.customAttribute.rowid === pick.id.customAttribute.rowid
        );
        clickObj && clickObj.flyTo();
        if (poiDialog) {
          this.$refs[poiDialog.id][0].updateComponentData(
            pick.id.customAttribute
          );
        }
      }
    },
    // 通过reportId加载数据
    async loadComReportIdData({ config, component }) {
      const { data } = await products({
        reportId: config.reportId || "649d4d35c59bb72b46ab1bbd",
        version: "6.5",
        reload: false,
        filters: [],
      });
      let componentData;
      if (config.isShowDataFilter && config.datafilterFunc) {
        const datafilterFunc = eval(config.datafilterFunc);
        componentData = datafilterFunc(data);
      } else {
        componentData = await reportIdDataProcessing[component](data);
      }

      return componentData;
    },
    // 通过worksheetid加载数据
    async loadComWorksheetData({ config }) {
      const { data: { rows } } = await getFilterRows({
        appKey,
        sign,
        viewId: config.viewId,
        "worksheetId": config.worksheetId,
        "pageSize": 100,
        "pageIndex": 1
      })
      return rows;
    },
    // 通过api加载数据
    async loadComApiData(comData) {
      const { config, component, componentParams = "" } = comData;
      try {
        const api = config.api || "http://192.168.6.66/report/report/getData";
        let params = config.requestParams || {};
        if (componentParams) {
          params = { ...params, ...JSON.parse(componentParams) };
        }
        const { data } = await loadCustomApiData({
          api,
          type: config.requestType,
          data: params,
        });
        let componentData;
        if (config.isShowDataFilter && config.datafilterFunc) {
          const datafilterFunc = eval(config.datafilterFunc);
          componentData = datafilterFunc(data);
        } else {
          componentData = await apiDataProcessing[component](
            data,
            comData.config
          );
          // componentData = await apiDataProcessing[component](data);
        }

        // 组件依赖组件接口返回数据做下一步逻辑处理
        if (component === "checkboxGroup") {
          this.comDataProcessing(componentData, comData);
        }

        return componentData;
      } catch (error) {
        console.log("error::::::::::::::", error, comData);
        this.$message({
          type: "error",
          message: "请求失败",
        });
      }
    },
    // 处理所有组件的数据
    async loadComData(data) {
      const comData = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index].config.sourceType === "静态") {
          comData.push(data[index]);
        } else if (data[index].config.sourceType === "reportId") {
          const tmp = await this.loadComReportIdData(data[index]);
          const comItem = data[index];
          comItem.config.data = tmp;
          comData.push(comItem);
        } else if (data[index].config.sourceType === "api") {
          const tmp = await this.loadComApiData(data[index]);
          const comItem = data[index];
          comItem.config.data = tmp;
          comData.push(comItem);
        } else if (data[index].config.sourceType === "工作表") {
          const tmp = await this.loadComWorksheetData(data[index]);
          const comItem = data[index];
          comItem.config.data = tmp;
          comData.push(comItem);
        } else {
          comData.push(data[index]);
        }
      }
      return comData;
    },
    // 将点位的变量替换
    contentReplacement(str = "", componentData) {
      const keys = Object.keys(componentData);
      let resultStr = str;
      for (let index = 0; index < keys.length; index++) {
        if (str.includes(`{{${keys[index]}}}`)) {
          resultStr = str.replace(
            `{{${keys[index]}}}`,
            componentData[keys[index]]
          );
        }
      }
      return resultStr;
    },
    // 创建地图点位
    creatScenePin(componentData, czmObject) {
      const { json, is_selected } = componentData;
      const billBoardList = [];
      if (!json) {
        this.$message({
          type: "error", // success error warning
          message: "请先配置点位样式",
          duration: 2000,
        });
        return;
      }
      const billBoardData = JSON.parse(json)[0].czmObject.customProp;
      const positions = czmObject.position
        .split(",")
        .map((item) => Number(item));
      const { show, position, distanceDisplayCondition } = billBoardData;
      const { showTitle, title = {} } = billBoardData;
      billBoardData.boardList.forEach((element) => {
        // label文字
        element.label.text = this.contentReplacement(
          element.label.text,
          czmObject
        );
        const billBoard = this._earth._earthApi.createCustomBillBoard({
          customAttribute: {
            id: componentData.rowid,
            type: "building",
            showTitle,
            title,
            ...czmObject,
          },
          show: is_selected === 1,
          position: positions,
          distanceDisplayCondition,
          ...element,
        });
        billBoardList.push(billBoard);
      });
      this.billBoardList.push(...billBoardList);
    },
    // 添加地图区域
    creatSceneArea(componentData, czmObject) {
      const { json, is_selected } = componentData;
      if (!json) {
        this.$message({
          type: "error", // success error warning
          message: "请先配置区域样式",
          duration: 2000,
        });
        return;
      }
      const positions = czmObject.position
        .split(",")
        .map((item) => Number(item));
      this._earth._earthApi.addPolygon({
        customAttribute: {
          id: componentData.rowid,
          type: "building",
          ...czmObject,
        },
        title: "网格004555",
        czmObject: {
          positions: positions,
          height: 0,
          ground: true,
          show: is_selected === 1,
        },
      });
    },
    // 组件数据自定义处理
    async comDataProcessing(componentData, comData) {
      // 获取点前页面的所有坐标信息
      const czmObject = [];
      const appkeyList = localStorage.getItem("appkeyList")
        ? JSON.parse(localStorage.getItem("appkeyList"))
        : [];
      for (let index = 0; index < componentData.length; index++) {
        const itemId = componentData[index]["relation_id"];
        const itemAppId = componentData[index]["relation_app_id"];
        const appInfo = componentData.find(
          (item) => item.relation_app_id === itemAppId
        );
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: itemId,
          rowId: sessionStorage.getItem("rowid"),
          pageIndex: 1,
          pageSize: 100,
        };

        const {
          data: { rows },
        } = await getFilterRows(data);
        // console.log("rows:::::::::::::::", rows, componentData[index])
        let associationConditionList = [];
        let rowsNew = [];
        if (componentData[index].associationCondition) {
          const conditionList =
            componentData[index].associationCondition.split("&");
          for (let index = 0; index < conditionList.length; index++) {
            associationConditionList.push(conditionList[index].split("="));
          }
          for (let index = 0; index < rows.length; index++) {
            let isCover = 0;
            for (let i = 0; i < associationConditionList.length; i++) {
              const key = associationConditionList[i][0];
              const value = associationConditionList[i][1];
              if (rows[index][key] === value) {
                ++isCover;
              }
            }
            if (isCover === associationConditionList.length) {
              rowsNew.push(rows[index]);
            }
          }
        } else {
          rowsNew = rows;
        }

        czmObject[index] = rowsNew.map((item) => {
          return { ...item, layerRowid: componentData[index].rowid };
        });
      }
      // 将当前页面的所有图标点加载到地图中
      const czmList = czmObject;

      for (let index = 0; index < czmList.length; index++) {
        const { json, type } = componentData[index];
        for (let inx = 0; inx < czmObject[index].length; inx++) {
          if (type === "区域") {
            // 添加场景对象
            this.creatSceneArea(componentData[index], czmObject[index][inx]);
          }

          if (type === "点位") {
            this.creatScenePin(componentData[index], czmObject[index][inx]);
          }
        }
      }

      this.czmObject = czmObject;
    },
    // 获取场景信息
    async loadSceneData(rowId) {
      const {
        data: { scene_json },
      } = await getRowDetail({
        appKey: appKey,
        sign: sign,
        worksheetId: "scene",
        rowId,
      });
      //解析场景内容
      var jc = scene_json
        ? JSON.parse(scene_json)
        : {
          sceneTree: {
            root: {
              children: [],
            },
          },
          cameraViewManager: {
            globe: {
              position: [
                2.1031217486531677, 0.5042461979915104, 22191651.019924622,
              ],
              rotation: [0, -1.5704894508531937, 0],
              near: 0.1,
              far: 10000000000,
            },
            china: {
              position: [
                1.8770894704964525, 0.662547523843314, 8511735.797037361,
              ],
              rotation: [0, -1.5701114159178209, 0],
              near: 0.1,
              far: 10000000000,
            },
            lastView: {
              position: [
                1.3473465131986337, 0.9717354586405952, 12708692.488181122,
              ],
              rotation: [6.283185307179576, -1.570783974496222, 0],
              fov: 1.0471975511965976,
              near: 0.1,
              far: 10000000000,
            },
          },
          cameraFlight: {
            xbsjType: "CameraFlight",
            xbsjGuid: "aa72ded1-e4b4-4535-9a23-4fe88c1072ee",
            rotateGlobe: {
              xbsjType: "RotateGlobe",
              xbsjGuid: "4b574de4-fa2a-455b-a0de-46139c09b925",
              latitude: 0.6632251157578453,
            },
            rotateCenter: {
              xbsjType: "RotateCenter",
              xbsjGuid: "4e8a8cca-70ba-4aa6-bf88-d48423435ee8",
              pitch: -0.5235987755982988,
            },
            track: {
              xbsjType: "CameraTrack",
              xbsjGuid: "8201a249-e53b-4869-bd59-1d079ea69351",
            },
          },
          weather: {
            fog: {},
            sun: {},
            skyBox: {},
            moon: {},
            rain: {},
            snow: {},
            cloud: {},
            atmosphere: {},
            rainPostProcess: {},
            snowPostProcess: {},
            fogPostProcess: {},
          },
          terrainEffect: {
            elevation: {
              xbsjType: "ElevationRamp",
              xbsjGuid: "5a90a913-d28c-41f6-834e-310b8eaad681",
            },
            slope: {
              xbsjType: "SlopeRamp",
              xbsjGuid: "5024412d-6990-43c1-9be4-13b79844a1ea",
            },
            aspect: {
              xbsjType: "AspectRamp",
              xbsjGuid: "90264789-a47b-41db-88e0-6c123c91e361",
            },
            contour: {},
            restrict: {},
            globeTranslucency: {},
          },
          postProcess: {
            xbsjType: "PostProcess",
            xbsjGuid: "075cb105-bc75-4ae3-b05e-e699257ff03e",
            ambientOcclusion: {
              xbsjType: "AmbientOcclusionStage",
              xbsjGuid: "51fff25f-5bfc-4f2a-a72c-f6185ad7c37f",
            },
            bloom: {
              xbsjType: "BloomStage",
              xbsjGuid: "98ef1463-a459-40ae-8520-06993a3f0537",
            },
            blackAndWhite: {
              xbsjType: "BlackAndWhiteStage",
              xbsjGuid: "ac2de187-d2fe-444c-abf5-77e31888fd8c",
            },
            brightness: {
              xbsjType: "BrightnessStage",
              xbsjGuid: "06e5ba06-e6e4-4f44-94cf-c5a4e6b66f8b",
            },
            depthOfField: {
              xbsjType: "DepthOfFieldStage",
              xbsjGuid: "829bf23a-5fb6-448e-a58f-5d0693c84463",
            },
            lensFlare: {
              xbsjType: "LensFlareStage",
              xbsjGuid: "62e1e4eb-7d19-44e7-83e2-eee382130b1b",
            },
            mosaic: {
              xbsjType: "MosaicStage",
              xbsjGuid: "6248a0da-3013-4d8c-b811-9305748a45ed",
            },
            nightVision: {
              xbsjType: "NightVisionStage",
              xbsjGuid: "97a1432f-4b86-4b6b-92da-b7d03431fa5e",
            },
            silhouette: {
              xbsjType: "XbsSilhouetteStage",
              xbsjGuid: "120c28bd-e451-48df-a753-289118f86f89",
            },
          },
          effect: {
            xbsjType: "Effect",
            xbsjGuid: "5e8ef13c-4199-46c2-bddd-48d6bf573834",
            shadow: {
              xbsjType: "Shadow",
              xbsjGuid: "c7820b61-6019-43a8-96fd-a28badd193b0",
            },
            forceSunPos: {
              position: [2.0245819323134224, 0.6981317007977318, 10000000],
            },
          },
          camera: {},
          interaction: { picking: {} },
          ionDefaultAccessToken: "",
        };
      this._earth.earth.xbsjFromJSON(jc);
    },
    // 加载组件
    async loadPanel(cb) {
      let currectPanelData;

      // 是否是预览状态
      const panelData = sessionStorage.getItem("panelData");
      if (panelData) {
        currectPanelData = JSON.parse(panelData)[0];
        this.pageList = JSON.parse(panelData);
      } else {
        const {
          data: { kbjson },
        } = await getRowDetail({
          appKey: appKey,
          sign: sign,
          worksheetId: "cockpit",
          rowId: sessionStorage.getItem("rowid"),
        });
        this.pageList = JSON.parse(kbjson);
        currectPanelData = JSON.parse(kbjson)[0];
      }
      // 当前大屏是否配置了 场景
      if (currectPanelData.sceneId) {
        this.loadEarth(async () => {
          this.sceneId = currectPanelData.sceneId;
          this.loadSceneData(currectPanelData.sceneId);
          this.drawingList = await this.loadComData(
            JSON.parse(currectPanelData.content)
          );
          this.floatDrawingListFunc(this.drawingList);
          cb && cb();
          this.$nextTick(() => {
            // 绑定事件
            this.bindEvents(this.drawingList);
          });
        });
      } else {
        this.drawingList = await this.loadComData(
          JSON.parse(currectPanelData.content)
        );
        this.floatDrawingListFunc(this.drawingList);
        cb && cb();
        this.$nextTick(() => {
          // 绑定事件
          this.bindEvents(this.drawingList);
        });
      }
    },
    // 事件类型枚举
    getEventMenu(type, data) {
      // _this.showAndHidden(data);
      switch (type) {
        // 控制显示隐藏
        case "showAndHidden":
          this.showAndHidden(data);
          break;
        // 组件传参
        case "parameterPassing":
          this.parameterPassing(data);
          break;
        // 组件显示
        case "show":
          this.show(data);
          break;
        // 组件隐藏
        case "hidden":
          this.hidden(data);
          break;
        // 跳转新页面
        case "jumpLink":
          this.jumpLink(data);
          break;
        // 飞到地图点位
        case "flyTo":
          this.flyTo(data);
          break;
        // 切换页面
        case "switchPage":
          this.switchPage(data);
          break;
        // 组件动态传参传递
        case "dynamicParameterPassing":
          this.dynamicParameterPassing(data);
          break;
        // 切换表格组件展示效果
        case "componentParameterPassing":
          this.componentParameterPassing(data);
          break;
        // 控制图层显隐
        case "layerControl":
          this.layerControl(data);
          break;
        default:
          break;
      }
    },
    // 绑定click事件
    bindClickEvents(item, data, type = 'addEventListener') {
      const isMultieventCom = multieventComList.includes(item.component);
      const isContainerChildCom = item.config.parentId;
      let eventDom;
      if (isContainerChildCom) {
        // 是否是容器组件的自组件
        // 是否是容器组件
        eventDom = isMultieventCom
          ? this.$refs[item.config.parentId][0].$refs[item.id][0].$refs.eventDom
          : this.$refs[item.config.parentId][0].$refs[item.id][0].$el;

        // 获取自组件dom
        if (
          isMultieventCom &&
          this.$refs[item.config.parentId][0].$refs[item.id][0].$children[0]
        ) {
          const childrenDom =
            this.$refs[item.config.parentId][0].$refs[item.id][0].$children[0]
              .$refs.eventDom;
          eventDom = eventDom ? eventDom.concat(childrenDom) : [...childrenDom];
        }
      } else {
        eventDom = isMultieventCom
          ? this.$refs[item.id][0].$refs.eventDom
          : this.$refs[item.id][0].$el;

        // 获取自组件dom
        if (isMultieventCom && this.$refs[item.id][0].$children[0]) {
          // const childrenDom =
          //   this.$refs[item.id][0].$children[0].$refs.eventDom;
          const childrenDom =
            this.$refs[item.id][0].$children[0].$refs.eventDom;
          // this.$refs[item.id][0].$children[0].$refs.eventDom;
          eventDom = eventDom ? eventDom.concat(childrenDom) : [...childrenDom];
        }
      }
      // 组件交互事件枚举集合
      item.config.clickEventList.forEach((eventList, index) => {
        const domObj = isMultieventCom ? eventDom[index] : eventDom;
        if (domObj) {
          domObj.style["pointer-events"] = "all";
          domObj.style["cursor"] = "pointer";
          domObj[type]("click", (e) => {
            e.stopPropagation()
            eventList.movementList.forEach((event, inx) => {
              if (event.eventAssociatedComponentIds.length > 0) {
                event.eventAssociatedComponentIds.forEach((targetId) => {
                  // // 添加事件
                  this.getEventMenu(event.movement, {
                    targetId,
                    source: item,
                    data,
                    targetIndex: index,
                    movementListIndex: inx,
                    type: "multiple",
                  });
                });
              } else {
                // 添加事件
                this.getEventMenu(event.movement, {
                  source: item,
                  targetIndex: index,
                  movementListIndex: inx,
                  data,
                  type: "multiple",
                });
              }
            });
          });
        }
      });
    },
    // 绑定Lineclick事件
    bindLineClickEvents(item, data) {
      const isContainerChildCom = item.config.parentId;
      let eventDom;
      if (isContainerChildCom) {
        // 是否是容器组件的自组件
        // 是否是容器组件
        eventDom = this.$refs[item.config.parentId][0].$refs[item.id][0];
      } else {
        eventDom = this.$refs[item.id][0];
      }
      // const that = this
      const callBack = (row) => {
        // 组件交互事件枚举集合
        item.config.lineClickEventList.forEach((eventList, index) => {
          eventList.movementList.forEach((event, inx) => {
            if (event.eventAssociatedComponentIds.length > 0) {
              event.eventAssociatedComponentIds.forEach((targetId) => {
                // this.showAndHidden(data)box_1692598617148
                // // 添加事件
                this.getEventMenu(event.movement, {
                  targetId,
                  source: item,
                  data,
                  targetIndex: index,
                  movementListIndex: inx,
                  rowData: row,
                  // type: "multiple",
                });
              });
            } else {
              // 添加事件
              this.getEventMenu(event.movement, {
                source: item,
                targetIndex: index,
                movementListIndex: inx,
                data,
                rowData: row,
                // type: "multiple",
              });
            }
          });
        });
      };

      eventDom._props.callBack = callBack;
    },
    // 绑定changeFiledEventList事件
    bindchangeFiledEvents(item, data) {
      const isContainerChildCom = item.config.parentId;
      let eventDom;
      if (isContainerChildCom) {
        // 是否是容器组件的自组件
        // 是否是容器组件
        eventDom = this.$refs[item.config.parentId][0].$refs[item.id][0];
      } else {
        eventDom = this.$refs[item.id][0];
      }
      // const that = this
      const callBack = (row) => {
        // 组件交互事件枚举集合
        item.config.changeFiledEventList.forEach((eventList, index) => {
          eventList.movementList.forEach((event, inx) => {
            if (event.eventAssociatedComponentIds.length > 0) {
              event.eventAssociatedComponentIds.forEach((targetId) => {
                // this.showAndHidden(data)box_1692598617148
                // // 添加事件
                this.getEventMenu(event.movement, {
                  targetId,
                  source: item,
                  data,
                  targetIndex: index,
                  movementListIndex: inx,
                  rowData: row,
                  // type: "multiple",
                });
              });
            } else {
              // 添加事件
              this.getEventMenu(event.movement, {
                source: item,
                targetIndex: index,
                movementListIndex: inx,
                data,
                rowData: row,
                // type: "multiple",
              });
            }
          });
        });
      };

      eventDom._props.callBack = callBack;
    },
    // 绑定事件
    bindEvents(data, type) {
      console.log("data::::::::2222", data)
      // 需要特殊处理的组件
      data.forEach((item, index) => {
        // 是否是表单组件
        if (formFiled.includes(item.component)) {
          this.bindchangeFiledEvents(item, data);
        } else {
          // 处理点击事件
          if (
            item.config.clickEventList &&
            item.config.clickEventList.length > 0
          ) {
            this.bindClickEvents(item, data, type);
          }

          // 处理点击行事件
          if (
            item.config.lineClickEventList &&
            item.config.lineClickEventList.length > 0
          ) {
            this.bindLineClickEvents(item, data);
          }
        }
        // 给容器内部子组件绑定事件
        if (item.config.drawingList) {
          this.bindEvents(item.config.drawingList);
        }
      });
    },
    // 切换显示和隐藏
    async showAndHidden({ targetId, source, data }) {
      // 判断点击组件是否是容器组件内部
      if (source.config.parentId && source.config.parentId !== targetId) {
        this.$refs[source.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule =
          !this.$refs[source.config.parentId][0].$refs[targetId][0].config
            .isShowModule;
        return;
      }

      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );
      // 判断目标是否是容器组件内部
      if (targetObject.config.parentId && !source.config.parentId) {
        this.$refs[targetObject.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule =
          !this.$refs[targetObject.config.parentId][0].$refs[targetId][0].config
            .isShowModule;
        return;
      }

      this.$refs[targetId][0].config.isShowModule =
        !this.$refs[targetId][0].config.isShowModule;
    },
    // 组件传参
    async parameterPassing({
      targetId,
      source,
      data,
      targetIndex,
      type = "entirety",
      movementListIndex,
    }) {

      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );
      const eventDom = data.find((el) => el.id === targetId);
      const comData = await this.loadComApiData({
        ...targetObject,
        ...eventDom,
        componentParams:
          type === "entirety"
            ? source.config.componentParams
            : source.config.clickEventList[targetIndex].movementList[
              movementListIndex
            ].componentParams,
      });

      // 判断目标是否是容器组件内部
      if (targetObject.config.parentId && !source.config.parentId) {
        this.$refs[targetObject.config.parentId][0].$refs[
          targetId
        ][0].config.data = comData;
        return;
      }

      this.$refs[targetId][0].config.data = comData;
    },
    // 组件动态传参传递
    async dynamicParameterPassing({
      targetId,
      source,
      data,
      targetIndex,
      type = "entirety",
      movementListIndex,
      rowData = {},
    }) {
      let componentParamsObj = {};
      // 是否是表单组件
      if (formFiled.includes(source.component)) {
        // 时间选择器组件单独处理
        if (source.component === "dateTimePicker") {
          const startTimePicker =
            source.config.changeFiledEventList[targetIndex].movementList[
              movementListIndex
            ].startTimePicker;
          const endTimePicker =
            source.config.changeFiledEventList[targetIndex].movementList[
              movementListIndex
            ].endTimePicker;
          componentParamsObj[startTimePicker] = rowData[0];
          componentParamsObj[endTimePicker] = rowData[1];
        } else {
          const componentParams =
            source.config.changeFiledEventList[targetIndex].movementList[
              movementListIndex
            ].selectBoxValue;
          componentParamsObj[componentParams] = rowData;
        }
      } else {
        const componentParams =
          source.config.lineClickEventList[targetIndex].movementList[
            movementListIndex
          ].componentParams;
        componentParamsObj = componentParams && JSON.parse(componentParams);
        Object.keys(componentParamsObj).forEach((key) => {
          componentParamsObj[key] = rowData[componentParamsObj[key]];
        });
      }
      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );
      const eventDom = data.find((el) => el.id === targetId);
      const comData = await this.loadComApiData({
        ...targetObject,
        ...eventDom,
        componentParams: JSON.stringify(componentParamsObj),
      }).catch((err) => console.log("err:::::::::::", err));

      // 判断目标是否是容器组件内部
      if (targetObject.config.parentId && !source.config.parentId) {
        this.$refs[targetObject.config.parentId][0].$refs[
          targetId
        ][0].config.data = comData;
        return;
      }

      this.$refs[targetId][0].config.data = comData;
    },
    // 切换页面
    async switchPage({
      targetId,
      source,
      data,
      type = "entirety",
      targetIndex,
      movementListIndex,
    }) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(4,21,27, 0.7)",
        customClass: 'loading'
      });
      const switchPageId =
        type === "entirety"
          ? source.config.switchPageId
          : source.config.clickEventList[targetIndex].movementList[
            movementListIndex
          ].switchPageId;
      
      this.bindEvents(this.drawingList, 'removeEventListener')
      const { content = "[]", sceneId } = this.pageList.find(
        (item) => item.id === switchPageId
      );
      if (this._earth) {
        this._earth._earth.czm.viewer.entities.removeAll();
      }
     
      // this.drawingList = JSON.parse(content);
      this.floatDrawingList = [];
      this.drawingList = await this.loadComData(JSON.parse(content));
      this.floatDrawingListFunc(JSON.parse(content));
      if (sceneId !== this.sceneId) {
        this.sceneId = sceneId;
        this.loadSceneData(sceneId);
      }
      
      this.$nextTick(() => {
        this.bindEvents(JSON.parse(content));
        const t = setTimeout(() => {
          loading.close();
          clearTimeout(t);
        }, 2000);
      });
    },
    // 显示
    show({ targetId, source, data }) {
      // 判断是否是容器组件内部
      if (source.config.parentId && source.config.parentId !== targetId) {
        this.$refs[source.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule = true;
        return;
      }
      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );
      // 判断目标是否是容器组件内部
      if (targetObject.config.parentId && !source.config.parentId) {
        this.$refs[targetObject.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule = true;
        return;
      }
      this.$refs[targetId][0].config.isShowModule = true;
    },
    // 隐藏
    hidden({ targetId, source, data }) {
      if (source.config.parentId && source.config.parentId !== targetId) {
        this.$refs[source.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule = false;
        return;
      }

      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );

      // 判断目标是否是容器组件内部
      if (targetObject.config.parentId && !source.config.parentId) {
        this.$refs[targetObject.config.parentId][0].$refs[
          targetId
        ][0].config.isShowModule = false;
        return;
      }

      this.$refs[targetId][0].config.isShowModule = false;
    },
    // 修改组件内部参数
    componentParameterPassing({
      targetId,
      source,
      data,
      type = "entirety",
      targetIndex,
      movementListIndex,
      rowData
    }) {

      const componentParams =
        type === "entirety"
          ? source.config.componentParams
          : source.config.clickEventList[targetIndex].movementList[
            movementListIndex
          ].componentParams;

      const paramsList = componentParams
        ? Object.keys(JSON.parse(componentParams))
        : [];

      const targetObject = this.floatDrawingList.find(
        (item) => item.id === targetId
      );

      // 是否为业务组件
      if (businessComList.includes(targetObject.component)) {
        this.$refs[targetObject.id][0].updateComponentData(rowData)
        return
      }

      paramsList.forEach((item) => {
        if (source.config.parentId && source.config.parentId !== targetId) {
          this.$refs[source.config.parentId][0].$refs[targetId][0].config[
            item
          ] = JSON.parse(componentParams)[item];
          return;
        }

        // 判断目标是否是容器组件内部
        if (targetObject.config.parentId && !source.config.parentId) {
          this.$refs[targetObject.config.parentId][0].$refs[targetId][0].config[
            item
          ] = JSON.parse(componentParams)[item];
          return;
        }

        this.$refs[targetId][0].config[item] =
          JSON.parse(componentParams)[item];
      });
    },
    // 跳转第三方链接
    jumpLink({
      targetId,
      source,
      data,
      type = "entirety",
      targetIndex,
      movementListIndex,
    }) {
      const link =
        type === "entirety"
          ? source.config.jumpLink
          : source.config.clickEventList[targetIndex].movementList[
            movementListIndex
          ].jumpLink;
      window.open(link);
    },
    // 飞到地图点位
    flyTo({
      targetId,
      source,
      data,
      type = "entirety",
      targetIndex,
      movementListIndex,
    }) {
      const filed =
        source.config.clickEventList[targetIndex].movementList[
          movementListIndex
        ].flyToField;
      const pointId = source.config.data[targetIndex][filed];

      this._earth && this._earth._earthApi.flyTo(pointId);
    },
    getStyle(config) {
      const preWidth = window.innerWidth;
      const preHeight = window.innerHeight;
      return {
        left: config.left + "px",
        top: config.top + "px",
        width: config.width + "px",
        height: config.height + "px",
      };
    },
    // 控制图层显隐
    layerControl(data) {
      const { rowData } = data;
      // 是否操作的全选按钮
      if (typeof rowData === "boolean") {
        // 设置区域
        this._earth._earth.sceneTree.root.children.forEach((item) => {
          if (item.czmObject && item.czmObject.customAttribute) {
            item.czmObject.show = rowData;
          }
        });

        // 设置点位
        this.billBoardList.forEach((item) => {
          item.show = rowData;
        });
      } else {
        if (!rowData) {
          return;
        }
        if (rowData.type === "点位") {
          this.billBoardList.forEach((item) => {
            if (item.customAttribute.layerRowid === rowData.rowid) {
              item.show = rowData.is_selected === 1;
            }
          });
        }

        if (rowData.type === "区域") {
          this._earth._earth.sceneTree.root.children.forEach((item) => {
            if (
              item.czmObject &&
              item.czmObject.customAttribute &&
              item.czmObject.customAttribute.layerRowid === rowData.rowid
            ) {
              item.czmObject.show = rowData.is_selected === 1;
            }
          });
        }
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.cockpitBg {
  background-color: #000000;
}

.preview {
  position: fixed;
  z-index: 99;
  pointer-events: none !important;
}

.chart-wrap {
  pointer-events: all !important;
}

#earthContainerCockpit {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.el-loading-mask.loading {

  .el-loading-text,
  .el-icon-loading {
    font-size: 26px;
  }
}
</style>
