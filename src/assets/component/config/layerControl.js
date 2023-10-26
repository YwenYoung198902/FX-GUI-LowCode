/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-25 16:33:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-31 11:19:30
 */
export default {
 width: 400,
 height: 300,
 left: 100,
 top: 100,
 name: '摄像头复选框',
 show: true,
 isShowModule: true,
 lock: true,
 box: {
  width: 300,
  height: 40
 },
 search: {
  input: '',
  show: true,
  placeholder: '请输入',
  backgroundColor: 'rgba(29, 92, 180, 0.6)',
  fontColor: '#fff',
  fontSize: 16,
  width: 300,
  height: 30,
  searchField: '全局搜索'
 },
 label: {
  columns: 1,
  width: 150,
  height: 30,
  fontFamily: '微软雅黑',
  fontStyle: 'normal',
  textAlign: 'left',
  color: '#fff',
  fontSize: 18,
  fontWeight: 'normal',
  letterSpacing: 0
 },
 icon: {
  width: 25,
  height: 25
 },
 sourceType: '静态',
 data: [
  {
   sort: 1,
   rowid: '909da2c3-2a2e-40b2-a369-109b62c41097',
   name: '开发边界线',
   default_icon: "/file/mdpic/pic/20230629/aB8m8K0Uc91HcJ14fNdG9X9VdvfF8g0yav286t966j3Rfmc99ge75cf6djbQba4X.png",
   is_selected: 1
  },
  {
   sort: 2,
   rowid: '909da2c3-2a2e-40b2-a369-109b62c41092',
   name: '未出让用地',
   default_icon: "/file/mdpic/pic/20230629/2EbH7J95fH741Z7E7CcY0NeOdJ3h5F0qbyaIc19T1Tacaf8N4K0nbz0m6T805meV.png",
   selected_icon: "/file/mdpic/pic/20230327/8n8R4jb41t1T477b73exaa9Haw1I7vev8l5QaV7W4Fex2Gdm28c61ocj4VeJ614C.png",
   label_icon: "/file/mdpic/pic/20230327/8n8R4jb41t1T477b73exaa9Haw1I7vev8l5QaV7W4Fex2Gdm28c61ocj4VeJ614C.png",
   is_selected: 1
  },
  {
   sort: 3,
   rowid: '909da2c3-2a2e-40b2-a369-109b62c41093',
   name: '园区分布',
   default_icon: "/file/mdpic/pic/20230630/1q2W4mf9dC4R96dkfkePcZ8B3Y7f5L4o7f7h2Yad6L9w8o7A8K4I211kaUdGb3aw.png",
   is_selected: 1
  },
  {
   sort: 4,
   rowid: '909da2c3-2a2e-40b2-a369-109b62c41094',
   name: '镇集体资产',
   default_icon: "/file/mdpic/pic/20230629/1B4Y7Q4x8v9N6Ucq9Ic3aA3h7K1X1Dc546366Y1W2TcJ1c8CdF5A7W2f1x9meQ2H.png",
   is_selected: 0
  },
  {
   sort: 5,
   rowid: '909da2c3-2a2e-40b2-a369-109b62c41095',
   name: '餐饮商户',
   default_icon: "/file/mdpic/pic/20230603/8ueZ290F3H8Q7Cdl0Xb9f8eSbmcz9absci9e2Mb0aS5e7nbhaF3j4M9U5j3h4v76.png",
   selected_icon: "/file/mdpic/pic/20230327/8n8R4jb41t1T477b73exaa9Haw1I7vev8l5QaV7W4Fex2Gdm28c61ocj4VeJ614C.png",
   label_icon: "/file/mdpic/pic/20230327/8n8R4jb41t1T477b73exaa9Haw1I7vev8l5QaV7W4Fex2Gdm28c61ocj4VeJ614C.png",
   is_selected: 0
  },
 ],
 api: 'https://www.sjxks.com/v1/xiaokunshan/layer/getControls',
 requestType: "GET",
 requestParams: {
  account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  page_name: '大经济'
 }
}