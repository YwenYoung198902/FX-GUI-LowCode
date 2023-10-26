/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-03 15:34:01
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-18 16:52:27
 */
export default {
    width: 345,
    height: 85,
    left: 0,
    top: 0,
    name: '数值二',
    show: true,
    lock: true,
    series:{
        type:'',
    },
    sourceType: '静态',
    worksheetId:'number_scroll',
    textNum: {

    },
    data: '7076',
    dataLength:7,
    textNumber:{
        color:'#fff',
        width:28,
        height:38,
        fontSize:30,
        fontWeight: "normal",
        fontStyle: "normal", //'italic' 倾斜
        textAlign: "center",
        fontFamily: "Microsoft YaHei",
        isBacaground: true,
        topnumber:2,
        background: require("@/assets/component/img/scroll-bg.png"),
    },
    textForword: {
        show: true,
        txt: '共',
        color: '#fff',
        fontSize: 14,
        lineHeight: 28,
        letterSpacing: 0,
        width: 30,
        height: 30,
        txtFamily: {
            fontWeight: "normal",
            fontStyle: "normal", //'italic' 倾斜
            textAlign: "center",
            fontFamily: "Microsoft YaHei",
        },
    },
    textAfter: {
        show: true,
        txt: '件',
        color: '#fff',
        fontSize: 14,
        lineHeight: 28,
        letterSpacing: 0,
        width: 30,
        height: 30,
        txtFamily: {
            fontWeight: "normal",
            fontStyle: "normal", //'italic' 倾斜
            textAlign: "center",
            fontFamily: "Microsoft YaHei",
        },
    }

};
