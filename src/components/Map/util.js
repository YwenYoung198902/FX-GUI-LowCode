import { gps } from '../../utils/gps';

/**
 * @description 清除地图上的所有覆盖物
 */
const clearMap = () => {
  const map = AMap.DMap;
  map.clearMap();
};
const getPolygonCenter = function(positions) {
  const total = positions.length;
  let X = 0; let Y = 0; let Z = 0;
  positions.forEach((p) => {
    const lng = p.lng ? p.lng * Math.PI / 180 : p[0] * Math.PI / 180;
    const lat = p.lat ? p.lat * Math.PI / 180 : p[1] * Math.PI / 180;
    let x, y, z;
    x = Math.cos(lat) * Math.cos(lng);
    y = Math.cos(lat) * Math.sin(lng);
    z = Math.sin(lat);
    X += x;
    Y += y;
    Z += z;
  });
  X = X / total;
  Y = Y / total;
  Z = Z / total;
  const Lng = Math.atan2(Y, X);
  const Hyp = Math.sqrt(X * X + Y * Y);
  const Lat = Math.atan2(Z, Hyp);
  return [Lng * 180 / Math.PI, Lat * 180 / Math.PI];
};
/**
 * @description 设置地图中心
 * @param position {Array} 地图中心坐标
 * @param isWGS84 {Boolean} 是否是wgs84坐标
 * @param immediately {Boolean}  false  是否立即过渡到目标位置
 * @param duration {Number} 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
 */
const setCenter = (position, isWGS84 = false, immediately = false, duration) => {
  const map = AMap.DMap;
  position = isWGS84 ? gps.gcj_encrypt(position[1], position[0]) : { lon: position[0], lat: position[1] };
  map.setCenter([position.lon, position.lat], immediately, duration);
};
/**
 * @description 坐标 string 转换成数组
 * @param position {string} 坐标 例：‘121.1234,30.6541’
 * @param isWGS84 {Boolean} 是否是wgs84坐标
 * @return position {Array}
 */
const positionStringToArr = (position, isWGS84 = false) => {
  const p = position.split(',');
  position = isWGS84 ? gps.gcj_encrypt(Number(p[1]), Number(p[0])) : { lon: Number(p[0]), lat: Number(p[1]) };
  return [position.lon, position.lat];
};
/**
 * @description 坐标 WGS84转换
 * @param position {Array} 坐标 例：‘121.1234,30.6541’
 * @param isWGS84 {Boolean} 是否是wgs84坐标
 * @return position {Array}
 */
const positionToGCJ02 = (p, isWGS84 = false) => {
  const position = isWGS84 ? gps.gcj_encrypt(Number(p[1]), Number(p[0])) : { lon: Number(p[0]), lat: Number(p[1]) };
  return [position.lon, position.lat];
};
/**
 * @description 坐标 string 转换成数组
 * @param positions {string} 坐标 例：‘121.1234,30.6541;121.5678,30.3104’
 * @param isWGS84 {Boolean} 是否是wgs84坐标
 * @return position {Array}
 */
const positionsStringToArr = (positions, isWGS84 = false) => {
  const pointStringArr = positions.split(';');
  const points = [];
  pointStringArr.forEach((p, index) => {
    const point = p.split(',');
    if (point.length === 2) {
      const position = isWGS84 ? gps.gcj_encrypt(Number(point[1]), Number(point[0])) : { lon: Number(point[0]), lat: Number(point[1]) };
      points.push([position.lon, position.lat]);
    } else {
      // console.log(positions);
    }
  });
  return points;
};
/**
 * @description 设置层级及中心点
 * @param position {Array} 地图中心坐标
 * @param isWGS84 {Boolean} 是否是wgs84坐标
 * @param immediately {Boolean}  false  是否立即过渡到目标位置
 * @param duration {Number} 如果使用动画过度，动画过度的时长控制，单位 ms，默认值是内部自动计算的一个动态值。
 */
