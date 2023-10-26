<template>
  <div class="trail-ctrl" @mousemove="handleMousemove" :style="sassStyle">
    <div
      :style="{
        width: iconSize + 'px',
        height: iconSize + 'px',
        marginRight: '10px',
      }"
    >
      <div v-if="isPlay" class="base-timeline-pause" @click="isPlay = !isPlay">
        <svgicon
          name="pausebutton"
          :width="`${iconSize}`"
          :height="`${iconSize}`"
          :color="`${color}`"
        ></svgicon>
      </div>
      <div v-else class="base-timeline-start" @click="playStart()">
        <svgicon
          name="playbutton"
          :width="`${iconSize}`"
          :height="`${iconSize}`"
          :color="`${color}`"
        ></svgicon>
      </div>
    </div>
    <div ref="line" class="base-timeline-bg" :style="styleObj1">
      <div class="base-timebar" :style="{ width: leftPercent + '%' }" />
      <div
        class="base-timecircle"
        :style="{ left: leftPercent + '%' }"
        @mousedown="handleMousedown"
      />
      <span class="progress-time">
        {{ currentTime }} /
        <font :style="{ color: config.box.mainColor }">{{
          formatDuration
        }}</font>
      </span>
    </div>

    <div class="trail-ctrl-speed" tabindex="2" @blur="showSpeed = false">
      <div class="speed-btn" @click="showSpeed = !showSpeed">
        {{ speed }}X
        <span
          :class="[!showSpeed ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
        />
        <div v-if="showSpeed" class="speeds">
          <p
            v-for="item in speedList"
            :key="item"
            class="speed"
            @click="(speed = item), (showSpeed = false)"
          >
            {{ item }}x
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { rgbaToHex } from "../../../utils/index.js";
import { setStyleObj } from "@/utils/index.js";
export default {
  name: "TrailCtrl",
  props: {
    duration: {
      type: Number,
      default: 0,
    },
    config: {
      type: Object,
    },
  },
  data() {
    return {
      isPlay: false,
      isMove: false,
      lastX: 0,
      left: 0,
      leftPercent: 0,
      speedList: [0.5, 1.0, 1.25, 1.5, 2.0],
      showSpeed: false,
      raf: null, // requestAnimationFrame对象
      speed: 1,
      hours: 0,
      color: "",
    };
  },
  computed: {
    formatDuration: function() {
      this.left = 0;
      this.leftPercent = 0;
      return this.secondToTimeStr(this.duration, "total");
    },
    currentTime: function() {
      const s = Math.floor((this.duration * this.leftPercent) / 100);
      return this.secondToTimeStr(s, "play") || "00:00";
    },
    sassStyle() {
      let color = this.config.box.mainColor.slice(
        0,
        this.config.box.mainColor.lastIndexOf(",")
      );
      let bcolor = this.config.box.selectBg.slice(
        0,
        this.config.box.selectBg.lastIndexOf(",")
      );
      console.log(this.config.time, "===time");
      return {
        // fontFamily: this.config.box.fontFamily,
        // color: this.config.box.color,
        // fontSize: this.config.box.fontSize + "px",
        "--color": this.config.box.color,
        "--fontSize1": this.config.box.fontSize + "px",
        "--fontSize2": this.config.box.fontSize * 1 - 2 + "px",
        "--height": this.config.box.height + "px",
        "--height1": this.config.box.height * 1 - 6 + "px",
        "--height2": this.config.time.height * 1.6 + "px",
        "--width1": this.config.time.height / 2 + "px",
        "--width2": this.config.time.speedWidth + "px",
        "--rgbaColor1": color + ",1)",
        "--rgbaColor2": color + ",.5)",
        "--rgbaColor3": color + ",.1)",
        "--rgbaBg1": bcolor + ",1)",
        "--rgbaBg2": bcolor + ",.5)",
      };
    },
    styleObj1() {
      let d = setStyleObj({ ...this.config.time });
      return d;
    },
  },
  watch: {
    isPlay: function() {
      if (this.isPlay) {
        this.autoPlay();
      } else {
        cancelAnimationFrame(this.raf);
      }
    },
    "config.box.mainColor"(nVal, oVal) {
      this.color = rgbaToHex(nVal);
    },
    "config.time.iconSize"(nval) {
      this.iconSize = nval;
    },
  },
  mounted() {
    this.color = rgbaToHex(this.config.box.mainColor);
    this.iconSize = this.config.time.iconSize;
  },
  methods: {
    handleMousedown() {
      this.isMove = true;
      this.lastX = event.x;

      // 鼠标按下时开始拖拽，在window上添加事件
      window.addEventListener("mousemove", this.handleMousemove);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMousemove() {
      if (!this.isMove) {
        return;
      }
      const diff = event.x - this.lastX;

      const lineWidth = this.$refs.line.offsetWidth; // 长度

      this.left += diff;
      if (this.left <= 0) {
        // 限制左侧
        this.left = 0;
      }
      if (this.left >= lineWidth) {
        // 限制右侧
        this.left = lineWidth;
      }

      this.lastX = event.x;
      this.leftPercent = (this.left / lineWidth) * 100;
      this.$emit("on-move", this.leftPercent / 100);
    },
    handleMouseUp() {
      this.isMove = false;

      // 鼠标松开时停止拖拽，移除window上的事件
      window.removeEventListener("mousemove", this.handleMousemove);
      window.removeEventListener("mouseup", this.handleMouseUp);
    },
    secondToTimeStr(t, type) {
      if (!t) return;
      if (t < 60) return "00:" + ((i = t) < 10 ? "0" + i : i);
      if (t < 3600) {
        return (
          "" +
          ((a = parseInt(t / 60)) < 10 ? "0" + a : a) +
          ":" +
          ((i = t % 60) < 10 ? "0" + i : i)
        );
      }
      if (t >= 3600) {
        var a;
        var i;
        var e = parseInt(t / 3600);
        type === "total" && (this.hours = e);
        return (
          (e < 10 ? "0" + e : e) +
          ":" +
          ((a = parseInt((t % 3600) / 60)) < 10 ? "0" + a : a) +
          ":" +
          ((i = t % 60) < 10 ? "0" + i : i)
        );
      }
    },
    autoPlay() {
      // let box = event.target.getBoundingClientRect();
      const diff = this.speed / ((this.hours + 1) * 2);

      const lineWidth = this.$refs.line.offsetWidth; // 长度

      this.left += diff;
      if (this.left <= 0) {
        // 限制左侧
        this.left = 0;
      }
      if (this.left >= lineWidth) {
        // 限制右侧
        this.left = lineWidth;
        this.isPlay = false;
      }
      this.lastX += diff;
      // this.lastX = this.left;
      this.leftPercent = (this.left / lineWidth) * 100;
      this.$emit("on-move", this.leftPercent / 100);
      this.raf = requestAnimationFrame(this.autoPlay);
    },
    changeMove(per) {
      this.isPlay = false;
      this.leftPercent = per * 100;
      const lineWidth = this.$refs.line.offsetWidth; // 长度
      this.left = (this.leftPercent / 100) * lineWidth;
    },
    setTime(percent) {
      const lineWidth = this.$refs.line.offsetWidth; // 长度
      this.leftPercent = percent * 100;
      this.left = lineWidth * percent;
      this.$emit("on-move", percent);
    },
    playStart() {
      this.isPlay = !this.isPlay;
      if (this.leftPercent === 100) {
        this.left = 0;
        this.leftPercent = 0;
      }
    },
  },
};
</script>
<style lang="scss">
.trail-ctrl {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: #08dac4;
  user-select: none;
  // background: rgba(0, 0, 0, 0.5);
  pointer-events: all;
  padding: 26px;
  z-index: 2;

  .base-timeline-start {
    width: 26px;
    height: 33px;
    cursor: pointer;
    // background: url("../../assets/img/sheshan/personal/start.png");
    background-size: 100% 100%;
  }

  .base-timeline-pause {
    width: 27px;
    height: 34px;
    cursor: pointer;
    // background: url("../../assets/img/sheshan/personal/pause.png");
    background-size: 100% 100%;
  }

  .base-timeline-bg {
    border-radius: 8px;
    background: rgba(245, 245, 245, 0.4);
    position: relative;
    margin: 0 10px;

    .base-timebar {
      width: 150px;
      height: 100%;
      border-radius: 8px;
      background: var(--rgbaColor1);
    }

    .base-timecircle {
      width: var(--width1);
      height: var(--height2);
      background: var(--color);
      border: none !important;
      border-radius: 0 !important;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .progress-time {
      display: inline-block;
      line-height: var(--height1);
      position: absolute;
      right: 0;
      bottom: var(--height2);
      color: var(--color);
    }
  }

  .trail-ctrl-speed {
    .speed-btn {
      width: var(--width2);
      height: var(--height1);
      line-height: var(--height1);
      text-indent: 10px;
      background: var(--rgbaBg1);
      border: 1px solid var(--rgbaColor1);
      border-radius: 0px !important;
      text-align: left !important;
      cursor: pointer;
      color: var(--color);
      position: relative;
      span {
        position: absolute;
        width: var(--height1);
        height: var(--height1);
        line-height: var(--height1);
        background: var(--rgbaColor1);
        right: 0;
        top: 0;
        text-indent: 0px;
        text-align: center;
        color: #000;
        font-weight: 900;
      }

      .speeds {
        position: absolute;
        left: 0;
        width: var(--width2);
        padding: 10px 0;
        bottom: var(--height);
        color: var(--color);
        line-height: var(--height1);
        text-align: center;
        cursor: pointer;
        background: var(--rgbaBg1);
        border: 0.5px solid var(--rgbaColor1);
        border-radius: 5px;
        .speed:hover {
          color: var(--rgbaBg1);
          background-color: var(--rgbaColor1);
        }
      }
    }
  }
}
</style>
