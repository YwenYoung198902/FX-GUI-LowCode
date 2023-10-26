/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:10
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-07 11:17:27
 */
export default {
    name: "人房信息",
    width: 794,
    height: 700,
    left: 0,
    top: 0,

    box:{
        backgroundImg:require('@/assets/image/xiaokunshan/bg14.png'),
        headImg:require('@/assets/image/xiaokunshan/pop-title.png'),
        closeImg:require('@/assets/image/xiaokunshan/bg11.png'),
        smallImg: require('@/assets/image/xiaokunshan/title2.png'),
        height: 44,
        color:'#fff',
        fontSize:26,
        fontWeight: "bold",
        fontStyle: "normal", //'italic' 倾斜
        fontFamily: "Microsoft YaHei",
        textAlign: "left",
        smallTitle:{
            height: 40,
            fontSize:20,
            fontWeight: "normal",
            fontStyle: "normal", //'italic' 倾斜
            fontFamily: "Microsoft YaHei",
            textAlign: "left",
            textIndent:50,
        }
    },
    sourceType: "静态",
    showDataType: "table",
    worksheetId:'zhsq_rfyhyl',
    isRelationPoi:true,
    table: {
      align: "center",
      indexShow: false,
      borderShow: false,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#EBEEF5",
      height: 660,
      theader: {
        background: "rgba(125, 221, 255, 0.1)",
        color: "#81b4ff",
        height: 40,
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal", //'italic' 倾斜
        fontFamily: "Microsoft YaHei",
        textAlign: "center",
      },
      tbody: {
        height: 60,
        background1: "",
        background2: "rgba(71, 140, 164, 0.1)",
        background3: "rgba(125, 221, 255, 0.3)",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal", //'italic' 倾斜
        fontFamily: "Microsoft YaHei",
        letterSpacing: 0,
        color: "#fff",
      },
    },
    card: {
      width: 270,
      height: 282,
      margin: "0,10,20,10",
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "left",
      fontFamily: "Microsoft YaHei",
      letterSpacing: 0,
      lineHeight: 30,
      color: "#fff",
      background: "rgba(69, 128, 188, 0.1)",
      button: {
        height: 24,
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal", //'italic' 倾斜
        textAlign: "center",
        fontFamily: "Microsoft YaHei",
        letterSpacing: 0,
      },
    },
    pagination: {
      show: true,
      marginTop: 20,
      background: "#01162C",
      color: "#fff",
      activeBackground: "#45A2FF",
      activeColor: "#143452",
    },
    data: {
      tableHead: [
        {
          label: "快照",
          value: "alarm_img",
          id: 0,
        },
        {
          label: "事件来源",
          value: "alarm_source",
          id: 1,
        },
        {
          label: "事件名称",
          value: "event_name",
          id: 2,
        },
        {
          label: "事件类型",
          value: "alarm_type",
          id: 3,
        },
        {
          label: "事件等级",
          value: "alarm_level",
          id: 4,
        },
        {
          label: "发生地址",
          value: "address",
          id: 5,
        },
        {
          label: "发生时间",
          value: "alarm_time",
          id: 6,
        },
        {
          label: "事件阶段",
          value: "stage",
          id: 7,
        },
      ],
      tableData: [],
      tableKeyData: [],
      cardData: [
        {
          label: "",
          value: "event_name",
        },
        {
          label: "",
          value: "alarm_img",
          width: 250,
          height: 146,
        },
        {
          label: "发生时间",
          value: "alarm_time",
        },
        {
          label: "发生地址",
          value: "address",
        },
      ],
      buttonData: [
        {
          value: "stage",
          width: 80,
          background: "rgba(255, 151, 77, 0.1)",
          color: "#FF974D",
        },
        {
          value: "alarm_class",
          width: 80,
          background: "rgba(53, 211, 255, 0.1)",
          color: "#35d3ff",
        },
        {
          value: "alarm_source",
          width: 80,
          background: "rgba(255, 217, 139, 0.1)",
          color: "#ffd98b",
        },
      ],
      total: 10,
    },
    tableHeadStyle: {
      styleData: [],
    },
  };
  