const setZoomAndCenter = (position, zoom, isWGS84 = false, immediately = false, duration) => {
  const map = AMap.DMap;
  zoom = zoom || map.getZoom();
  position = isWGS84 ? gps.gcj_encrypt(position[1], position[0]) : { lon: position[0], lat: position[1] };
  map.setZoomAndCenter(zoom, [position.lon, position.lat], immediately, duration);
};
const graspRoad = () => {
  const path = [
    // {x:p1[0],y:p1[1],"sp":40,"ag":0,"tm":8},
    // {x:p2[0],y:p2[1],"sp":40,"ag":0,"tm":18}
  ];
  if (!this.graspRoad) {
    this.graspRoad = new AMap.GraspRoad();
  }
  this.graspRoad.driving(path, function(error, result) {
    if (!error) {
      const newPath = result.data.points.map((p) => {
        return [p.x, p.y];
      });
    }
  });
};
let transfer = null;
const busTransfer = (pStart, pEnd) => {
  return new Promise(function(resolve, reject) {
    const transferOption = {
      city: '上海市',
      nightflag: true, // 是否计算夜班车
      policy: AMap.TransferPolicy.LEAST_TIME // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
    };
    if (!transfer) {
      transfer = new AMap.Transfer(transferOption);
    }
    // 根据起、终点坐标查询公交换乘路线
    transfer.search(new AMap.LngLat(pStart[0], pStart[1]), new AMap.LngLat(pEnd[0], pEnd[1]), function(status, result) {
      // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
      if (status === 'complete') {
        if (result.plans && result.plans.length) {
          console.log('绘制公交路线完成');
          console.log(result.plans[0]);
          resolve(result.plans[0]);
        }
      } else {
        console.error('公交路线数据查询失败' + result);
        reject(result);
      }
    });
  });
};

const searchLine = () => {
  $.get('http://jtjt.skyinforcloud.cn:50081/api/public/index.php/jiaotou/line/bus/getLineList', {}, (response) => {
    response.data.forEach((val) => {
      lineSearch(val.name, val.id);
    });
  });
  function lineSearch(name, line_id) {
    const linesearch = new AMap.LineSearch({
      pageIndex: 1,
      pageSize: 2,
      city: 310117,
      extensions: 'all'
    });
    // 搜索“536”相关公交线路
    linesearch.search(name, function(status, result) {
      if (status === 'complete' && result.info === 'OK') {
        console.log(result);
        let path1 = '';
        let path2 = '';
        result.lineInfo && result.lineInfo.forEach(function(line, index) {
          const path = [];
          const pathObject = {};
          line.path.forEach((p) => {
            path.push(p.lng + ',' + p.lat);
          });
          pathObject['start_stop'] = line.start_stop;
          pathObject['end_stop'] = line.end_stop;
          pathObject['path'] = path.join(';');
          if (index === 0) {
            path1 = JSON.stringify(pathObject);
          } else {
            path2 = JSON.stringify(pathObject);
          }
        });
        console.log(line_id, path1, path2);
        $.post('http://jtjt.skyinforcloud.cn:50081/api/public/index.php/jiaotou/line/bus/updateLinePathInfo', { path1, path2, line_id }, (response) => {
          console.log(response);
        });
      } else {
        console.log('dd', result);
      }
    });
  }
};
// 处理应急物资的point点数据
const getEmergencyPoint = (data, list) => {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      getEmergencyPoint(item.children, list);
    } else {
      if (item.lat && item.lon) {
        list.push(item);
      }
    }
  });
  return list;
};
// 获取多边形中心点
const getCenterPoint = (data) => {
  let lng = 0.0;
  let lat = 0.0;
  data.forEach(item => {
    lng = lng + parseFloat(item[0]);
    lat = lat + parseFloat(item[1]);
  });
  lng = lng / data.length;
  lat = lat / data.length;
  return [lng, lat];
};
export {
  searchLine,
  setCenter,
  getPolygonCenter,
  positionStringToArr,
  positionsStringToArr,
  positionToGCJ02,
  setZoomAndCenter,
  clearMap,
  getEmergencyPoint,
  busTransfer,
  getCenterPoint
};
