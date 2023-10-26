/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-18 16:51:58
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-18 17:23:23
 */
export default {
  width: 410,
  height: 200,
  left: 0,
  top: 0,
  name: "驾驶盘读数",
  show: true,
  lock: true,
  isShowModule: true,
  box: {
    arrangeNum: 2,
    rowPadding: 0,
    columnPadding: 10,
    autoplay: true,
    width: 200,
    height: 200,
    interval: 5000,
  },
  echart: {
    width: 200,
    height: 80,
    barWidth: 15,
    xPos: 50,
    yPos: 80,
    size: 250,
  },
  echartStyle: [],
  number: {
    fontWeight: 400,
    fontStyle: "normal",
    textAlign: "center",
    display: "block",
    fontSize: 18,
    fontFamily: "微软雅黑",
    letterSpacing: 2,
    color: '#fff',
    xPos: 0,
    yPos: 0,
  },
  title: {
    fontWeight: 400,
    fontStyle: "normal",
    textAlign: "center",
    display: "block",
    fontSize: 18,
    fontFamily: "微软雅黑",
    letterSpacing: 2,
    color: '#fff',
    xPos: 0,
    yPos: 40,
  },
  unit: {
    fontWeight: 400,
    fontStyle: "normal",
    textAlign: "center",
    display: "block",
    fontSize: 18,
    fontFamily: "微软雅黑",
    letterSpacing: 2,
    color: '#fff',
    xPos: 0,
    yPos: 80,
  },
  pic: {
    width: 100,
    height: 100,
    url:
      "http://192.168.6.92/file/mdpic/83fe09b5-2baf-4994-b431-6c8182202344/f73dfad1-a2b8-4a3c-8507-09596a031f9a/64e42cc39b709d2406d712e5/20230822/fFd6fZ2n3C9RaH2C906Uep4ebnaW6Ofh54bDemdh83ap7n1l8Y1x1SdabEcu7ge0.png",
  },
  data: [
    {
      name: "合同外资",
      value: 30,
      total: 100,
    },
    {
      name: "到位资金",
      value: 10,
      total: 100,
    },
  ],
  // api: 'https://www.sjxks.com/v1/xiaokunshan/security/view4',
  // requestParams: {
  //  account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e'
  // }
};
