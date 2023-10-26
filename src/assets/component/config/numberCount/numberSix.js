/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-10-13 16:21:50
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-18 15:13:51
 */
export default {
  width: 420,
  height: 160,
  left: 0,
  top: 0,
  name: "数值六",
  sourceType: "静态",
  worksheetId: "shuzhiliu",
  data: [
    {
      name: "设备总数",
      num: 1500,
      unit: "个",
      icon: require("@/assets/image/common/icon1.png"),
      rowid: 1,
    },
    {
      name: "球机数量",
      num: 500,
      unit: "个",
      icon: require("@/assets/image/common/icon1.png"),
      rowid: 2,
    },
    {
      name: "枪机数量",
      num: 1000,
      unit: "个",
      icon: require("@/assets/image/common/icon1.png"),
      rowid: 3,
    },
    {
      name: "掉线设备",
      num: 18,
      unit: "个",
      icon: require("@/assets/image/common/icon1.png"),
      rowid: 4,
    },
  ],
  contain: {
    width: 185,
    height: 60,
    margin: "0, 20, 20, 20",
    padding: "0,14,0,14",
    arrangeNum: 2,
    background: require("@/assets/component/img/numBg1.png"),
    isShowActiveBg: false,
    activeBg: "",
  },
  rowOne: {
    show: true,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    fontFamily: "Microsoft YaHei",
    color: "#fff",
    isShowBg: false,
    isBgImg: true,
    isShowBorder: false,
    paddingLeft: 0,
    width: "auto",
    height: "auto",
    backgroundImg: "",
    borderStyle: {
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "#EBEEF5",
    },
  },
  rowOneBgStyle: {
    isShowColors: false,
    background: "",
    backgroundColors: [],
  },
  titleTxt1: {
    isShowColors: false,
    background: "linear-gradient(180deg, #ffffff 17%, #7eb9ff 81%)",
    backgroundColors: ["#ffffff", "17", "#7eb9ff", "81"],
  },
  bImg: {
    show: true,
    width: 43,
    height: 43,
    marginRight: 5,
  },
  rowTwo: {
    marginTop: 6,
    isShowBg: false,
    isBgImg: true,
    isShowBorder: false,
    paddingLeft: 0,
    width: "auto",
    height: "auto",
    backgroundImg: "",
    borderStyle: {
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "#EBEEF5",
    },
  },
  rowTwoBgStyle: {
    isShowColors: false,
    background: "",
    backgroundColors: [],
  },
  rowTwoTxt1: {
    show: true,
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    fontFamily: "Microsoft YaHei",
    color: "#7EDEFF",
  },
  titleTxt2: {
    isShowColors: false,
    background: "linear-gradient(180deg, #ffffff 17%, #7eb9ff 81%)",
    backgroundColors: ["#ffffff", "17", "#7eb9ff", "81"],
  },
  rowTwoTxt2: {
    show: true,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    fontFamily: "Microsoft YaHei",
    color: "#4498B4",
    marginLeft: 8,
  },
  titleTxt3: {
    isShowColors: false,
    background: "linear-gradient(180deg, #ffffff 17%, #7eb9ff 81%)",
    backgroundColors: ["#ffffff", "17", "#7eb9ff", "81"],
  },
};
