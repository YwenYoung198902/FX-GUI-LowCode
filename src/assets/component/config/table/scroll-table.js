/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-08-02 09:19:37
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-24 09:22:40
 */
export default {
  name: "滚动表格",
  width: 400,
  height: 200,
  left: 0,
  top: 0,
  api:
    "https://www.sjxks.com/v1/xiaokunshan/index/projectList?account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e",
  sourceType: "api",
  requestType: "get",
  theader: {
    height: 26,
    background: "rgba(172, 246, 255, 0.15);",
    color: "#70e0ff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(172, 246, 255, 0.15)",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
  },
  tbody: {
    height: 26,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
    background: "rgba(172, 246, 255, 0.05)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(172, 246, 255, 0.05)",
    limitMoveNum: 6,
    marginTop: 2,
  },
  otherData: {
    tableKeyData: ["name", "project_status", "rowid", "color"],
    tableKeyDataString: '["name","project_status","rowid","color"]',
    tableHead: [
      {
        label: "项目进度",
        value: "project_status",
        color: "#0db681",
        width: 100,
      },
      { label: "项目名称", value: "name", color: "#fff", width: 260 },
    ],
    isShowColors: false,
    background: "",
  },
  data: [
    {
      name: "昆港公路2580号场地改造工程",
      project_status: "在建",
      rowid: "e8167e21-454a-454d-a0a9-1fd29cf8ab5b",
      color: "#08C9C9",
    },
    {
      name: "大港服务站和老年活动室场地局部改造工程",
      project_status: "在建",
      rowid: "28f2a862-972f-43cb-ad59-5172ef7244b8",
      color: "#08C9C9",
    },
  ],
};
