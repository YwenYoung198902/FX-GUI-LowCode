/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-07 16:10:56
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-31 13:35:02
 */
export default {
  name: '轮播图',
  width: 830,
  height: 350,
  isShowModule: true,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  sourceType: '静态',
  box: {
    boxWidth: 400,
    boxHeight: 300,
    autoplay: false,
    direction: 'horizontal',
    width: 300,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
    cardNum: 2,
    arrangeNum: 2,
    interval: 5
  },
  title: {
    content: '',
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  description: {
    content: '',
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    letterSpacing: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  data: [
    {
      rowid: 1,
      name: '111',
      desc: '111',
      photo: ['http://skyinfor.yikuaida.cn/file/mdpic/83fe09b5-2baf-4994-b431-6c8182202344/f73dfad1-a2b8-4a3c-8507-09596a031f9a/64784135903ae17c5933f86e/20230615/1MfOdOf13Q5dfu8u0C7s3AfZ8v5k9C58fPdJ9Tb8fl6Z3x1u7E5Hb5269q6q9ifA.png']
    },
    {
      rowid: 2,
      name: '222',
      desc: '222',
      photo: []
    },
    {
      rowid: 3,
      name: '3333',
      desc: '3333',
      photo: []
    }
  ],
  api: 'https://www.sjxks.com/v1/xiaokunshan/administer/roadList',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  }
}