<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-06-01 09:20:05
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-08 17:18:00
-->
<template>
  <div class="infoWindow">
    <div class="tan">
      <div class="tit">
        <div class="tit-one">
          <div class="icon1" />
          水质监测设备名称
          <div class="tan-close" />
        </div>
      </div>
      <div class="tan-one">
        <!-- <div class="tan-img"><img src="../../../assets/img/zhongshan/tan-img1.png" alt=""></div> -->
        <div class="tan-zi">河栋水质监测</div>
      </div>
      <div class="tan-two">
        <p>
          <span class="shen">信号强度: </span><span class="qian">145Rssl</span>
        </p>
        <p><span class="shen">溶解氧: </span><span class="qian">7.12</span></p>
        <p><span class="shen">ORP值: </span><span class="qian">-389</span></p>
        <p>
          <span class="shen">信号强度：</span><span class="qian">白小树</span>
        </p>
        <p>
          <span class="shen">PH值: </span><span class="qian">6.45mg/l</span>
        </p>
      </div>
      <div class="tan-three">
        <p>
          <span class="shen1">更新时间：</span
          ><span class="qian1">2023-10-09 12:11:45</span>
        </p>
        <p>
          <span class="shen1">设备地址</span
          ><span class="qian1"
            >这是设备地址这是设备地址这是设备地址这是设备地址超出显示</span
          >
        </p>
      </div>
      <div class="tan-four" />
    </div>
  </div>
</template>

