/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:09
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-17 16:35:54
 */
export default {
  name: "堆叠柱状图",
  sourceType: "api",
  requestType: "get",
  api: "https://www.sjxks.com/v1/xiaokunshan/security/view8",
  requestParams: {
    account_id: "eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  },
  type: "stackedBar",
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
    stack: "x",
  },
  data: [
    {
      name: "星期一",
      value: ["60", "50", "70"],
      id: 0,
    },
    {
      name: "星期二",
      value: ["100", "90", "110"],
      id: 1,
    },
    {
      name: "星期三",
      value: ["140", "130", "150"],
      id: 2,
    },
    {
      name: "星期四",
      value: ["160", "150", "170"],
      id: 3,
    },
  ],
};
