const getChart = (data) => {
  const {
    xaxes,
    xaxes: { options },
    valueMap,
    map,
  } = data;
  // const result = await this[this.config.component]()

  const chartData = options
    .map((item) => {
      const { v = "" } =
        map[0].value.find((ele) => ele.x === item.key) || {};
      return {
        ...item,
        name: item.value,
        value: v,
        id: item.index,
      };
    })
    .filter((item) => !item.isDeleted);
  return chartData;
};
const  getGroupBar = (data) => {
  const chartData = []
  const {xaxes: {controlId, options}, valueMap} = data
  const dataList = data.map.forEach(item => {
      item.value.forEach(ele => {
          chartData.push({
              s: item.key,
              x: valueMap[controlId][ele.x],
              y: ele.v
          })
      })
  })
  
  return chartData
}

const apiDataProcessing = {
  lineChart: (data) => getChart(data),
  barChart: (data) => getChart(data),
  pieChart: (data) => getChart(data),
  radarChart: (data) => getChart(data),
  groupBar: (data) => getGroupBar(data),
};

export default apiDataProcessing;
