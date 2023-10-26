/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2021-12-30 10:57:58
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2022-08-19 16:24:30
 */
import { gps } from '../../utils/gps';
import store from '../../store/index';
// 工具类
const icon = require('./img/icon.png');

import darg from './darg';
export class Tool {
  constructor(vm, map) {
    this.map = map;
    this.vm = vm;
    // 小地图
    this.HawkEy = new AMap.HawkEye({
      visible: false,
      position: {
        left: '1200px',
        top: '150px'
      }
    });
    // 指南针
    this.controlBar = new AMap.ControlBar({
      visible: false,
      position: {
        left: '1200px',
        top: '160px',
        zIndex: 10
      },
      showControlButton: true // 是否显示倾斜、旋转按钮。默认为 true
    });
    this.ToolBar = new AMap.ToolBar({
      visible: false,
      position: {
        left: '1232px',
        top: '250px',
        zIndex: 10
      },
      showControlButton: true // 是否显示倾斜、旋转按钮。默认为 true
    });

    this.map.addControl(this.ToolBar);
    this.map.addControl(this.controlBar);
    this.map.addControl(this.HawkEy);
    this.count = 0;
    // 坐标测绘
    this.clickmaker = undefined;

    // 工具类
    this.mouseTool = new AMap.MouseTool(map);

    // 绘画
    this.overlay = [];

    //
    this.mouseAction = '';
    this.setmouseTool();

    this.map.on('moveend', this.logMapinfo);
    this.map.on('zoomend', this.logMapinfo);
    // this.map.viewAllSelect = this.vm.$api.viewAllSelect;
    this.map.vms = this.vm;
    this.markers = {};
    this.currentType = '';
    this.selectLine = [];// 选择路线的经纬度1111
    this.selectPoint = '';// 选择路线的经纬度1111
    // this.linePoint='';
    // this.clickDrawMarker='';//111
    this.addressMarker = '';
  }
  // 切换 小地图生成
  toggleOverViewShow(checkbox) {
    if (checkbox) {
      this.HawkEy.show();
      this.count++;
      if (this.count === 1) {
        const hawkeye = document.querySelector('.amap-hawkeye');
        const dom = document.createElement('div');
        const hawkeybox = document.createElement('div');
        dom.className = 'hawkeye-close';
        dom.onclick = () => {
          this.HawkEy.hide();
        };
        hawkeybox.className = 'hawkeye-box';
        hawkeye.appendChild(dom);
        hawkeybox.innerHTML = '上海市';
        hawkeye.appendChild(hawkeybox);
        darg.init(hawkeybox, hawkeye);
      }
    } else {
      this.HawkEy.hide();
    }
  }
  // 指南针切换
  toggleCompassViewShow(checkbox) {
    if (checkbox) {
      this.controlBar.show();
      this.ToolBar.show();
      const controlBar = document.querySelector('.amap-controlbar');
      const amapToolbar = document.querySelector('.amap-toolbar');
      const amapPointers = document.querySelector('.amap-pointers');
      // darg.init(controlBar, controlBar);
      // darg.init(amapToolbar, amapToolbar);
      amapPointers.onclick = () => {
        this.map.setZoomAndCenter(12, [
          '121.22082423100005',
          '31.022434660000044'
        ]);
      };
    } else {
      this.controlBar.hide();
      this.ToolBar.hide();
    }
  }
  setCenter() {
    this.map.setZoomAndCenter(12, ['121.22082423100005', '31.022434660000044']);
  }

  // 清除 覆盖物
  removeOverlays() {
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.markers['measureAngle'] &&
      this.map.remove(this.markers['measureAngle']);
    this.mouseTool.close(true);
    this.removeclickMaker();
  }

