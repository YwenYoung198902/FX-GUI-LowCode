/**
 *
 * */
export class Geometry {
  constructor(map, vm) {
    this.map = map;
    this.vm = vm;
    this.geometries = {};
    this.sceneGeometries = [];
    this.currentClickGeometry = null;
  }

  /**
   * 添加线
   * @param id {string |number}
   * @param *path{(Array<LngLat>} polyline 路径，支持 lineString 和 MultiLineString
   * @param color {string} 例：'#ff0000'
   * @param type {string} 收集线的类型
   * @param opacity {Number} 透明度 [0-1]
   * @param width {Number} 宽度
   * @param strokeStyle {string} 轮廓线样式，实线:solid，虚线:dashed
   * @param showDir {Boolean} 是否延路径显示白色方向箭头,默认false。建议折线宽度大于6时使用
   * @param isOutline {Boolean} 是否显示描边
   * @param borderWeight {Number} 描边线宽度
   * @param outlineColor {string}  例：'#ff0000'
   * @param zIndex {Number} 图层叠加的顺序值，0表示最底层
   */
  addPolyline(options) {
    console.log(options, "===options");
    const {
      id,
      type,
      path,
      strokeColor = "#107aff",
      strokeOpacity = 1.0,
      strokeWeight = 4.0,
      strokeStyle = "solid",
      strokeDasharray,
      showDir = false,
      isOutline = false,
      borderWeight = 1.0,
      outlineColor = "#00ffff",
      zIndex = 1,
      cursor = "pointer",
      info,
      isHide,
      click,
      mouseover,
      mouseout,
      isNotMouseOver,
    } = options;
    const extData = options;
    // 创建折线实例
    const polyline = new AMap.Polyline({
      path,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      strokeStyle,
      strokeDasharray,
      cursor,
      lineJoin: "round", // 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
      lineCap: "round", // 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
      showDir,
      isOutline,
      borderWeight, // 描边线宽度
      outlineColor, // 描边线宽度
      zIndex,
      extData,
    });
    if (type) {
      this.geometries[type] = this.geometries[type] || {};
      this.geometries[type][id] = polyline;
    }
    polyline.on("click", (e) => {
      AMap.DControl.recoveryClick();
      polyline.setOptions({
        strokeWeight: strokeWeight * 2,
        zIndex: zIndex + 1,
        strokeColor: "#ffff00",
      });
      polyline.isClick = true;
      this.currentClickGeometry = polyline;
      click && click instanceof Function && click(e);
    });
    polyline.on("mouseover", (e) => {
      if (isNotMouseOver) return;
      polyline.setOptions({
        strokeWeight: strokeWeight * 2,
        zIndex: zIndex + 1,
      });
      mouseover && mouseover instanceof Function && mouseover(e);
    });
    polyline.on("mouseout", (e) => {
      if (e.target && e.target.isClick) {
        return;
      }
      polyline.setOptions({
        strokeWeight: strokeWeight,
        zIndex: zIndex,
        strokeColor: strokeColor,
      });
      mouseout && mouseout instanceof Function && mouseout(e);
    });
    this.map.add(polyline);
    console.log(polyline, "===polyline");
    // isHide && polyline.hide();
    // this.sceneGeometries.push(polyline);
    // this.map.setFitView();
    return polyline;
  }
  /**
   * 添加面
   * @param id {string |number}
   * @param type {string} 收集面的类型
   * @param *path {(Array<LngLat>} polyline 路径，支持 lineString 和 MultiLineString
   * @param fillColor {string} 填充色 例：'#ff0000'
   * @param fillOpacity {Number} 填充色透明度 [0-1]
   * @param strokeColor {string} 边框颜色 例：'#ff0000'
   * @param strokeWeight {Number} 轮廓线宽度
   * @param strokeOpacity {Number} 透明度 [0-1]
   * @param strokeStyle {string} 轮廓线样式，实线:solid，虚线:dashed
   * @param zIndex
   * @return {AMap.Polygon}
   */
  addPolygon(options) {
    const {
      id,
      type,
      path,
      fillColor = "#00ffff",
      fillOpacity = 0.2,
      strokeColor,
      strokeWeight = 3.0,
      strokeOpacity = 1.0,
      strokeStyle = "dashed",
      zIndex = 10,
      info,
      click,
      mouseover,
    } = options;
    const polygon = new AMap.Polygon({
      path: path,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      strokeColor: strokeColor || fillColor || "#00ffff",
      strokeWeight: strokeWeight,
      strokeOpacity: strokeOpacity,
      strokeStyle: strokeStyle,
      strokeDasharray: [12, 10], // 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
      bubble: true, // 是否将覆盖物的鼠标或touch等事件冒泡到地图上
      zIndex: zIndex,
      extData: options,
    });
    this.map.add(polygon);
    if (type) {
      this.geometries[type] = this.geometries[type] || {};
      this.geometries[type][id] = polygon;
    }
    polygon.on("click", (e) => {
      const opts = e.target.getExtData();
      this.vm.eventBus.$emit("showInfowindow", opts, e.target);
      this.map.setZoomAndCenter(16, [e.lnglat.lng, e.lnglat.lat]);
      AMap.DControl.recoveryClick();
      const target = e.target;
      this.currentClickGeometry = polygon;
      click && click instanceof Function && click(e);
    });
    polygon.on("mouseover", (e) => {
      const opts = e.target.getExtData();
      this.vm.eventBus.$emit("showInfowindow", opts, e.target);
      this.currentClickGeometry = polygon;
      const target = e.target;
      mouseover && mouseover instanceof Function && mouseover(e);
    });
    polygon.on("mouseout", (e) => {
      this.vm.eventBus.$emit("closeInfowindow");
    });
    this.sceneGeometries.push(polygon);
    // this.map.setFitView();
    return polygon;
  }
  addCircle(options) {
    const {
      id,
      type,
      center,
      radius,
      borderWeight = 3,
      strokeColor,
      strokeOpacity = 1.0,
      strokeWeight = 3.0,
      fillColor = "#00ffff",
      fillOpacity = 0.2,
      strokeStyle = "solid",
      strokeDasharray = [10, 10],
      zIndex = 10,
      info,
      click,
      mouseover,
    } = options;
    var circle = new AMap.Circle({
      center: center,
      radius: radius, // 半径
      borderWeight: borderWeight,
      strokeColor: strokeColor,
      strokeOpacity: strokeOpacity,
      strokeWeight: strokeWeight,
      fillColor: fillColor,
      fillOpacity: fillOpacity,
      strokeStyle: strokeStyle,
      strokeDasharray: strokeDasharray,
      zIndex: zIndex,
    });
    this.map.add(circle);
    if (type) {
      this.geometries[type] = this.geometries[type] || {};
      this.geometries[type][id] = circle;
    }
    circle.on("click", (e) => {
      const opts = e.target.getExtData();
      this.vm.eventBus.$emit("showInfowindow", opts, e.target);
      AMap.DControl.recoveryClick();
      const target = e.target;
      this.currentClickGeometry = circle;
      click && click instanceof Function && click(e);
    });
    circle.on("mouseover", (e) => {
      const opts = e.target.getExtData();
      this.vm.eventBus.$emit("showInfowindow", opts, e.target);
      this.currentClickGeometry = circle;
      const target = e.target;
      mouseover && mouseover instanceof Function && mouseover(e);
    });
    circle.on("mouseout", (e) => {
      this.vm.eventBus.$emit("closeInfowindow");
    });
    this.sceneGeometries.push(circle);
    // this.map.setFitView();
    return circle;
  }
  showInfoWindowByType(type, position, data, offset) {
    const infoWindow = this.addInfoWindow({
      content: this.vm.$refs.InfoWindow.$el,
      position: position,
      offset,
    });
    data.position = position;
    this.vm.$refs.InfoWindow.initialize(data, "/" + type, infoWindow);
    this.vm.isShowWindow = true;
  }
  addInfoWindow({
    content,
    position,
    isCustom = true,
    offset = [0, 0],
    closeWhenClickMap,
    autoMove,
    size,
    anchor,
    showShadow = false,
    retainWhenClose = false,
  }) {
    const iwOptions = {
      content,
      position,
      isCustom: isCustom,
      closeWhenClickMap: closeWhenClickMap || false,
      autoMove: autoMove || false,
      anchor: anchor || "bottom-center",
      offset: new AMap.Pixel(offset[0], offset[1]), // 设置偏移量
      showShadow: showShadow,
      retainWhenClose: retainWhenClose,
    };
    if (size) {
      iwOptions["size"] = size;
    }
    const infoWindow = new AMap.InfoWindow(iwOptions);
    this.currentInfoWindow = infoWindow;
    this.openInfoWindow();
    return infoWindow;
  }
  addTrail(type, arr) {
    console.log(type, arr);
    this.geometries[type] = arr;
    this.map.add(this.geometries[type]);
  }
  removeTrail(type) {
    this.map.remove(this.geometries);
    AMap.DGeometry.removeGeometriesByType(type);
  }
  // polygon  可以是一个单独的polygon，也可以是polygon 数组
  removePolygonById(type, id) {
    if (this.geometries[type] && this.geometries[type][id]) {
      this.map.remove(this.geometries[type][id]);
      delete this.geometries[type][id];
    }
  }
  removePolygonByType(type) {
    if (this.geometries[type]) {
      Object.keys(this.geometries[type]).forEach((id) => {
        this.map.remove(this.geometries[type][id]);
      });
      delete this.geometries[type];
    }
  }

