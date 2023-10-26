/**
     * mqtt连接工具类
     */
import './mqttws31';
import  {
    pocTalkAction,

} from './mobileDevices'
var port = 59250;//mqtt端口
var username = "sg_demo_test";//mqtt账号
var password = "44023ADE5ACA634A";//mqtt密码
var host = "sgs.pocyun.com";//地址
var curUserId="35381";
var userTopic = 'shuguo/unicast/user@'+curUserId;//主题
function mqttConnect() {
    var client = new Paho.MQTT.Client(host, port, 'sg_demo' + Math.random());
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.onMessageDelivered = onMessageDelivered;
    client.connect({
        timeout: 60,
        useSSL: true,
        keepAliveInterval:10,
        userName: username,
        password:password,
        onSuccess: onConnect
    });
    function onConnect() {
        console.log("MQTT连接成功");
        client.subscribe(userTopic);
        client.send("emitter/PocPresence/", JSON.stringify({
            'UserID': curUserId.toString(),
            'DevID': getuuid(),
            'State': 1
        }), 0);
    }

    function onConnectionLost(responseObject) {//断开连接
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }
    function onMessageDelivered(requestObject) {
        console.log(requestObject);
    }

    function onMessageArrived(message) {//订阅后的回调函数
        var msg = message.payloadString;
        var parseMsg = JSON.parse(msg);
        if(parseMsg.subtype==="adhocTrigger"){//临时呼叫消息
            console.log(parseMsg)
            var flag=window.confirm("临时呼叫消息");
            if(flag){//接听
                adhocSessionIdText.innerHTML=parseMsg.data.GroupID;
                pocTalkAction.adhocCall(parseMsg.data.GroupID,parseMsg.data.CallerUserID,true,0);
            }else{//拒接
                pocTalkAction.adhocCall(parseMsg.data.GroupID,null,true,1,pwd,wss,caller);
            }

        }
    }
}
function getuuid() {
    var uid = [];
    var hexDigits = "0123456789abcdefghijklmnopqrst";
    for (var i = 0; i < 32; i++) {
        uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    uid[6] = "4";
    uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
    var uuid = uid.join("");
    return uuid;
}
export default mqttConnect();