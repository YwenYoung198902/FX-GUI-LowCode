export default {
    width: 410,
    height: 30,
    left: 0,
    top: 0,
    dateShow: true,
    txt:'12345实时事件分析',
    name:'标题',
    show: true,
    lock: true,
    isShowModule:true,
    worksheetId:'btzj',
    sourceType: '静态',
    textStyle: {
      show:true,
      imgShow:true,
      linearTxt:true,
    }, 
    txtColor:{  //文本字体渐变色
      txtBackground:['#FFFFFF','#7EB9FF'],
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      backgroundClip:' text',
      'text-fill-color': 'transparent',
       overflow: 'hidden',
    },
    textStylePx:{
        fontSize: "24",
        lineHeight:'30',
        letterSpacing:'2',
        textIndent: '23',
    },
    txtFamily: {
      display: "block",
      fontWeight: "bold",
      fontStyle: "normal", //'italic' 倾斜
      textAlign: "left",
      fontFamily: "Microsoft YaHei",
    },
    bgImg:{
      background:require('@/assets/component/img/titlebg1.png') ,
    },
    imgPos:{
      // width:410,
      // height:28,
      top: 0,
      left: 0,
      right:'',
      bottom:'',
    }
  };
  