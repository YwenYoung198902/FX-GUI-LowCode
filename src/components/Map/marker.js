/**
 *
 * */
import {
  positionStringToArr,
  positionsStringToArr,
  positionChangeGCJ,
  positionToGCJ02,
} from "@/components/map/util";
// import start_point from '../../../assets/img/jinshan/vehicles/map/start_point.png';
// import end_point from '../../../assets/img/jinshan/vehicles/map/end_point.png';
// import car_icon from '../../../assets/img/jinshan/vehicles/map/car.png';
// import normal_point from '../../../assets/img/jinshan/vehicles/map/normal-point.png';
export class Marker {
  constructor(map, vm) {
    this.map = map;
    this.vm = vm;
    this.markers = {}; // {type:{id:marker}}}
    // this.massMarkIndexMap = {};
    this.massMarkses = {};
    this.labelsLayers = {};
    this.labelsLayerArr = [];
    this.labelMarks = {};
    this.showLabelMarks = {};
    this.infoMark = null;
    this.imgMark = null;
    this.currentClickLabelMarker = null;
    this.textMarks = [];
  }

  addInfoMark(offset = [0, 0]) {
    if (!this.infoMark) {
      this.infoMark = new AMap.Marker({
        content: " ",
        map: this.map,
        offset: new AMap.Pixel(offset[0], offset[1]),
      });
    }
    return this.infoMark;
  }
  addImgMark(offset = [0, 0]) {
    if (!this.imgMark) {
      this.imgMark = new AMap.Marker({
        content: " ",
        map: this.map,
        offset: new AMap.Pixel(offset[0], offset[1]),
      });
    }
    return this.imgMark;
  }
  removeInfoMark() {
    this.infoMark.remove();
    this.infoMark = null;
  }

  /**
   * @description 添加mark
   * @param id {string|number} mark的id
   * @param *image {string} 图标的地址
   * @param *sImage {string} 选中图标的地址
   * @param *position {Array} 坐标
   * @param type {string} 这一类mark的类型 用于类型管理
   * @param size {Array} 图标的尺寸 [20,20]
   * @param zIndex {Number} 图层叠加的顺序值，0表示最底层。默认zIndex：100
   * @param anchor {string} 图标锚点 锚点位置对应设置的 position 位置。可选值：'top-left'| 'top-center'|
   * 'top-right'|'middle-left'|'center'| 'middle-right'| 'bottom-left'| 'bottom-center'| 'bottom-right' 。默认值：'top-left'。
   * @param offset {Pixel} 图标显示位置偏移量，以图标的左上角为基准点（0,0）点，例如：anchor:new AMap.Pixel(5,5)
   * @param isLabel {Boolean} 是否有文字标注
   * @param content {string} 文字标注内容
   * @param labelOffset {Pixel} 文字标注位置偏移量
   * @return marker
   */
  addMark({
    id,
    image,
    sImage,
    position,
    type,
    size,
    zIndex = 100,
    anchor = "center",
    offset = [0, 0],
    isLabel = false,
    content,
    labelOffset,
    click,
  }) {
    const iconOptions = {
      image, // 图标的取图地址
    };
    if (size instanceof Array && size.length === 2) {
      iconOptions["size"] = size; // 图标尺寸
      iconOptions["imageSize"] = size; // 图标所用图片大小
    }
    const icon = new AMap.Icon(iconOptions);
    const markOptions = {
      // 标记配置项
      zIndex: zIndex,
      position,
      icon: icon,
      anchor: anchor || "center", // 锚点
      offset: new AMap.Pixel(offset[0], offset[1]), // 设置偏移量
      extData: {
        id,
      },
    };
    if (isLabel) {
      const label = {
        direction: "top",
        content,
        offset: labelOffset,
      };
      markOptions["label"] = label;
    }
    const marker = new AMap.Marker(markOptions);
    marker.on("click", (e) => {
      const target = e.target;
      target.setIcon(sImage);
      click && click instanceof Function && click(e);
    });
    marker.on("mouseover", (e) => {
      const target = e.target;
      target.setIcon(sImage);
    });
    marker.on("mouseout", (e) => {
      const target = e.target;
      target.setIcon(image);
    });
    if (type) {
      this.markers[type] = this.markers[type] || {};
      this.markers[type][id] = marker;
    }
    this.map.add(marker);
    return marker;
  }

