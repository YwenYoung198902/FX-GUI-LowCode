/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-10-08 09:26:51
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-25 13:34:22
 */
//
export default {
  left: 0,
  top: 0,
  width: 1920,
  height: 1080,
  name: "多屏查看",
  worksheetId: "dpck",
  sourceType: "api",
  requestType: "post",
  cameraType: "splitCamera",
  api: "https://www.sjxks.com/v1/xiaokunshan/index/get_camera_group_tree",
  requestParams: {
    account_id: "eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  },
  box: {
    mainColor: "rgba(0, 170, 255, 1)",
    selectBackground: "rgba(53, 211, 255, 0.3)",
    color: "#fff",
    fontFamily: "Microsoft YaHei",
    fontSize: 16,
    background: "rgba(8, 24, 34, 1)",
  },
  tree: {
    width: 465,
    height: 750,
    marginTop: 50,
    marginLeft: 0,
    noDataBg: require("@/assets/image/common/nodata.png"),
    api: "https://www.sjxks.com/v1/xiaokunshan/monitor/saveCollectCamera",
    requestType: "post",
    isExpandOneLevel: true,
  },
  splitVideo: {
    width: 1410,
    height: 970,
    background: "rgba(0, 20, 36, 1)",
    padding: "20,20,20,20",
    noControl: true,
    anbjt: require("@/assets/image/common/anbjt.png"),
    anxzbj: require("@/assets/image/common/anxzbj.png"),
    tcdptb: require("@/assets/image/common/tcdptb.png"),
    whmtp: require("@/assets/image/common/whmtp.png"),
    wxzsxtmrtp: require("@/assets/image/common/wxzsxtmrtp.png"),
    bottom: 80,
  },
  camera: {
    videoAddress:
      "https://www.sjxks.com/v1/api/video/stream_start?account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e",
    playAddress:
      "https://www.sjxks.com/v1/api/video/playback_start?account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  },
  data: {
    treeData: [],
    collectData: {},
    expandRowid: [],
  },
};
