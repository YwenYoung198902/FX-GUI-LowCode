<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-25 14:03:50
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-22 17:09:54
-->
<template>
  <div
    class="bg-box"
    :style="{...styleObj, ...filterStyles}"
    v-show="isShowModuleFunc(config)"
  ></div>
</template>

<script>
import { setStyleObj, getFilterStyles } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    filterStyles() {
      return this.config.isShowImg ? getFilterStyles(this.config) : {}
    },
    styleObj() {
      let d = setStyleObj({ ...this.config });
      if (!this.config.isShowImg) {
        d.background = this.config.backgroundColor;
      }
      return d;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped> 
.bg-box {
  background-size: 100% 100% !important;
  // pointer-events: all;
}
</style>
