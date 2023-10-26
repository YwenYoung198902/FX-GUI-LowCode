/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-06-01 09:20:05
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2022-08-19 17:30:24
 */
/**
 *
 * */
export class InfoShow {
  constructor(map, vm) {
    this.currentInfoWindow = null; // 当前信息窗
    this.map = map;
    this.vm = vm;
  }

  /**
   *
   * @param content {String/HTMLElement}  显示内容，可以是HTML要素字符串或者HTMLElement对象
   * @param position {Array}
   * @param isCustom {Boolean} 是否自定义窗体
   * @param offset {Array} 信息窗体显示位置偏移量 默认基准点为信息窗体的底部中心（若设置了anchor，则以anchor值为基准点）。
   * @param closeWhenClickMap {Boolean} 控制是否在鼠标点击地图后关闭信息窗体
   * @param autoMove {Boolean} 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
   * @param size {Array} 信息窗体尺寸（isCustom为true时，该属性无效）
   * @param anchor {string} 信息窗体锚点。'bottom-center'
   可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
   * @param showShadow {Boolean}  控制是否显示信息窗体阴影
   * @param retainWhenClose {Boolean}  信息窗体关闭时，是否将其Dom元素从页面中移除
   */
  addInfoWindow({ content, position, isCustom = true, offset = [0, 0], closeWhenClickMap, autoMove,
    size, anchor, showShadow = false, retainWhenClose = false }) {
    const iwOptions = {
      content,
      position,
      isCustom: isCustom,
      closeWhenClickMap: closeWhenClickMap || false,
      autoMove: autoMove || false,
      anchor: anchor || 'bottom-center',
      offset: new AMap.Pixel(offset[0], offset[1]), // 设置偏移量
      showShadow: showShadow,
      retainWhenClose: retainWhenClose
    };
    if (size) {
      iwOptions['size'] = size;
    }
    const infoWindow = new AMap.InfoWindow(iwOptions);
    this.currentInfoWindow = infoWindow;
    this.openInfoWindow();
    return infoWindow;
  }
  /**
   *
   * @param offset {Array} 信息窗体显示位置偏移量
   */
  showInfoWindowByType(type, position, data, offset) {
    console.log('弹窗', this.vm);
    const infoWindow = this.addInfoWindow({
      content: this.vm.$refs.InfoWindow.$el,
      position: position,
      offset
    });
    data.position = position;
    this.vm.$refs.InfoWindow.initialize(data, '/' + type, infoWindow);
    this.vm.isShowWindow = true;
  }
  openInfoWindow(infoWindow = this.currentInfoWindow) {
    infoWindow && infoWindow.open && infoWindow.open(this.map);
  }
  closeInfoWindow(infoWindow = this.currentInfoWindow) {
    infoWindow && infoWindow.close && infoWindow.close(this.map);
  }
}
