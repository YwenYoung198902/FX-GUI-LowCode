<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-10-14 16:34:29
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-24 14:55:14
-->
<template>
  <div
    class="camera-wrapper"
    :style="{
    ...scssStyle
  }"
  >
    <div class="videoContent">
      <div
        v-if="isShowNoVideo"
        class="videoContent__empty__box"
      >
        <img
          :src="config.box.emptyPic"
          alt=""
        >
      </div>
      <div v-else>
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
      <div
        class="videoContent__operate"
        :style="{
        bottom: active == 1? '0':'115px'
      }"
      >
        <el-date-picker
          v-show="active == 2"
          v-model="value"
          popper-class="jinshanCockpit-playback"
          type="date"
          placeholder="选择日期时间"
          size="small"
          value-format="yyyy-MM-dd"
          @change="dateChange"
        />
        <div
          v-show="active == 1 && camera_data && camera_data.camera_type === '球机'"
          class="control"
        >
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.upwardPic +')',
              left: -(this.config.controlBtn.width * 1.5 /2) + 'px',
              top: -this.config.controlBtn.height * 1.5 + 'px'
            }"
            @mousedown="controlYun('up')"
            @mouseup="controlStop"
          />
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.upwardPic +')',
              left: -(this.config.controlBtn.width * 1.5) + 'px',
              top: -(this.config.controlBtn.width * 1.5 /2) + 'px'
            }"
            @mousedown="controlYun('left')"
            @mouseup="controlStop"
          />
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.upwardPic +')',
              left: 0,
              top: -(this.config.controlBtn.width * 1.5 /2) + 'px'
            }"
            @mousedown="controlYun('right')"
            @mouseup="controlStop"
          />
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.upwardPic +')',
              left: -(this.config.controlBtn.width * 1.5 /2) + 'px',
              top: 0
            }"
            @mousedown="controlYun('down')"
            @mouseup="controlStop"
          />
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.shrinkPic +')'
            }"
            @mousedown="controlYun('zoomin')"
            @mouseup="controlStop"
          />
          <span
            :style="{
              backgroundImage: 'url('+ config.controlBtn.enlargePic +')'
            }"
            @mousedown="controlYun('zoomout')"
            @mouseup="controlStop"
          />
        </div>
        <div
          class="playback"
          @click="reback"
        >
          <span
            :class="[active == 1 ? 'active' : '']"
            @click="active = 1, getStreamStart(), changeHeight(1)"
          >实时画面</span>
          <span
            :class="[active == 2 ? 'active' : '']"
            @click="active = 2, dateChange(), changeHeight(2)"
          >查看回放</span>
        </div>
      </div>
    </div>
    <div
      v-if="active == 2"
      class="playback-btn"
    >
      <TimeRule
        ref="timeRule"
        :videos="videos"
        @timeChange="onTimeChange"
      />
    </div>
  </div>
</template>

