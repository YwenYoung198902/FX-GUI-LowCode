<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-10-14 16:37:45
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-17 14:52:57
-->
<template>
  <div class="time-rule">
    <div
      ref="day"
      class="time-day"
      :style="{ left: timeDayX + 'px' }"
    >
      <div
        v-for="n in 1440 / minutesPerUnit"
        :key="n"
        :class="['time-minute', minuteActiveClass((n - 1) * minutesPerUnit)]"
        :style="{ width: minutesPerUnit + 'px' }"
        :title="minuteTitle((n - 1) * minutesPerUnit)"
        @click.prevent="clickMinute((n - 1) * minutesPerUnit)"
      />
      <!-- <div :class="[ n==1 ? 'time-text-first' : 'time-text']" v-for="n in 24">{{hourText(n - 1)}}</div> -->
      <div
        v-for="n in 24"
        :key="n + 10000"
        class="time-text"
      >
        <span class="minutebox">
          <div
            v-for="n in 4"
            class="minute"
          />
        </span>
        <span style="">{{ hourText(n - 1) }} </span>
      </div>
    </div>
    <div
      ref="cursor"
      class="time-cursor"
      style="left: 50%"
    >
      <div class="red-circle">
        {{ timeCursorText }}
      </div>
      <div class="white-circle" />
    </div>
  </div>
</template>

<script>
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
import moment from 'moment';
import $ from 'jquery';