  // 距离
  Drawrule() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);

    this.mouseTool.rule();
  }
  // 面积
  DrawArea() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseTool.measureArea({
      strokeColor: '#80d8ff',
      fillColor: '#80d8ff',
      fillOpacity: 0.3
      // 同 Polygon 的 Option 设置
    });
  }
  // 点
  addMaker(e) {
    this.clickmaker && this.remove(this.clickmaker);
    this.clickmaker2 && this.remove(this.clickmaker2);
    this.clickmaker3 && this.remove(this.clickmaker3);
    this.clickmaker = new AMap.Marker({
      zIndex: 99,
      anchor: 'bottom-center',
      position: [e.lnglat.lng, e.lnglat.lat]
    });
    this.add(this.clickmaker);
    this.clickmaker.setLabel({
      direction: 'right',
      offset: new AMap.Pixel(10, 0), // 设置文本标注偏移量
      content: `<div class='info-position'>经度:${e.lnglat.lng},纬度:${e.lnglat.lat}</div>` // 设置文本标注内容
    });
  }
  // 设置地图鼠标点击事件
  addclickMaker(e) {
    this.removeclickMaker();
    this.mouseTool.close(true);
    this.map.on('click', this.addMaker);
  }

  // 设置地图鼠标点击事件
  addclickMakerSomePlot(e) {
    this.removeclickMaker();
    this.mouseTool.close(true);
    this.map.on('click', this.addMakerPlot);
  }

  // 设置地图鼠标点击事件
  addclickMakerNotation(e) {
    this.removeclickMaker();
    this.mouseTool.close(true);
    this.map.on('click', this.addMakerNotation);
  }
  delPlanMaker() {
    this.map.maker && this.map.remove(this.map.maker);
    this.map.off('click', this.addPlanMakerNotation);
  }

  // 预案生成图标
  addPlanMaker() {
    this.map.on('click', this.addPlanMakerNotation);
  }
  addPlanMakerNotation(e) {
    const count = 0;
    // this.maker && this.remove(this.maker);
    // this.maker = new AMap.Marker({
    //   zIndex: 99,
    //   anchor: "bottom-center",
    //   position: [e.lnglat.lng, e.lnglat.lat],
    //   icon: "https://s3.bmp.ovh/imgs/2022/01/7d396edbd9d5b599.png"
    // });
    // this.vms.$store.commit("setplanPoint", e.lnglat.lng + "," + e.lnglat.lat);

    this.geocoder = new AMap.Geocoder({
      city: '010', // 城市设为北京，默认：“全国”
      radius: 1000 // 范围，默认：500
    });
    const Marker = '';
    const self = this.vms;
    this.geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function(
      status,
      result
    ) {
      if (status === 'complete' && result.regeocode) {
        address = result.regeocode.formattedAddress;
        self.$store.commit('setplanLocation', address);
      } else {
        console.log('转换失败');
      }
    });
    console.log(gps.gcj_decrypt_circleSelect(e.lnglat.lat, e.lnglat.lng));

    const obj = this.vms.$store.state.plan.planCaerjson;
    this.vms.Prompt(() => {
      this.vms.$api.getReport({
        address: address,
        ...obj,
        is_simulation: 1,
        source: 1,
        position: gps.gcj_decrypt_circleSelect(e.lnglat.lat, e.lnglat.lng),
        event_name: obj.name
      });
      this.vms.eventBus.$emit('planIconActionRemove');
      this.vms.eventBus.$emit('getTriggerlistDatas');
    });

    // window.AMap.DMap.add(this.maker);
  }

  addMakerPlot(e) {
    this.clickmaker && this.remove(this.clickmaker);
    this.clickmaker2 && this.remove(this.clickmaker2);
    this.clickmaker3 && this.remove(this.clickmaker3);
    this.clickmaker2 = new AMap.Marker({
      zIndex: 99,
      anchor: 'bottom-center',
      position: [e.lnglat.lng, e.lnglat.lat],
      icon: 'https://s3.bmp.ovh/imgs/2021/11/7902bbf89146fce5.png'
    });
    this.add(this.clickmaker2);
  }
  // 点选
  async addMakerNotation(e) {
    this.clickmaker && this.remove(this.clickmaker);
    this.clickmaker2 && this.remove(this.clickmaker2);
    this.clickmaker3 && this.remove(this.clickmaker3);
    this.clickmaker3 = new AMap.Marker({
      zIndex: 99,
      anchor: 'bottom-center',
      position: [e.lnglat.lng, e.lnglat.lat],
      icon: 'https://s3.bmp.ovh/imgs/2022/01/8ecbfd4bff637152.png'
    });
    // console.log(thi);
    this.add(this.clickmaker3);
    const r = await this.viewAllSelect({
      polygon: e.lnglat.lng + ',' + e.lnglat.lat,
      function: 'circleSelect'
    });

    const array = [];
    r.data.camera.forEach(item => {
      array.push({
        ...item,
        check: false
      });
    });
    if (array.length === 0) {
      this.vms.$message({
        message: '附近的摄像头为空',
        type: 'warning'
      });
      return;
    }

    this.vms.$store.commit('setcamearAction', true);
    this.vms.$store.commit('setcamearList', array);
  }

  // 清除地图单击事件
  removeclickMaker(e) {
    this.map.off('click', this.addMaker);
    this.map.off('click', this.addMakerPlot);
    this.map.off('click', this.addMakerNotation);
    this.map.off('click', this.drawPolyline);// 111
    this.map.off('click', this.drawMarker);// 111
  }

  // 正方形全选
  rectangle() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseAction = 'rectangle';
    this.mouseTool.rectangle({
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
      // 同Polygon的Option设置
    });
  }
  // 11111清除覆盖物
  removeSelectLine() {
    AMap.DTool.addressMarker = '';
    this.mouseTool.close(true);
    this.selectLine = [];
    this.selectPoint = '';
    this.map.off('click', this.cancelDraw);
    this.map.off('click', this.cancelDrawPolyline);
  }
  // 线段
  drawPolyline() {
    this.selectLine = [];// 1111
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseTool.polyline({
      strokeColor: '#00B578',
      strokeOpacity: 1,
      strokeWeight: 6,
      // 线样式还支持 'dashed'
      strokeStyle: 'solid'
      // strokeStyle是dashed时有效
      // strokeDasharray: [10, 5],
    });
    const that = this;
    this.map.on('click',
      // function(e){
      // 	const x=	e.lnglat.getLng()
      // 	const y=e.lnglat.getLat()
      //  let arr=x+','+y
      // 	that.selectLine.push(arr)
      // 	that.selectLine=that.unique(that.selectLine)
      //  console.log("经纬度",e.lnglat.getLng(),e.lnglat.getLat(),that.selectLine)
      // }
      this.cancelDrawPolyline
    );
  }
  cancelDrawPolyline(e) {
    const x =	e.lnglat.getLng();
    const y = e.lnglat.getLat();
	 const arr = x + ',' + y;
	 AMap.DTool.selectLine.push(arr);
    // console.log("经纬度",e.lnglat.getLng(),e.lnglat.getLat(),AMap.DTool.selectLine)
  }
  // 点选11111
  drawMarker() {
    this.selectPoint = '';
    this.removeclickMaker();
    this.mouseTool.marker({
      icon: icon
    });
    this.map.on('click', this.cancelDraw);
  }
  cancelDraw(e) {
    AMap.DTool.selectPoint = '';
    const x =	e.lnglat.getLng();
    const y = e.lnglat.getLat();
    AMap.DTool.selectPoint = x + ',' + y;
    // console.log("经纬度",e.lnglat.getLng(),e.lnglat.getLat(),AMap.DTool.selectPoint)
  }
  getAddressMarker(pos) {
    AMap.DTool.addressMarker = '';
    const that = this;
    AMap.DMap.plugin('AMap.Geocoder', function() {
      var geocoder = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '全国'
      });
      var lnglat = pos;
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          // AMap.DTool.addressMarker=result.regeocode.formattedAddress;
          console.log('=============地址', that);
          that.$store.commit('setSaveAddress', result.regeocode.formattedAddress);
        }
      });
    });
  }
  drawPolygon() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseTool.polygon({
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillColor: '#1791fc',
      fillOpacity: 0.4,
      // 线样式还支持 'dashed'
      strokeStyle: 'solid'
      // strokeStyle是dashed时有效
      // strokeDasharray: [30,10],
    });
  }

  // 线选
  polyline() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseAction = 'polyline';
    this.mouseTool.polyline({
      strokeColor: '#3366FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      // 线样式还支持 'dashed'
      strokeStyle: 'solid'
      // strokeStyle是dashed时有效
      // strokeDasharray: [10, 5],
    });
  }

  // 圈选
  circle() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseAction = 'circle';
    this.mouseTool.circle({
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
      // 同Circle的Option设置
    });
  }
  // 多边形 框选
  polygon() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseAction = 'polygon';
    this.mouseTool.polygon({
      fillColor: '#00b0ff',
      strokeColor: '#80d8ff'
      // 同Polygon的Option设置
    });
  }
  // 画圈
  setmouseTool() {
    this.mouseTool.on('draw', e => {
      this.overlay && this.map.remove(this.overlay); // 删除之前的画图结构
      this.overlay.push(e.obj);
      this.markers['measureAngle'] &&
        this.map.remove(this.markers['measureAngle']);
      switch (this.mouseAction) {
        case 'polygon':
          this.getSelect({
            function: 'boxSelect',
            polygon: this.fiterMaps(e.obj._opts.path)
          });
          break;
        case 'circle':
          this.getSelect({
            function: 'circleSelect',
            polygon: gps.gcj_decrypt_circleSelect(
              e.obj._opts.center.lat,
              e.obj._opts.center.lng
            ),
            radius: e.obj._opts.radius
          });
          break;
        case 'polyline':
          this.getSelect({
            function: 'bufferSelect',
            polygon: this.fiterMaps(e.obj.$x[0])
          });
          break;
        case 'rectangle':
          this.getSelect({
            function: 'boxSelect',
            polygon: this.fiterMaps(e.obj.aE[0][0])
          });
          break;
        case 'Angle':
          this.mouseAction = false;
          this.mouseAction = '';
          // this.removeclickMaker();
          const path = e.obj.getPath();
          path.forEach((val, i, arr) => {
            if (i > 0 && i < arr.length - 1) {
              const p1 = arr[i - 1];
              const p2 = arr[i];
              const p3 = arr[i + 1];
              const angle = this.measureAngle({ X: p2.pos[0], Y: p2.pos[1] }, { X: p1.pos[0], Y: p1.pos[1] }, { X: p3.pos[0], Y: p3.pos[1] });
              console.log(p2, p2);
              this.addMarker(
                [p2.lng, p2.lat],
                `角度:${angle}`,
                'measureAngle',
                undefined,
                true
              );
            }
          });
          break;

        default:
          break;
      }
    });
  }

  // 得到 框选出来的坐标位置
  fiterMaps(ele) {
    const array = [];
    ele.forEach((element, index) => {
      array.push(gps.gcj_decrypt_str(element[1], element[0]));
    });
    array.push(gps.gcj_decrypt_str(ele[0][1], ele[0][0]));
    return array.join(',');
  }

  // 画完圈后 请求接口
  async getSelect(params) {
    const r = await this.vm.$api.viewAllSelect(params);
    const array = [];
    r.data.camera.forEach(item => {
      array.push({
        ...item,
        check: false
      });
    });
    if (array.length === 0) {
      this.vm.$message({
        message: '框选的摄像头为空',
        type: 'warning'
      });
      return;
    }
    this.vm.$store.commit('setcamearAction', true);
    this.vm.$store.commit('setcamearList', array);
  }
  // 得到 地图当前位置
  logMapinfo() {
    this.geocoder = null;

    if (document.querySelector('.hawkeye-box')) {
      var center = this.getCenter(); // 获取当前地图中心位置
      this.geocoder = new AMap.Geocoder({
        city: '010', // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      });
      this.geocoder.getAddress(center, function(status, result) {
        if (status === 'complete' && result.regeocode) {
          const address = result.regeocode.formattedAddress;
          document.querySelector('.hawkeye-box').innerText = address.substring(
            0,
            19
          );
        } else {
          document.querySelector('.hawkeye-box').innerText =
            '根据经纬度查询地址失败';
        }
      });
    }
  }
  calcAngle(angle) {
    // var p_start = this.map.lngLatToContainer(start),
    //   p_end = this.map.lngLatToContainer(end);
    // var diff_x = p_end.x - p_start.x,
    //   diff_y = p_end.y - p_start.y;
    // console.log((360 * Math.atan2(diff_y, diff_x)) / (2 * Math.PI) + 90);
    // return (360 * Math.atan2(diff_y, diff_x)) / (2 * Math.PI) + 90;
    console.log(angle);
  }
  addMarker(position, content, type, offset, isDefault) {
    console.log(this.markers['measureAngle']);
    const marker = new AMap.Marker({
      zIndex: 99,
      anchor: 'bottom-center',
      position
    });
    this.map.add(marker);
    marker.setLabel({
      direction: 'right',
      offset: offset
        ? new AMap.Pixel(offset[0], offset[1]) : new AMap.Pixel(10, 0), // 设置文本标注偏移量
      content: isDefault ? `<div class='angle-info'>${content}</div>` : content // 设置文本标注内容
    });
    this.currentType = type;
    this.markers[type] = this.markers[type] || [];
    this.markers[type].push(marker);
  }
  measureAngle(A, B, C) {
    // let A = {X:0,Y:0}
    // let B = {X:4,Y:0}
    // let C = {X:4,Y:4}
    const AB = Math.sqrt(Math.pow(A.X - B.X, 2) + Math.pow(A.Y - B.Y, 2));
    const AC = Math.sqrt(Math.pow(A.X - C.X, 2) + Math.pow(A.Y - C.Y, 2));
    const BC = Math.sqrt(Math.pow(B.X - C.X, 2) + Math.pow(B.Y - C.Y, 2));
    const cosA =
      (Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)) / (2 * AB * AC);
    const angleA = Math.round((Math.acos(cosA) * 180) / Math.PI);
    return angleA;
  }
  // 线选
  Angle() {
    this.removeclickMaker();
    this.map.clickmaker && this.map.remove(this.map.clickmaker);
    this.map.clickmaker2 && this.map.remove(this.map.clickmaker2);
    this.map.clickmaker3 && this.map.remove(this.map.clickmaker3);
    this.mouseAction = 'Angle';
    this.mouseTool.polyline({
      strokeColor: '#3366FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      // 线样式还支持 'dashed'
      strokeStyle: 'solid'
      // strokeStyle是dashed时有效
      // strokeDasharray: [10, 5],
    });
  }
}
