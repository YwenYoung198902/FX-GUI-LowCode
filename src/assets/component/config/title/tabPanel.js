/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-08-23 14:00:27
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-25 16:53:36
 */
export default {
  width: 345,
  height: 70,
  left: 0,
  top: 0,
  name: "Tab面板",
  show: true,
  lock: true,
  defaultShow: true,
  worksheetId:'tabmbzj',
  series: {
    type: "",
  },
  sourceType: "静态",
  contain: {
    width: 110,
    height: 30,
    direction: "row",
    defaultIndex: 1,
  },
  data: [{name:"12345事件"},{name: "网格事件"}],
  dataStyle: [{
          isShowTxt:true,
          isShowImg: false,
          img: "",
          activeImg: "",
          width:24,
          height:24,
        },{
          isShowTxt:true,
          isShowImg: false,
          img: "",
          activeImg: "",
          width:24,
          height:24,
        }],
  defaultTxt: {
    color: "#759ac7",
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "#759ac7",
    borderWidth: 1,
    fontSize: "16",
    lineHeight: "30",
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
  },
  ActiveTxt: {
    backgroundColor: "rgba(27, 126, 242, 0.3)",
    borderColor: "#1b7ef2",
    borderWidth: 1,
    color: "#ffffff",
    fontSize: "16",
    lineHeight: "30",
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
  },
};
