/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:10
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-18 14:59:57
 */
export default {
  name: "弹窗表格",
  width: 1200,
  height: 900,
  left: 0,
  top: 0,
  isShowBackgroundImg: false,
  background: "rgba(14, 39, 70, 0.9)",
  borderWidth: 1,
  borderStyle: "solid",
  sourceType: "api",
  requestType: "post",
  api: "https://www.sjxks.com/v1/xiaokunshan/operation/alarmGatherList",
  requestParams: {
    account_id: "eb71dac7-a4dc-4cbb-9022-251c93acca1e",
    page: 1,
    pageSize: 10,
  },
  box: {
    isShowColors: true,
    borderImage:
      "linear-gradient(0deg, #1b7ef2 0%, rgba(27, 126, 242, 0) 100%) 1",
    borderColors: ["#1b7ef2", "0", "rgba(27, 126, 242, 0)", "100"],
    borderColor: "",
  },
  header: {
    show: true,
    height: 70,
    txt: "事件列表",
    background: require("@/assets/image/xiaokunshan/bg12.png"),
    icon: require("@/assets/image/xiaokunshan/bg13.png"),
    fontSize: 28,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "YouSheBiaoTiHei",
    letterSpacing: 0,
    padding: "0, 20, 0, 20",
    color: "#fff",
    isShowChange: false,
  },
  close: {
    show: true,
    width: 24,
    height: 24,
    background: require("@/assets/image/xiaokunshan/bg11.png"),
  },
  headerTxt: {
    isShowColors: true,
    background: "linear-gradient(180deg, #ffffff 0%, #68aeff 100%)",
    backgroundColors: ["#ffffff", "0", "#7eb9ff", "100"],
  },
  selection: {
    background: "rgba(30, 67, 102, 0.5)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(67, 139, 211, 0.5)",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    color: "#fff",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
    margin: "20,20,20,20",
    borderRadius: 4,
  },
  dropdownBox: {
    boxbackground: "#061729",
    borderColor: "rgba(135, 205, 255, 0.5)",
    timebackground: "#003351",
    hoverBackground: "#3D8CFF",
  },
  table: {
    align: "center",
    indexShow: false,
    borderShow: false,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#EBEEF5",
    height: 660,
    theader: {
      background: "rgba(125, 221, 255, 0.1)",
      color: "#81b4ff",
      height: 40,
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      fontFamily: "Microsoft YaHei",
      textAlign: "center",
    },
    tbody: {
      height: 60,
      background1: "transparent",
      background2: "rgba(71, 140, 164, 0.1)",
      background3: "rgba(125, 221, 255, 0.3)",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      fontFamily: "Microsoft YaHei",
      letterSpacing: 0,
      color: "#fff",
    },
  },
  card: {
    width: 270,
    height: 282,
    margin: "0,10,20,10",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "left",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
    lineHeight: 30,
    color: "#fff",
    background: "rgba(69, 128, 188, 0.1)",
    button: {
      height: 24,
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      letterSpacing: 0,
    },
  },
  pagination: {
    show: true,
    marginTop: 20,
    background: "#01162C",
    color: "#fff",
    activeBackground: "#45A2FF",
    activeColor: "#143452",
  },
  data: {
    isShow: true,
    selectTypeData: [],
    tableHead: [
      {
        label: "快照",
        value: "alarm_img",
        id: 0,
      },
      {
        label: "事件来源",
        value: "alarm_source",
        id: 1,
      },
      {
        label: "事件名称",
        value: "event_name",
        id: 2,
      },
      {
        label: "事件类型",
        value: "alarm_type",
        id: 3,
      },
      {
        label: "事件等级",
        value: "alarm_level",
        id: 4,
      },
      {
        label: "发生地址",
        value: "address",
        id: 5,
      },
      {
        label: "发生时间",
        value: "alarm_time",
        id: 6,
      },
      {
        label: "事件阶段",
        value: "stage",
        id: 7,
      },
    ],
    tableData: [],
    cardData: [
      {
        label: "",
        value: "event_name",
      },
      {
        label: "",
        value: "alarm_img",
        width: 250,
        height: 146,
      },
      {
        label: "发生时间",
        value: "alarm_time",
      },
      {
        label: "发生地址",
        value: "address",
      },
    ],
    buttonData: [
      {
        value: "stage",
        width: 80,
        background: "rgba(255, 151, 77, 0.1)",
        color: "#FF974D",
      },
      {
        value: "alarm_class",
        width: 80,
        background: "rgba(53, 211, 255, 0.1)",
        color: "#35d3ff",
      },
      {
        value: "alarm_source",
        width: 80,
        background: "rgba(255, 217, 139, 0.1)",
        color: "#ffd98b",
      },
    ],
    total: 10,
  },
  tableHeadStyle: {
    styleData: [],
  },
};