<script>
import TimeRule from './timeRule.vue';
import {
  stream_start,
  playback_start,
  playback_recordlist,
  getControl_ptz
} from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  components: {
    TimeRule
  },
  props: ['config', 'camera_data'],
  data() {
    return {
      videoUrl: '',
      videos: [],
      value: '',
      time: '00:00:00',
      start_time: '',
      end_time: '',
      isShowNoVideo: false,
      active: 1
    };
  },
  mounted() {
    this.value = this.dateFormat(new Date(), 'yyyy-MM-dd');
    // this.getStreamStart(); // 获取实时播放流
  },
  computed: {
    scssStyle() {
      return {
        '--upwardPic_hover':
          'url(' + this.config.controlBtn.upwardPic_hover + ')',
        '--shrinkPic_hover':
          'url(' + this.config.controlBtn.shrinkPic_hover + ')',
        '--enlargePic_hover':
          'url(' + this.config.controlBtn.enlargePic_hover + ')',
        '--controlBtn_width': this.config.controlBtn.width + 'px',
        '--controlBtn_height': this.config.controlBtn.height + 'px',
        '--controlTopBtn_width': this.config.controlBtn.width * 1.4 + 'px',
        '--controlTopBtn_height': this.config.controlBtn.height * 1.4 + 'px'
      };
    }
  },
  watch: {
    camera_data: {
      handler(nl) {
        console.log(nl, 'pppppppp');
        this.getStreamStart();
      },
      deep: true
    }
  },
  methods: {
    changeHeight(param) {
      this.$emit('changeHeight', param);
    },
    async getStreamStart() {
      if (!this.camera_data) {
        console.log('111111111');
        this.videoUrl = '';
        this.isShowNoVideo = true;
        return;
      }

      let camera = JSON.parse(this.camera_data.camera);
      try {
        const res = await stream_start({
          serial: camera.CameraAddress.split('&')[0].split('=')[1],
          code: camera.CameraAddress.split('&')[1].split('=')[1],
          svs_url: camera.CameraType
          // is_intranet: this.camera_data.is_intranet
        });
        this.videoUrl = res.WS_FLV;
        this.isShowNoVideo = !this.videoUrl;
      } catch (error) {
        this.videoUrl = '';
        this.isShowNoVideo = true;
      }
    },
    dateFormat(date, format) {
      date = new Date(date);
      date.setHours(date.getHours());
      const o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'H+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds() // millisecond
      };

      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );

      for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
      return format;
    },
    async getPlayStart() {
      if (!this.camera_data.camera) return;
      let camera = JSON.parse(this.camera_data.camera);
      try {
        const res = await playback_start({
          serial: camera.CameraAddress.split('&')[0].split('=')[1],
          code: camera.CameraAddress.split('&')[1].split('=')[1],
          svs_url: camera.CameraType,
          starttime: this.start_time,
          endtime: this.end_time
        });
        if (res == null) {
          this.videoUrl = '';
          this.isShowNoVideo = true;
        } else {
          this.videoUrl = res.FLV;
        }
      } catch (error) {
        this.videoUrl = '';
        this.isShowNoVideo = true;
      }
    },
    async getRecordList() {
      if (!this.camera_data.camera) return;
      let camera = JSON.parse(this.camera_data.camera);
      const res = await playback_recordlist({
        serial: camera.CameraAddress.split('&')[0].split('=')[1],
        code: camera.CameraAddress.split('&')[1].split('=')[1],
        svs_url: camera.CameraType,
        starttime: this.value + 'T' + '00:00:00',
        endtime: this.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss')
      });
      if (res.RecordList) {
        this.recordList = res.RecordList;
        this.start_time = this.recordList[0].StartTime;
        this.end_time = this.recordList[0].EndTime;
        this.getPlayStart();
      }
    },
    dateChange() {
      this.start_time = this.value + 'T' + this.time;
      this.end_time = this.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      this.getPlayStart();
    },
    onTimeChange(e) {
      this.time = e;
      if (!this.value) {
        this.start_time =
          this.dateFormat(new Date(), 'yyyy-MM-dd') + 'T' + this.time;
        const curTime = new Date(
          this.dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + this.time
        );
        this.end_time = this.dateFormat(
          new Date(curTime.setMinutes(curTime.getMinutes() + 10)),
          'yyyy-MM-ddTHH:mm:ss'
        );
      } else {
        this.start_time = this.value + 'T' + this.time;
        const curTime = new Date(this.value + ' ' + this.time);
        this.end_time = this.dateFormat(
          new Date(curTime.setMinutes(curTime.getMinutes() + 10)),
          'yyyy-MM-ddTHH:mm:ss'
        );
      }
      this.getPlayStart();
    },
    reback() {
      this.$parent.isShowPlayback = false;
    },
    async controlYun(command) {
      if (this.videoUrl) {
        const res = await getControl_ptz({
          serial: this.camera_data.serial,
          code: this.camera_data.code,
          svs_url: this.camera_data.svs_url,
          command: command
        });
      } else {
        this.isShowNoVideo = true;
        this.$Message.error('摄像头信息不全无法查看画面');
      }
    },
    controlStop() {
      setTimeout(() => {
        this.controlYun('stop');
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.camera-wrapper {
  width: 100%;
  height: 100%;
  pointer-events: all;

  .videoContent {
    width: 100%;
    height: 100%;
    position: relative;

    &__empty__box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &__operate {
      width: 100%;
      padding: 0 20px;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;

      .el-date-editor {
        width: 200px;
        position: absolute;
        top: 20px;
        .el-input__inner {
          background: rgba(6, 20, 44, 0.8);
          border: 1px solid rgba(108, 175, 255, 0.5);
          color: #99b3c8;
        }
      }

      .control {
        width: 1px;
        height: 170px;
        position: absolute;
        bottom: 0;
        left: 120px;

        span {
          background-size: 100% 100%;
          cursor: pointer;
        }

        span:nth-child(1) {
          display: inline-block;
          width: var(--controlTopBtn_width);
          height: var(--controlTopBtn_height);
          position: absolute;

          &:hover {
            background-image: var(--upwardPic_hover) !important;
          }
        }

        span:nth-child(2) {
          display: inline-block;
          width: var(--controlTopBtn_width);
          height: var(--controlTopBtn_height);
          transform: rotate(-90deg);
          position: absolute;

          &:hover {
            background-image: var(--upwardPic_hover) !important;
            transform: rotate(-90deg);
          }
        }

        span:nth-child(3) {
          display: inline-block;
          width: var(--controlTopBtn_width);
          height: var(--controlTopBtn_height);
          transform: rotate(90deg);
          position: absolute;

          &:hover {
            background-image: var(--upwardPic_hover) !important;
            transform: rotate(90deg);
          }
        }

        span:nth-child(4) {
          display: inline-block;
          width: var(--controlTopBtn_width);
          height: var(--controlTopBtn_height);
          transform: rotate(180deg);
          position: absolute;

          &:hover {
            background-image: var(--upwardPic_hover) !important;
            transform: rotate(180deg);
          }
        }

        span:nth-child(5) {
          display: inline-block;
          width: var(--controlBtn_width);
          height: var(--controlBtn_height);
          position: absolute;
          bottom: 0;
          left: 10px;

          &:hover {
            background-image: var(--shrinkPic_hover) !important;
            transform: rotate(180deg);
          }
        }

        span:nth-child(6) {
          display: inline-block;
          width: var(--controlBtn_width);
          height: var(--controlBtn_height);
          position: absolute;
          bottom: 0;
          right: 10px;

          &:hover {
            background-image: var(--enlargePic_hover) !important;
            transform: rotate(180deg);
          }
        }
      }

      .playback {
        width: 156px;
        height: 35px;
        display: flex;
        cursor: pointer;
        font-size: 16px;
        font-weight: 900;
        color: #fff;
        border-radius: 2px;
        position: absolute;
        right: 20px;
        bottom: 0;

        span {
          width: 78px;
          text-align: center;
          line-height: 34px;
          background: rgba(0, 0, 0, 0.8);

          &.active {
            background: #308dff;
            color: #06142c;
          }
        }
      }
    }
  }

  .playback-btn {
    width: 100%;
    position: absolute;
    bottom: 0px;

    .el-input--small .el-input__icon {
      line-height: 24px;
    }
  }
}
</style>
