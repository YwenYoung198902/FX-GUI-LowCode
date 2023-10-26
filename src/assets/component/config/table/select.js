export default {
  name: "选择框",
  selectedData: "",
  width: 300,
  selection: {
    width: 300,
    clearable: true,
  },
  data: [
    { key: "1", value: "选项一" },
    { key: "2", value: "选项二" },
    { key: "3", value: "选项三" },
    { key: "4", value: "选项四" },
  ],
  eventList: [{ eventType: "changeFiled" }],
};
