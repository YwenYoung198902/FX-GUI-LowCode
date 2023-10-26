<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-31 16:49:55
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-02 14:57:45
-->
<template>
  <div
    v-show="isShowModuleFunc(config)"
    ref="basicText"
    class="basicText"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      fontWeight: config.text.fontWeight,
      fontStyle: config.text.fontStyle,
      textAlign: config.text.textAlign,
      color: config.text.color,
      fontSize: config.text.fontSize + 'px',
      fontFamily: config.text.fontFamily,
      letterSpacing: config.text.letterSpacing + 'px',
      writingMode: config.writingMode,
    }"
  >
    {{ config.data }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  props: {
    config: {
      type: Object,
    },
  },
  watch:{
    isShow(nVal) {
      console.log("nVal:::::::::::::", nVal)
    }
  },
  methods:{
    aaa(type) {
      console.log("type::::::::::::::::", type)
      this.isShow = type
      console.log(1111)
    }
  }
};
</script>

<style>
  .basicText {
    pointer-events: all !important
  }
</style>