  getMarkerById(type, id) {
    console.log(this.markers, type, id, "====mark");
    if (this.markers[type] && this.markers[type][id]) {
      return this.markers[type][id];
    }
  }
  // markers  可以是一个单独的mark，也可以是marks 数组
  removeMarkById(type, id) {
    if (this.markers[type] && this.markers[type][id]) {
      this.map.remove(this.markers[type][id]);
      delete this.markers[type][id];
    }
  }

  removeMarkByType(type) {
    if (this.markers[type]) {
      Object.keys(this.markers[type]).forEach((id) => {
        this.map.remove(this.markers[type][id]);
      });
      delete this.markers[type];
    }
  }

  // marker 可以是marker 也可以是数组 [marker,marker]
  removeMark(marker) {
    this.map.remove(marker);
  }

  /**
   * @param id
   * @param *image
   * @param *sImage
   * @param *position
   * @param type
   * @param size
   * @param zIndex
   * @param anchor
   * @param offset
   * @param content
   * @param isLabel
   * @param fontSize
   * @param fillColor
   * @param strokeColor
   * @param strokeWidth
   * @param dataId  数据的id 用于点击时获取数据的详情
   * @return {AMap.LabelMarker}
   */
  addLabelMarker(options, data) {
    const {
      id,
      image,
      sImage,
      iconSize,
      iconSizeS,
      position,
      type,
      size,
      zIndex = 100,
      anchor,
      offset = [0, 0],
      content,
      isLabel = false,
      labelZooms,
      fontSize = 12,
      fillColor = "#fff",
      strokeColor = "#000",
      strokeWidth = 2,
      isHide,
      info,
      click,
      mouseover,
      mouseout,
    } = options;
    const extData = options;
    options.data = data;
    const icon = {
      type: "image", // 图标类型，现阶段只支持 image 类型
      image: image,
      offset: offset,
      anchor: anchor || "bottom-center", // 图片相对 position 的锚点，默认为 bottom-center
    };
    if (iconSize instanceof Array && iconSize.length === 2) {
      icon["size"] = iconSize; // 图标尺寸
    }
    const labelMarkerOpts = {
      name: "标注2", // 此属性非绘制文字内容，仅最为标识使用
      position: position,
      zIndex: zIndex,
      icon,
      extData,
    };
    if (isLabel) {
      const text = {
        content: content, // 要展示的文字内容
        direction: "top", // 文字方向，有 icon 时为围绕文字的方向，没有 icon 时，则为相对 position 的位置
        // 在 direction 基础上的偏移量
        offset: offset,
        zooms: labelZooms,
        // 文字样式
        style: {
          fontSize: fontSize, // 字体大小
          fillColor: fillColor, // 字体颜色
          strokeColor: strokeColor, // 描边颜色
          strokeWidth: strokeWidth, // 描边宽度
        },
      };
      labelMarkerOpts["text"] = text;
    }
    const labelMarker = new AMap.LabelMarker(labelMarkerOpts);
    labelMarker.on("click", (e) => {
      const opts = e.target.getExtData();
      AMap.DControl.recoveryClick();
      labelMarker.isClick = true;
      sImage && (icon.image = sImage);
      if (iconSizeS instanceof Array && iconSizeS.length === 2) {
        icon["size"] = iconSizeS; // 图标尺寸
      }
      labelMarker.setIcon(icon);
      click && click instanceof Function && click(e);
      this.currentClickLabelMarker = labelMarker;
    });
    labelMarker.on("mouseover", (e) => {
      e.target.setRank(2);
      sImage && (icon.image = sImage);
      if (iconSizeS instanceof Array && iconSizeS.length === 2) {
        icon["size"] = iconSizeS; // 图标尺寸
      }
      labelMarker.setIcon(icon);
      // mouseover && mouseover instanceof Function && mouseover(e);
    });
    labelMarker.on("mouseout", (e) => {
      if (e.target.className && e.target.className == "AMap.LabelMarker") {
        e.target.setRank(1);
      }
      // if (e.target && e.target.isClick) {
      //     return;
      // }
      sImage && (icon.image = image);
      if (iconSize instanceof Array && iconSize.length === 2) {
        icon["size"] = iconSize; // 图标尺寸
      }
      labelMarker.setIcon(icon);
      // mouseout && mouseout instanceof Function && mouseout(e);
    });
    if (type) {
      this.labelMarks[type] = this.labelMarks[type] || {};
      this.labelMarks[type][id] = labelMarker;
      this.showLabelMarks[type] = this.showLabelMarks[type] || [];
      this.showLabelMarks[type].push(id);
    }
    isHide && labelMarker.hide();
    return labelMarker;
  }

