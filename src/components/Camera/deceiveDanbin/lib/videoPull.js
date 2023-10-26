import VideoSdk from './video-sdk';
export const setServerInfo = VideoSdk.setServerInfo;
export const PublishVideo = VideoSdk.PublishVideo;
export const SubscibeVideo = VideoSdk.SubscibeVideo;

export default class PullVideo {
	// pullVideoObj = null;
	// dispatchId = null;
	// successCallback = null;
	// errorCallback = null;
	// beatTimer = 0;
	// status = null;

	// remoteId = null;
	// remoteVideoWnd = null;
	// videoServer = null;
	// mqttClicent = null;
	// audio = false;
	// videoRatio = '';
	// events = null;
	constructor({
	  videoServer= null,
	  dispatchId= null,
	  remoteVideoWnd= null,
	  mqttClicent= null,
	  remoteId= null,
	  videoRatio= '',
	  audio= false,
	  success,
	  error,
	  events= null,
	  close
	}) {
	  this.events = events;
	  this.dispatchId = dispatchId;
	  this.remoteVideoWnd = remoteVideoWnd;
	  this.videoServer = videoServer;
	  this.mqttClicent = mqttClicent;
	  this.remoteId = remoteId;
	  this.videoRatio = videoRatio || '640*480';
	  this.audio = audio || false;
	  this.successCallback = success;
	  this.errorCallback = error;
	  this.closeCallaback = close;
	  this.pullVideo();
	}
	initData() {
	  clearInterval(this.beatTimer);
	  this.pullVideoObj = null;
	  this.dispatchId = null;
	  this.remoteId = null;
	  this.remoteVideoWnd = null;
	  this.videoServer = null;
	  this.mqttClicent = null;
	  this.successCallback = null;
	  this.errorCallback = null;
	  this.closeCallaback = null;
	  this.beatTimer = 0;
	  this.audio = false;
	  this.videoRatio = '';
	  this.status = null;
	}
	// 拉取视频流
	pullVideoAction(data) {
	  const serverPath = data.server;
	  let proxy = '';

	  const videoList = window.CONFIG.DB_MEDIA_LIST;
	  switch (serverPath) {
	    case 'wss://shdb-media.intcity.com.cn:8088':
	      proxy = videoList[0];
	      break;
	    case 'wss://shdb-media1.intcity.com.cn:8088':
	      proxy = videoList[1];
	      break;
	    case 'wss://shdb-media2.intcity.com.cn:8088':
	      proxy = videoList[2];
	      break;
	    case 'wss://shdb-media3.intcity.com.cn:8088':
	      proxy = videoList[3];
	      break;
	    case 'wss://shdb-media4.intcity.com.cn:8088':
	      proxy = videoList[4];
	      break;
	    case 'wss://shdb-media5.intcity.com.cn:8088':
	      proxy = videoList[5];
	      break;
	    case 'wss://shdb-media6.intcity.com.cn:8088':
	      proxy = videoList[6];
	      break;
	  }
	  data.server = proxy || this.videoServer;
	  data.serverPub = proxy || this.videoServer;
	  setServerInfo(data.server);
	  this.pullVideoObj = new SubscibeVideo();
	  this.pullVideoObj.init({
	    success: () => {
	      if (this.pullVideoObj) {
	        this.pullVideoObj.openRemoteVideo({
	          videoWnd: this.remoteVideoWnd,
	          roomId: data.roomId,
	          userId: data.userId,
	          videoId: data.mediaId,
	          isAudio: this.audio,
	          isVideo: true,
	          success: () => {
	            this.status = {
	              videoWnd: this.remoteVideoWnd,
	              roomId: data.roomId,
	              userId: data.userId,
	              videoId: data.mediaId,
	              isAudio: this.audio,
	              videoRatio: this.videoRatio
	            };
	            this.successCallback &&
								this.successCallback(this.status);
	            this.sendHeartBeat();
	            console.log('remote video open success!');
	          },
	          close: () => {
	            this.closeVideo();
	            this.pullVideoObj = null;
	          },
	          error: (err) => {
	            this.closeVideo(err);
	            this.errorCallback && this.errorCallback();
	          }
	        });
	      }
	    },
	    close: () => {
	      this.closeVideo();
	      this.pullVideoObj = null;
	    },
	    error: (err) => {
	      this.closeVideo(err);
	      console.log('init pull video fail:' + err);
	      this.errorCallback && this.errorCallback();
	    }
	  });
	}
	// 发送拉取视频的信令  默认标清
	sendPullVideoCmd() {
	  const cmd = {
	    cmd: 'call',
	    to: this.remoteId, // 目标者Id
	    from: this.dispatchId, // 来源者Id
	    name: '调度账号',
	    sessionId: '', // 会话Id由会话发起者创建
	    timestamp: new Date().getTime(), // 时间戳(单位: 秒)
	    data: {
	      calltype: 'dispatch',
	      server: '', // 媒体服务器地址(带端口)
	      roomId: '', // 媒体房间Id
	      userId: '', // 媒体服务器中的用户Id,
	      mediaId: '', // 呼叫方的媒体Id, 同时存在userId与mediaId则为双向通话, 被叫方需要到服务器中拉取呼叫方的多媒体数据
	      audio: this.audio, // 是否带音频
	      video: true, // 是否带视频（注：音频视频不能同时为false）
	      videoRatio: this.videoRatio // 被拉取方的要求上传的视频分辨率 高清 1280*720 / 标清 640*480 / 流畅 320*240
	    }
	  };
	  console.log('toid', cmd);
	  this.mqttClicent.clientSentCmd({ cmd, remoteId: this.remoteId });
	}

