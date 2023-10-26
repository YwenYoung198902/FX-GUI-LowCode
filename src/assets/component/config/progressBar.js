/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-20 16:46:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-01 16:48:18
 */
export default {
 name: '排名进度条',
 width: 430,
 height: 300,
 left: 100,
 top: 100,
 show: true,
 lock: true,
 box: {
  showType: 1,
  arrangeNum: 1,
  name: '文本名称',
  isScroll: false,
  padding: '5px'
 },
 line: {
  height: 30,
  marginRight: 10
 },
 topFont: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 50,
  color: '#EBCD3D',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
 },
 title: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 90,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
 },
 percent: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 50,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
 },
 num: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 40,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
 },
 unit: {
  display: 'block',
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  width: 10,
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0,
  marginRight: 10,
 },
 progressBar: {
  display: 'block',
  width: 100,
  height: 10,
  marginRight: 30,
  borderRadius: 10,
  backgroundColor: 'rgba(172, 206, 255, 0.1)',
 },
 percentBar: {
  backgroundFront: 'rgba(113, 205, 255, 1)',
  backgroundBehind: 'rgba(27, 126, 242, 1)',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAJGSURBVDiNtZU/TFNhFMV/977+SQu1K6EMDi4sRhomE02YSE2cyuDE0hgYxM3EOGBhIM5qDIlhYaYrDROTDIRUwuLi4EBN40YeFvrnfdehVh9PSkPUM9577sl3zvu++4RLMF62tLjvRczNIeQNxgAEGhg1RLdMRypfy9KMzkq0kCufzOPkFSKfTKgIrmadeB1A4p2coXkxiphNova8Xs5uDhA0mVg+fWO4AvBUNfbxstP34Vx3CngtaPV4dXQJxC4ITiz7bx12B0fJi3n+VWJ9BN0gg7KhyOHxauYJgPZtGq5wHTEAL+b5OEqGK+TKJ/MA0vsA/mewx2GbiYx4M9OpQjpNyRNuAwTGUbPJxu7BWbXtW3DRvrw3zdzybtx/9ghhQtV7FxabvZt8kU7Jigo5hBhCTIVcMsHDm+Ne6su34EPQppebaMPgnlinrZibM6EStjIznSokE7o4yGoyoYsz06lCuGZCBXNzipAXXC3cTKcpDcsvyhFcDSGvBmP9ewaQzYjXz+wqRDnWidcNxnTY4HWhAg2Jd3L9wolvQWAcDRuMciTeyQk0FKNmaD7cbDbZGCYY5Riax6gpoltiFMPN3YOzaqvt1geJtdpufffgrHrhhEYR0S01HalgNvnzbQLQ9i3Y2Wut+acsBI59jHOM88Cx75+ysLPXWvvjYptNmo5UBPobhpfm5MFlTy+bEQ96+UZ7QTfIiNo2ykq9nN38P8sB4Hh1dEmRQ1HbDtsfBOe6U6K23RMbXfqVZZT4Dxfsb/zNL+AHKPoyD0tPprsAAAAASUVORK5CYII=',
  iconWidth: 20,
  iconHeight: 20,
  borderRadius: 10,
  top: -5
 },
 sourceType: '静态',
 data: [
  {
   name: '城运中心',
   per: '80',
   value: 1200,
   unit: '件',
   ranking: 1
  },
  {
   name: '昆西居委会',
   per: '80',
   value: 1200,
   unit: '件',
   ranking: 2
  },
  {
   name: '信访办',
   per: '80',
   value: 1200,
   unit: '件',
   ranking: 3
  },
  {
   name: '党政办',
   per: '80',
   value: 1200,
   unit: '件',
   ranking: 4
  },
  {
   name: '区城运中心',
   per: '80',
   value: 1200,
   unit: '件',
   ranking: 5
  }

 ],
 api: 'https://www.sjxks.com/v1/xiaokunshan/event/getEventDepartmentRanking',
 requestType: "GET",
 requestParams: {
  account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  type: '1'
 },
 eventAssociatedComponentIds: [],
 eventType: "click",
 movement: "showAndHidden",
 eventList: [{ eventType: "click" }],
 hoverEventList: [],
 clickEventList: [],
}