export default {
  props: {
    minutesPerUnit: {
      // default: 5,
      default: 1,
      type: Number
    },
    videos: {
      default: () => []
    }
  },
  data() {
    return {
      timeCursorX: 0,
      timeDayX: 0,
      bMoving: false,
      initTimeCursorX: 0
    };
  },
  computed: {
    timeCursorText() {
      if (this.initTimeCursorX < $(this.$el).innerWidth()) {
        this.timeDayX = -(this.initTimeCursorX - $(this.$el).innerWidth() / 2);
        this.timeCursorX = this.timeCursorX + this.timeDayX;
        this.initTimeCursorX = $(this.$refs.day).outerWidth();
      }
      if (this.timeCursorX >= $(this.$el).innerWidth()) {
        this.timeDayX = $(this.$el).innerWidth() / 2 - this.timeCursorX;
        this.timeCursorX = $(this.$el).innerWidth() / 2;
      }
      if (this.timeCursorX < 0) {
        this.timeCursorX = 0;
      }

      if (
        this.timeDayX <
        $(this.$el).innerWidth() -
          $(this.$refs.day).outerWidth() -
          $(this.$el).innerWidth() / 2
      ) {
        this.timeDayX =
          $(this.$el).innerWidth() -
          $(this.$refs.day).outerWidth() -
          $(this.$el).innerWidth() / 2;
      }
      if (this.timeDayX > $(this.$el).innerWidth() / 2) {
        this.timeDayX = $(this.$el).innerWidth() / 2;
      }
      var mx =
        parseInt((this.timeCursorX - this.timeDayX) / this.minutesPerUnit) *
        this.minutesPerUnit;
      var m = moment().hour(0).minute(mx);
      return m.format('HH:mm:ss');
    },
    activeMinutes() {
      var minutes = {};
      var idx = 0;
      for (var video of this.videos) {
        var start = moment(video.StartTime, 'YYYY-MM-DDTHH:mm:ss');
        var end = moment(video.EndTime, 'YYYY-MM-DDTHH:mm:ss');
        if (!start.isSame(end, 'day')) {
          // 跨天
          if (idx == 0) {
            start = moment(end).startOf('day');
          } else {
            end = moment(start).endOf('day');
          }
        }
        var _start = moment(start).startOf('hour');
        // for(var i=0;;i+=5) {
        for (var i = 0; ; i += 1) {
          var c = moment(_start).add(i, 'minute');
          if (c.isBefore(start, 'minute')) {
            continue;
          }
          if (c.isAfter(end, 'minute')) {
            break;
          }
          var mtext = c.format('HH:mm:ss');
          minutes[mtext] = Object.assign({}, video, {
            StartTime: c.format('YYYY-MM-DDTHH:mm:ss')
          });
        }
        idx++;
      }
      return minutes;
    }
  },
  watch: {
    videos: function (val) {
      this.triggerTimeChange();
    }
  },
  mounted() {
    const cursor = this.$refs.cursor;
    const day = this.$refs.day;
    const rule = this.$el;
    const _this = this;
    this.timeDayX = $(this.$el).innerWidth() / 2;
    // this.triggerTimeChange();

    function moveCursor(e) {
      const originPageX = $(cursor).data('originPageX');
      const dx = e.pageX - originPageX;
      _this.timeCursorX = $(cursor).position().left + dx;
      $(cursor).data('originPageX', e.pageX);
    }

    function touchMoveCursor(e) {
      const touch = e.originalEvent.targetTouches[0];
      const originPageX = $(cursor).data('originPageX');
      const dx = touch.pageX - originPageX;
      _this.timeCursorX = $(cursor).position().left + dx;
      $(cursor).data('originPageX', touch.pageX);
    }

    function moveDay(e) {
      const originPageX = $(day).data('originPageX');
      const dx = e.pageX - originPageX;
      _this.timeDayX = $(day).position().left + dx;
      $(day).data('originPageX', e.pageX);
    }

    function touchMoveDay(e) {
      const touch = e.originalEvent.targetTouches[0];
      const originPageX = $(day).data('originPageX');
      const dx = touch.pageX - originPageX;
      _this.timeDayX = $(day).position().left + dx;
      $(day).data('originPageX', touch.pageX);
    }
    $(cursor)
      .on('mousedown', function (e) {
        $(cursor).data('originPageX', e.pageX);
        _this.bMoving = true;
        $(document)
          .on('mousemove', moveCursor)
          .one('mouseup', function (e) {
            $(document).off('mousemove', moveCursor);
            $(cursor).removeData('originPageX');
            _this.triggerTimeChange();
            _this.bMoving = false;
          });
      })
      .on('touchstart', function (e) {
        const touch = e.originalEvent.targetTouches[0];
        $(cursor).data('originPageX', touch.pageX);
        _this.bMoving = true;
        $(document)
          .on('touchmove', touchMoveCursor)
          .one('touchend', function (e) {
            $(document).off('touchmove', touchMoveCursor);
            $(cursor).removeData('originPageX');
            _this.triggerTimeChange();
            _this.bMoving = false;
          });
      });

    $(day)
      .on('mousedown', function (e) {
        if ($(e.target).hasClass('time-minute')) {
          return false;
        }
        $(day).data('originPageX', e.pageX);
        _this.bMoving = true;
        $(document)
          .on('mousemove', moveDay)
          .one('mouseup', function (e) {
            $(document).off('mousemove', moveDay);
            $(day).removeData('originPageX');
            _this.triggerTimeChange();
            _this.bMoving = false;
          });
      })
      .on('touchstart', function (e) {
        if ($(e.target).hasClass('time-minute')) {
          return false;
        }
        const touch = e.originalEvent.targetTouches[0];
        $(day).data('originPageX', touch.pageX);
        _this.bMoving = true;
        $(document)
          .on('touchmove', touchMoveDay)
          .one('touchend', function (e) {
            $(document).off('touchmove', touchMoveDay);
            $(day).removeData('originPageX');
            _this.triggerTimeChange();
            _this.bMoving = false;
          });
      });
  },
  methods: {
    hourText(n) {
      const h = moment().hour(n).minute(0).second(0);
      return h.format('HH:mm:ss');
    },
    minuteActiveClass(n) {
      const m = moment().hour(0).minute(n);
      const mtext = m.format('HH:mm:ss');
      return Object.keys(this.activeMinutes).indexOf(mtext) >= 0
        ? 'active'
        : '';
    },
    minuteTitle(n) {
      const m = moment().hour(0).minute(n);
      const mtext = m.format('HH:mm:ss');
      return Object.keys(this.activeMinutes).indexOf(mtext) >= 0 ? mtext : '';
    },
    clickMinute(n, bTrigger = true) {
      if (this.bMoving) return;
      this.timeCursorX = n + 0;
      this.initTimeCursorX = n + 0;
      if (bTrigger) {
        this.triggerTimeChange();
      }
    },
    triggerTimeChange() {
      if (this.activeMinutes) {
        this.$emit('timeChange', this.timeCursorText);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.time-rule {
  overflow: hidden;
  position: relative;
  height: 60px; /*no*/
  margin: 0 auto;
  width: 100%; /*no*/
  font-size: 12px; /*no*/
  max-width: 1440px; /*no*/
  color: #fff;
}

.time-day {
  position: absolute;
  top: 10px; /*no*/
  height: 100%; /*no*/
  width: 1440px; /*no*/
  cursor: pointer;
  -ms-user-select: none;
  user-select: none;
}

.time-minute {
  float: left;
  height: 8px; /*no*/
  margin: 0; /*no*/
  cursor: default;
}

.time-minute.active {
  // background-color: @base-active;
  cursor: pointer;
}

.time-text {
  float: left;
  width: 59px; /*no*/
  border-left: 1px solid #9c9c9c; /*no*/
  // border-top: 1px solid #999;/*no*/
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  height: 25px; /*no*/
  line-height: 25px; /*no*/
  position: relative;
  .minutebox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 8px;
    .minute {
      width: 1px;
      height: 8px;
      background: #9c9c9c;
    }
  }
  span {
    position: absolute;
    top: 23px; /*no*/
    left: 5px; /*no*/
  }
}
.time-cursor {
  position: absolute;
  left: 0;
  // top: 0;
  top: 26px; /*no*/
  height: 30px; /*no*/
  width: 2px; /*no*/
  background-color: red;
  text-align: center;
}
.red-circle {
  width: 50px; /*no*/
  height: 17px; /*no*/
  position: absolute;
  top: -18px; /*no*/
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 12px;
  line-height: 17px;
  border: 1px solid red;
}
.time-cursor-text {
  position: absolute;
  padding: 0 5px; /*no*/
  width: 60px; /*no*/
  left: -30px; /*no*/
  top: 30px; /*no*/
  border: 1px solid red; /*no*/
  height: 15px; /*no*/
  line-height: 15px; /*no*/
  cursor: move;
  background-color: white;
  -ms-user-select: none;
  user-select: none;
}
</style>