  removeGeometry(geometry) {
    this.map.remove(geometry);
  }
  removeGeometriesByType(geometryType) {
    console.log(this.geometries, geometryType, "===geometryType");
    if (this.geometries[geometryType]) {
      this.map.remove(Object.values(this.geometries[geometryType]));
      delete this.geometries[geometryType];
    }
  }
  removeGeometriesById(type, id) {
    // 岗位删除
    if (this.geometries[type] && this.geometries[type][id]) {
      this.map.remove(this.geometries[type][id]);
      delete this.geometries[type][id];
    }
  }
  getGeometryById(type, id) {
    if (this.geometries[type] && this.geometries[type][id]) {
      return this.geometries[type][id];
    } else {
      return false;
    }
  }
  toggleGeometryByIds(type, ids, isShow) {
    ids.forEach((id) => {
      this.toggleGeometryById(type, id, isShow);
    });
  }
  toggleGeometryById(type, id, isShow) {
    if (this.geometries[type] && this.geometries[type][id]) {
      isShow
        ? this.geometries[type][id].show()
        : this.geometries[type][id].hide();
    }
  }
  showGeometryByIds(type, ids) {
    if (this.geometries[type]) {
      const geometries = this.geometries[type];
      Object.keys(geometries).forEach((key) => {
        ids.includes(key) ? geometries[key].show() : geometries[key].hide();
      });
    }
  }
  clearGeometry() {
    this.map.remove(this.sceneGeometries);
    this.sceneGeometries = [];
    this.geometries = {};
  }
}