<script>
import Playback from "@/components/camera/playback.vue";
import CameraScreen from "@/components/camera/cameraScreen.vue";
var ws;
export default {
  components: {
    CameraScreen,
    Playback,
  },
  data() {
    return {
      socket: "ws://mgtfy.yikuaida.cn/proxy",
      closeNameStatus: false,
      callNameStatus: false,
      callName: "开始通话",
      closeName: "结束通话",
      webSocket: null,
      recorder: "",
      flag: true,
      flag1: true,
      active: 1, // 地图弹窗，监控
      data: {},
      camera: "",
      detailEvent: "",
      detailYangan: "",
      area: [],
      rowid: "",
      yanganDeceiveList: "",
      department: "",
      labaDeceiveList: "",
      flag2: false,
      flag3: false,
    };
  },
  computed: {
    eventDetail() {
      return this.$store.state.maogang.eventDetail;
    },
    yanganEventDetail() {
      return this.$store.state.maogang.yanganEventDetail;
    },
    yanganList() {
      return this.$store.state.maogang.yanganList;
    },
    labaList() {
      return this.$store.state.maogang.labaList;
    },
  },
  watch: {},
  mounted() {
    // this.initHorn();
  },
  methods: {
    initHorn() {
      let socketAddress = this.socket;
      const host = window.location.host;
      if (host !== "mgtfy.yikuaida.cn") {
        socketAddress = "ws://10.89.13.74:50088/proxy";
      }
      const webSocket = new WebSocket(socketAddress);
      ws = webSocket;
      this.webSocket = webSocket;
      const that = this;
      var recorder = new MP3Recorder({
        debug: true,
        ws: webSocket,
        funOk: function () {
          // btnStart.disabled = false;
          // btnOntime.disabled = false;
          // btnMp3.disabled = false;
          // log('初始化成功');
        },
        funCancel: function (msg) {
          console.log(msg, "===msg");
          that.recorder = null;
        },
      });
      this.recorder = recorder;
      // 改变状态
      this.callName = "通话中...";
    },
    closeModelLaba() {
      this.closeHorn();
      this.active = 1;
      this.flag2 = false;
      this.flag3 = false;
      AMap.DInfoShow.currentInfoWindow && AMap.DInfoShow.closeInfoWindow();
    },
    closeHorn(row) {
      this.callNameStatus = false;
      this.closeNameStatus = false;
      // this.closeName = '关闭喇叭';
      this.callName = "开始通话";
      this.recorder.Onstop();
      this.webSocket.close();
    },
    callHorn(row) {
      this.initHorn();
      const id = row.device_id;
      // const webSocket = new WebSocket('ws://101.91.199.229:23202/');
      // ws = webSocket
      // const webSocket = new WebSocket('ws://mgtfy.yikuaida.cn/proxy');
      // this.webSocket = webSocket;
      this.callNameStatus = true;
      setTimeout(() => {
        this.send(id);
      }, 1000);
    },
    send(id) {
      // var test = {
      // 	"Meport": 6002,  //跨服端口号
      // 	"Umagic": 89686, //快服句柄随机数
      // 	"Umask": "84d3def493da487b96ed12744ad44c7a", //快服填随机字符串
      // 	"plevel": 9,//该用户内播放等级1~9 9是最高优先级
      // 	"sskey": "496beaa0dfa8d67262f364ce49fdcf78",
      // 	"ulevel": 600,//用户间等级 1~600   不同用户间同时推流一个音响 等级高的会切掉等级低的
      // 	"snlist": [id], //被播放的设备序列号
      // 	"cmd": "PLAYLIST",//固定值
      // 	"Meip": "127.0.0.1" // 您的节点服务器IP地址
      // }
      // let aa = JSON.stringify(test)
      // console.log(aa.length,'======aa')
      // return
      var userInfo =
        '257\n{"Meport":6002,"Umagic":89656,"Umask":"13d3def493da487b96ed12744ad44c7a","plevel":9,"sskey":"496beaa0dfa8d67262f364ce49fdcf78","ulevel":999,"snlist":["' +
        id +
        '","d2aecbe315710b7b4e4a362effb853ec"],"cmd":"PLAYLIST","Meip":"127.0.0.1"}';
      // var userInfo = '257\n{\"Meport\":6002,\"Umagic\":89686,\"Umask\":\"84d3def493da487b96ed12744ad44c7a\",\"plevel\":9,\"sskey\":\"496beaa0dfa8d67262f364ce49fdcf78\",\"ulevel\":999,\"snlist\":[\"f8931010e3136f97bfba79830615ddac\",\"d2aecbe315710b7b4e4a362effb853ec\"],\"cmd\":\"PLAYLIST\",\"Meip\":\"127.0.0.1\"}';
      // var userInfo = '257\n{\"Meport\":6002,\"Umagic\":89686,\"Umask\":\"84d3def493da487b96ed12744ad44c7a\",\"plevel\":9,\"sskey\":\"496beaa0dfa8d67262f364ce49fdcf78\",\"ulevel\":999,\"snlist\":[\"'+id+'\",\"d2aecbe315710b7b4e4a362effb853ec\"],\"cmd\":\"PLAYLIST\",\"Meip\":\"127.0.0.1\"}';

      this.webSocket.send(userInfo);

      this.recorder.Ontime(2);
    },
    closeModel() {
      this.active = 1;
      this.flag2 = false;
      this.flag3 = false;

      AMap.DInfoShow.currentInfoWindow && AMap.DInfoShow.closeInfoWindow();
    },

    async initialize(data) {
      this.data = data;
      this.rowid = data.id;

      if (data.model == "camera") {
        this.getVideoInfo(data.id);
      } else if (data.model == "yanganEvent") {
        this.detailYangan = this.yanganEventDetail.filter(
          (item) => item.rowid == data.id
        );
        this.department = JSON.parse(this.detailYangan[0].department);
      } else if (data.model == "yangan") {
        this.yanganDeceiveList = this.yanganList.filter(
          (item) => item.rowid == data.id
        );
      } else if (data.model == "laba") {
        this.labaDeceiveList = this.labaList.filter(
          (item) => item.rowid == data.id
        );
      } else {
        this.detailEvent = this.eventDetail.filter(
          (item) => item.rowid == data.id
        );
        const drawbox = this.detailEvent[0].alam_drawbox;
        this.detailEvent[0].alam_drawbox = drawbox.length > 0 ? drawbox : [];
      }
      console.log(this.data, "initialize");
    },
    // 获取单个视频播放
    async getVideoInfo(id) {
      const result = await this.$xksapi.getVideoInfo({
        accountId: this.$route.query.UserAccountId,
        rowid: id,
      });
      this.camera = result.data;
    },
    async sendEvent() {
      this.flag2 = true;
      const res = await this.$xksapi.sendEvent({
        rowid: this.detailEvent[0].rowid,
      });
      if (res.code == "200") {
        this.$message({
          message: "上报城运成功",
          type: "success",
        });
        this.flag2 = false;
      }
    },
    async sendYanganEvent() {
      this.flag3 = true;
      const res = await this.$xksapi.sendEvent({
        rowid: this.detailYangan[0].rowid,
        type: 2,
      });
      if (res.code == "200") {
        this.flag3 = false;
        this.$message({
          message: "上报城运成功",
          type: "success",
        });
      }
    },
    back() {
      this.active = 1;
    },
  },
};
</script>

