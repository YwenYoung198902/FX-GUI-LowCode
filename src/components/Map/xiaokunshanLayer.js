import icon from "./img/icon.png";
import iconS from "./img/icons.png";
import util from "../word51/util";

export class XiaoKunShanLayer {
  constructor(map, vm) {
    this.map = map;
    this.vm = vm;
    this.layerConfigMap = {};
    this.handleConfigData = [];
    this.notControlPoiData = {};
    this.notControlRange = {};
    this.qiyeType = [];
    this.deviceType = [];
    this.eventTypeData = [];
    this.heatmap = null;
    this.getLayerConfig();
  }
  getLayerConfig() {
    const data = window.AWord ? AWord.Wlayer.layerConfigMap : "";
    if (data) {
      this.layerConfigMap = data;
      this.qiyeType = AWord.Wlayer.qiyeType;
      this.deviceType = AWord.Wlayer.deviceType;
      this.eventTypeData = AWord.Wlayer.eventTypeData;
    } else {
      this.vm.$xksapi.getConfig({}).then((res) => {
        res.data.forEach((v) => {
          this.handleConfig(v, v);
        });
        res.data.forEach((item) => {
          this.setLayerConfig(item, item.name);
        });
      });
    }
  }
  handleConfig(data, d) {
    if (data.name === "设备") {
      this.deviceType = data.children.map((item) => item.name);
    } else if (data.name === "事件") {
      this.eventTypeData = data.children.map((item) => {
        let t;
        if (item.name.indexOf("12345") > -1) {
          t = "12345事件";
        } else if (item.name.indexOf("事件") > -1) {
          t = item.name.slice(0, item.name.length - 2);
        } else {
          t = item.name;
        }
        return t;
      });
    }
    if (data.children && data.children.length > 0) {
      if (data.name === "企业") {
        this.qiyeType = data.children.map((item) => item.name);
      }
      data.children.forEach((item) => {
        this.handleConfig(item, data);
      });
    } else {
      if (data.name.indexOf("在线") > -1 || data.name.indexOf("离线") > -1) {
        if (this.handleConfigData.indexOf(d.name) === -1) {
          this.handleConfigData.push(d.name);
        }
      }
    }
  }
  setLayerConfig(data, type) {
    if (data.children && data.children.length > 0) {
      const imgUrl = window.CONFIG.IMG_URL;
      if (this.handleConfigData.indexOf(data.name) > -1) {
        // let iconSize;
        // let iconSizeS;
        // let bg_offset;
        let num_offset;
        // if (type === "物联设备") {
        //   iconSize = "31,40";
        //   iconSizeS = "44,49";
        // } else {
        //   iconSize = "51,75";
        //   iconSizeS = "51,75";
        // }
        this.layerConfigMap[data.name] = {};
        data.children.forEach((v) => {
          // v.iconSize = iconSize;
          // v.iconSizeS = iconSizeS;
          // v.bg_offset = bg_offset;
          v.num_offset = num_offset;
          this.layerConfigMap[data.name][v.name] = v;
        });
      } else {
        if (data.name === "事件") {
          // data.iconSize = "78,72";
          // data.iconSizeS = "104,96";
          this.layerConfigMap[data.name] = data;
        }
        data.children.forEach((item) => {
          this.setLayerConfig(item, type);
        });
      }
    } else {
      if (type === "事件") {
        // data.iconSize = "78,72";
        // data.iconSizeS = "104,96";
        this.layerConfigMap[data.name] = data;
      } else {
        // data.iconSize = "32,40";
        // data.iconSizeS = "44,49";
      }
      this.layerConfigMap[data.name] = data;
    }
  }

