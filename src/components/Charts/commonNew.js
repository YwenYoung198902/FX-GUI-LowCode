import echarts from "echarts";

export default function defaultSetting(config) {
  console.log("config.component::::::::::::", config.component);
  let series = {};
  const title = getTitle(config);
  const grid = getGrid(config);
  const legend = getLegend(config);
  const xAxis = getXAxis(config);
  const yAxis = getYAxis(config);
  switch (config.component) {
    case "stackedLine":
      series = getStackedLineSeries(config);
      break;
    case "mixedLineandBar":
      series = getMixedLineandBarSeries(config);
      break;
    case "groupBar":
      series = getGroupBarSeries(config);
      break;
    default:
      break;
  }
  return {
    title,
    legend,
    grid,
    xAxis,
    yAxis,
    // dataZoom,
    series,
  };
}

function getTitle(config) {
  return config.title;
}

function getLegend(config) {
  const { scroll, ...rest } = config.legend;
  const data = arrayGroup(config.data, "s");
  const seriesList = Object.keys(data);
  for (let index = 0; index < config.series.length; index++) {
    if (config.series[index].name) {
      seriesList[index] = config.series[index].name;
    }
  }
  return {
    type: scroll ? "scroll" : "plain",
    ...rest,
    data: seriesList,
  };
}

function getGrid(config) {
  return config.grid;
}

// 获取x轴数据
function getXAxis(config) {
  const { axisLine, axisTick, axisLabel, splitLine } = config.xAxis;
  const { data } = config;
  const { orientation } = config;
  console.log("orientation::::::::::::::::::::::", orientation);
  const { interval, ...rest } = axisLabel;
  return {
    type: orientation == "vertical" ? "category" : "value",
    data:
      orientation == "vertical"
        ? Array.from(new Set(config.data.map((item) => item.x)))
        : [],
    axisLine,
    axisTick,
    axisLabel: { interval: interval ? 0 : "auto", ...rest },
    splitLine,
  };
}

// 获取y轴数据
function getYAxis(config) {
  const { orientation } = config;
  const { data } = config;
  return {
    type: orientation == "vertical" ? "value" : "category",
    data:
      orientation == "vertical"
        ? []
        : Array.from(new Set(config.data.map((item) => item.x))),
    ...config.yAxis,
  };
}

function getDataZoom(config) {
  const { dataZoom } = config;
  if (dataZoom.show) {
    return [
      {
        type: dataZoom.type,
      },
    ];
  }
  return [];
}

function getStackedBarData(config) {
  const newData = [];
  const valueList = config.data.map((item) => item.value);
  for (let index = 0; index < valueList.length; index++) {
    for (let i = 0; i < valueList[index].length; i++) {
      if (!newData[i]) {
        newData.push({
          ...config.series,
          data: [],
          zlevel: valueList[index].length - i,
        });
      }
      newData[i].data.push(valueList[index][i]);
    }
  }
  return newData;
}

// 数组根据某一个key  进行分类
function arrayGroup(data, key) {
  // 使用reduce进行分组
  const groupedData = data.reduce((result, currentItem) => {
    // 获取当前项的key
    const key = currentItem.s;
    // 如果result中已经有这个key的分组，则将当前项添加到该分组中
    if (result[key]) {
      result[key].push(currentItem.y);
    }
    // 否则，创建一个新的分组
    else {
      result[key] = [currentItem.y];
    }

    return result;
  }, {});
  return groupedData;
}

// 获取柱状图 series数据
function getGroupBarSeries(config) {
  const data = arrayGroup(config.data, "s");
  const seriesList = Object.keys(data);
  const { orientation } = config;
  const seriesNew = config.series.map((item, index) => {
    const {
      show: barStyleShow,
      gradualColor: barStyleGradualColor,
      color,
      barWidth,
      barBorderRadius,
    } = item.itemStyle;
    return {
      data: data[seriesList[index]],
      ...item,
      barWidth,
      itemStyle: {
        normal: {
          barBorderRadius: parseInt(barBorderRadius),
          color: barStyleShow
            ? new echarts.graphic.LinearGradient(
                0,
                0,
                orientation == "vertical" ? 0 : 1,
                orientation == "vertical" ? 1 : 0,
                [
                  {
                    offset: 0,
                    color: barStyleGradualColor[0],
                  },
                  {
                    offset: 1,
                    color: barStyleGradualColor[1],
                  },
                ]
              )
            : color,
        },
      },
      name: item.name || seriesList[index],
    };
  });
  return seriesNew;
}

