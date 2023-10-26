/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-08-11 17:00:15
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-17 11:34:20
 */
export default {
  // 事件相关
  eventAssociatedComponentIds: [],
  eventType: "click",
  movement: "showAndHidden",
  eventList: [
    { eventType: "click" },
  ],
  hoverEventList: [],
  lineClickEventList: [],
  changeFiledEventList: [],
  jumpLink: "",
  flyToField: "",
  switchPageId: "",
  isShow: true, // 编辑时是否展示
  isLock: false, // 编辑时是否允许拖动
  isShowModule: true, // 查看页面时  是否展示该组件
  filterObj: {
    hueRotate: 0, // 色相
    saturate: 1, // 饱和度
    contrast: 1, // 对比度
    brightness: 1, // 亮度
    opacity: 1, // 透明度
  },
  openFilter: false, // 是否开启滤镜
  isOpenFieldMap: false, // 是否开启字段映射
  fieldMap: [], // 字段映射数据
};
