<template>
  <div class="single-modal">
    <div
      v-if="closeMoreVideo !== 'closeMoreVideo'"
      class="close"
      @click="closeModel()"
    />
    <div class="video-box">
      <div v-if="danbin.danbin_type == '联通'">
        <video
          v-if="danbin.danbin_number"
          id="remote-video"
          ref="remoteVideo"
          style="display: inline-block; width: 100%; height: 100%"
          controls
          autoplay
        />
      </div>
      <div v-if="danbin.danbin_type == '电信'">
        <cameraPlay
          v-if="danbin.danbin_number"
          :device-id="danbin.danbin_number"
          type="dianxin"
        />
      </div>
      <div v-if="danbin.danbin_type == '移动'">
        <cameraPlay
          v-if="danbin.danbin_number"
          :videourl="videoUrl"
          :code="code"
          type="yidong"
        />
      </div>

      <div
        class="CallDiv"
        :style="{
          width: code == '111' ? '120px' : code == '21101' ? '220px' : '200px',
        }"
      >
        <div
          class="call"
          :style="[
            { display: code == '111' ? 'block' : 'none' },
            {
              backgroundColor:
                deviceId == '' || deviceId == undefined ? '#999' : '#21A3FF',
            },
          ]"
          @click="callReq"
        >
          呼叫
        </div>

        <div
          class="call"
          :style="{ display: code == 21101 ? 'block' : 'none' }"
          style="width: 110px"
        >
          呼叫中...
        </div>
        <div
          class="call1"
          :style="{ display: code == 21303 ? 'block' : 'none' }"
        >
          通话中... <span id="timer" />
        </div>
        <div
          class="call2"
          :style="{ display: code == '111' ? 'none' : 'block' }"
          @click="hangup"
        >
          挂断
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cameraPlay from "./video.vue";
import AppVideo from "./lib/index";
import   './yidong/mobileDevices'
import  {
    pocTalkAction,config
} from './yidong/mobileDevices'
// import   './yidong/mqtt'
export default {
  components: {
    cameraPlay,
  },
  props: ["danbin", "closeMoreVideo"],
  data() {
    return {
      protocol: document.location.protocol,
      projectAddrassNoPort: window.location.host,
      code: "111",
      timer: "", // 定时器
      str_hour: "",
      str_min: "",
      str_sec: "",
      deviceId: "", // 设备id
      // ////////////
      dispatchId: 0,
      pullVideoObj: null,
      videoCallObj: null,
      AppVideoObj: null,
      // ////////电信
      path: "ws://localhost:9002",
      webSocket: "",
      loginRspData: "",
      fullDuplexSingleCall: "",
      fullDuplexSingleComingCall: "",
      videoUrl: "",
      socket: {},
      //移动
      adhocId:'',
      pocRecord:null
    };
  },
  computed: {
    // loginReqString() {
    //   return this.$store.state.xiaokunshan.loginReqString;
    // },
  },
  watch: {
    // loginReqString(val) {
    //   if (val == "loginReqString") {
    //     this.logoutReq1();
    //     this.getSoldierVideoInfo();
    //     this.$store.commit("setDragPopupName", "");
    //   }
    // },
  },
  mounted() {},
  created() {
    if (this.danbin.danbin_number == "") {
      this.deviceId = "";
      return;
    } else if (this.danbin.danbin_type == "联通") {
      this.deviceId = "123";
      this.init();
    } else if (this.danbin.danbin_type == "电信") {
      this.deviceId = "123";
      this.webSockInit();
    }else if(this.danbin.danbin_type == "移动"){
      this.startMonitor();
    }
  },
  beforeDestroy() {
    this.deviceId = "";
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    loginReq() {
      // 登录方法
      return new Promise((resolve, reject) => {
        const loginName = "sjxksdd01";
        const password = "Aa123456";
        const loginApi = window.CONFIG.DB_LOGIN_API;
        // let loginApi = 'https://shdb-poc.intcity.com.cn:81/api/open/dp/login'
        // let loginApi = `${this.protocol}//${this.projectAddrassNoPort}/v13/api/open/dp/login`;

        this.$axios({
          method: "post",
          url: loginApi,
          data: {
            loginName: loginName,
            password: this.$md5(password),
            code: "****",
          },
        })
          .then((res) => {
            // console.log("成功回调", res.data.data.loginUser.id);
            if (res.status == 200 && res.data.data) {
              this.dispatchId = res.data.data.loginUser.id;
              resolve(this.dispatchId);
            } else {
              alert(res.message);
            }
          })
          .catch((res) => {
            // console.log("失败回调", res);
          });
      });
    },
    init() {
      this.loginReq().then((dispatchId) => {
        if (this.dispatchId) {
          const num = Math.round(Math.random() * 4);

          const mqttServer = window.CONFIG.DB_MQTT;
          const video = window.CONFIG.DB_MEDIA_LIST;
          const videoServer = video[num];
          const that = this;
          this.AppVideoObj = new AppVideo({
            mqttServer,
            videoServer,
            dispatchId,
            mqttSuccess: function () {
              // console.log("信令连接成功，可以正常视频");
              /** 不直接拉取视频*/
              // that.pullVideo();
            },
            error: function () {
              // this.$message.error("信令连接失败，请点击连接")
            },
          });
        }
      });
    },
    // 呼叫
    callReq() {
      console.log(this.danbin.danbin_type,"单兵类型");
      if (this.danbin.danbin_type == "联通") {
        this.callReqLt();
      } else if (this.danbin.danbin_type == "电信") {
        this.callReqDx(11101);
      } else if (this.danbin.danbin_type == "移动") {
        this.code = 21101;
          pocTalkAction.doRequestSpeak(this.adhocId,1)
      }
    },
    // 挂断
    hangup() {
      if (this.danbin.danbin_type == "联通") {
        this.hangupLt();
      } else if (this.danbin.danbin_type == "电信") {
        this.hangupDx(this.fullDuplexSingleCall.channelId);
      } else if (this.danbin.danbin_type == "移动") {
        this.stopMonitor();
        //挂断全部呼叫
        pocTalkAction.doCloseAllTalkAction();
      }
    },
    startMonitor() {
      this.$xksapi
        .startMonitor({ userKey: this.danbin.danbin_number })
        .then((res) => {
          this.videoUrl = res.data.filePoc;
          if(this.videoUrl){
            setTimeout(() => {
            this.connectWebSock();
          }, 2000);
          }
        });
    },
    connectWebSock() {
      this.$xksapi.getSoldierConfig({}).then((res) => {
        let    currentUserToken=res.data.pwd
        let   hostUrl =  res.data.wss
        let  currentUid = res.data.caller
        localStorage.setItem('setdanbingAddress', 
        JSON.stringify( {
            pwd:currentUserToken,
            wss :hostUrl ,
            caller:currentUid
        }))
         console.log("localStorage.getItem(key)",localStorage.getItem('setdanbingAddress'));
        this.adhocId=Number(parseInt(new Date().getTime()*Math.random()*100)).toString(16).toString(16) //移动的会话id生成
        pocTalkAction.adhocCall(this.adhocId,this.danbin.danbin_number,false)
      });
    },
    stopMonitor() {
     if(this.socket){
      this.$xksapi
        .stopMonitor({ userKey: this.danbin.danbin_number })
        .then((res) => {
          if (res.data.closeCamera) {
            this.videoUrl = "";
            this.code = 111;
          }
        });
     }
    },
    // 拉取视频
    pullVideo() {
      // let remoteId=this.deviceId
      // console.log('==============拉取视频');
      var remoteId = this.danbin.danbin_number; // ///////设备id
      // console.log(this.danbin,'=======单兵data')
      if (!remoteId) {
        alert("请填写用户uid");
        return;
      }
      // 不检测是否有摄像头设备
      this.AppVideoObj.callVideoPermission(false).then((res) => {
        // console.log(res,"不检测是否有摄像头设备");
        // if (res == -1) {
        // 	alert("域名没有安全证书，不能设置浏览器视频和麦克风权限");
        // 	return;
        // }
        if (res == 0) {
          alert(
            "视频和麦克风权限没有打开，请设置浏览器的视频和麦克风权限为允许状态"
          );
          return;
        }

        // if (res == 1) {
        // console.log('====终端视频');
        // console.log(this.$refs.remoteVideo)
        const vodeoDiv = this.$refs.remoteVideo; // 视频盒子
        const that = this;
        this.pullVideoObj = this.AppVideoObj.pullVideo({
          remoteId,
          audio: true,
          remoteVideoWnd: vodeoDiv,
          close: (err) => {
            this.code = "111";
            // 用户视频挂断消息回调
            if (err) {
              // 用户有异常导致挂断
              // alert("异常挂断")
            } else {
              // 用户正常挂断
              // alert("对方挂断")
              // that.$message.error("对方已挂断")
            }
          },
          error: (error) => {
            console.log(error, "拉取视频错误");
          },
          events: (res) => {
            // 用户消息回调
            console.log(res, "pullVideo mqtt用户消息回调");
          },
        });
        // }
      });
    },
    callReqLt() {
      // 呼叫按钮

      if (this.danbin.danbin_number == "") {
        this.$message({
          showClose: true,
          message: "该人员没有绑定单兵设备",
          type: "error",
        });
        // this.$message.error("该人员没有绑定单兵设备")
        return;
      }
      this.code = 21101;
      var remoteId = this.danbin.danbin_number; // 单兵设备id
      if (!remoteId) {
        alert("请填写用户uid");
        return;
      }
      // 检测是否有摄像头设备
      this.AppVideoObj.callVideoPermission(true).then((res) => {
        console.log(res, "====callReq是否有摄像头权限");
        // if (res == 1) {
        // this.countTimer();
        const vodeoDiv = this.$refs.remoteVideo; // 视频盒子
        this.videoCallObj = this.AppVideoObj.videoCall({
          remoteId,
          // localVideoWnd: $("#local-video")[0],
          remoteVideoWnd: vodeoDiv,
          videoName: "测试视频",
          localVideo: true,
          close: (err) => {
            // 用户视频挂断消息回调
            this.code = "111";
            this.$message.error("已挂断");
            console.log("videocallClose");
            if (err) {
              // 用户有异常导致挂断
            } else {
              // 用户正常挂断
            }
          },
          events: (res) => {
            // 用户消息回调
            this.code = 21303;
            // console.log(res, '呼叫用户消息回调videoCall mqtt');
          },
        });
        // }
      });
    },

    // 结束呼叫请求
    hangupLt() {
      // 挂断按钮
      this.code = "111";
      clearInterval(this.timer);
      this.timer = null;
      if (this.videoCallObj) {
        this.videoCallObj.closeVideo();
        this.videoCallObj = null;
      }
      if (this.pullVideoObj) {
        this.pullVideoObj.closeVideo();
        this.pullVideoObj = null;
      }
    },
    countTimer() {
      clearInterval(this.timer);
      this.timer = null;
      const ele_timer = document.getElementById("timer");
      this.code = 21303;
      let n_sec = 0; // 秒
      let n_min = 0; // 分
      let n_hour = 0; // 时
      // 60秒 === 1分
      // 60分 === 1小时
      this.timer = setInterval(function () {
        this.str_sec = n_sec;
        this.str_min = n_min;
        this.str_hour = n_hour;
        if (n_sec < 10) {
          this.str_sec = "0" + n_sec;
        }
        if (n_min < 10) {
          this.str_min = "0" + n_min;
        }

        if (n_hour < 10) {
          this.str_hour = "0" + n_hour;
        }
        var time = this.str_hour + ":" + this.str_min + ":" + this.str_sec;
        ele_timer.innerText = time;
        console.log(".....", time);
        n_sec++;
        if (n_sec > 59) {
          n_sec = 0;
          n_min++;
        }
        if (n_min > 59) {
          n_sec = 0;
          n_hour++;
        }
      }, 1000);
    },

    closeModel() {
      if (this.danbin.danbin_type == "城运") {
        this.hangup();
        console.log("联通单兵挂断");
      } else if (this.danbin.danbin_type == "电信") {
        this.logoutReq1();
        this.getSoldierVideoInfo();
      } else if (this.danbin.danbin_type == "移动") {
        this.stopMonitor();
      }
      this.$store.commit("setDanBinNumber", "");
      this.$store.commit("setDragPopupName", "");
      this.$store.commit("setMoreVideoNum", "");
    },
    async getSoldierVideoInfo() {
      const res = await this.$ssapi.getSoldierVideoInfo({
        device_id: this.danbin.danbin_number,
        type: 2,
      });
      if (res.code == 200) {
      } else {
      }
    },
    // 电信-----------------------
    loginReq1() {
      // 登录方法
      var loginInfo = {
        msgCode: 10001,
        data: {
          userId: "20000000040",
          password: "Root.123",
          enterpriseId: "caltta4567",
          serverIp: "119.3.16.101",
          localIp: "10.194.26.70",
        },
      }; // 只需要修改userId password serverIp
      var loginStr = JSON.stringify(loginInfo);
      this.webSocket.send(loginStr);
    },
    webSockInit() {
      this.webSocket = new WebSocket(this.path);
      this.webSocket.onopen = (event) => {
        this.onOpen(event);
      };
      this.webSocket.onmessage = (event) => {
        this.onMessage(event);
      };
      this.webSocket.onclose = (event) => {
        this.onClose(event);
      };
    },
    /* 电信单兵连接失败 */
    onError(event) {
      console.log("连接失败", event);
    },

    onOpen(event) {
      this.loginReq1(); // 自动登录
    },
    onClose(event) {
      console.log("连接关闭", event);
    },
    onMessage(event) {
      var msg = JSON.parse(event.data);

      switch (msg.msgCode) {
        case 12101: {
          this.fullDuplexSingleComingCall = msg.data;
          break;
        }
        case 11101: {
          this.fullDuplexSingleComingCall = msg.data;
          break;
        }
        case 12102: {
          this.halfDuplexSingleComingCall = msg.data;
          break;
        }
        case 20001: {
          this.loginRsp1(msg.data);
          break;
        }
        case 20002: {
          break;
        }
        case 21101: // 呼叫应答
        case 21102:
        case 21103:
        case 21104:
        case 21105: {
          this.callRsp1(msg);
          break;
        }

        case 21303: {
          // 设置当前呼叫应答
          // console.log('11111111111111111111111111111111')
          // {"msgCode":21303,"data":{"result":0,"channelId":0}}.
          this.$message({
            message: "已成功应答",
            type: "success",
          });

          this.code = 21303;
          // this.countTimer()
          break;
        }
        case 21305: {
          // 操作话权应答
          // {"msgCode":21305,"data":{"result":0,"operType":0,"channelId":0}}
          break;
        }

        case 21308: {
          // 静音应答
          // {"msgCode":21308,"data":{"result":0,"operType":1}}
          // {"msgCode":21308,"data":{"result":0,"operType":0}}
          break;
        }

        case 30005: {
          // 呼叫状态通知
          this.callStatusNotify(msg.data);
          break;
        }
      }
    },
    callReqDx(callType) {
      // 呼叫按钮
      if (this.danbin.danbin_number == "") {
        this.$message.error("该人员没有绑定单兵设备");
        return;
      }
      var callReq;
      switch (callType) {
        case 11101: {
          callReq = {
            msgCode: 11101,
            randomString: this.loginRspData.randomString,
            data: { calledNumber: this.danbin.danbin_number },
          };
          // callReq = {
          //   msgCode: 11101,
          //   randomString: this.loginRspData.randomString,
          //   data: { calledNumber: this.danbin.danbin_number },//呼叫号码
          // }; //采用全双工单呼
          break;
        }
        case 11102: {
          callReq = {
            msgCode: 11102,
            randomString: this.loginRspData.randomString,
            data: { calledNumber: this.danbin.danbin_number },
          };
          break;
        }
        case 11103: {
          callReq = {
            msgCode: 11103,
            randomString: this.loginRspData.randomString,
            data: { calledNumber: this.danbin.danbin_number },
          };
          break;
        }
        case 11104: {
          callReq = {
            msgCode: 11104,
            randomString: this.loginRspData.randomString,
            data: { calledNumber: this.danbin.danbin_number },
          };
          break;
        }
        case 11105: {
          break;
        }
        default: {
          alert("unknown call request type " + callType);
          return;
        }
      }
      var callReqStr = JSON.stringify(callReq);
      this.webSocket.send(callReqStr);
    },
    callRsp1(msg) {
      // 全双工单呼应答 {"msgCode":21101,"data":{"result":0,"channelId":0,"calledNumber":"10000001497"}}
      switch (msg.msgCode) {
        case 21101: {
          if (msg.data.result) {
            alert("full duplex single call fail, result " + msg.data.result);
          } else {
            this.code = 21101;
            this.fullDuplexSingleCall = {
              channelId: msg.data.channelId,
              calledNumber: msg.data.calledNumber,
              callStatus: 32,
            };
          }
          break;
        }
        default: {
          alert("unknown call response type " + msg.msgCode);
          return;
        }
      }
    },
    hangupDx(channelId) {
      // 挂断按钮
      this.code = "111";
      this.$message.error("已挂断");
      clearInterval(this.timer);
      this.timer = null;
      var terminateCallReq = {
        msgCode: 11301,
        randomString: this.loginRspData.randomString,
        data: { channelId: channelId, cause: 2 },
      };
      var terminateCallStr = JSON.stringify(terminateCallReq);
      this.webSocket.send(terminateCallStr);
    },
    setCurrentCall(channelId) {
      // 设置当前呼叫请求
      var setCurrentCallReq = {
        msgCode: 11303,
        randomString: this.loginRspData.randomString,
        data: { channelId: channelId },
      };
      var setCurrentCallStr = JSON.stringify(setCurrentCallReq);
      this.webSocket.send(setCurrentCallStr);
    },
    singleComingCallRsp(msgcode, result) {
      // 全双工单呼来呼应答   //半双工单呼来呼应答
      var rsp;
      var callName;
      if (msgcode == 22101) {
        rsp = {
          msgCode: msgcode,
          randomString: this.loginRspData.randomString,
          data: {
            result: result,
            channelId: this.fullDuplexSingleComingCall.channelId,
          },
        };
        callName = "fullDuplexSingleComingCall";
      } else {
        // console.log("=====================")
      }
      var rspStr = JSON.stringify(rsp);
      this.webSocket.send(rspStr);
      if (result == 200) {
        // alert("call speaking ...")

        if (msgcode == 22101) {
          this.fullDuplexSingleComingCallCall = null;
        }
        // else {
        //   this.halfDuplexSingleComingCallCall = null;
        // }
      }
    },
    callStatusNotify(ntfyData) {
      // 呼叫状态通知
      // 全双工单呼
      if (
        this.fullDuplexSingleCall &&
        this.fullDuplexSingleCall.channelId == ntfyData.channelId
      ) {
        this.procCallStatus(
          ntfyData,
          this.fullDuplexSingleCall,
          "fullDuplexSingleCall"
        );
        if (ntfyData.callStatus == 31) {
          this.fullDuplexSingleCall = null;
        }
      }
      // 全双工单呼来呼
      else if (
        this.fullDuplexSingleComingCall &&
        this.fullDuplexSingleComingCall.channelId == ntfyData.channelId
      ) {
        this.procCallStatus(
          ntfyData,
          this.fullDuplexSingleComingCall,
          "fullDuplexSingleComingCall"
        );
        if (ntfyData.callStatus == 31) {
          this.fullDuplexSingleComingCall = null;
        }
      }
    },
    procCallStatus(ntfyData, callObject, callName) {
      // 处理呼叫状态
      if (ntfyData.callStatus == 31) {
        this.alertCallFail(ntfyData.cause);
        if (
          callName != "fullDuplexSingleComingCall" &&
          callName != "halfDuplexSingleComingCall" &&
          callName != "normalGroupComingCall"
        ) {
          this.code = "111";
          // this.$message.error('对方已挂断')
          clearInterval(this.timer);
          this.timer = null;
          // alert("处理呼叫状态")
        }

        if (
          callName != "fullDuplexSingleCall" &&
          callName != "fullDuplexSingleComingCall"
        ) {
          // $("#" + callName + "_floor").hide();
        }
        // $("#" + callName + "_record").hide();
      } else if (
        ntfyData.callStatus == 34 &&
        callObject.callStatus != 34 &&
        callObject.callStatus != 36
      ) {
        callObject.callStatus = ntfyData.callStatus;
        callObject.inActiveTime = ntfyData.inActiveTime;
        this.setCurrentCall(callObject.channelId);
        this.setPlaySound(callObject.channelId, 1);
        if (
          callName != "fullDuplexSingleComingCall" &&
          callName != "halfDuplexSingleComingCall" &&
          callName != "normalGroupComingCall"
        ) {
          // $("#" + callName + "_call").hide();
        }

        if (
          callName != "fullDuplexSingleCall" &&
          callName != "fullDuplexSingleComingCall"
        ) {
          // $("#" + callName + "_floor").show();
        }
        // $("#" + callName + "_record").show();
      } else if (ntfyData.callStatus == 36) {
        // $("#" + callName + "_status").text("call speaking ...");
      }
    },
    singleComingCallReq(callName) {
      console.log("coming---------");
    },
    logoutReq1() {
      // 退出登录
      console.log("退出登录");
      var logoutInfo = {
        msgCode: 10002,
        randomString: this.loginRspData.randomString,
      };
      var logoutStr = JSON.stringify(logoutInfo);
      this.webSocket.send(logoutStr);
    },
    loginRsp1(rspData) {
      if (rspData.result) {
        alert("调度失败!");
        return;
      }
      this.loginRspData = rspData;
      this.dispatchGroup("30000000329", 1);
    },
    dispatchGroup(groupNumber, operType) {
      var dispatchGroupReq = {
        msgCode: 11302,
        randomString: this.loginRspData.randomString,
        data: { operType: operType, groupNumber: groupNumber },
      };
      var dispatchGroupStr = JSON.stringify(dispatchGroupReq);
      this.webSocket.send(dispatchGroupStr);
    },
    // 呼叫失败提示
    alertCallFail(cause) {
      switch (cause) {
        case 7: {
          alert("Undefined reason!");
          break;
        }
        case 9: {
          alert("Call timeout, user do not answer!");
          break;
        }
        case 30: {
          this.$message.error("被呼用户不存在");
          break;
        }
        case 39: {
          this.$message.error("对方正在忙...");
          break;
        }
        case 41: {
          this.$message.error("对方已挂断");
          break;
        }
      }
    },
    setCurrentCall(channelId) {
      // 设置当前呼叫请求
      var setCurrentCallReq = {
        msgCode: 11303,
        randomString: this.loginRspData.randomString,
        data: { channelId: channelId },
      };
      var setCurrentCallStr = JSON.stringify(setCurrentCallReq);
      this.webSocket.send(setCurrentCallStr);
    },
    // 设置播放声音请求 {"msgCode": 11304, "randomString": "xxxxxxxx", "data": {"channelId": 0, "operType": 1}}
    setPlaySound(channelId, operType) {
      var setPlaySoundReq = {
        msgCode: 11304,
        randomString: this.loginRspData.randomString,
        data: { channelId: channelId, operType: operType },
      };
      var setPlaySoundStr = JSON.stringify(setPlaySoundReq);
      this.webSocket.send(setPlaySoundStr);
    },
  },
};
</script>

