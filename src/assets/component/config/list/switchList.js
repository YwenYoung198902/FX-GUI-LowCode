/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-23 13:30:11
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-24 15:53:01
 */
export default {
  width: 400,
  height: 700,
  left: 100,
  top: 100,
  name: '分页列表',
  isShow: true,
  isShowModule: true,
  isShowCheckbox: false,
  isLock: true,
  box: {
    backgroundImage: '',
    opacity: 0.5,
    mainColor: 'rgba(255,119,66,1)',
    hoverColor: 'rgba(255,255,255,.1)',
    activeColor: 'rgba(255,255,255,.1)'
  },
  searchBox: {
    display: 'flex',
    placeHolder: '',
    color: '#fff',
    fontSize: 18,
    width: 300,
    height: 40,
    left: 2,
    top: 30,
    select: ''
  },
  level_1: {
    display: 'flex',
    background: 'rgba(59, 39, 29, .5)',
    height: 50,
    color: '#fff',
    fontSize: 16,
    fontFamily: '微软雅黑',
    letterSpacing: 0,
    borderWidth: 2,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  level_2: {
    display: 'flex',
    height: 50,
    color: '#fff',
    fontSize: 16,
    fontFamily: '微软雅黑',
    letterSpacing: 0,
    fontWeight: 'bold',
    fontStyle: 'normal'
  },
  level_1_text: {
    display: 'flex',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontFamily: '微软雅黑'
  },
  level_2_text: {
    display: 'flex',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontFamily: '微软雅黑'
  },
  level_3_text: {
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#fff',
    fontSize: 18,
    fontFamily: '微软雅黑',
    isShowIcon: false
  },
  right: {
    show: true,
    type: 1,
    color: '#fff',
    fontSize: 18,
    defaultPic: '',
    hoverPic: '',
    picWidth: 20,
    picHeight: 20
  },
  input: {
    level_1_option_value: '',
    level_2_option_value: '',
    level_2_option_childValue: '',
    level_1_input_value: '',
    level_2_input_value: '',
    worksheetid: '',
    param: '',
    worksheetid1: '',
    param1: '',
  },
  level_1_tab: [],
  level_2_tab: [],
  level_2_worksheetid: [],
  level_2_params: [],
  level_2_worksheetid1: [],
  level_2_params1: [],
  data: [
    {
      code: "I",
      count: 2,
      id: "6e40a90e-f8c5-4f1f-8125-e6d27eec00d8",
      name: "信息传输、软件和信息技术服务业",
      rowid: "6e40a90e-f8c5-4f1f-8125-e6d27eec00d8",
      children: [
        {
          id: "94c962ef-2b22-4dd3-bad6-c4b4c6bf02d4",
          name: "上海楷圳实业有限公司",
          position: "121.152443,31.002736",
          rowid: "94c962ef-2b22-4dd3-bad6-c4b4c6bf02d4",
          standard: "信息传输、软件和信息技术服务业",
          type: "其他"
        },
        {
          id: "2966244a-16ac-4e55-ae27-9aca15404411",
          name: "上海信奥科技有限公司",
          position: "121.152443,31.002736",
          rowid: "2966244a-16ac-4e55-ae27-9aca15404411",
          standard: "信息传输、软件和信息技术服务业",
          type: "其他"
        },
      ]
    },
    {
      code: "I",
      count: 2,
      id: "4d991320-6a69-4094-a43e-5587b2fa9212",
      name: "制造业",
      rowid: "4d991320-6a69-4094-a43e-5587b2fa9212",
      children: [
        {
          id: "94c962ef-2b22-4dd3-bad6-c4b4c6bf02d5",
          name: "上海泰博雷特机械有限公司",
          position: "121.152443,31.002736",
          rowid: "94c962ef-2b22-4dd3-bad6-c4b4c6bf02d5",
          standard: "制造业",
          type: "其他"
        },
        {
          id: "2966244a-16ac-4e55-ae27-9aca15404414",
          name: "上海天域模具有限公司",
          position: "121.152443,31.002736",
          rowid: "2966244a-16ac-4e55-ae27-9aca15404414",
          standard: "制造业",
          type: "其他",
          children: [
            {
              id: "94c962ef-2b22-4dd3-bad6-c4b4c6212121",
              name: "1111",
              position: "121.152443,31.002736",
              rowid: "94c962ef-2b22-4dd3-bad6-c4b4c6212121",
              standard: "制造业",
              type: "其他"
            },
            {
              id: "2966244a-16ac-4e55-ae27-9aca1534343",
              name: "2222",
              position: "121.152443,31.002736",
              rowid: "2966244a-16ac-4e55-ae27-9aca1534343",
              standard: "制造业",
              type: "其他"
            },
          ]
        },
      ]
    }
  ],
  api: 'http://www.skyinforcloud.com:81/v1/weichuan/index/get_camera_group_tree',
  requestType: "POST",
  requestParams: {
    account_id: 'b9a3ef50-f626-4ddb-a208-d5fe96c0d348'
  }
}