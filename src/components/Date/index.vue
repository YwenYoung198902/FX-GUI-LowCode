<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-17 11:54:10
-->
<template>
  <div
    class="time-box"
    :style="styleObj"
    v-show="isShowModuleFunc(config)"
  >
    <div class="dete" :style="styleObj1" v-show="config.date.show">
      {{ date }} {{ week }}
    </div>
    <div class="time" :style="styleObj2" v-show="config.time.show">
      {{ time }}
    </div>
  </div>
</template>

<script>
import { getDate, getTime, getWeek } from "@/utils/date.js";
import { setStyleObj } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      date: getDate(),
      time: getTime(),
      week: getWeek(),
      isShow: true,
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
        console.log(nVal, oVal, "===watch");
      },
      deep: true,
    },
  },
  computed: {
    styleObj() {
      let obj = setStyleObj({ ...this.config });
      return obj;
    },
    styleObj1() {
      let obj = setStyleObj({ ...this.config.date });
      return obj;
    },
    styleObj2() {
      let obj = setStyleObj({ ...this.config.time });
      return obj;
    },
  },
  created() {
    setInterval(() => {
      this.getFullTime();
    }, 1000);
  },
  mounted() {},
  methods: {
    getFullTime() {
      this.date = getDate();
      this.time = getTime();
      this.week = getWeek();
    },
  },
};
</script>
<style lang="scss" scoped>
.time-box {
  display: flex;
  align-items: center;
  // pointer-events: all;
}
</style>
