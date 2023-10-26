import {PCMPlayer} from './pcm-player'
var pocAudioPlay;
var pocRecord=null;
// const hostUrl="wss://sgs.pocyun.com:59300";
// const hostUrl="wss://www.sjxks.com/webSocketYddb";

// var currentUserToken="MC00NzM5OC02NTAyOWE4NDkwOGJm";
// const currentUid = '47398'
const hostUrl = localStorage.getItem('setdanbingAddress')? JSON.parse(localStorage.getItem('setdanbingAddress')).wss : "wss://www.sjxks.com/webSocketYddb"
const currentUid=localStorage.getItem('setdanbingAddress') ? JSON.parse(localStorage.getItem('setdanbingAddress')).caller : "47398"
const  currentUserToken= localStorage.getItem('setdanbingAddress') ? JSON.parse(localStorage.getItem('setdanbingAddress')).pwd : "MC00NzM5OC02NTAyOWE4NDkwOGJm"

function pocRecordInit(rec){
  pocRecord=rec;
}
let connectWebsocketAction=(function(){
  var connects= [];
  var talkHeartPacketSessionId;

  function initWebsocket(params){
    if(pocAudioPlay===undefined){
      pocAudioPlay=new PCMPlayer({
        encoding: '16bitInt',
        channels: 1,
        sampleRate: 8000,
        flushingTime: 0
      });
    }
    var key=connects.length;
    var host=hostUrl;
    connects[key]=new WebSocket(host);
    connects[key].binaryType = 'arraybuffer'; //传输的是 ArrayBuffer 类型的数据;
    connects[key].onopen=onOpen;
    connects[key].onmessage=onMessage;
    connects[key].onclose=onClose;
    connects[key].onerror=onError;
    connects[key].roomId=params.roomId;
    connects[key].talkType=params.talkType;
    if(params.callee!=undefined && params.callee!=null){
      connects[key].callee=params.callee;
    }
    if(params.talkType=='adhoc'){
      connects[key].isComing=params.isComing;
      if(params.isComing){
        connects[key].joinState=params.joinState;
      }
    }
    return params.roomId;
  }
  function onOpen(event){
    console.log(connects)
    if(event.target.talkType==='adhoc'){
      if(event.target.isComing){
        switch (event.target.joinState) {
          case 0://接入
            pocTalkAction.doAcceptAdhocCall(event.target.roomId);
            break;
          case 1://拒接
            pocTalkAction.doRejectAdhocCall(event.target.roomId);
            break;
          case 2://超时
            break;
          default:
            break;
        }

      }else{
        pocTalkAction.doAdhocCall(event.target.roomId);
      }
    }else{
      pocTalkAction.doJoinGroup(event.target.roomId);
    }
    console.log('连接成功')
  }
  function onMessage(msg){
    pocMessageDeal.receiveMessage(msg.data,msg.target.roomId);
  }
  function onClose(event){
    pocMessageDeal.pocConnectCloseDeal(event.target.roomId);
    console.log("连接关闭")
  }
  function onError(){
    console.log("错误信息")
  }
  function sendMessage(connect,data){
    connect.send(data);
  }
  function closeConnect(connect) {
    if(!connect)return;
    doDeleteConnect(connect.roomId);
    connect.close();
  }
  function getConnectByConnectId(roomId) {
    // console.log('getConnectByConnectId',;);
    var connect=connects.filter(function(t){
      return t.roomId==roomId;
    })
    if(connect.length===0)return false;
    return connect[0];
  }
  function doDeleteConnect(roomId) {
    if(connects.length===0)return;
    var connect=connects.filter(function(t){
      return t.roomId!=roomId;
    })
    connects=connect;
  }
  function doSendTalkHeartPacket(){
    console.log('doSendTalkHeartPacket',talkHeartPacketSessionId)
    if(talkHeartPacketSessionId!=undefined && talkHeartPacketSessionId!=null)return false;
    talkHeartPacketSessionId=setInterval(function(){
      if(connects.length==0){
        talkHeartPacketSessionId=null;
        clearInterval(talkHeartPacketSessionId);
        return false;
      }
      var msg={type:"heartPacket"};
      console.log(connects)
      for (var i=0;i<connects.length;i++){
        if(connects[i].readyState==1){
          sendMessage(connects[i],JSON.stringify(msg));
        }
      }
    },30000)
  }
  function doDeleteAdhocConnect(roomId){
    var connect=connects.filter(function(t){
      return t.roomId!=roomId && t.talkType=='adhoc';
    })
    if(connect.length===0)return;
    for (var i=0;i<connect.length;i++){
      closeConnect(connect[i]);
    }
  }
  function doDeleteAllConnect(){
    if(connects.length===0)return;
    for (var i=0;i<connects.length;i++){
      pocTalkAction.doExitAdhoc(connects[i].roomId);
    }
    connects=[];
  }

  function doGetAllConnect(){
    return connects;
  }

  return {
    sendMessage:sendMessage,
    initWebsocket:initWebsocket,
    closeConnect:closeConnect,
    getConnectByConnectId:getConnectByConnectId,
    doDeleteAdhocConnect:doDeleteAdhocConnect,
    doSendTalkHeartPacket:doSendTalkHeartPacket,
    doDeleteAllConnect:doDeleteAllConnect,
    doGetAllConnect:doGetAllConnect
  }
})();
var audioRecorderAction=function (stream,wsConnect) {
  this.sampleBits = 16; //输出采样数位16
  this.sampleRate = 8000; //输出采样率
  this.context = new AudioContext();
  this.resPcmData=[];
  this.audioInput = this.context.createMediaStreamSource(stream);
  var recorder = this.context.createScriptProcessor(2048, 1, 1);
  this.wsConnect=wsConnect;
  var audioData = {
    size: 0, //录音文件长度
    buffer: [], //录音缓存
    inputSampleRate: 48000, //输入采样率
    inputSampleBits: 16, //输入采样数位 8, 16
    outputSampleRate: this.sampleRate, //输出采样数位
    oututSampleBits: this.sampleBits, //输出采样率
    clear: function () {
      this.buffer = [];
      this.size = 0;
    },
    input: function (data) {
      this.buffer.push(new Float32Array(data));
      this.size += data.length;
    },
    compress: function () { //合并压缩
      //合并
      var data = new Float32Array(this.size);
      var offset = 0;
      for (var i = 0; i < this.buffer.length; i++) {
        data.set(this.buffer[i], offset);
        offset += this.buffer[i].length;
      }
      //压缩
      var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
      var length = data.length / compression;
      var result = new Float32Array(length);
      var index = 0,
        j = 0;
      while (index < length) {
        result[index] = data[j];
        j += compression;
        index++;
      }
      return result;
    },
    encodePCM: function () {//将音频数据转为16位的pcm数据
      var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
      var bytes = this.compress();
      var dataLength = bytes.length * (sampleBits / 8);
      var buffer = new ArrayBuffer(dataLength);
      var data = new DataView(buffer);
      var offset = 0;
      for (var i = 0; i < bytes.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, bytes[i]));
        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
      return data;
    }
  }
  this.sendPcmData=function(){
    var sendData=audioData.encodePCM();
    var data=new Int16Array(sendData.buffer);
    var audioDataArr=Array.from(data);
    audioDataArr=audioDataArr.filter(function(t){
      return t!=0;
    })
    var pcmData=this.doGetPcmData(audioDataArr)
    if(pcmData){
      connectWebsocketAction.sendMessage(this.wsConnect,pcmData);
    }
    audioData.clear();
  }
  this.start = function() {
    window.dataSort=0;
    window.timeLength=0;
    this.audioInput.connect(recorder);
    recorder.connect(this.context.destination);
  }

  this.stop = function() {
    console.log(recorder)
    recorder.disconnect();
  }
  this.clear = function() {
    audioData.clear();
  }
  this.doGetPcmData=function(pcmData){
    Array.prototype.push.apply(this.resPcmData,pcmData);
    if(this.resPcmData.length>=480){
      var result=this.resPcmData.slice(0,480);
      this.resPcmData=this.resPcmData.slice(480)
      return new Int16Array(result);
    }
    return false;
  }

  recorder.onaudioprocess = function(e) {
    var inputBuffer = e.inputBuffer.getChannelData(0);
    audioData.input(inputBuffer);
    console.log(1111)
    if(wsConnect.readyState!=1 && userRecordSpeakIngFlag){
      recorder.disconnect();
      return;
    }
    if(!userRecordSpeakIngFlag){
      recorder.disconnect();
      return;
    }
    pocRecord.sendPcmData()
  }
}
var pocRecordAction={
  startRecord:function(wsConnect){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    if (!navigator.getUserMedia) {
      alert('浏览器不支持音频输入');
    } else {
      navigator.getUserMedia({
          audio: true
        },
        function(mediaStream) {
          pocRecordInit(new audioRecorderAction(mediaStream,wsConnect));
          if(pocRecord){
            pocRecord.start();
          }
        },
        function(error) {
          switch (error.message || error.name) {
            case 'PERMISSION_DENIED':
            case 'PermissionDeniedError':
              console.info('用户拒绝提供信息。');
              break;
            case 'NOT_SUPPORTED_ERROR':
            case 'NotSupportedError':
              console.info('浏览器不支持硬件设备。');
              break;
            case 'MANDATORY_UNSATISFIED_ERROR':
            case 'MandatoryUnsatisfiedError':
              console.info('无法发现指定的硬件设备。');
              break;
            default:
              console.info('无法打开麦克风。异常信息:' + (error.code || error.name));
              break;
          }
        }
      )
    }
  },
  closeRecord:function(){
    if(pocRecord){
      pocRecord.stop();
    }
  },
  doRecordSpeakState:function(speakIngFlag){
    window.userRecordSpeakIngFlag=speakIngFlag;
  }
}
let pocTalkAction={
  doJoinGroup:function(roomId){//接入群组
    var msg={type:"callGroup",gid:roomId,uid:currentUid,pwd:currentUserToken};
    console.log(msg)
    msg=JSON.stringify(msg);
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    connectWebsocketAction.sendMessage(connect,msg);
  },
  joinGroup:function(roomId){
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect)return false;
    var params={roomId:roomId,talkType:'chat'};
    connectWebsocketAction.initWebsocket(params);
  },
  adhocCall:function(roomId,callee,isComing,joinState){
    console.log(roomId,'===============roomId')
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect){
      var msg={type:"exitAdhoc"}
      connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
      connectWebsocketAction.closeConnect(connect);
    }
    var params={roomId:roomId,talkType:'adhoc',callee:null,isComing:false}
    if(isComing){
      params.isComing=true;
    }
    if(callee!=undefined && callee!=null){
      params.callee=callee;
    }
    if(joinState!=undefined && joinState!=null){
      params.joinState=joinState;
    }
    connectWebsocketAction.initWebsocket(params);
  },
  doAdhocCall:function(roomId){//临时呼叫
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    var msg={type:"callAdhoc",callee:connect.callee,pwd:currentUserToken,caller:currentUid};
    console.log('//临时呼叫',msg)
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
    connectWebsocketAction.doDeleteAdhocConnect(roomId);
  },
  doAcceptAdhocCall:function(roomId){//接听临时呼叫
    var msg={type:"acceptAdhoc",pwd:currentUserToken,uid:currentUid,roomId:roomId};
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect.readyState!=1)return;
    console.log(msg);
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
  },
  doRejectAdhocCall:function(roomId){//拒接临时呼叫
    var msg={type:"denyAdhoc",pwd:currentUserToken,uid:currentUid,roomId:roomId};
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
    connectWebsocketAction.closeConnect(connect);
  },
  doExitAdhoc:function(roomId,isClose){
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(!connect)return;
    var msg={type:"exitAdhoc"};
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
    if(isClose){
      connectWebsocketAction.closeConnect(connect);
    }
  },
  doExitGroup:function(roomId){//退出群组
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect.readyState!=1)return;
    if(!connect)return;
    var msg={type:"exitGroup"};
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
    connectWebsocketAction.closeConnect(connect);
  },
  doRequestSpeak:function (roomId,grade) {//申请发言权
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    console.log('//申请发言权',roomId,grade,connect)
    if(connect.readyState!=1)return;
    var msg={type:"reqTalk",grade:1};
    if(grade!=undefined){
      msg.grade=grade;
    }
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
  },
  doRequestCloseSpeak:function (roomId) {//释放发言权
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect.readyState!=1)return;
    if(!connect)return;
    var msg={type:"exitTalk"}
    connectWebsocketAction.sendMessage(connect,JSON.stringify(msg));
  },
  doCloseTalkAction(roomId){
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect==undefined || connect==null){
      return false;
    }
    if(connect.readyState!=1)return;
    if(connect.talkType=='chat'){
      this.doExitGroup(roomId);
    }else{
      this.doExitAdhoc(roomId,true);
    }
  },
  doCloseAllTalkAction(){
    var connects=connectWebsocketAction.doGetAllConnect();
    if(connects.length===0)return;
    for (var i=0;i<connects.length;i++){
      if(connects[i].talkType=='chat'){
        this.doExitGroup(connects[i].roomId);
      }else{
        this.doExitAdhoc(connects[i].roomId,true);
      }
    }
  }
}
let pocMessageDeal={
  receiveMessage:function (msg,roomId) {//对讲消息 房间id
     msg=JSON.parse(msg);
     if(msg.length===1){
       var data=msg[0];
       if(data.type=='Buffer'){
         console.log(data)
         this.doPocAudioDeal(data.data);
       }else{
         data.sessionId=roomId;
         switch (data.type) {
           case 4000:
             this.pocMessageEventDeal(data);
             break;
           case 4001:
            console.log("4001==========");
             this.pocMessageDataDeal(data);
             break;
           default:
             break;
         }
       }
     }else{
       for(var i=0;i<msg.length;i++){
         var data=msg[i];
         data.sessionId=roomId;
         switch (data.type) {
           case 4000:
             this.pocMessageEventDeal(data);
             break;
           case 4001:
             this.pocMessageDataDeal(data);
             break;
           case "Buffer":
             this.doPocAudioDeal(data.data);
             break;
           default:
             break;
         }
       }
     }
  },
  pocMessageEventDeal:function(data){
    console.log('pocMessageEventDea===',data)
    switch (data.op) {
      case 0:
        break;
      case 1:
        break;
      default:
        break;
    }
  },
  pocMessageDataDeal:function(data){
    console.log('pocMessageDataDeal==',data)
    switch (data.op) {
      case 1100:
        connectWebsocketAction.doSendTalkHeartPacket();
       break;
      case 1://申请发言权
        if(data.result==1)return;
        var connect=connectWebsocketAction.getConnectByConnectId(data.sessionId);
        pocRecordAction.startRecord(connect);
        pocRecordAction.doRecordSpeakState(true);
        break;
      case 4://释放发言权
       // pocRecordAction.closeRecord();
        pocRecordAction.doRecordSpeakState(false);
        break;
      case 2:// xx正在讲话	takingName
        break;
      case 5: 	//会话空闲
        break;
      case 3:
        break;
      case 1200://临时呼叫
        connectWebsocketAction.doSendTalkHeartPacket();
        break;
      case 1201://临时呼叫被叫
        connectWebsocketAction.doSendTalkHeartPacket();
        break;
      default:
        break;
    }
  },
  pocConnectCloseDeal:function(roomId){
    var connect=connectWebsocketAction.getConnectByConnectId(roomId);
    if(connect===undefined)return;
    connectWebsocketAction.closeConnect(connect);
  },
  doPocAudioDeal:function (data) {//对讲语音流播放
    var buffer=new Int8Array(data).buffer
    pocAudioPlay.feed(new Int16Array(buffer));
  }
}
export {
    connectWebsocketAction,
    audioRecorderAction,
    pocTalkAction,
    pocMessageDeal

}
