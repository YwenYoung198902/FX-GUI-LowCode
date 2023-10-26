import Mqtt from "mqtt";
export default class MqttClient {
  // client = null;
  // mqttServer = null;
  // dispatchId = null;
  // success = null;
  // close = null;
  // error = null;
  // events = [];
  constructor({ dispatchId= null, mqttServer= null, success= null, close= null, error= null }) {
    this.mqttServer = mqttServer;
    this.dispatchId = dispatchId;
    this.success = success;
    this.close = close;
    this.error = error;
    this.events = [];
    this.init();
  }
  init() {
    this.client = Mqtt.connect(this.mqttServer, {
      username: "dispatcher",
      password: "niteWUO1rfSgdz1R",
      reconnectPeriod: 10000, // 重连间隔
    });

    this.client.on("connect", (connack) => {
      // console.log(connack);
      this.client.subscribe("target/media/signal/" + this.dispatchId, (err) => {
        console.log(err);
        if (!err) {
          console.log("成功订阅");
          this.success && this.success();
        }
      });
    });
    this.client.on("close", () => {
      this.close && this.close();
    });
    this.client.on("error", (error) => {
      // console.log(error);
      this.error && this.error();
    });

    this.client.on("message", (topic, message) => {
      var response = JSON.parse(message.toString());
      if (response.to == this.dispatchId) {
        // console.log(response);
        if (topic.indexOf("target/media/signal") > -1) {
          this.events.map((item, index) => {
            if (item._this.mqttClicent) {
              if (item.userId == response.from) {
                item.callback(response);
              }
            } else {
              // 删除已经挂断的事件
              this.events(index, 1);
            }
          });
        }
      }
    });
  }
  /**
   *
   * @param {*} eventname
   * terminal-ack 终端接受视频请求 |
   * terminal-cancel 终端拒绝视频请求 |
   * terminal-bye  终端挂断视频 |
   * client-close mqtt信令掉线
   * @param {*} callback
   */
  on({ userId, callback, _this }) {
    if (
      Object.prototype.toString.call(callback) == "[object Function]" &&
      userId
    ) {
      this.events.push({
        callback,
        userId,
        _this,
      });
      // 返回当前回调的id
    } else {
      throw new Error("参数不正确，第一个参数为事件名称，第二参数为回调函数");
    }
  }
  off(userId) {
    if (userId > -1) {
      const newEvents = [];
      this.events.map((item) => {
        if (item.userId != userId) {
          newEvents.push(item);
        }
      });
      this.events = newEvents;
    }
    console.log(this.events, "off");
  }
  /**
   * 发送信令
   */
  clientSentCmd({ cmd, remoteId }) {
    this.client.publish("target/media/signal/" + remoteId, JSON.stringify(cmd));
  }
  clientEnd() {
    this.client.end();
  }
}