  /**
   * 添加只有类型没有状态的poi点
   * @param {*} type 页面地址
   * @param {*} list  poi点数据
   */
  async addPoints(type, list, isControl = true, isFocu = true) {
    if (this.vm.$route.name === type) {
      const imgUrl = window.CONFIG.IMG_URL;
      if (list.length > 0) {
        const markeList = {};
        const s = new Set(list.map((item) => item.type));

        s.forEach((val) => {
          markeList[val] = [];
        });
        list instanceof Array &&
          list.forEach((item, i) => {
            const label = AMap.DMarker.getLabelMarkerById(
              item.type,
              item.type + "_" + item.rowid
            );
            const d = this.layerConfigMap[item.type];
            item.regular_Type = d.regular_name || item.type;
            if (item.position && !label) {
              const p = item.position.split(",");
              if (p.length > 1) {
                // 保存非控制按钮选中的事件poi点
                if (!isControl) {
                  this.notControlPoiData[item.rowid] = item;
                }
                markeList[item.type].push({
                  pointData: item,
                  pointType: item.type,
                  status: item.status || "",
                  position: item.mposition || item.position,
                  title: item.name,
                  model: type,
                  rowid: item.rowid,
                  id: item.type + "_" + item.rowid,
                });
              }
            }
          });
        Object.keys(markeList).forEach((item, index) => {
          if (markeList[item].length > 0) {
            let image;
            let sImage;
            let iconSize = [32, 40];
            let iconSizeS = [40, 49];
            const d = this.layerConfigMap[item];
            if (
              window.location.host.includes("localhost") ||
              window.location.host.includes("192.168")
            ) {
              image = icon;
              sImage = iconS;
            } else {
              image = d.default_icon ? imgUrl + d.default_icon : icon;
              sImage = d.selected_icon ? imgUrl + d.selected_icon : image;
            }
            if (d.default_size) {
              iconSize = [];
              d.default_size.split(",").forEach((v1) => {
                iconSize.push(v1 * 1);
              });
            }
            if (d.selected_size) {
              iconSizeS = [];
              d.selected_size.split(",").forEach((v2) => {
                iconSizeS.push(v2 * 1);
              });
            }
            AMap.DMarker.addLabelsLayer(markeList[item], {
              image,
              sImage,
              iconSize,
              iconSizeS,
              isLabel: true,
              type: item,
              zooms: [2, 30],
              labelZooms: [5, 30],
              zIndex: 118,
              allowCollision: true,
              collision: true,
              isFocu,
              click: (e) => {
                const opts = e.target.getExtData();
                const data = opts.data;
                const p = data.position.split(",");
                this.map.setZoomAndCenter(16, p);
                util.setPopup(data.pointData, this.vm);
              },
            });
          }
        });
      }
    }
  }
  async addArea(type, list, isControl = true) {
    if (this.vm.$route.name === type) {
      if (list.length > 0) {
        list instanceof Array &&
          list.forEach((val, i) => {
            const getGeometry = AMap.DGeometry.getGeometryById(
              val.type,
              val.rowid
            );
            if (!getGeometry && val.mapPointData.length > 0) {
              // 保存非控制按钮选中的事件poi点
              if (!isControl) {
                this.notControlRange[val.rowid] = val;
              }
              AMap.DGeometry.addPolygon({
                id: val.rowid,
                type: val.type,
                path: val.mapPointData,
                fillColor: val.color || "4605ba",
                strokeStyle: "dashed",
                info: val,
                strokeWeight: 2,
                click: (e) => {
                  const opts = e.target.getExtData();
                  const data = opts.info;
                  util.setRankPopup(data.type + "_" + data.rowid, this.vm);
                  // data.lng = e.lnglat.lng;
                  // data.lat = e.lnglat.lat;
                  // data.rowid = data.id;
                  // this.removeIndustryLayerMarker(type);
                  // this.addMarkerAndFlyto(type, [data]);
                },
              });
            }
          });
      }
    }
  }
  addPathLayer(pageType, data) {
    if (this.vm.$route.name === pageType) {
      data.forEach((item) => {
        Object.keys(item).forEach((k) => {
          item[k].forEach((v) => {
            const d = {
              id: v.type + "_" + v.name + "_" + v.id,
              type: v.type,
              path: [v.mapPointData],
              borderWeight: 10,
              strokeColor: "#" + v.color,
            };
            AMap.DGeometry.addPolyline(d);
          });
        });
      });
    }
  }
  // 删除非控制图层按钮添加的poi点
  removeNotControlCover() {
    if (this.notControlPoiData) {
      Object.values(this.notControlPoiData).forEach((v) => {
        const id = v.type + "_" + v.rowid;
        AMap.DMarker.removeLabelMarkerById(v.type, id);
        delete this.notControlPoiData[v.rowid];
      });
    }
  }
  // 删除非控制图层加载的区域
  removeNotControlRange() {
    if (this.notControlRange) {
      Object.values(this.notControlRange).forEach((v) => {
        AMap.DGeometry.removePolygonById(v.type, v.rowid);
        delete this.notControlRange[v.rowid];
      });
    }
  }
  async flyToById(page, type, data, isClick = true) {
    AMap.DControl.recoveryClick();
    if (type === "post") {
      let geometry = AMap.DGeometry.getGeometryById(data.type, data.rowid);
      if (!geometry) {
        await this.addArea(page, [data], false);
        geometry = AMap.DGeometry.getGeometryById(data.type, data.rowid);
      }
      this.map.setZoomAndCenter(16, data.mapPointData[0][0]);
      // if (isClick) {
      //   geometry.emit("click", {
      //     target: geometry,
      //     lnglat: data.position,
      //   });
      // }
    } else {
      const oldRankMarker = this.vm.$store.state.xiaokunshan.rankMarker;
      if (oldRankMarker) {
        oldRankMarker.setRank(1);
      }
      let labelMarker1 = AMap.DMarker.getLabelMarkerById(
        data.type,
        data.type + "_" + data.rowid
      );

      if (!labelMarker1) {
        await this.addPoints(page, [data], false);
        labelMarker1 = AMap.DMarker.getLabelMarkerById(
          data.type,
          data.type + "_" + data.rowid
        );
      }
      if (labelMarker1) {
        labelMarker1.setRank(2);
        const position1 = labelMarker1.getPosition();
        this.map.setZoomAndCenter(16, position1);
        this.vm.$store.commit("setRankMarker", labelMarker1);
        if (isClick) {
          labelMarker1.emit("click", {
            target: labelMarker1,
            lnglat: position1,
          });
        }
      }
    }
  }
  addHeatMap(pageType, data) {
    if (pageType === this.vm.$route.name) {
      // this.heatmapData[data.config.name] = data;
      this.heatmap = new AMap.HeatMap(this.map, {
        radius: 25, // 给定半径
        opacity: [0, 1],
        gradient: {
          0.2: "#" + data.config.color1 || "#0000ff",
          0.4: "#" + data.config.color2 || "#ff5500",
          0.6: "#" + data.config.color3 || "#00ff00",
          0.8: "#" + data.config.color4 || "#ffff00",
          1.0: "#" + data.config.color5 || "#00ffff",
        },
      });
      this.heatmap.setDataSet({
        data: data.mvalue,
        max: 100,
      });
    }
  }
  removeHeatMap() {
    if (this.heatmap != null) {
      this.heatmap.setMap(null);
    }
  }

  clearMap() {
    this.removeHeatMap();
    this.map.clearMap();
    AMap.DMarker.labelsLayers = {};
    AMap.DMarker.labelMarks = {};
    AMap.DGeometry.clearGeometry();
  }
}
