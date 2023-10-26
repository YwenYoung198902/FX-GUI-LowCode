/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-29 16:40:27
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-12 10:34:29
 */
export default {
  name: '评优卡片',
  width: 460,
  height: 130,
  left: 100,
  top: 100,
  show: true,
  lock: true,
  sourceType: '静态',
  box: {
    autoplay: false,
    isScroll: false,
    direction: 'row',
    width: 225,
    height: 120,
    multiple: false,
    arrangeNum: 3,
    backgroundColor: 'rgba(244,194,124,.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    selectedPic: '',
    showPic: false
  },
  pic: {
    width: 88,
    height: 120,
    selfAdaption: false
  },
  first: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0
  },
  second: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#eb812a',
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 0,
    firstPic: true,
    selectedPic: {
      url: ''
    }
  },
  third: {
    display: 'block',
    fontFamily: '微软雅黑',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#eb812a',
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 0
  },
  data: [
    {
      description: "区三八红旗手",
      name: "夏丹",
      photo: "https://www.sjxks.com/file/mdpic/b71c7eaf-91c4-4f3d-9f3b-b4a7c29f1c16/ba59c4b5-a6e6-4fba-aa6a-fa82d3046bc7/63f6f8248d724ac00ae7c85e/20230527/5AeK1a2T9V28fTc8dKbH1E3Ca39C0Zdp936B5q2f928s8W8c02dV9Dda345a5uc6.png",
      rowid: "84ad7f0b-7316-431e-bc42-8e38bdbcfc9a"
    },
    {
      description: "区巾帼文明岗",
      name: "小昆山镇敬老院护理组",
      photo: "https://www.sjxks.com/file/mdpic/b71c7eaf-91c4-4f3d-9f3b-b4a7c29f1c16/ba59c4b5-a6e6-4fba-aa6a-fa82d3046bc7/63f6f8248d724ac00ae7c85e/20230527/6WdR3D39d4bU4V8n7P4R7Ea24G89eV2z0KbifFfo4Y2qdw5t0s1w6U2pcw2P2W3t.jpg",
      rowid: "e4150075-0713-4f89-b006-3dc1fc8f07fe",
      type: ["区巾帼文明岗"]
    }
  ],
  api: 'https://www.sjxks.com/v1/xiaokunshan/construction/partyList?page=1&size=1000&account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  requestType: "GET",
  requestParams: {
    account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  }
}