  addLabelsLayer(data, options) {
    this.labelsLayers[options.type] = this.labelsLayers[options.type] || [];
    const labelMarkers = [];
    const labelsLayer = new AMap.LabelsLayer({
      zooms: options.zooms || [8, 30],
      zIndex: options.zIndex || 120,
      fitView: true,
      collision: options.collision || true, // 该层内标注是否避让
      allowCollision: true, // 设置 allowCollision：true，可以让标注避让用户的标注
    });
    data.forEach((p) => {
      options.position = p.position || positionToGCJ02([p.lng, p.lat]);
      options.content = p.title || p.name || "";
      options.id = options.trackid || p.id || p.rowid;
      const labelMarker = this.addLabelMarker(options, p);
      labelMarkers.push(labelMarker);
    });
    labelsLayer.add(labelMarkers);
    this.labelsLayers[options.type].push(labelsLayer);
    this.map.add(labelsLayer);
    this.labelsLayerArr.push(labelsLayer);
    options.isFocu && this.map.setFitView();
    return labelsLayer;
  }

  getLabelMarkerById(type, id) {
    if (this.labelMarks[type] && this.labelMarks[type][id]) {
      return this.labelMarks[type][id];
    }
  }

  removeLabelMarkerById(type, id) {
    // /人员删除
    if (
      this.labelsLayers[type] &&
      this.labelMarks[type] &&
      this.labelMarks[type][id]
    ) {
      this.labelsLayers[type].forEach((item) => {
        item.remove(this.labelMarks[type][id]);
      });
      delete this.labelMarks[type][id];
      if (Object.keys(this.labelMarks[type]).length == 0) {
        delete this.labelMarks[type];
        delete this.labelsLayers[type];
      }
    }
  }
  removeLabelMarkerByTypes(types) {
    types.forEach((type) => {
      this.removeLabelMarkerByType(type);
    });
  }
  removeLabelMarkerByType(type) {
    if (this.labelsLayers[type] && this.labelMarks[type]) {
      this.labelsLayers[type].forEach((item) => {
        this.map.remove(item);
      });
      delete this.labelMarks[type];
      delete this.labelsLayers[type];
    }
  }
  toggleMarkerById(type, id, isShow) {
    if (this.labelMarks[type] && this.labelMarks[type][id]) {
      let seat = -2;
      if (this.showLabelMarks[type]) {
        seat = this.showLabelMarks[type].indexOf(id);
      } else {
        this.showLabelMarks[type] = [];
        seat = -1;
      }
      if (isShow) {
        this.labelMarks[type][id].show();
        seat === -1 && this.showLabelMarks[type].push(id);
      } else {
        this.labelMarks[type][id].hide();
        seat > -1 && this.showLabelMarks[type].splice(seat, 1);
        this.showLabelMarks[type].length === 0 &&
          delete this.showLabelMarks[type];
      }
    }
  }
  toggleMarkerByType(type, isShow) {
    if (this.labelMarks[type]) {
      Object.keys(this.labelMarks[type]).forEach((id) => {
        let seat;
        if (this.showLabelMarks[type]) {
          seat = this.showLabelMarks[type].indexOf(id);
        } else {
          this.showLabelMarks[type] = [];
          seat = -1;
        }
        if (isShow) {
          this.labelMarks[type][id].show();
          seat === -1 && this.showLabelMarks[type].push(id);
        } else {
          this.labelMarks[type][id].hide();
          seat > -1 && this.showLabelMarks[type].splice(seat, 1);
          this.showLabelMarks[type].length === 0 &&
            delete this.showLabelMarks[type];
        }
      });
    }
  }

  showLabelMarkByIds(type, ids) {
    if (this.labelMarks[type]) {
      const labelMarks = this.labelMarks[type];
      Object.keys(labelMarks).forEach((key) => {
        ids.includes(key) ? labelMarks[key].show() : labelMarks[key].hide();
      });
    }
  }

