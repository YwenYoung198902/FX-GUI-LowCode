/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-20 16:46:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-18 14:55:11
 */
export default {
 width: 400,
 height: 300,
 left: 100,
 top: 100,
 name: '统计数量',
 show: true,
 lock: true,
 box: {
  isScroll: false,
  direction: 'column',
  width: 300,
  height: 80
 },
 title: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 150,
  height: 30,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
  iconWidth: 20,
  iconHeight: 20,
  iconUrl: ''
 },
 num: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 40,
  height: 50,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  iconWidth: 40,
  iconHeight: 40,
  iconUrl: ''
 },
 unit: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 90,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
 },
 sourceType: '静态',
 data: [
  {
   name: '本月12345数量',
   value: 1200,
   unit: '(单位：件)'
  },
  {
   name: '本月网格事件数量',
   value: 1200,
   unit: '(单位：件)'
  },
  {
   name: '本月智能分析数量',
   value: 1200,
   unit: '(单位：件)'
  },
  {
   name: '本月人员上报事件数量',
   value: 1200,
   unit: '(单位：件)'
  },
  {
   name: '本月物联监测事件数量',
   value: 1200,
   unit: '(单位：件)'
  }
 ],
 api: 'https://www.sjxks.com/v1/xiaokunshan/cockpit/getCountData',
 requestType: "GET",
 requestParams: {
  account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  page: '大建管'
 }
}