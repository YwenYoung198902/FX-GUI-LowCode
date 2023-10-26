/**
 *
 * */
import { setZoomAndCenter, getPolygonCenter, positionToGCJ02 } from "./util";
import Store from "@/store/index.js";

export class Control {
  constructor(map, vm) {
    this.map = map;
    this.vm = vm;
    this.currentLineId = ""; // 新添加的线的id
    this.currentVehicleId = "";
    this.currentStationId = "";
    this.currentSiteId = "";
    this.currentType = "";
    this.checkedBusLineIds = undefined;
    this.checkedTrackLineIds = undefined;
    this.lineTypeMap = {
      1: ["busLineUp", "busLineDown"],
      2: ["trackLineUp", "trackLineDown"],
    };
    /**
     * 地图点击恢复场景元素click事件
     * */
    this.map.on("click", (e) => {
      this.recoveryClick();
    });
  }
  /**
   * @description 根据传入的图层类型及选中id 数组
   * @param  {array} checkedIds 选中id数组
   * @param  {array} isUp 线路的时候是不是上行线路
   * */
  // * 线路 line ：busLine  trackLine
  // * 车辆  vehicle：bus   track taxi
  // * 场站 station ：busStation  trackStation
  // * 站点 site：  busSite   trackSite
  changeLayer(type, checkedIds, isUp) {
    this.currentType = type;
    // this.clearIntervals([AMap.DLayer.busInterval]);
    isUp = isUp || this.vm.$store.state.upstream;
    switch (type) {
      case "busLine":
        this.checkedBusLineIds = checkedIds;
        AMap.DMarker.removeLabelMarkerByTypes(["busLineStart", "busLineEnd"]);
        AMap.DGeometry.removeGeometriesByType(type);
        AMap.DLayer.addBusLine(checkedIds, type, isUp);
        break;
      case "trackLine":
        this.checkedTrackLineIds = checkedIds;
        AMap.DGeometry.removeGeometriesByType(type);
        AMap.DLayer.addTrackLine(checkedIds, type, isUp);
        break;
      case "bus":
        this.clearIntervals([
          AMap.DLayer.busInterval,
          AMap.DLayer.trackInterval,
        ]);
        AMap.DMarker.removeMassMarksByTypes(["busUp", "busDown"]);
        AMap.DLayer.addBus(checkedIds);
        break;
      case "track":
        this.clearIntervals([
          AMap.DLayer.busInterval,
          AMap.DLayer.trackInterval,
        ]);
        AMap.DMarker.removeMassMarksByType("track");
        AMap.DLayer.addTrack(checkedIds);
        break;
      case "taxi":
        break;
      case "busStation":
        AMap.DMarker.removeLabelMarkerByType(type);
        AMap.DLayer.addStation(checkedIds, type, [10, 30]);
        break;
      case "trackStation":
        AMap.DMarker.removeLabelMarkerByType(type);
        AMap.DLayer.addStation(checkedIds, type, [10, 30]);
        break;
      case "busSite":
        AMap.DMarker.removeLabelMarkerByType(type);
        AMap.DLayer.addSite(checkedIds, type, [10, 30]);
        break;
      case "trackSite":
        AMap.DMarker.removeLabelMarkerByType(type);
        AMap.DLayer.addSite(checkedIds, type, [10, 30]);
        break;
    }
  }
  /**
   * @description 改变路由控制模块改变地图发生的变化
   * */
  changeModule(route, isRecovery) {
    this.vm.$store.commit("setShowLineDetail", {
      isShow: false,
    });
    this.clearIntervals([AMap.DLayer.busInterval, AMap.DLayer.trackInterval]);
    AMap.DMarker.clearMassMarks();
    AMap.DMarker.clearLabelMarks();
    AMap.DGeometry.clearGeometry();
    AMap.DInfoShow.closeInfoWindow();
    AMap.DMarker.removeAllTexts();
    // AMap.DLayer.addInfoMark();
    switch (route) {
      case "index":
        this.map.setFitView(AMap.newCityBounds);
        AMap.DLayer.addBusLine(undefined, "busLine", true, true); // 初始化添加重点线路
        AMap.DLayer.addTrackLine(undefined, "trackLine", true); // 添加有轨线路
        AMap.DLayer.addSubwayLine(); // 添加地铁线路
        AMap.DLayer.addSite(undefined, "busSite"); // 初始化加载所有公交站点
        AMap.DLayer.addSite(undefined, "trackSite"); // 初始化加载所有有轨站点
        break;
      case "line":
        this.map.setFitView(AMap.areaBounds);
        AMap.DLayer.addBusLine(
          isRecovery ? this.checkedBusLineIds : undefined,
          "busLine",
          true,
          false
        ); // 初始化添加重点线路
        AMap.DLayer.addSite(
          isRecovery ? this.checkedTrackLineIds : undefined,
          "busSite",
          true
        ); // 初始化加载所有公交站点
        AMap.DLayer.addTrackLine(undefined, "trackLine", true); // 添加有轨线路
        AMap.DLayer.addSubwayLine(); // 添加地铁线路
        break;
      case "cars":
        this.map.setFitView(AMap.areaBounds);
        AMap.DLayer.addBus();
        AMap.DLayer.addTrack();
        break;
      case "station":
        this.map.setFitView(AMap.areaBounds);
        AMap.DLayer.addStation(undefined, "busStation", [10, 30], true);
        AMap.DLayer.addStation(undefined, "trackStation", [10, 30], true);
        break;
      case "site":
        this.map.setFitView(AMap.areaBounds);
        AMap.DLayer.addSite(undefined, "busSite", [10, 30]); // 初始化加载所有公交站点
        AMap.DLayer.addSite(undefined, "trackSite", [10, 30]); // 初始化加载所有公交站点
        break;
      case "property":
        this.map.setFitView(AMap.areaBounds);
        break;
      case "event":
        this.map.setFitView(AMap.areaBounds);
        break;
      case "preplan":
        this.map.setFitView(AMap.areaBounds);
        break;
    }
  }
  clearIntervals(intervals) {
    intervals instanceof Array &&
      intervals.forEach((interval) => {
        interval && clearInterval(interval);
      });
    AMap.DLayer.busUpLayer = null;
    AMap.DLayer.busDownLayer = null;
    AMap.DLayer.trackLayer = null;
  }
  recoveryAddLine() {}
  /**
   * @description: 点击线路详情时添加车辆和站点
   * */
  async addSiteAndVehicleByLine(type, lineId, isUp) {
    this.clearIntervals([AMap.DLayer.busInterval]);
    AMap.DMarker.clearMassMarks();
    AMap.DMarker.clearLabelMarks();
    AMap.DGeometry.clearGeometry();
    let siteIds = [];
    let vehicleIds = [];
    let siteType;
    if (type === "busLine") {
      siteType = "busSite";
      const response = await this.vm.$api.getLineStationList({
        line_id: lineId,
        direction: isUp ? "A" : "B",
      });
      const bgColor = isUp ? "rgba(255,0,0,0.3)" : "rgba(0,255,255,0.3)";
      const borderColor = isUp ? "#ff0000" : "#00ffff";
      siteIds = response.data.map((site) => {
        AMap.DMarker.addText(
          [site.station_lon, site.station_lat],
          site.station_name,
          undefined,
          isUp ? [-120, 0] : [0, 0],
          bgColor,
          borderColor
        );
        return site.station_id;
      });
      const response1 = await this.vm.$api.getVehicleList({
        line_id: lineId,
      });
      if (response1.data.length > 0) {
        vehicleIds = response1.data.map((val) => {
          return val.bus_id;
        });
        AMap.DLayer.addBus(vehicleIds, true);
      }
    } else {
      siteType = "trackSite";
      const bgColor = isUp ? "rgba(255,0,0,0.3)" : "rgba(0,255,255,0.3)";
      const borderColor = isUp ? "#ff0000" : "#00ffff";
      const response = await this.vm.$api.getTramStationList({
        line_id: lineId,
        direction: isUp ? "1" : "2",
      });
      siteIds = response.data.map((site) => {
        const p = positionToGCJ02([site.station_lon, site.station_lat]);
        AMap.DMarker.addText(
          p,
          site.station_name,
          undefined,
          isUp ? [-120, 0] : [0, 0],
          bgColor,
          borderColor
        );
        return site.station_id;
      });
      AMap.DLayer.addTrack();
    }
    // AMap.DLayer.addSite(siteIds, siteType, [10, 30], undefined, isUp); // 加载线路上的所有公交站点
  }
  async flyToById(
    type,
    id,
    isTop,
    zoom,
    isClick = true,
    isDetail,
    immediately = false,
    duration
  ) {
    this.recoveryClick();
    let response, vInfo, busPosition;
    switch (type) {
      case "busLine":
      case "trackLine":
        AMap.DMarker.removeAllTexts();
        const showLineDetail = this.vm.$store.state.showLineDetail;
        AMap.DMarker.removeLabelMarkerByType(type + "Start");
        AMap.DMarker.removeLabelMarkerByType(type + "End");
        if (showLineDetail) {
          // 展示线路详情
          await this.addSiteAndVehicleByLine(type, id, false);
          await this.addSiteAndVehicleByLine(type, id, true);
          await AMap.DLayer.addBusLine([id], type, false, false, "#00ffff");
          await AMap.DLayer.addBusLine([id], type, true, false, "#ff0000");
          isClick = false;
        }
        let geometry = AMap.DGeometry.getGeometryById(type, id);
        if (this.currentLineId && !isDetail) {
          AMap.DGeometry.removeGeometriesById(type, this.currentLineId);
          this.currentLineId = "";
          if (this.currentLineId === id) {
            return;
          }
        }
        if (!geometry) {
          if (type === "busLine") {
            await AMap.DLayer.addBusLine([id], type, true);
          } else {
            await AMap.DLayer.addTrackLine([id], type, true);
          }
          this.currentLineId = id;
          geometry = AMap.DGeometry.getGeometryById(type, id);
        }
        const path = geometry.getPath();
        const center = path[Math.ceil(path.length / 2)];
        this.map.setZoomAndCenter(13, center);
        // this.map.setFitView(geometry);
        if (isClick) {
          geometry.emit("click", {
            lnglat: center,
            target: geometry,
          });
        }

        break;
      case "bus":
        response = await this.vm.$api.getVehicleInfo({
          bus_id: id,
        });
        vInfo = response.data;
        busPosition = positionToGCJ02([vInfo.longitude, vInfo.latitude]);
        this.map.setZoomAndCenter(18, busPosition);
        if (isClick) {
          AMap.DInfoShow.showInfoWindowByType("vehicle", busPosition, {
            id: id,
            type,
          });
        }
        break;
      case "track":
        response = await this.vm.$api.getTrackVehicleInfo({
          car_id: id,
        });
        vInfo = response.data;
        busPosition = positionToGCJ02([vInfo.longitude, vInfo.latitude]);
        this.map.setZoomAndCenter(18, busPosition);
        if (isClick) {
          AMap.DInfoShow.showInfoWindowByType("vehicle", busPosition, {
            id: id,
            type,
          });
        }
        break;
      case "taxi":
        response = await this.vm.$api.getTaxiVehicleInfo({
          car_id: id,
        });
        vInfo = response.data;
        busPosition = positionToGCJ02([vInfo.longitude, vInfo.latitude]);
        this.map.setZoomAndCenter(18, busPosition);
        if (isClick) {
          AMap.DInfoShow.showInfoWindowByType("vehicle", busPosition, {
            id: id,
            type,
          });
        }
        break;
      case "busSite":
      case "trackSite":
      case "trackStation":
      case "busStation":
        let labelMarker = AMap.DMarker.getLabelMarkerById(type, id);
        if (/Site/.test(type)) {
          if (this.currentSiteId) {
            AMap.DMarker.removeLabelMarkerById(type, this.currentSiteId);
            this.currentSiteId = "";
            if (this.currentLineId === id) {
              return;
            }
          }
          if (!labelMarker) {
            await AMap.DLayer.addSite([id], type, [10, 30]);
            labelMarker = AMap.DMarker.getLabelMarkerById(type, id);
            this.currentSiteId = id;
          }
        } else {
          if (this.currentSiteId) {
            AMap.DMarker.removeLabelMarkerById(type, this.currentSiteId);
            this.currentSiteId = "";
            if (this.currentSiteId === id) {
              return;
            }
          }
          if (!labelMarker) {
            await AMap.DLayer.addStation([id], type, [10, 30]);
            labelMarker = AMap.DMarker.getLabelMarkerById(type, id);
            this.currentSiteId = id;
          }
          this.currentStationId = id;
        }
        const position = labelMarker.getPosition();
        this.map.setZoomAndCenter(20, position);
        if (isClick) {
          labelMarker.emit("click", {
            target: labelMarker,
            lnglat: position,
          });
        }
        break;
      default:
        break;
    }
  }

