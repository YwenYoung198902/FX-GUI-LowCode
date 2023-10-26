/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-08-17 10:42:05
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-18 10:49:11
 */
export default {
  name: "弹窗容器",
  width: 1200,
  height: 900,
  left: 0,
  top: 0,
  box: {
    isShowBackgroundImg: false,
    background: "rgba(14, 39, 70, 0.9)",
    borderWidth: 1,
    borderStyle: "solid",
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
  drawingList: [],
  isShowMask: false,
  maskBackgroundColor: "rgba(1,1,1,0.3)",
};
