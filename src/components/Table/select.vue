<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-08-23 14:00:28
 * @LastEditors: ydl
 * @LastEditTime: 2023-09-25 13:50:17
-->
<template>
  <div class="select-box" :style="sassStyle" v-show="isShowModuleFunc(config)">
    <span style="margin-right: 8px;" v-if="config.selectionCommon.label">{{
      config.selectionCommon.label
    }}</span>
    <el-select
      v-model="config.selectedData"
      class="cockpit-select-blue"
      popper-class="cockpit-select"
      placeholder="请选择"
      :style="styleObj"
      :popper-append-to-body="false"
      @change="changeSelect"
      :clearable="config.selection.clearable"
    >
      <el-option
        v-for="item in config.data"
        :key="item.key"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
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
    changeSelect(value) {
      this.callBack && this.callBack(value);
    },
  },
  computed: {
    styleObj1() {
      let d = setStyleObj({
        color: this.config.selectionCommon.color,
      });
      return d;
    },
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
        "--selectFontSize": this.config.selectionCommon.fontSize + "px",
        "--selectFontFamily": this.config.selectionCommon.fontFamily,
        "--background": this.config.dropdownBox.boxbackground,
        "--border": "1px" + " solid " + this.config.dropdownBox.borderColor,
        "--hoverBackground": this.config.dropdownBox.hoverBackground,
        "--height": this.config.height + "px",
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
}
::v-deep .el-select {
  .el-input__inner {
    background: transparent;
    border: 0;
    color: var(--selectColor);
    height: var(--height);
    line-height: var(--height);
    font-size: var(--selectFontSize);
    font-family: var(--selectFontFamily);
  }
  .el-input {
    height: var(--height);
    .el-input__suffix-inner {
      display: inline-block;
    }
    .el-input__icon {
      line-height: var(--height) !important;
    }
  }
}
::v-deep .cockpit-select {
  // left: 0 !important;
  background: var(--background);
  border: var(--border);
  position: absolute !important;
  left: 0 !important;
  top: 30px !important;
  .el-select-dropdown__list {
    width: 100%;
    padding: 6px 0 !important;
    .el-select-dropdown__item {
      width: 100%;
      text-align: left;
      padding: 0 20px;
      color: #fff;
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background: var(--hoverBackground);
    }
  }
}
</style>