<style lang="scss">
.single-modal {
  color: #000;
  width: 100%;
  height: 100%;
  pointer-events: all;
  // width: 740px;
  // height: 420px;
  // background: #010e1d;
  // border: 1px solid #21a3ff;
  box-shadow: 0px 0px 30px 0px rgba(33, 163, 255, 0.3);
  position: relative;
  .line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  .close {
    width: 24px;
    height: 24px;
    position: absolute;
    top: -50px;
    right: 0px;
    z-index: 2;
    // background: url("../../../assets/img/xiaokunshan/soldier/close.png")
    //   no-repeat;
  }
  .video-box {
    width: 100%;
    height: 100%;
    position:relative;
    // > div:first-child {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  .CallDiv {
    display: flex;
    justify-content: space-between;
    width: 250px;
    position: absolute;
    bottom: 40px;
    left: 0;
    right: 0;
    margin: auto;
    .call {
      width: 110px;
      height: 36px;
      // background: #45a2ff
      //   url("../../../assets/img/xiaokunshan/soldier/call_soldier.png")
      //   no-repeat;
      background-position: 10% 50%;
      line-height: 36px;
      text-indent: 30px;
      font-size: 16px;
    }
    .call1 {
      height: 36px;
      // background: #00b578
      //   url("../../../assets/img/xiaokunshan/soldier/call_soldier.png")
      //   no-repeat;
      background-position: 8px 50%;
      line-height: 36px;
      text-indent: 30px;
      font-size: 16px;
      padding: 0px 10px 0 0;
    }
    .call2 {
      width: 80px;
      height: 36px;
      // background: #fa5151
      //   url("../../../assets/img/xiaokunshan/camera/call_soldier1.png")
      //   no-repeat;
      background-position: 10% 50%;
      line-height: 36px;
      text-indent: 30px;
      font-size: 16px;
    }
  }
}
</style>