<style lang="scss">
.call {
  border: 1px solid rgba(27, 126, 242, 1);
  background-color: #1b7ef2;
  color: #fff;
  padding: 0px 5px;
  margin-right: 35px;
}
.callClose {
  margin-right: 35px;
  border: 1px solid rgba(27, 126, 242, 1);
  background-color: #051d37;
  color: #1b7ef2;
  padding: 0px 5px;
}
.infoWindow {
  color: #fff;

  // .tan{
  //   width: 432px;
  //   height: 304px;
  //   // background-color: pink;
  //   margin-left: -500px;
  //   background-image: url("../../../assets/img/zhongshan/tan.png");
  //   background-size: 100% 100%;
  //   .tit{
  //     width: 422px;
  //     height: 34px;
  //     line-height: 34px;
  //     text-indent: 10px;
  //     font-family: Microsoft YaHei;
  //     font-size: 16px;
  //     font-weight: normal;
  //     background: linear-gradient(180deg, #FFFFFF 0%, #49CFFF 100%);
  //     -webkit-background-clip: text;
  //     -webkit-text-fill-color: transparent;
  //     background-clip: text;
  //     .tit-one{
  //       width: 422px;
  //       height: 34px;
  //       // background-color: #fff;
  //       background-image: url("../../../assets/img/zhongshan/tan-tit.png");
  //       background-size: 100% 100%;
  //       .icon1{
  //       width: 15px;
  //       height: 15px;
  //       background-color: #7DDDFF;
  //       float: left;
  //       margin-top: 9px;
  //       margin-left: 9px;
  //       background-image: url("../../../assets/img/zhongshan/icon1.png");
  //       background-size: 100% 100%;
  //     }
  //     .tan-close{
  //       width: 24px;
  //       height: 24px;
  //       // background-color: palegreen;
  //       float: right;
  //       margin-top: 5px;
  //       background-image: url("../../../assets/img/zhongshan/close.png");
  //       background-size: 100% 100%;

  //     }
  //     }
  //   }
  //   .tan-one{
  //     width: 100px;
  //     height: 165px;
  //     background-color: #aa1515;
  //     float: left;
  //     background-image: url("../../../assets/img/zhongshan/tan-img.png");
  //     background-size: 100% 100%;
  //     margin-left: 12px;
  //     margin-top: 10px;
  //     .tan-img{
  //       width: 135px;
  //       height: 90px;
  //       // background-color: #49CFFF;
  //       margin-left: -14px;
  //       margin-top: 30px;
  //       img{
  //         width: 100%;
  //         height: 100%;
  //       }
  //       // background-image: url("../../../assets/img/zhongshan/tan-img1.png");
  //       // background-size: 100% 100%;
  //     }
  //     .tan-zi{
  //       width: 100px;
  //       height: 18px;
  //       // background-color: #fff;
  //       font-family: Microsoft YaHei;
  //       font-size: 14px;
  //       font-weight: normal;
  //       letter-spacing: 0em;
  //       color: #70E0FF;
  //       text-align: center;
  //     }
  //   }
  //   .tan-two{
  //     width: 300px;
  //     height: 165px;
  //     // background-color: blueviolet;
  //     float: left;
  //     margin-left: 10px;
  //     margin-top: 10px;
  //     .shen{
  //       display: block;
  //       width: 90px;
  //       height: 30px;
  //       line-height: 30px;
  //       text-indent: 20px;
  //       background: rgba(0, 0, 0, 0.15);
  //       float: left;
  //       margin-top: 2px;
  //       background-image: url("../../../assets/img/zhongshan/tan-ying.png");
  //       background-size: 100% 100%;
  //     }
  //     .qian{
  //       display: block;
  //       width: 200px;
  //       height: 30px;
  //       line-height: 30px;
  //       text-indent: 20px;
  //       background: rgba(125, 221, 255, 0.05);
  //       float: left;
  //       margin-left: 5px;
  //       margin-top: 3px;
  //       background-image: url("../../../assets/img/zhongshan/tan-ying1.png");
  //       background-size: 100% 100%;
  //     }
  //   }
  //   .tan-three{
  //     width: 412px;
  //     height: 70px;
  //     // background-color: rgb(33, 160, 75);
  //     float: left;
  //     margin-top: 13px;
  //     margin-left: 10px;
  //     .shen1{
  //       display: block;
  //       width: 110px;
  //       height: 30px;
  //       line-height: 30px;
  //       text-indent: 20px;
  //       background: rgba(0, 0, 0, 0.15);
  //       float: left;
  //       margin-top: 2px;
  //       background-image: url("../../../assets/img/zhongshan/tan-ying.png");
  //       background-size: 100% 100%;
  //     }
  //     .qian1{
  //       display: block;
  //       width: 292px;
  //       height: 30px;
  //       line-height: 30px;
  //       text-indent: 20px;
  //       background: rgba(125, 221, 255, 0.05);
  //       float: left;
  //       margin-left: 5px;
  //       margin-top: 3px;
  //       background-image: url("../../../assets/img/zhongshan/tan-ying1.png");
  //       background-size: 100% 100%;
  //       text-overflow: ellipsis; // 文字溢出显示省略号
  //       overflow: hidden; // 溢出隐藏
  //       white-space: nowrap; // 强制一行
  //     }
  //   }
  //   .tan-four{
  //     width: 40px;
  //     height: 28px;
  //     // background-color: pink;
  //     margin-top: 280px;
  //     margin-left: 200px;
  //     background-image: url("../../../assets/img/zhongshan/tan-jt.png");
  //     background-size: 100% 100%;
  //   }
  // }
}
</style>