  /**
     *
     * @param * data {Array} data为点对象的数组，点对象为包含经纬度lnglat属性的Object
     *        例data: [{lnglat: [116.405285, 39.904989], name: i,id:1},{}, …]或url串，支持从服务器直接取数据
     * @param type {string} 海量点分类类型 用于收集
     * @param *image {string} 图标的地址
     * @param *sImage {string} 选中图标的地址
     * @param *size {Array} 图标的尺寸 [20,20]
     * @param offset {Pixel} 图标显示位置偏移量，以图标的左上角为基准点（0,0）点，例如：anchor:new AMap.Pixel(5,5)
     * @param rotation {Number} 旋转角度
     * @param zooms {Array} 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；
     在移动设备上，取值范围为[3-19]
     * @param zIndex {Number} 图层叠加的顺序值，0表示最底层。默认zIndex：5
     * @param cursor {String} 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，
     Opera不支持自定义cursor
     * @param opacity {Number} 图层叠加的顺序值，0表示最底层。默认zIndex：5
     * @param alwaysRender {Boolean} 表示是否在拖拽缩放过程中实时重绘，默认true，建议超过10000的时候设置false
     */
  addMassMark(
    data,
    {
      type,
      image,
      sImage,
      size = [20, 20],
      offset = [10, 10],
      rotation = 0,
      zooms = [5, 30],
      zIndex = 180,
      cursor = "",
      opacity = 1.0,
      alwaysRender = true,
      click,
      mouseover,
      mouseout,
    }
  ) {
    const style = {
      url: image, // 图标地址
      anchor: new AMap.Pixel(offset[0], offset[1]), // 图标显示位置偏移量，基准点为图标左上角
      rotation,
      size: size,
    };
    const massMarks = new AMap.MassMarks(data, {
      zIndex, // 海量点图层叠加的顺序
      zooms, // 在指定地图缩放级别范围内展示海量点图层
      style, // 多种样式对象的数组
      opacity,
      alwaysRender,
    });
    massMarks.on("click", (e) => {
      // this.map.setZoomAndCenter(20, position);
      const target = e.target;
      click && click instanceof Function && click(e);
    });
    massMarks.on("mouseover", (e) => {
      mouseover && mouseover instanceof Function && mouseover(e);
    });
    massMarks.on("mouseout", (e) => {
      mouseout && mouseout instanceof Function && mouseout(e);
    });
    // 将海量点添加至地图实例
    massMarks.setMap(this.map);
    this.massMarkses[type] = massMarks;
    return massMarks;
  }

  removeMassMarksByTypes(types) {
    types instanceof Array &&
      types.forEach((type) => {
        this.removeMassMarksByType(type);
      });
  }

  removeMassMarksByType(type) {
    if (this.massMarkses[type]) {
      this.massMarkses[type].clear();
      delete this.massMarkses[type];
    }
  }
  // 创建纯文本标记
  addText(
    position,
    text,
    anchor,
    offset,
    bgColor = "rgba(255,47,44,0.5)",
    borderColor = "#ff0000",
    draggable = false
  ) {
    const textMark = new AMap.Text({
      text: text,
      anchor: anchor || "center", // 设置文本标记锚点
      draggable: draggable || false,
      cursor: "pointer",
      angle: 0,
      zIndex: 120,
      zooms: [14, 24],
      offset: new AMap.Pixel(offset[0], offset[1]),
      style: {
        padding: ".3rem 0.6rem",
        "margin-bottom": "1rem",
        "border-radius": ".25rem",
        "background-color": bgColor,
        width: "8rem",
        "border-width": 1,
        "border-color": borderColor,
        "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
        "text-align": "center",
        "font-size": "14px",
        color: "#ffffff",
      },
      position: position,
    });
    textMark.setMap(this.map);
    this.textMarks.push(textMark);
    return textMark;
  }
  removeAllTexts() {
    this.textMarks.length > 0 &&
      this.textMarks.forEach((text) => {
        text.remove();
      });
    this.textMarks = [];
  }
  clearMassMarks() {
    if (Object.keys(this.massMarkses).length > 0) {
      Object.keys(this.massMarkses).forEach((key) => {
        this.massMarkses[key].clear();
        delete this.massMarkses[key];
      });
    }
    // this.massMarkses = {};
  }
  /**
   * @description 根据类型移除 LabelMarks
   * @param types
   */
  clearLabelMarks() {
    // types.forEach((type)=>{
    //   if(this.labelsLayers[type]){
    //     this.labelsLayers[type].clear();
    //   }
    // });
    this.map.remove(this.labelsLayerArr);
    this.labelsLayers = {};
    this.labelMarks = {};
  }
}
