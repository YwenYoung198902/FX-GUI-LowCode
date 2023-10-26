export const handlerLayerWidget = (val, getToolByCode) => {
  const layerWidgetArr = [];
  for (let i = 0; i < val.length; i++) {
    const obj = {};
    obj.icon = getToolByCode(val[i].type).icon;
    const options = val[i].options["setup"];
    options.forEach(el => {
      if (el.name == "layerName") {
        obj.label = el.value;
      }
    });
    layerWidgetArr.push(obj);
  }
  return layerWidgetArr;
}

export const handleBigScreen = (data, getToolByCode, callBcak) => {
  console.log('aa', getToolByCode("screen"))
  const optionScreen = getToolByCode("screen").options;
  const setup = optionScreen.setup;
  for (const key in data) {
    for (let i = 0; i < setup.length; i++) {
      if (key == setup[i].name) {
        setup[i].value = data[key];
      }
    }
  }
  callBcak();
  return {
    backgroundColor: (data && data.backgroundColor) || "",
    backgroundImage: (data && data.backgroundImage) || "",
    height: (data && data.height) || "1080",
    title: (data && data.title) || "",
    width: (data && data.width) || "1920"
  };
}


export const handleInitEchartsData = (data, getToolByCode) => {
  const widgets = data.dashboard ? data.dashboard.widgets : [];
  const widgetsData = [];
  for (let i = 0; i < widgets.length; i++) {
    let obj = {};
    obj.type = widgets[i].type;
    obj.value = {
      setup: widgets[i].value.setup,
      data: widgets[i].value.data,
      position: widgets[i].value.position
    };
    const tool = deepClone(getToolByCode(widgets[i].type))
    const option = tool.options;
    const options = handleOptionsData(widgets[i].value, option);
    obj.options = options;
    widgetsData.push(obj);
  }
  return widgetsData;
}


export const handleOptionsData = (data, option) => {
  for (const key in data.setup) {
    for (let i = 0; i < option.setup.length; i++) {
      let item = option.setup[i];
      if (Object.prototype.toString.call(item) == "[object Object]") {
        if (key == option.setup[i].name) {
          option.setup[i].value = data.setup[key];
        }
      } else if (Object.prototype.toString.call(item) == "[object Array]") {
        for (let j = 0; j < item.length; j++) {
          const list = item[j].list;
          list.forEach(el => {
            if (key == el.name) {
              el.value = data.setup[key];
            }
          });
        }
      }
    }
  }
  // position
  for (const key in data.position) {
    for (let i = 0; i < option.position.length; i++) {
      if (key == option.position[i].name) {
        option.position[i].value = data.position[key];
      }
    }
  }
  // data
  for (const key in data.data) {
    for (let i = 0; i < option.data.length; i++) {
      if (key == option.data[i].name) {
        option.data[i].value = data.data[key];
      }
    }
  }
  return option;
}

// 在缩放模式下的大小
export const getPXUnderScale = (bigscreenScaleInWorkbench, px) => {
  return bigscreenScaleInWorkbench * px;
}

// 对组件默认值处理
export const handleDefaultValue = (widgetJson) => {
  for (const key in widgetJson) {
    if (key == "options") {
      // collapse、data、position、setup
      // setup 处理
      for (let i = 0; i < widgetJson.options.setup.length; i++) {
        const item = widgetJson.options.setup[i];
        if (Object.prototype.toString.call(item) == "[object Object]") {
          widgetJson.value.setup[item.name] = item.value;
        } else if (
          Object.prototype.toString.call(item) == "[object Array]"
        ) {
          for (let j = 0; j < item.length; j++) {
            const list = item[j].list;
            list.forEach(el => {
              widgetJson.value.setup[el.name] = el.value;
            });
          }
        }
      }
      // position
      for (let i = 0; i < widgetJson.options.position.length; i++) {
        const item = widgetJson.options.position[i];
        if (item.value) {
          widgetJson.value.position[item.name] = item.value;
        }
      }
      // data 处理
      if (widgetJson.options.data && widgetJson.options.data.length > 0) {
        for (let i = 0; i < widgetJson.options.data.length; i++) {
          const item = widgetJson.options.data[i];
          if (item.value) {
            widgetJson.value.data[item.name] = item.value;
          }
        }
      }
    }
  }
  return widgetJson;
}

// 设置默认
export const setDefaultValue = (options, val) => {
  for (let i = 0; i < options.length; i++) {
    if (Object.prototype.toString.call(options[i]) == "[object Object]") {
      for (const k in val) {
        if (options[i].name == k) {
          options[i].value = val[k];
        }
      }
    } else if (
      Object.prototype.toString.call(options[i]) == "[object Array]"
    ) {
      for (let j = 0; j < options[i].length; j++) {
        const list = options[i][j].list;
        for (let z = 0; z < list.length; z++) {
          for (const k in val) {
            if (list[z].name == k) {
              list[z].value = val[k];
            }
          }
        }
      }
    }
  }
}

// 数组 元素互换位置
export const swapArr = (arr, oldIndex, newIndex) => {
  arr[oldIndex] = arr.splice(newIndex, 1, arr[oldIndex])[0];
  return arr;
}

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
