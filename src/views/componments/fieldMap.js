// 滚动表格
const scrollTable = (data, mapData, config) => {
    const otherData = config.otherData;
    for (let index = 0; index < mapData.length; index++) {
      otherData.tableHead[index].value = mapData[index].targetFiled
    }

    return otherData
};

const fieldMap = {
  scrollTable: (data, mapData, config) => scrollTable(data, mapData, config),
};

export default fieldMap;
