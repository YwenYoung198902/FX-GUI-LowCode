/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 17:28:51
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-18 14:57:50
 */
export default {
  name: "导航",
  width: 1920,
  height: 76,
  left: 0,
  top: 0,
  sourceType: "api",
  api:
    "https://www.sjxks.com/v1/xiaokunshan/layer/getPages?account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  requestType: "get",
  worksheetId: "cockpit_navbar",
  data: [],
  box: {
    background: "",
  },
  title: {
    txt: "小昆山镇城市运行管理平台",
    width: 827,
    height: 76,
    lineHeight: 76,
    margin: "0, 0, 0, 0",
    fontSize: 44,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "YouSheBiaoTiHei",
    letterSpacing: 0,
    background: "",
    color: "#10c4d9",
  },
  titleTxt: {
    isShowColors: true,
    background: "linear-gradient(180deg, #ffffff 17%, #7eb9ff 81%)",
    backgroundColors: ["#ffffff", "17", "#7eb9ff", "81"],
  },
  menu: {
    width: 163,
    height: 51,
    lineHeight: 51,
    fontSize: 30,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    color: "#759ac7",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
    cursor: "pointer",
  },
  leftMenu: {
    margin: "10, 0, 0, 20",
    background: require("@/assets/image/xiaokunshan/bg2.png"),
  },
  rightMenu: {
    margin: "10, 20, 0, 0",
    background: require("@/assets/image/xiaokunshan/bg3.png"),
  },
  leftActiveMenu: {
    background: require("@/assets/image/xiaokunshan/bg4.png"),
  },
  rightActiveMenu: {
    background: require("@/assets/image/xiaokunshan/bg5.png"),
  },
  menuTxt: {
    isShowColors: false,
  },
  menuActiveTxt: {
    isShowColors: true,
    background: "linear-gradient(180deg, #ffffff 0%, #7eb9ff 100%)",
    backgroundColors: ["#ffffff", "0", "#7eb9ff", "100"],
  },
};
