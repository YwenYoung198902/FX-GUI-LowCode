export default {
  width: 300,
  height: 275,
  left: 0,
  top: 0,
  name:'数值一',
  show: true,
  lock: true,
  isShowModule: true,
  worksheetId:'szyzj',
  series: {
    type: "",
  },
  contain:{
    width:125,
    height:110,
    marginRight:20,
    marginBottom:20,
    arrangeNum:2,
},
  sourceType: "静态",
  data: [
    {
      name: "自查发现率",
      per: "79.14%",
      txt: "1",
    },
    {
      name: "立案率",
      per: "99.4%",
    },
    {
      name: "结案率",
      per: "100%",
    },
    {
      name: "及时结案率",
      per: "100%",
    },
  ],

  title1: {
    show: true,
    linearTxt: false,
    txtColor: {
      //文本字体渐变色
      txtBackground: ["#FFFFFF", "#7EB9FF"],
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      backgroundClip: " text",
      "text-fill-color": "transparent",
      overflow: "hidden",
    },
    txtFamily: {
      display: "block",
      width: "100%",
      height: "100%",

      position: "absolute",
      fontWeight: "bold",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
    },
    textStylePx: {
      fontSize: "30",
      letterSpacing: "2",
      top: "10",
    },
  },

  backgroundImg1: {
    show: true,
    bgImg: {
      width: "110",
      height: "80",
      left:'5',
      top:'0',
      txt: "图片1",
      background: require("@/assets/component/img/img1.png"),
    },
  },
  title2: {
    show: true,
    linearTxt: false,
    txtColor: {
      //文本字体渐变色
      txtBackground: ["#FFFFFF", "#7EB9FF"],
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      backgroundClip: " text",
      "text-fill-color": "transparent",
      overflow: "hidden",
    },
    txtFamily: {
      display: "block",
      width: "100%",
      // height: "100%",

      position: "absolute",
      fontWeight: "bold",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
    },
    textStylePx: {
      fontSize: "18",
      letterSpacing: "2",
      top: "85",
    },
  },
  backgroundImg2: {
    show: false,
    bgImg: {
      width: "120",
      height: "30",
      background: require("@/assets/component/img/img3.png"),
      top: "110",
      left:'0'
    },
  },
  title3: {
    show: false,
    linearTxt: false,
    txtColor: {
      //文本字体渐变色
      txtBackground: ["#FFFFFF", "#7EB9FF"],
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      backgroundClip: " text",
      "text-fill-color": "transparent",
      overflow: "hidden",
    },
    txtFamily: {
      width: "100%",
      position: "absolute",
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
    },
    textStylePx: {
      fontSize: "14",
      letterSpacing: "0",
      top: "110",
    },
  },
  // 事件相关
  eventAssociatedComponentIds: [],
  eventType: "click",
  movement: "showAndHidden",
  eventList: [{ eventType: "click" }],
  hoverEventList: [],
  clickEventList: [],
  txtRowImgs:[],
};
