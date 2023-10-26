/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-10-10 15:09:09
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-12 13:02:30
 */
export default {
  left: 0,
  top: 0,
  width: 1920,
  height: 1080,
  name: "轨迹回放",
  box: {
    mainColor: "rgba(0, 170, 255, 1)",
    selectBg: "rgba(1, 15, 35, 1)",
    color: "#fff",
    height: 40,
    fontFamily: "Microsoft YaHei",
    fontSize: 18,
    ismultiple: false,
    map: "amap://styles/30fb89de475ee915e32d53cf72d65fc0",
  },
  polyline: {
    width: 1,
    color: "rgba(0, 255, 38, 1)",
    style: "dashed", //solid实线 dashed虚线
    isShow: false,
  },
  time: {
    width: 1108,
    height: 10,
    iconSize: 30,
    speedWidth: 100,
  },
  option: {
    width: 1230,
    height: 70,
    top: 20,
  },
  track: {
    strokeWeight: 1,
    strokeColor: "green",
    strokeStyle: "dashed",
    startPointIcon: require("@/assets/image/common/start_point.png"),
    endPointIcon: require("@/assets/image/common/end_point.png"),
    movePointIcon: require("@/assets/image/common/personnel.png"),
    trackPersonApi:
      "https://v1.yikuaida.cn/v1/sheshan/soldier/getSoldierUserList?account_id=3496f975-3455-4f71-a2af-0e8c6ce44970",
    trackRecordApi:
      "https://v1.yikuaida.cn/v1/sheshan/soldier/getSoldierLocationList?account_id=3496f975-3455-4f71-a2af-0e8c6ce44970",
  },
  data: [
    {
      cs: "GCJ02",
      lat: "31.08769",
      lng: "121.16014",
      rowid: "6063e56d-3343-4f56-8c53-09939d3e1bbf",
      user_name: "李朱峰-天马02",
    },
  ],
};
