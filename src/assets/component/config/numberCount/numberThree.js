  export default {
    width:920,
    height:282,
    left: 0,
    top: 0,
    name:'数值三',
    show: true,
    lock: true,
    series:{
        type:'',
    },
    sourceType: '静态',
    data:  [
      {
          "name": "宜居",
          "value": [
          {
              "name": "基础保障",
              "value": 100
          },
          {
              "name": "品质提升",
              "value": 6
          }
          ]
      },
      {
          "name": "宜业",
          "value": [
          {
              "name": "基础保障",
              "value": 10
          },
          {
              "name": "品质提升",
              "value": 7
          }
          ]
      },
      {
          "name": "宜游",
          "value": [
          {
              "name": "基础保障",
              "value": 12
          },
          {
              "name": "品质提升",
              "value": 57
          }
          ]
      },
      {
          "name": "宜养",
          "value": [
          {
              "name": "基础保障",
              "value": 27
          },
          {
              "name": "品质提升",
              "value": 2
          }
          ]
      },
      {
          "name": "宜学",
          "value": [
          {
              "name": "基础保障",
              "value": 23
          },
          {
              "name": "品质提升",
              "value": 45
          }
          ]
      } 
     ],
     contain:{
        width:160,
        height:230,
        marginRight:20,
        marginBottom:20,
        arrangeNum:5,
        scroll:false,
        borderColor:'rgba(69, 162, 255, 0.3)',
        backgroundColor:['rgba(69, 162, 255, 0.15)','rgba(135, 190, 255, 0.15)',' #051d37'],
    },
    textTitle:{
      height:40,
      color:'#90e7ff',
      fontSize:20,
      lineHeight:40,
      fontWeight: "bold",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      backgroundColor:[' rgba(69, 162, 255, 0.15)','rgba(135, 190, 255, 0.15)'],
      borderColor:'rgba(69, 162, 255, 0.3)'
    },
    txtRowOne:{
      show:true,
      // height:40,
      color:'#fff',
      txt:'类',
      fontSize:16,
      lineHeight:21,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      txtStyle:{
        fontSize:16,
        color:'#fff',
      }
    },
    txtRowtwo:{
      show:true,
      txtColor:true,
      // height:40,
      color:'#bfe4ff',
      txt:'',
      fontSize:30,
      lineHeight:40,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      txtStyle:{
        fontSize:16,
        color:'#ccc',
      }
    },
    txtRowthree:{
      show:true,
      // height:40,
      color:'#fff',
      txt:'类',
      fontSize:16,
      lineHeight:21,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      txtStyle:{
        fontSize:16,
        color:'#fff',
      }
    },
    txtRowfour:{
      show:true,
      txtColor:true,
      // height:40,
      color:'#bfe4ff',
      txt:'',
      fontSize:30,
      lineHeight:40,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "center",
      fontFamily: "Microsoft YaHei",
      txtStyle:{
        fontSize:16,
        color:'#ccc',
      }
    },
    line:{
      width:150,
      height:1,
      show:true,
      marginTop:10,
      marginBottom:10,
      backgroundColor:[ 'rgba(135, 190, 255, 0)',' #87beff','rgba(135, 190, 255, 0)']
    },
    backgroundColors:{
        backgroundColor:'rgba(255,217,164,0.1)',
        borderColor:'rgba(255,217,164,0.15)',
        borderStyle:'solid',
        borderWidth:1,
    },
    backgroundColorsActive:{
        backgroundColor:'rgba(255,217,164,0.4)',
        borderColor:'rgba(255,217,164,0.45)',
    },
    txtFamily: {
        fontWeight: "bold",
        fontStyle: "normal", //'italic' 倾斜
        textAlign: "left",
        fontFamily: "Microsoft YaHei",
      },
  
  };
  