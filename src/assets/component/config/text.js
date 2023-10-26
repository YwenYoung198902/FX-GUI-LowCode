/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-01 13:58:48
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-07 10:15:41
 */
export default {
  name: "文本",
  width: 300,
  height: 30,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  isShowModule: true,
  writingMode: "horizontal-tb",
  text: {
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    fontFamily: "微软雅黑",
    letterSpacing: 2,
  },
  data: "这里是文本内容",
  eventAssociatedComponentIds: [],
  eventType: "click",
  movement: 'showAndHidden'
};