  flyTo(type, position, zoom, immediately = false, duration = 1000) {
    let center = this.map.getCenter();
    switch (type) {
      case "polyline":
        center = position[Math.ceil(position.length / 2)];
        break;
      case "polygon":
        center = getPolygonCenter(position);
        break;
      default:
        center = position;
        break;
    }
    this.map.setZoomAndCenter(zoom, center, immediately, duration);
  }

  /**
   * 恢复click状态
   */
  recoveryClick() {
    AMap.DInfoShow.closeInfoWindow();
    if (AMap.DGeometry.currentClickGeometry) {
      const opts = AMap.DGeometry.currentClickGeometry.getExtData();
      AMap.DGeometry.currentClickGeometry.emit("mouseout", {
        target: {
          isClick: false,
        },
      });
      AMap.DGeometry.currentClickGeometry.isClick = false;
      opts.isHide && AMap.DGeometry.currentClickGeometry.hide();
      AMap.DGeometry.currentClickGeometry = null;
    }
    if (AMap.DMarker.currentClickLabelMarker) {
      const opts = AMap.DMarker.currentClickLabelMarker.getExtData();
      AMap.DMarker.currentClickLabelMarker.emit("mouseout", {
        target: {
          isClick: false,
        },
      });
      AMap.DMarker.currentClickLabelMarker.isClick = false;
      opts.isHide && AMap.DMarker.currentClickLabelMarker.hide();
      AMap.DMarker.currentClickLabelMarker = null;
    }
  }
}
