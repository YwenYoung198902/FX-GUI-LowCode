import http from "./request";
console.log("post:::::::::::::::", http);
export function products (data) {
  return http.post(
    "/report/report/getData", //接口路径
    data //接口参数 
  );
}

export function getReportConfigDetail (data) {
  return http.get(
    "/report/reportConfig/getReportConfigDetail", //接口路径
    data //接口参数 
  );
}


// 选择工作表下拉选项列表接口
export function getWorksheetsByAppId (data) {
  return http.post(
    "/wwwapi/HomeApp/GetWorksheetsByAppId", //接口路径
    data //接口参数
  );
}

// 选择应用下拉选项列表接口
export function getAppInfo (data) {
  return http.post(
    "/wwwapi/HomeApp/GetMyApp", //接口路径
    data //接口参数
  );
}

// 选择工作表下拉选项列表接口
export function getSheetInfo (data) {
  return http.post(
    "/wwwapi/HomeApp/GetAppInfo", //接口路径
    data //接口参数
  );
}

// 获取工作表视图
export function getWorksheetInfo (data) {
  return http.post(
    "/wwwapi/Worksheet/GetWorksheetInfo", //接口路径
    data //接口参数
  );
}

// 获取视图行数据列表接口
export function get_camera_group_tree (data) {
  return http.post(
    "http://www.skyinforcloud.com:81/v1/weichuan/index/get_camera_group_tree", //接口路径
    data //接口参数
  );
}

export function stream_start (param) {
  return http.post(
    "http://192.168.6.66/v1/api/video/stream_start", //接口路径
    param //接口参数
  );
}

export function playback_start (data) {
  return http.post(
    "http://192.168.6.66/v1/api/video/playback_start", //接口路径
    data //接口参数
  );
}

export function playback_recordlist (data) {
  return http.post(
    "http://192.168.6.66/v1/api/video/playback_start", //接口路径
    data //接口参数
  );
}

export function getControl_ptz (data) {
  return http.post(
    "http://192.168.6.66/v1/api/video/control_ptz", //接口路径
    data //接口参数
  );
}

// 获取视图行数据列表接口
export function getFilterRows (data) {
  return http.post(
    "/api/v2/open/worksheet/getFilterRows", //接口路径
    data //接口参数
  );
}

// 事件详情测试接口
export function getEventDetail (params) {
  return http.get(
    "http://skyinfor.yikuaida.cn/v1/digitalTwin/alarm/detail", //接口路径
    params
  );
}

// 获取视图行数据详情接口
export function getRowDetail (data) {
  return http.post(
    "/api/v2/open/worksheet/getRowByIdPost", //接口路径
    data //接口参数
  );
}

// 批量编辑场景信息
export function editSceneJsonBatch (data) {
  return http.post(
    "/api/v2/open/worksheet/editRows", //接口路径
    data //接口参数
  );
}

// 编辑场景信息
export function editSceneJson (data) {
  return http.post(
    "/api/v2/open/worksheet/editRow", //接口路径
    data //接口参数
  );
}

// 获取表的详细信息
export function getAppSectionDetail (data) {
  return http.post(
    "/wwwapi/HomeApp/GetAppSectionDetail", //接口路径
    data //接口参数
  );
}

// 获取统计数量图片数据
// export function getStatisticPic(data) {
//   return http.post(
//     "api/v2/open/worksheet/getFilterRows", //接口路径
//     data //接口参数
//   );
// }

// 获取明道云key
export function getKey () {
  return http.get(
    "/v1/api/webapi/init" //接口路径
  );
}

// 获取app_key和sign
export function getAppkeyList (key) {
  return http.get(
    "/v1/api/webapi/getAppkeyList", //接口路径
    {}, //接口参数
    {
      key,
    }
  );
}
// 获取菜单列表
export function getPagesList (data) {
  return http.get(
    "/xiaokunshan/layer/getPages", //接口路径
    data //接口参数
  );
}

// 自定义接口获取表单内容
export function loadCustomApiData ({ api, data, type }) {
  return http[type.toLowerCase()](
    api, //接口路径
    data //接口参数
  );
}

// 新增行数据
export function addRow (params) {
  return http.post(
    "/api/v2/open/worksheet/addRow", //接口路径
    params
  );
}

// 删除增行数据
export function delRow (params) {
  return http.post(
    "/api/v2/open/worksheet/deleteRow", //接口路径
    params
  );
}

// 获取系统所有大屏
export function cockpitList (params) {
  return http.get(
    "/v1/api/webapi/cockpitList", //接口路径
    params
  );
}

// 获取图表列表
export function getPage (params) {
  return http.get(
    "/report/custom/getPage", //接口路径
    params
  );
}

// 获取工作表字段别名映射关系
export function getWorksheetApiInfo (params) {
  return http.post(
    "/wwwapi/Worksheet/GetWorksheetApiInfo", //接口路径
    params
  );
}


// v1/api/webapi/cockpitList?account_id=31552d0b-7ed4-4335-941f-ce388cb831f6&page=1&page_size=100
