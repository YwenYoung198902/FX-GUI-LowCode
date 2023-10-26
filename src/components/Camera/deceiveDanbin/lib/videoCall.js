import VideoSdk from './video-sdk';
export const setServerInfo = VideoSdk.setServerInfo;
export const PublishVideo = VideoSdk.PublishVideo;
export const SubscibeVideo = VideoSdk.SubscibeVideo;
export const VideoRoomManage = VideoSdk.VideoRoomManage;
const setSelfUserId = VideoSdk.setSelfUserId;

export default class VideoCall {
	// pullVideoObj = null;
	// publishVideoObj = null;
	// successCallback = null;
	// errorCallback = null;
	// beatTimer = 0;
	// status = null;
	// localStatus = null;

	// dispatchId = null;
	// remoteId = null;
	// localVideoWnd = null;
	// remoteVideoWnd = null;
	// videoServer = null;
	// mqttClicent = null;
	// videoRatio = '640*480';
	// audio = true;
	// localVideo = false;
	// videoName = null;
	// events = null;
	constructor({
	  dispatchId= null,
	  remoteId= null,
	  localVideoWnd= null,
	  remoteVideoWnd= null,
	  videoServer= null,
	  mqttClicent= null,
	  videoRatio='640*480',
	  audio=true,
	  localVideo=false,
	  videoName= null,
	  success,
	  error,
	  events= null,
	  close
	}) {
	  this.events = events;
	  this.dispatchId = dispatchId;
	  this.remoteId = remoteId;
	  this.localVideoWnd = localVideoWnd;
	  this.remoteVideoWnd = remoteVideoWnd;
	  this.videoServer = videoServer;
	  this.mqttClicent = mqttClicent;
	  this.videoRatio = videoRatio || '640*480';
	  this.audio = audio || true;
	  this.localVideo = localVideo || false;
	  this.videoName = videoName;
	  this.successCallback = success;
	  this.errorCallback = error;
	  this.closeCallback = close;
	  this.videoCall();
	}
	initData() {
	  clearInterval(this.beatTimer);
	  this.pullVideoObj = null;
	  this.publishVideoObj = null;
	  this.dispatchId = null;
	  this.remoteId = null;
	  this.localVideoWnd = null;
	  this.remoteVideoWnd = null;
	  this.videoServer = null;
	  this.mqttClicent = null;
	  this.videoRatio = '640*480';
	  this.audio = true;
	  this.localVideo = false;
	  this.videoName = null;
	  this.successCallback = null;
	  this.errorCallback = null;
	  this.closeCallback = null;
	  this.beatTimer = 0;
	  this.status = null;
	  this.localStatus = null;
	}
	// 视频通话
	async videoCall() {
	  const localVideoData = await this.publishLocalVideo();
	  // 监听终端接受视频的消息
	  this.mqttClicent.on({
	    userId: this.remoteId,
	    _this: this,
	    callback: (res) => {
	      console.log(res);
	      this.events && this.events(res);
	      if (res.result == 'ack' && res.data.server) {
	        this.pullVideoAction(res.data);
	      }
	    }
	  });
	  const { userId, mediaId, roomId } = localVideoData;
	  this.sendVideoCallCmd({
	    userId,
	    mediaId,
	    roomId
	  });
	}
	// 上传本地视频
	publishLocalVideo() {
	  return new Promise((resolve, reject) => {
	    console.log(this.videoServer);
	    setSelfUserId(Number(this.dispatchId));
	    setServerInfo(this.videoServer);
	    this.publishVideoObj = new PublishVideo();
	    this.publishVideoObj.init({
	      success: () => {
	        this.createRoom((roomId) => {
	          console.log(roomId, 'roomId');
	          this.publishVideoObj.publishLocalVideo({
	            videoName: this.videoName, // 字符串，根据需要填写
	            videoWnd: this.localVideoWnd,
	            roomId,
	            isAudio: this.audio,
	            isVideo: this.localVideo,
	            success: (userId, mediaId) => {
	              this.localStatus = {
	                videoName: this.videoName,
	                videoWnd: this.localVideoWnd,
	                roomId,
	                isAudio: this.audio,
	                ratio: this.videoRatio
	              };
	              resolve({
	                userId,
	                mediaId,
	                roomId
	              });
	            },
	            videoClose: () => {
	              this.closeVideo();
	              this.publishVideoObj = null;
	              this.initData();
	            },
	            error: (err) => {
	              this.closeVideo();
	              console.log('open local video fail: ' + err);
	              this.errorCallback && this.errorCallback();
	              this.initData();
	            },
	            onNoSubscriber: () => {}
	          });
	        });
	      },
	      error: (err) => {
	        this.closeVideo();
	        console.error('init publish video fail:' + err);
	        this.errorCallback && this.errorCallback();
	        this.initData();
	      }
	    });
	  });
	}
	// 拉取视频流
	pullVideoAction(data) {
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
	              remote: {
	                videoWnd: this.remoteVideoWnd,
	                roomId: data.roomId,
	                userId: data.userId,
	                videoId: data.mediaId,
	                isAudio: this.audio
	              },
	              local: this.localStatus
	            };
	            // 整个视频通话的流程完成
	            this.sendHeartBeat();
	            this.successCallback &&
								this.successCallback(this.status);
	            console.log('remote video open success!');
	          },
	          close: () => {
	            this.closeCallback();
	            this.closeVideo();
	            this.pullVideoObj = null;
	            this.initData();
	          },
	          error: (err) => {
	            this.closeCallback(err);
	            this.closeVideo();
	            this.errorCallback && this.errorCallback();
	            this.initData();
	          }
	        });
	      }
	    },
	    close: () => {
	      this.closeCallback();
	      this.closeVideo();
	      this.pullVideoObj = null;
	      this.initData();
	    },
	    error: (err) => {
	      this.closeCallback(err);
	      this.closeVideo();
	      console.log('init pull video fail:' + err);
	      this.errorCallback && this.errorCallback();
	      this.initData();
	    }
	  });
	}
	// 发送视频通话信令
	sendVideoCallCmd({ userId, mediaId, roomId }) {
	  // 2发送mqtt，通知终端进行视频通话
	  const cmd = {
	    cmd: 'call',
	    to: this.remoteId, // 目标者Id
	    from: this.dispatchId, // 来源者Id
	    name: '测试账号',
	    sessionId: '', // 会话Id由会话发起者创建
	    timestamp: new Date().getTime(), // 时间戳(单位: 秒)
	    data: {
	      calltype: 'dispatch',
	      server: this.videoServer, // 媒体服务器地址(带端口)
	      roomId, // 媒体房间Id
	      userId, // 媒体服务器中的用户Id,
	      mediaId, // 呼叫方的媒体Id, 同时存在userId与mediaId则为双向通话, 被叫方需要到服务器中拉取呼叫方的多媒体数据
	      audio: this.audio,
	      video: true,
	      videoRatio: this.videoRatio // 拉取终端视频的码率 可填640*480   1280*720
	    }
	  };
	  setTimeout(() => {
	    this.mqttClicent.clientSentCmd({ cmd, remoteId: this.remoteId });
	  }, 3000);
	}
	// 创建房间号
	createRoom(fn) {
	  const createRoomObj = new VideoRoomManage();
	  createRoomObj.init({
	    success: () => {
	      createRoomObj.createRoom('videoroom', 2, {
	        success: (roomId) => {
	          fn(roomId);
	        },
	        error: (res) => {
	          console.error(res);
	          this.errorCallback && this.errorCallback();
	        }
	      });
	    }
	  });
	}
	// 关闭视频
	closeVideo() {
	  this.hangupVideo();
	  try {
	    if (this.publishVideoObj) {
	      // 关闭本地的视频
	      this.publishVideoObj.closeLocalVideo();
	      this.publishVideoObj = null;
	    }
	    if (this.pullVideoObj) {
	      // 关闭终端的视频
	      this.pullVideoObj.closeRemoteVideo();
	      this.pullVideoObj = null;
	    }
	  } catch (error) {}
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
	    clearInterval(this.beatTimer);
	    this.mqttClicent.clientSentCmd({ cmd, remoteId: this.remoteId });
	    this.mqttClicent.off(this.remoteId);
	    this.mqttClicent = null;
	  }
	}
	/**
	 * 发送心跳
	 */
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
