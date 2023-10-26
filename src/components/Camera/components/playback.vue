<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-10-09 10:53:35
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-20 10:52:07
-->
<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-10-14 16:34:29
 * @LastEditors: ydl
 * @LastEditTime: 2023-02-06 15:24:00
-->
<template>
  <div
    :class="[
      'playback-wrapper',
      config.cameraType === 'splitCamera' ? 'splitCamera-wrapper' : '',
    ]"
    :style="sassStyle"
  >
    <template v-if="isShowNoVideo">
      <div
        class="no-video-box"
        :style="{ background: config.splitVideo.background || '' }"
      >
        <img :src="config.splitVideo.whmtp" alt="" />
      </div>
    </template>
    <div v-else class="container">
      <live-player
        id="live-player-container"
        :video-url="videoUrl"
        alt="加载中..."
        fluent
        autoplay
        live
        stretch
      />
    </div>
    <div class="playback-btn">
      <div class="operate">
        <div class="playTime">
          <span class="clock-icon" />
          <span style="margin-right: 10px;color:#fff">选择回放时间:</span>
          <!-- <el-date-picker
            v-model="value"
            popper-class="playback-dateSelect"
            type="date"
            placeholder="选择日期"
            size="small"
            value-format="yyyy-MM-dd"
            @change="dateChange"
          /> -->
          <el-date-picker
            v-model="value"
            type="date"
            placeholder="选择日期"
            popper-class="playback-dateSelect"
            @focus="showPopper"
            size="small"
            value-format="yyyy-MM-dd"
            @change="dateChange"
          >
          </el-date-picker>
        </div>
        <div class="reback" @click="reback">
          <span class="back-icon" />
          <span>返回实时监控</span>
        </div>
      </div>
      <TimeRule ref="timeRule" :videos="videos" @timeChange="onTimeChange" />
    </div>
  </div>
</template>

<script>
import TimeRule from "./timeRule.vue";
import { dateFormat } from "@/utils/date.js";
import { loadCustomApiData } from "@/utils/api";
export default {
  components: {
    TimeRule,
  },
  props: ["camera_data", "address", "config"],
  data() {
    return {
      videotapeUrl: "",
      videos: [],
      value: "",
      time: "",
      param: null,
      start_time: "",
      end_time: "",
      isShowNoVideo: false,
      videoUrl: "",
    };
  },
  computed: {
    styleObj() {
      let color = this.config.box.mainColor.slice(
        0,
        this.config.box.mainColor.lastIndexOf(",")
      );
      return {
        background: this.config.splitVideo.background,
        border: "1px solid" + color + ",0.5)",
      };
    },
    sassStyle() {
      let color = this.config.box.mainColor.slice(
        0,
        this.config.box.mainColor.lastIndexOf(",")
      );
      let acolor = this.config.box.selectBackground.slice(
        0,
        this.config.box.selectBackground.lastIndexOf(",")
      );
      let s = this.config.splitVideo;
      return {
        "--rgbaColor1": color + ",1)",
        "--rgbaColor2": color + ",0.2)",
        "--rgbaColor3": color + ",0.5)",
        "--rgbaColor4": color + ",0.1)",
        "--argbaColor1": acolor + ",1)",
        "--argbaColor2": acolor + ",0.8)",
        "--selectBackground": this.config.box.selectBackground,
        "--whmtp": `url(${s.whmtp}) no-repeat`,
        "--defaultBg": s.background,
      };
    },
  },
  mounted() {
    this.param = this.$route.query;
    this.value = dateFormat(new Date(), "yyyy-MM-dd");
  },
  methods: {
    showPopper() {
      setTimeout(() => {
        let color = this.config.box.mainColor.slice(
          0,
          this.config.box.mainColor.lastIndexOf(",")
        );
        let daterangeDom = document.getElementsByClassName(
          "playback-dateSelect"
        );
        let timeDom = document.getElementsByClassName("el-time-panel");
        for (let item of daterangeDom) {
          item.style.background = this.config.splitVideo.background;
          item.style.border = "1px" + " solid " + color + ",0.5)";
        }
      }, 0);
    },
    getPlayStart() {
      loadCustomApiData({
        api: this.address,
        type: "get",
        data: {
          serial:
            this.camera_data.national_num ||
            this.camera_data.master_national_num,
          code: this.camera_data.channel || this.camera_data.master_channel,
          svs_url: "https://www.sjxks.com",
          starttime: this.start_time,
          endtime: this.end_time,
        },
      })
        .then((res) => {
          const url = this.$isIE() ? res.HLS : res.WS_FLV;
          this.videoUrl = url;
          this.isShowNoVideo = !url;
          console.log(res, url, this.isShowNoVideo, "===res");
        })
        .catch(() => {
          this.videoUrl = "";
          this.isShowNoVideo = true;
        });
    },
    dateChange() {
      this.start_time = this.value + "T" + this.time;
      this.end_time = dateFormat(new Date(), "yyyy-MM-ddTHH:mm:ss");
      this.getPlayStart();
    },
    onTimeChange(e) {
      this.time = e;
      if (!this.value) {
        this.start_time =
          dateFormat(new Date(), "yyyy-MM-dd") + "T" + this.time;
      } else {
        this.start_time = this.value + "T" + this.time;
      }
      this.end_time = dateFormat(new Date(), "yyyy-MM-ddTHH:mm:ss");
      this.getPlayStart();
    },
    reback() {
      this.$parent.isShowPlayback = false;
    },
  },
};
</script>

<style lang="scss">
.no-video-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
.playback-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 120px);
  z-index: 5;
  padding: 30px 80px 0 80px;

  &.isFull {
    position: fixed;
    // background-image: url("../../assets/img/jinshan/monitorPlan/monitor/big-bg.png");
    background-size: 100% 100%;
  }

  .container {
    height: calc(100% - 120px);
    overflow: hidden;
  }

  .playback-btn {
    margin-top: 30px;
    width: 100%;
    .el-input--small .el-input__icon {
      line-height: 24px;
    }
  }

  .operate {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .clock-icon {
      width: 20px;
      height: 22px;
      // background-image: url("../../assets/img/jinshan/monitorPlan/monitor/clock.png");
      background-size: 100% 100%;
      margin-right: 10px;
    }

    .playTime {
      display: flex;
      align-items: center;
      font-size: 16px;
      .el-date-editor {
        .el-input__inner {
          background-color: var(--rgbaColor2) !important;
          border: 1px solid var(--rgbaColor1) !important;
          color: #fff;
        }
      }
    }

    .reback {
      height: 30px;
      // background-color: #0fc4e4;
      display: flex;
      font-family: "SourceHanSansCN";
      font-size: 20px;
      font-weight: 500;
      color: var(--argbaColor1);
      cursor: pointer;
      > span:nth-child(2) {
        width: 120px;
      }
      .back-icon {
        width: 23px;
        height: 21px;
        margin-right: 10px;
        // background-image: url("../../assets/img/jinshan/monitorPlan/monitor/back.png");
        background-size: 100% 100%;
      }
    }
  }
}
.splitCamera-wrapper {
  padding: 0;
  .container {
    width: 100%;
    height: 100%;
    background: var(--defaultBg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
