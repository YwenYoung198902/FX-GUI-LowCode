<!--
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2022-11-18 16:55:39
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-14 13:56:16
-->
<template>
  <div class="camera-play-box">
    <template v-if="isShowUnLine">
      <div class="no-video-box">
        <div v-if="code == 21101" class="icon-box" />
      </div>
    </template>
    <template v-else>
      <live-player
        id="live-player-container"
        :video-url="videoUrl"
        fluent
        autoplay
        live
        style="width: 100%"
      />
      <!-- <video :src="videoUrl"
              style="display: inline-block;width:100%;height: 100%;"
              controls
              autoplay/> -->
    </template>
  </div>
</template>

<script>
export default {
  name: "CameraPlay",
  props: ["deviceId", "type", "videourl", "code"],
  data() {
    return {
      videoUrl: "",
      isShowUnLine: true,
    };
  },
  watch: {
    videourl() {
      this.videoUrl = this.videourl;
      if (this.videourl) {
        this.isShowUnLine = false;
      } else {
        this.isShowUnLine = true;
      }
    },
    code() {
      console.log(this.code);
    },
  },
  mounted() {
    if (this.type === "dianxin") {
      this.getSoldierVideoInfo(); // 视频流
    } else {
      this.videoUrl = this.videourl;
    }
  },
  methods: {
    // 获取单兵设备视频流
    async getSoldierVideoInfo() {
      const res = await this.$ssapi.getSoldierVideoInfo({
        device_id: this.deviceId,
      });
      if (res.code == 200) {
        // console.log(';;;;;;;;;;;;;;;;;', res);
        // let videoUrl = this.$videoUrl
        //   ? this.$videoUrl
        //   : this.camera_data.movieurls || this.camera_data.master_movieurls;
        const url = this.$isIE() ? res.data.HLS : res.data.INTER_FLV;
        const x = new URL(url);
        this.videoUrl = this.$videoUrl
          ? `${this.$videoUrl}/proxy/${x
              .toString()
              .substring(x.toString().indexOf("sms"))}`
          : url;

        // this.videoUrl = result.data.FLV;
        // this.isShowUnLine = false;
      } else {
        this.videoUrl = "";
        // this.isShowUnLine = true;
      }
      // console.log(";;;;;;;;;;;;;;;;;", result)
    },
  },
};
</script>

<style lang="scss">
.camera-play-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .no-video-box {
    width: 100%;
    height: 100%;
    background: #02172f;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-box {
      width: 80px;
      height: 116px;
      // background: url("../../../assets/img/xiaokunshan/common/icon.png");
    }
  }
  video {
    position: absolute;
    top: 0px;
  }
}
</style>