	// 发送拉取视频 默认标清
	pullVideo() {
	  this.mqttClicent.on({
	    userId: this.remoteId,
	    _this: this,
	    callback: (res) => {
	      this.events && this.events(res);
	      console.log(res);
	      if (res.result == 'ack' && res.data.server) {
	        this.pullVideoAction(res.data);
	      }
	      if (res.result == 'bye') {
	        // 处理终端主动挂断视频
	      }
	    }
	  });
	  this.sendPullVideoCmd();
	}
	/**
	 * 获取当前拉取视频的信息 null 未拉取 拉取成功则有对象返回
	 */
	getStatus() {
	  return this.status;
	}

	// 关闭视频
	closeVideo(err) {
	  this.closeCallaback(err);
	  if (this.pullVideoObj) {
	    this.hangupVideo();
	    try {
	      // 关闭终端的视频
	      this.pullVideoObj.closeRemoteVideo();
	      this.pullVideoObj = null;
	    } catch (error) {}
	    clearInterval(this.beatTimer);
	  }
	}
	// 挂断视频，并发送通知给远端
	hangupVideo() {
	  if (this.mqttClicent) {
	    const cmd = {
	      cmd: 'bye',
	      to: this.remoteId,
	      from: this.dispatchId, // 来源者Id
	      sessionId: '',
	      timestamp: new Date().getTime(), // 时间戳(单位: 秒)
	      data: {
	        calltype: 'dispatch'
	      }
	    };
	    this.mqttClicent.clientSentCmd({ cmd, remoteId: this.remoteId });
	    this.mqttClicent.off(this.remoteId);
	    this.mqttClicent = null;
	  }
	}

	sendHeartBeat() {
	  clearInterval(this.beatTimer);
	  this.beatTimer = setInterval(() => {
	    this.heartBeat();
	  }, 5000);
	}
	/**
	 * 心跳
	 */
	heartBeat() {
	  const cmd = {
	    cmd: 'heatbeat',
	    to: this.remoteId, // 目标者Id
	    from: this.dispatchId, // 来源者Id
	    name: ''
	  };
	  this.mqttClicent.clientSentCmd({ cmd, remoteId: this.remoteId });
	}
}
