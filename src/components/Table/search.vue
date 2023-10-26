<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-08-23 14:00:28
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-18 15:10:00
-->
<template>
  <div class="select-box" :style="sassStyle" v-show="isShowModuleFunc(config)">
    <span style="margin-right: 8px;" v-if="config.selectionCommon.label">{{
      config.selectionCommon.label
    }}</span>
    <span>
      <el-input
        v-model="config.keyword"
        :placeholder="config.selection.placeholderTxt"
        size="mini"
        :style="styleObj"
      >
        <el-button slot="append" @click="toSearch" icon="el-icon-search">
          搜索
        </el-button>
      </el-input>
      <i />
    </span>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
    callBack: {
      type: Function,
    },
  },
  data() {
    return {
      eventSourceData: [],
    };
  },
  methods: {
    toSearch() {
      this.callBack && this.callBack(this.config.keyword);
    },
  },
  computed: {
    styleObj() {
      let d = setStyleObj({
        ...this.config.selectionCommon,
        width: this.config.selection.width,
      });
      delete d.color;
      return d;
    },
    sassStyle() {
      return {
        "--selectColor": this.config.selectionCommon.color,
        "--height": this.config.height + "px",
        "--selectFontSize": this.config.selectionCommon.fontSize + "px",
        "--selectFontFamily": this.config.selectionCommon.fontFamily,
        color: this.config.selectionCommon.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.select-box {
  pointer-events: all;
  height: var(--height);
  line-height: var(--height);
  display: flex;
  align-items: center;
  ::v-deep .el-input__inner {
    background: transparent;
    border: 0;
    color: var(--selectColor);
    height: var(--height);
    font-size: var(--selectFontSize);
    font-family: var(--selectFontFamily);
  }
  ::v-deep .el-input-group__append {
    background: transparent;
    color: var(--selectColor);
    border: 0;
    height: var(--height);
    .el-button {
      background: transparent;
      border: 0;
    }
  }
}
</style>
