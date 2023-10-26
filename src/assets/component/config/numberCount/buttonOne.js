export default {
    width:220,
    height: 150,
    left: 0,
    top: 0,
    name:'按钮',
    show: true,
    sourceType: '静态',
    worksheetId:'anzj',
    data: [
      {
          name:'三维地图',
          color:'#fff',
          fontSize:14,
      },{
          name:'二维地图',
          color:'#fff',
          fontSize:14,
      }
   ],
    buttonStyle:{
       hoverShow:true,
       imgShow:true,
       width:60,
       height: 65,
       txtShow:false,
       txt:'社区管理',
       color:'#fff',
       fontSize:24,
       lineHeight:65,
    },
    hoverStyle:{
      txt:'地图切换',
      color:'#fff',
      fontSize:14,
      lineHeight:30,
      width:80,
      height: 30,
      background: require("@/assets/image/xiaokunshan/img1.png"),
    },
    optionStyle:{
      optionShow:true,
       width:120,
       height: 60,
       background:'rgba(14, 39, 70, 0.95)',
       borderColor:'#1b7ef2',
       color:'#fff',
       fontSize:'16',
       span:{
        height: 30,
        textIndent:5,
        background: 'rgba(69, 162, 255, 0.3)',
       }
    },
    text:{
        width:390,
        height:55,
        color:'#ffe6c3',
        fontSize:20,
        textIndent:54,
        lineHeight:55,
        isBacagroundImg:true,
        marginBottom:5,
    },
    backgroundImg:{
        background:require("@/assets/image/xiaokunshan/icon3.png"),
    },
    backgroundActive:{
        background:require("@/assets/component/img/bg-active.png"),
    },
  };
  