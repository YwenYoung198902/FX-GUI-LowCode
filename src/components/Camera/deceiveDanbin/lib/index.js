import VideoSdk from "./video-sdk";
import MqttClient from "./mqtt";
import PullVideo from "./videoPull";
import VideoCall from "./videoCall";

export const initLibrary = VideoSdk.initLibrary;
export const videoPermission = VideoSdk.checkVideoPermission;
export const getMediaDevices = VideoSdk.checkMediaDevices;
console.log("initLibrary",initLibrary);
  // initLibrary(() => {
  //   console.log("init video library succeed.");
  // });

export default class AppVideo {
  // mqttClicent = null;
  // mqttServer = null;
  // videoServer = null;
  // mqttSuccess = null;

  constructor({ mqttServer=null, dispatchId, videoServer=null, mqttSuccess=null }) {
    console.log(mqttServer, dispatchId);
    this.mqttServer = mqttServer;
    this.dispatchId = dispatchId;
    this.videoServer = videoServer;
    this.mqttSuccess = mqttSuccess;
    this.initMqtt();
  }
  initMqtt() {
    this.mqttClicent = new MqttClient({
      mqttServer: this.mqttServer,
      dispatchId: this.dispatchId,
      success: this.mqttSuccess,
    });
  }

  pullVideo({
    remoteId,
    remoteVideoWnd,
    videoRatio,
    audio,
    success,
    error,
    events,
    close,
  }) {
    var pullVideoObj = new PullVideo({
      videoServer: this.videoServer,
      dispatchId: this.dispatchId,
      mqttClicent: this.mqttClicent,
      remoteId,
      remoteVideoWnd,
      videoRatio,
      audio,
      success,
      error,
      events,
      close,
    });
    return pullVideoObj;
  }

  videoCall({
    remoteId,
    remoteVideoWnd,
    localVideoWnd,
    videoRatio,
    audio,
    localVideo,
    videoName,
    success,
    error,
    events,
    close,
  }) {
    var videoCallObj = new VideoCall({
      videoServer: this.videoServer,
      dispatchId: this.dispatchId,
      mqttClicent: this.mqttClicent,
      remoteId,
      localVideoWnd,
      remoteVideoWnd,
      videoRatio,
      audio,
      localVideo,
      videoName,
      success,
      error,
      events,
      close,
    });
    return videoCallObj;
  }

  /**
   * 唤起视频和语音权限
   * @returns promise 1 视频权限已经获取 0 视频权限禁止 -1域名没有安装证书
   */
  callVideoPermission(videoinput) {
    return new Promise((resolve, reject) => {
      videoPermission(videoinput).then((res) => {
        resolve(res);
      });
    });
  }
  /**
   * 获取设备列表  hasAudioinput 是否有语音输入设备 | hasVideoinput 是否有视频输入设备
   * @returns null | {hasAudioinput:boolean,hasVideoinput:boolean}
   */
  checkMediaDevices() {
    return new Promise((resolve, reject) => {
      getMediaDevices().then((res) => {
        resolve(res);
      });
    });
  }
}