// 获取折柱图 series数据
function getMixedLineandBarSeries(config) {
  const data = arrayGroup(config.data, "s");
  const seriesList = Object.keys(data);
  const seriesNew = config.series.map((item, index) => {
    
    if (item.type === "bar") {
      const { orientation } = config;
      const {
        show: barStyleShow,
        gradualColor: barStyleGradualColor,
        color,
        barWidth,
        barBorderRadius,
      } = item.itemStyle;
      console.log("barStyleShow::::::::::::::", barStyleShow);
      return {
        data: data[seriesList[index]],
        ...item,
        barWidth,
        itemStyle: {
          normal: {
            barBorderRadius: parseInt(barBorderRadius),
            color: barStyleShow
              ? new echarts.graphic.LinearGradient(
                  0,
                  0,
                  orientation == "vertical" ? 0 : 1,
                  orientation == "vertical" ? 1 : 0,
                  [
                    {
                      offset: 0,
                      color: barStyleGradualColor[0],
                    },
                    {
                      offset: 1,
                      color: barStyleGradualColor[1],
                    },
                  ]
                )
              : color,
          },
        },
        name: item.name || seriesList[index],
      };
    } else {
      const { show, gradualColor } = item.areaStyle;
      const {
        show: lineStyleShow,
        gradualColor: lineStyleGradualColor,
        color,
        lineWidth,
      } = item.lineStyle;
      return {
        data: data[seriesList[index]],
        ...item,
        areaStyle: show
          ? {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: gradualColor[0],
                    },
                    {
                      offset: 1,
                      color: gradualColor[1],
                    },
                  ],
                  false
                ),
              },
            }
          : undefined,
        lineStyle: {
          normal: {
            width: lineWidth,
            color: lineStyleShow
              ? new echarts.graphic.LinearGradient(
                  0,
                  0,
                  config.orientation == "vertical" ? 0 : 1,
                  config.orientation == "vertical" ? 1 : 0,
                  [
                    {
                      offset: 0,
                      color: lineStyleGradualColor[0],
                    },
                    {
                      offset: 1,
                      color: lineStyleGradualColor[1],
                    },
                  ]
                )
              : color,
          },
        },
        name: item.name || seriesList[index],
      };
    }
  });
  return seriesNew;
}

// 获取折线图 series 数据
function getStackedLineSeries(config) {
  const data = arrayGroup(config.data, "s");
  const seriesList = Object.keys(data);
  const seriesNew = config.series.map((item, index) => {
    const { show, gradualColor } = item.areaStyle;
    const {
      show: lineStyleShow,
      gradualColor: lineStyleGradualColor,
      color,
      lineWidth,
    } = item.lineStyle;
    console.log("lineStyle:::::::::::", lineStyleShow, color);
    return {
      data: data[seriesList[index]],
      ...item,
      areaStyle: show
        ? {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: gradualColor[0],
                  },
                  {
                    offset: 1,
                    color: gradualColor[1],
                  },
                ],
                false
              ),
            },
          }
        : undefined,
      lineStyle: {
        normal: {
          width: lineWidth,
          color: lineStyleShow
            ? new echarts.graphic.LinearGradient(
                0,
                0,
                config.orientation == "vertical" ? 0 : 1,
                config.orientation == "vertical" ? 1 : 0,
                [
                  {
                    offset: 0,
                    color: lineStyleGradualColor[0],
                  },
                  {
                    offset: 1,
                    color: lineStyleGradualColor[1],
                  },
                ]
              )
            : color,
        },
      },
      name: item.name || seriesList[index],
    };
  });
  return seriesNew;
}
