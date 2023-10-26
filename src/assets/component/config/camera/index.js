export default {
    width:848,
    height: 240,
    left: 0,
    top: 0,
    name:'视频',
    show: true,
    lock: true,
    isShowModule:true,
    series:{
        type:'',
    },
    // sourceType: "api",
    // api:
    // 'https://www.sjxks.com/v1/xiaokunshan/administer/getImportantCameraData?camera_tag=%E5%9F%8E%E8%BF%90%E9%87%8D%E7%82%B9%E7%9B%91%E6%8E%A7&account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e',
    // requestType: "get",
    // data:[],
    sourceType: '静态',
    address:'https://www.sjxks.com/v1/api/video/stream_start?account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e',
    svs_url: `${document.location.protocol}//${window.location.host}`,
    data:[
  
    {
        "rowid": "7f863e2f-515c-4cb5-84c8-84d8a879a47e",
        "device_name": "西大门人行出口",
        "camera_type": "枪机",
        "master_national_num": "31011700011180000006",
        "device_status": "在线",
        "master_channel": "31011712101320000008"
      },
      {
        "rowid": "4da3e9f8-a4ce-49ea-9d2d-95b8c30e503d",
        "device_name": "C006 西大门车行出口",
        "camera_type": "枪机",
        "master_national_num": "31011700011180000006",
        "device_status": "在线",
        "master_channel": "31011712101320000006"
      },
      {
        "rowid": "104ee131-a331-44bf-9845-b6ad9e06ed4e",
        "device_name": "C005 西大门车行入口",
        "camera_type": "枪机",
        "master_national_num": "31011700011180000006",
        "device_status": "在线",
        "master_channel": "31011712101320000004"
      },
      {
        "rowid": "031ea966-c38e-42e3-af3c-420c7376bc29",
        "device_name": "南大门出入口",
        "camera_type": "枪机",
        "master_national_num": "31011700011180000006",
        "device_status": "在线",
        "master_channel": "31011712101320000003"
      },
      {
        "rowid": "da98c11c-17ce-4053-b8fc-284038c25533",
        "device_name": "C002 南大门车行出入口",
        "camera_type": "枪机",
        "master_national_num": "31011700011180000006",
        "device_status": "在线",
        "master_channel": "31011712101320000002"
      },
      {
        "rowid": "b17bbb74-b178-4bcc-8e92-1339a8ed69fb",
        "device_name": "C001 南大门车行出入口",
        "camera_type": "枪机",
        "master_national_num": "3101170001118000006",
        "device_status": "在线",
        "master_channel": "31011712101320000001"
      }
      ],
   
     video:{
        width:420,
        height:237,
        dataNumber:2,
        time:10,
        scroll:true,
        background:require("@/assets/component/img/cameraNo.png"),
     }

  };
  