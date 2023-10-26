/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:09
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-17 16:50:39
 */
export default {
  name: "基础柱状图",
  sourceType: "api",
  requestType: "get",
  api: "https://www.sjxks.com/v1/xiaokunshan/security/view3",
  requestParams: {
    account_id: "eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  },
  series: {
    name: "",
    type: "bar",
    barWidth: "20",
    gradual: true, //是否渐变色
    gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
    color: "#5171fd", //非渐变色颜色
    barBorderRadius: 0,
    orient: "vertical",
    label: {
      show: false,
      color: "#f1f1f1",
      fontSize: 12,
      position: "inside",
    },
  },
  data: [
    {
      name: "星期一",
      value: "60",
      id: 0,
    },
    {
      name: "星期二",
      value: "100",
      id: 1,
    },
    {
      name: "星期三",
      value: "140",
      id: 2,
    },
    {
      name: "星期四",
      value: "160",
      id: 3,
    },
  ],
};
