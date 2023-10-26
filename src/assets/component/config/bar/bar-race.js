var data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}

export default {
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
  legend: {
    show: true
  },
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear'
};

