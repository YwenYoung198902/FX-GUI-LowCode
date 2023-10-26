/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-20 11:26:02
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-20 14:52:34
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-02 10:14:18
 */
import bar from "./config/bar";
import line from "./config/line";
import pie from "./config/pie";
import liquid from "./config/liquid";
import gauge from "./config/gauge";
import word from "./config/word";
import radar from "./config/radar";
import tree from "./config/tree";
import seriesMap from "./config/seriesMap";
import scatterMap from "./config/scatterMap";
import date from "./config/date";
import number from "./config/number";

// 公用配置
import common from "./common";

// 折线图
import conmmonLine from "./config/line/common";
import basicLine from "./config/line/basic-line";
import areaBasic from "./config/line/area-basic";
import stackedLine from "./config/line/stacked-line";

// 柱形图
import conmmonBar from "./config/bar/common";
import basicBar from "./config/bar/basic-Bar";
import stackedBar from "./config/bar/stacked-bar";
import barRace from "./config/bar/bar-race";
import powerBar from "./config/bar/powerBar";
import groupBar from "./config/bar/group-bar";
import mixedLineandBar from "./config/bar/mixedLineandBar";

// 饼图
import commonPie from "./config/pie/common";
import basicPie from "./config/pie/basic-pie";
import doughnut from "./config/pie/doughnut";
import rose from "./config/pie/rose";
import customLegendPie from "./config/pie/customLegendPie";

// 雷达图
import commonRadar from "./config/radar/common";
import basicRadar from "./config/radar/basic-radar";

// 时间
import dateMap from "./config/date/common";
// 导航
import navigation from "./config/navigation";
// 背景
import background from "./config/background";
//文本
import text from "./config/text";
import richEditor from "./config/richEditor";
// 高级组件
import commonTable from "./config/table/common-table";
import scrollTable from "./config/table/scroll-table";
import popupBox from "./config/table/popupBox";
import select from "./config/table/select";
import dateTimePicker from "./config/table/dateTimePicker";
import search from "./config/table/search";
import commonSearch from "./config/table/common";
import track from "./config/map/track";
import weather from "./config/weather";
//视频
import importCamera from "./config/camera";
import splitCameraScreen from "./config/camera/splitCameraScreen";
import danbing from "./config/camera/danbing";
import singleCamera from "./config/singleCamera";
// 容器组件
import tabPanel from "./config/title/tabPanel";
import container from "./config/container";
import eventDetail from "./config/eventDetail";
//列表
import switchList from "./config/list/switchList";
import progressBar from "./config/progressBar";
import appraisingCard from "./config/appraisingCard";
import eventList from "./config/list/eventList";
//图层控制框
import layerControl from "./config/layerControl";
import checkboxGroup from "./config/checkboxGroup";
//统计数量
import statistic from "./config/statistic";
import buttonGroup from "./config/numberCount/buttonGroup";
import buttonOne from "./config/numberCount/buttonOne";
//轮播图
import carouselPic from "./config/carouselPic";
//标题
import smallTitle from "./config/title/common";
//数值
import numberCount from "./config/numberCount";
import numberScroll from "./config/numberCount/numberScroll";
import numberThree from "./config/numberCount/numberThree";
import numberSteering from "./config/numberCount/numberSteering";
import numberFive from "./config/numberCount/numberFive";
import numberSix from "./config/numberCount/numberSix";
// 业务组件
import personnelHouse from "./config/table/personnelHouse";

