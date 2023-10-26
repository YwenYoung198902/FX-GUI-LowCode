<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-01 13:58:48
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-22 15:05:58
-->
<template>
  <div
    class="editor-wrapper"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px'
    }"
    v-show="isShowModuleFunc(config)"
  >
    <div
      :style="{
      writingMode: config.writingMode,
      textOrientation: 'mixed'
    }"
      v-html="config.data"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.editor-wrapper {
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
}
</style>
