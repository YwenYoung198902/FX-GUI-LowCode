/**
 *
 * */
export class IconAnimation {
  constructor(map, vm) {
    this.map = map;
    this.vm = vm;
    this.marker = null;
    this.markers = {};
  }
  addMarker(image, path, position, id, offset, isTrail, isPassedTrail) {
    let marker = null;
    // if (this.markers[id]) {
    //   marker = this.markers[id];
    // } else {
    marker = new AMap.Marker({
      map: this.map,
      position,
      icon: image,
      offset: new AMap.Pixel(offset[0], offset[1]),
    });
    isTrail && this.addTrail(path);
    const passedLine = isPassedTrail && this.addPassedTrail();
    marker.on("moving", function (e) {
      passedLine && passedLine.setPath(e.passedPath);
      // map.setCenter(e.target.getPosition(),true)
    });
    id && (this.markers[id] = marker);
    // }
    this.marker = marker;
    return marker;
  }
  // 绘制轨迹
  addTrail(path) {
    const polyline = new AMap.Polyline({
      map: this.map,
      path,
      showDir: true,
      strokeColor: "#08B8CB", // 线颜色
      // strokeOpacity: 1,     //线透明度
      strokeWeight: 6, // 线宽
      // strokeStyle: "solid"  //线样式
    });
    return polyline;
  }
  // 添加行驶过的轨迹
  addPassedTrail() {
    const passedPolyline = new AMap.Polyline({
      map: this.map,
      strokeColor: "#AF5", // 线颜色
      strokeWeight: 6, // 线宽
    });
    return passedPolyline;
  }
  startAnimation(options) {
    // this.clearAnimation();
    const {
      id,
      image,
      path,
      duration = 100,
      position,
      offset = [-13, -26],
      isTrail,
      isPassedTrail,
    } = options;
    const marker = this.addMarker(
      image,
      path,
      position,
      id,
      offset,
      isTrail,
      isPassedTrail
    );
    console.log(path, "startAnimation");
    marker.moveAlong(path, {
      // 每一段的时长
      duration, // 可根据实际采集时间间隔设置
      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      autoRotation: true,
    });
  }
  getMarkerById(id) {
    if (id && this.markers[id]) {
      return this.markers[id];
    }
  }
  // 暂停动画
  pauseAnimation(marker = this.marker) {
    marker.pauseMove();
  }

  // 继续动画
  resumeAnimation(marker = this.marker) {
    marker.resumeMove();
  }

  // 停止动画
  stopAnimation(marker = this.marker) {
    marker.stopMove();
  }

  clearAnimation() {
    console.log(this.markers);
    if (Object.keys(this.markers).length > 0) {
      Object.keys(this.markers).forEach((marker) => {
        this.map.remove(marker);
      });
    } else {
      this.map.remove(this.marker);
    }
  }
}