export default [
  {
    title: "图表",
    icon: "echarts",
    key: "echarts",
    children: [
      {
        component: "lineChart",
        title: "折线图",
        key: "lineChart",
        image: require("./img/line.png"),
        example: [
          {
            title: "基础折线图",
            url: require("@/assets/image/line-simple.png"),
            config: { ...conmmonLine, ...basicLine, ...common },
            component: "lineChart",
          },
          {
            title: "区域面积图",
            url: require("@/assets/image/area-basic.png"),
            config: { ...conmmonLine, ...areaBasic, ...common },
            component: "lineChart",
          },
          {
            title: "折线图堆叠",
            url: require("@/assets/image/area-basic.png"),
            config: { ...conmmonLine, ...stackedLine, ...common },
            component: "stackedLine",
          },
        ],
      },
      {
        component: "barChart",
        title: "柱状图",
        key: "barChart",
        image: require("./img/bar.png"),
        example: [
          {
            title: "基础柱状图",
            url: require("@/assets/image/bar-simple.png"),
            config: { ...conmmonBar, ...basicBar, ...common },
            component: "barChart",
          },
          {
            title: "堆叠柱状图",
            url: require("@/assets/image/bar-stack.png"),
            config: { ...conmmonBar, ...stackedBar, ...common },
            component: "barChart",
          },
          {
            title: "动态排序柱状图",
            url: require("@/assets/image/bar-race-country.png"),
            config: { ...conmmonBar, ...barRace, ...common },
            component: "barChart",
          },
          {
            title: "电量柱状图",
            url: require("@/assets/image/powerBar.jpg"),
            config: { ...conmmonBar, ...powerBar, ...common },
            component: "powerBarChart",
          },
          {
            title: "柱状图群",
            url: require("@/assets/image/powerBar.jpg"),
            config: { ...conmmonBar, ...groupBar, ...common },
            component: "groupBar",
          },
          {
            title: "折柱混合图",
            url: require("@/assets/image/powerBar.jpg"),
            config: { ...conmmonBar, ...mixedLineandBar, ...common },
            component: "mixedLineandBar",
          },
        ],
      },
      {
        component: "pieChart",
        title: "饼图",
        key: "pieChart",
        image: require("./img/pie.png"),
        example: [
          {
            title: "基础饼图",
            url: require("@/assets/image/pie-simple.png"),
            config: { ...commonPie, ...basicPie, ...common },
            component: "pieChart",
          },
          {
            title: "圆环图",
            url: require("@/assets/image/pie-doughnut.png"),
            config: { ...commonPie, ...doughnut, ...common },
            component: "pieChart",
          },
          {
            title: "玫瑰图",
            url: require("@/assets/image/pie-roseType-simple.png"),
            config: { ...commonPie, ...rose, ...common },
            component: "pieChart",
          },
          {
            title: "自定义图例",
            url: require("@/assets/image/pie-roseType-simple.png"),
            config: { ...commonPie, ...customLegendPie, ...common },
            component: "customLegendPie",
          },
        ],
      },
      {
        component: "radarChart",
        title: "雷达图",
        key: "radarChart",
        image: require("@/assets/image/radar.png"),
        example: [
          {
            title: "基础雷达图",
            url: require("@/assets/image/radar.png"),
            config: { ...commonRadar, ...basicRadar, ...common },
            component: "radarChart",
          },
        ],
      },
      // {
      //   component: "liquidChart",
      //   title: "水球图",
      //   key: "liquidChart",
      //   image: require("./img/liquid.png"),
      //   config: liquid,
      //   example: [
      //     { title: "柱形图1", url: require("@/assets/image/5162.png") },
      //     { title: "柱形图2", url: require("@/assets/image/5162.png") },
      //     { title: "柱形图3", url: require("@/assets/image/5162.png") },
      //   ],
      // },
      // {
      //   component: "gaugeChart",
      //   title: "仪表盘",
      //   image: require("./img/gauge.png"),
      //   config: gauge,
      //   example: [
      //     { title: "柱形图1", url: require("@/assets/image/5162.png") },
      //     { title: "柱形图2", url: require("@/assets/image/5162.png") },
      //     { title: "柱形图3", url: require("@/assets/image/5162.png") },
      //   ],
      // },
      // {
      //   component: "wordChart",
      //   title: "词云图",
      //   image: require("./img/word.png"),
      //   config: word,
      // },
      // {
      //   component: "treeChart",
      //   title: "矩形树图",
      //   image: require("./img/tree.png"),
      //   config: tree,
      // },
    ],
  },
  {
    icon: "map",
    key: "map",
    title: "组件",
    children: [
      // {
      //   component: "seriesMap",
      //   title: "分布图",
      //   image: require("../component/img/seriesMap.png"),
      //   config: seriesMap,
      // },
      // {
      //   component: "scatterMap",
      //   title: "散点图",
      //   image: require("../component/img/scatterMap.png"),
      //   config: scatterMap,
      // },
      // {
      //   component: "basicTable",
      //   title: "表格",
      //   key: "basicTable",
      //   image: require("@/assets/image/table.png"),
      //   config: table,
      //   example: [
      //     {
      //       title: "基础表格",
      //       url: require("@/assets/image/table.png"),
      //       config: {},
      //       component: "basicTable",
      //     },
      //   ],
      // },
      {
        component: "eventDetail",
        title: "事件详情",
        key: "eventDetail",
        example: [
          {
            title: "事件详情",
            url: require("../component/img/table.png"),
            config: { ...eventDetail },
            component: "eventDetail",
          },
        ],
      },
      {
        component: "progressBar",
        title: "列表",
        key: "progressBar",
        example: [
          {
            title: "进度条",
            url: require("@/assets/image/progressBar.png"),
            config: { ...progressBar, ...common },
            component: "progressBar",
          },
          {
            title: "事件列表",
            url: require("@/assets/component/img/eventList.png"),
            config: { ...eventList, ...common },
            component: "eventList",
          },
          {
            title: "评优卡片",
            url: require("@/assets/image/appraisingCard.jpg"),
            config: { ...appraisingCard, ...common },
            component: "appraisingCard",
          },
          {
            title: "分页列表",
            url: require("@/assets/image/appraisingCard.jpg"),
            config: { ...switchList, ...common },
            component: "switchList",
          },
        ],
      },
      {
        component: "statistic",
        title: "统计数量",
        key: "statistic",
        example: [
          {
            title: "统计数量",
            url: require("@/assets/image/statistic.jpg"),
            config: { ...statistic, component: "statistic", ...common },
            component: "statistic",
          },
          {
            title: "按钮组",
            url: require("@/assets/component/img/button.jpg"),
            config: { ...buttonGroup, ...common },
            component: "buttonGroup",
          },
          {
            title: "按钮",
            url: require("@/assets/component/img/button.jpg"),
            config: { ...buttonOne, ...common },
            component: "buttonOne",
          },
        ],
      },
      {
        component: "layerControl",
        title: "图层控制框",
        key: "layerControl",
        example: [
          {
            title: "图层控制框",
            url: require("@/assets/image/layerControl.png"),
            config: { ...checkboxGroup, ...common },
            component: "checkboxGroup",
          },
          {
            title: "摄像头复选框",
            url: require("@/assets/image/layerControl.png"),
            config: { ...layerControl, ...common },
            component: "layerControl",
          },
        ],
      },
      {
        component: "dateMap",
        title: "时间",
        key: "date",
        example: [
          {
            title: "时间",
            url: require("@/assets/image/date.png"),
            config: { ...dateMap, ...common },
            component: "dateMap",
          },
        ],
      },
      {
        component: "carouselPic",
        title: "轮播图",
        key: "carouselPic",
        example: [
          {
            title: "轮播图",
            url: require("@/assets/image/picture.jpg"),
            config: { ...carouselPic, ...common },
            component: "carouselPic",
          },
        ],
      },
      {
        component: "smallTitle",
        title: "标题",
        key: "title",
        example: [
          {
            title: "小标题",
            url: require("@/assets/component/img/titlebg.png"),
            config: { ...smallTitle, ...common },
            component: "smallTitle",
          },
        ],
      },
      {
        component: "numberCount",
        title: "数值",
        key: "numberCount",
        example: [
          {
            title: "数值一",
            url: require("@/assets/component/img/shuzhi.jpg"),
            config: { ...numberCount, ...common },
            component: "numberCount",
          },
          {
            title: "数值二",
            url: require("@/assets/component/img/scroll.png"),
            config: { ...numberScroll, ...common },
            component: "numberScroll",
          },
          {
            title: "数值三",
            url: require("@/assets/component/img/number3.png"),
            config: { ...numberThree, ...common },
            component: "numberThree",
          },
          {
            title: "数值五",
            url: require("@/assets/component/img/five.png"),
            config: { ...numberFive, ...common },
            component: "numberFive",
          },
          {
            title: "数值六",
            url: require("@/assets/component/img/number6.png"),
            config: { ...numberSix, ...common },
            component: "numberSix",
          },
          {
            title: "驾驶盘读数",
            url: require("@/assets/component/img/number3.jpg"),
            config: { ...numberSteering, ...common },
            component: "numberSteering",
          },
        ],
      },
      {
        component: "navigation",
        title: "导航",
        key: "navigation",
        example: [
          {
            title: "导航",
            url: require("@/assets/image/navigation.png"),
            config: { ...navigation, ...common },
            component: "navigation",
          },
        ],
      },
      {
        component: "background",
        title: "图片",
        key: "background",
        example: [
          {
            title: "图片",
            url: require("@/assets/image/wrapperBg.png"),
            config: { ...background, ...common },
            component: "background",
          },
        ],
      },
      {
        component: "camera",
        title: "视频",
        key: "camera",
        example: [
          {
            title: "视频",
            url: require("@/assets/image/video.png"),
            config: { ...importCamera, ...common },
            component: "importCamera",
          },
          {
            title: "多屏查看",
            url: require("@/assets/component/img/splitCameraScreen.png"),
            config: { ...splitCameraScreen, ...common },
            component: "splitCameraScreen",
          },
          {
            title: "监控",
            url: require("../component/img/table.png"),
            config: { ...singleCamera },
            component: "singleCamera",
          },
        ],
      },
      {
        component: "文本",
        title: "文本",
        key: "text",
        example: [
          {
            title: "文本",
            url: require("@/assets/image/text.jpg"),
            config: { ...text, ...common },
            component: "basicText",
          },
          {
            title: "富文本",
            url: require("@/assets/image/richText.jpg"),
            config: { ...richEditor, ...common },
            component: "richEditor",
          },
        ],
      },
      // {
      //   icon: "table",
      //   key: "table",
      //   title: "table",
      //   children: [
      //     {
      //       component: "baseTable",
      //       title: "Table表",
      //       image: require("../component/img/table.png"),
      //       config: table,
      //     },
      //   ],
      // },
      {
        component: "seniorCom",
        title: "高级组件",
        key: "seniorCom",
        example: [
          {
            title: "基础表格",
            url: require("@/assets/image/popup-table.png"),
            config: { ...commonTable, ...common },
            component: "commonTable",
          },
          {
            title: "滚动表格",
            url: require("@/assets/image/scroll-table.png"),
            config: { ...scrollTable, ...common },
            component: "scrollTable",
          },

          {
            title: "选择框",
            url: require("@/assets/image/select.png"),
            config: { ...common, ...select, ...commonSearch },
            component: "selectBox",
          },
          {
            title: "时间日期选择",
            url: require("@/assets/image/dateTimePicker.png"),
            config: { ...common, ...dateTimePicker, ...commonSearch },
            component: "dateTimePicker",
          },
          {
            title: "搜索框",
            url: require("@/assets/image/search.png"),
            config: { ...common, ...search, ...commonSearch },
            component: "searchBox",
          },
          {
            title: "轨迹回放",
            url: require("@/assets/component/img/track.png"),
            config: { ...common, ...track },
            component: "Track",
          },
          {
            title: "天气",
            url: require("@/assets/component/img/weather.png"),
            config: { ...common, ...weather },
            component: "weather",
          },
        ],
      },
      {
        title: "Tab面板",
        key: "tabPanel",
        example: [
          {
            title: "Tab面板",
            url: require("@/assets/component/img/tab.png"),
            config: { ...tabPanel, ...common },
            component: "tabPanel",
          },
        ],
      },
      // {
      //   title: "tool",
      //     {
      //       component: "DateComponent",
      //       title: "日期",
      //       img: require("../component/img/date.png"),
      //       config: date,
      //     },
      //     {
      //       component: "NumberComponent",
      //       title: "滚动数字",
      //       img: require("../component/img/number.png"),
      //       config: number,
      //     },
      //   ],
      // },
    ],
  },
  {
    icon: "interaction",
    key: "interaction",
    title: "交互组件",
    children: [
      {
        component: "container",
        title: "容器",
        key: "container",
        example: [
          {
            title: "容器",
            url: require("../component/img/table.png"),
            config: { ...container, ...common },
            component: "container",
          },
          {
            title: "弹窗容器",
            url: require("@/assets/image/popup-box.png"),
            config: { ...popupBox, ...common },
            component: "popupBox",
          },
        ],
      },
    ],
  },
  {
    icon: "business",
    key: "business",
    title: "业务组件",
    children: [
      {
        component: "personnelHouse",
        title: "智慧社区",
        key: "personnelHouse",
        example: [
          {
            title: "人房:一户一楼",
            url: require("../component/img/personnel.png"),
            config: { ...personnelHouse, ...common },
            component: "personnelHouse",
          }
        ],
      },
      {
        component: "IntelligentMonitoring",
        title: "智慧监控",
        key: "IntelligentMonitoring",
        example: [
          {
            title: "单兵",
            url: require("@/assets/image/video.png"),
            config: { ...danbing, ...common },
            component: "danbing",
          }
        ],
      },
    ],
  },
];
