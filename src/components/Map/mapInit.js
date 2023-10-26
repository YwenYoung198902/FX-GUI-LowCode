import { Marker } from "./marker";
import { Geometry } from "./geometry";
import { InfoShow } from "./infoShow";
import { gps } from "@/utils/index";
import { Tool } from "./tool";
import { positionToGCJ02, setCenter } from "./util";
import { Control } from "./control";
import { IconAnimation } from "./animation";
// import { XiaoKunShanLayer } from "./xiaokunshanLayer";
// import newCityBounds from "@/assets/data/newCityBounds1";

const loadInit = (map) => {
  // streetBounds.features.forEach((feature) => {
  //   const path = feature.geometry.coordinates[0];
  //   const pathArr = path.map((val) => {
  //     return positionToGCJ02(val);
  //   });
  //   AMap.DGeometry.addPolyline({
  //     pathArr,
  //     strokeWeight: 1.0,
  //     strokeColor: "#00ff00",
  //   });
  // });
  // newCityBounds.features.forEach((feature) => {
  //   const path = feature.geometry.coordinates[0];
  //   const polyline = new AMap.Polyline({
  //     path,
  //     strokeDasharray: [15, 15],
  //     strokeWeight: 2.0,
  //     strokeStyle: "dashed",
  //     strokeColor: "#00ff00",
  //   });
  //   AMap.newCityBounds = polyline;
  //   map.add(polyline);
  //   map.setFitView(polyline);
  // });
  // new AMap.DistrictSearch({
  //   extensions: "all",
  //   subdistrict: 0,
  // }).search("松江区", function (status, result) {
  //   // 外多边形坐标数组和内多边形坐标数组
  //   const outer = [
  //     new AMap.LngLat(-360, 90, true),
  //     new AMap.LngLat(-360, -90, true),
  //     new AMap.LngLat(360, -90, true),
  //     new AMap.LngLat(360, 90, true),
  //   ];
  //   const pathArray = [outer];
  //   const holes = result.districtList[0].boundaries;
  //   pathArray.push.apply(pathArray, holes);
  //   const polygon = new AMap.Polygon({
  //     pathL: pathArray,
  //     strokeColor: "#18ffee", //城市边界颜色
  //     strokeWeight: 3.0,
  //     fillColor: "#001A29", // 遮罩背景色黑色
  //     fillOpacity: 1.0,
  //   });
  //   const polyline = new AMap.Polyline({
  //     path: holes,
  //     strokeDasharray: [15, 15],
  //     strokeWeight: 1.0,
  //     strokeStyle: "dashed",
  //     strokeColor: "#18ffee",
  //   });
  //   polygon.setPath(pathArray);
  //   map.add(polygon);
  //   map.add(polyline);
  //   AMap.areaBounds = polyline;
  // });
};
/**
 * 高德地图初始化
 * @param {Object}AMap  高德加载后全局变量
 * @param {string}container 高德加载容器div
 * @param {string}viewMode 地图视图模式, 默认为‘2D’，可选’3D’
 * @param {Number}zoom 地图显示的缩放级别，
 * @param {Array<number>}zooms 地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 30]
 * @param {Array<number>}center 初始中心经纬度
 * @param {string} mapStyle 地图的显示样式
 */
export const mapInit = (
  vm,
  { AMap = window.AMap, container, viewMode, zoom, zooms, center, mapStyle }
) => {
  const map = new AMap.Map(container, {
    viewMode: viewMode || "3D",
    zoom: zoom || 17,
    zooms: zooms || [8, 30],
    center: center,
    mapStyle: mapStyle || "amap://styles/normal",
    showBuildingBlock: true,
    layers: [AMap.createDefaultLayer()],
  });
  // const xiaoKunShanLayer = new XiaoKunShanLayer(map, vm);
  const marker = new Marker(map, vm);
  const iconAnimation = new IconAnimation(map, vm);
  const geometry = new Geometry(map, vm);
  const infoShow = new InfoShow(map, vm);
  const control = new Control(map, vm);
  const tool = new Tool(vm, map);

  AMap["DMap"] = map;
  // AMap["DXiaoKunShanLayer"] = xiaoKunShanLayer;
  AMap["DTool"] = tool;
  AMap["IconAnimation"] = iconAnimation;
  AMap["DMarker"] = marker;
  AMap["DGeometry"] = geometry;
  AMap["DInfoShow"] = infoShow;
  AMap["DControl"] = control;
  loadInit(map);
  return map;
};
