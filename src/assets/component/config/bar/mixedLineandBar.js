export default {
  name: "柱状图群组",
  show: true,
  lock: true,
  yAxis: {
    name: "",
    nameTextStyle: {
      fontSize: 12,
      color: "#f1f1f1",
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      color: "#f1f1f1",
      fontSize: 12,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
        type: "solid",
      },
    },
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      color: "#f1f1f1",
      fontSize: 12,
      interval: false,
      rotate: 0,
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#f1f1f1",
        width: 1,
        type: "solid",
      },
    },
  },
  orientation: "vertical", // 方向
  //图例
  legend: {
    show: false,
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    left: 0,
    top: 0,
    icon: "circle",
    orient: "horizontal",
    scroll: false,
    // data: ["name"],
  },
  series: [
    {
      name: "",
      type: "bar",
      orient: "vertical",
      smooth: true, //是否平滑显示
      showSymbol: true, //是否显示图标
      symbolSize: 6, //图标大小
      label: {
        show: false,
        color: "#f1f1f1",
        fontSize: 12,
        position: "outside",
      },
      itemStyle: {
        color: "#5171fd",
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
        borderColor: "#fff",
        barWidth: 15,
        show: false,
        barBorderRadius: 0,
      },
      areaStyle: {
        show: false,
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
      },
    },
    {
      name: "",
      type: "bar",
      orient: "vertical",
      smooth: true, //是否平滑显示
      showSymbol: true, //是否显示图标
      symbolSize: 6, //图标大小
      label: {
        show: false,
        color: "#f1f1f1",
        fontSize: 12,
        position: "outside",
      },
      itemStyle: {
        color: "#5171fd",
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
        borderColor: "#fff",
        barWidth: 15,
        show: false,
        barBorderRadius: 0,
      },
      areaStyle: {
        show: false,
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
      },
    },
    {
      name: "",
      type: "line",
      lineStyle: {
        show: false,
        gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
        color: "#5171fd", //非渐变色颜色
        lineWidth: 2,
      },
      orient: "vertical",
      smooth: true, //是否平滑显示
      showSymbol: true, //是否显示图标
      symbolSize: 6, //图标大小
      label: {
        show: false,
        color: "#f1f1f1",
        fontSize: 12,
        position: "outside",
      },
      itemStyle: {
        color: "#000000",
        borderColor: "#fff",
      },
      areaStyle: {
        show: false,
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
      },
    }
  ],
  data: [
    {
      s: "Target1",
      x: "type1",
      y: "101",
    },
    {
      s: "Target2",
      x: "type1",
      y: "71",
    },
    {
      s: "Target3",
      x: "type1",
      y: "71",
    },
    {
      s: "Target1",
      x: "type2",
      y: "121",
    },
    {
      s: "Target2",
      x: "type2",
      y: "121",
    },
    {
      s: "Target3",
      x: "type2",
      y: "121",
    },
    {
      s: "Target1",
      x: "type3",
      y: "141",
    },
    {
      s: "Target2",
      x: "type3",
      y: "46",
    },
    {
      s: "Target3",
      x: "type3",
      y: "46",
    },
    {
      s: "Target1",
      x: "type4",
      y: "81",
    },
    {
      s: "Target2",
      x: "type4",
      y: "111",
    },
    {
      s: "Target3",
      x: "type4",
      y: "111",
    },
    {
      s: "Target1",
      x: "type5",
      y: "77",
    },
    {
      s: "Target2",
      x: "type5",
      y: "99",
    },
    {
      s: "Target3",
      x: "type5",
      y: "99",
    },
  ],
  // data: [
  //   {
  //     name: "星期一",
  //     value: "60",
  //     id: 0,
  //   },
  //   {
  //     name: "星期二",
  //     value: "100",
  //     id: 1,
  //   },
  //   {
  //     name: "星期三",
  //     value: "140",
  //     id: 2,
  //   },
  //   {
  //     name: "星期四",
  //     value: "80",
  //     id: 3,
  //   },
  // ],
};
