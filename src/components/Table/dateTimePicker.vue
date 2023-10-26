<template>
  <div
    class="select-box"
    :style="sassStyle"
    v-show="isShowModuleFunc(config)"
  >
    <span style="margin-right: 8px;" v-if="config.selectionCommon.label">{{
      config.selectionCommon.label
    }}</span>
    <el-date-picker
      @change="changeDatePicker"
      v-model="timevalue"
      popper-class="cockpit-daterange"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :style="styleObj"
      @focus="showPopper"
      size="mini"
    />
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
      timevalue: "",
    };
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
        "--selectFontSize": this.config.selectionCommon.fontSize + "px",
        "--selectFontFamily": this.config.selectionCommon.fontFamily,
        "--height": this.config.height + "px",
        color: this.config.selectionCommon.color,
      };
    },
  },
  methods: {
    changeDatePicker(value) {
      console.log("value:::::::::::::::", value);
      this.callBack && this.callBack(value);
    },
    showPopper() {
      setTimeout(() => {
        let daterangeDom = document.getElementsByClassName("cockpit-daterange");
        let timeDom = document.getElementsByClassName("el-time-panel");
        for (let item of daterangeDom) {
          item.style.background = this.config.dropdownBox.boxbackground;
          item.style.border =
            "1px" + " solid " + this.config.dropdownBox.borderColor;
        }
        for (let item of timeDom) {
          item.style.background = this.config.dropdownBox.timebackground;
        }
      }, 0);
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

  ::v-deep .el-range-input {
    background: transparent;
  }
  ::v-deep .el-input__inner {
    background: transparent;
    border: 0;
    color: var(--selectColor);
    height: 100%;
  }
  ::v-deep .el-range-input {
    color: var(--selectColor);
    font-size: var(--selectFontSize);
    font-family: var(--selectFontFamily);
  }
  ::v-deep .el-date-editor {
    .el-range-separator {
      display: flex;
      align-items: center;
      color: var(--selectColor);
    }
  }
}
</style>
<style lang="scss">
.cockpit-daterange {
  .el-input__inner {
    background: transparent;
    border: 0;
    color: #fff;
  }
  .el-input.is-disabled .el-input__inner {
    background: transparent;
    border: 0;
    color: #fff;
  }
  .el-picker-panel__footer {
    background: transparent;
    .el-picker-panel__link-btn {
      color: #fff;
    }
    .el-button--default {
      background: transparent;
      border: 0;
      color: #409eff;
    }
  }
  .el-time-spinner__item.active:not(.disabled) {
    color: #fff;
  }
  .el-time-panel__footer {
    .cancel {
      color: #fff;
    }
  }
  .el-button.is-disabled.is-plain,
  .el-button.is-disabled.is-plain:focus,
  .el-button.is-disabled.is-plain:hover {
    background-color: transparent;
    border: 0;
    color: #409eff;
  }
}
</style>
