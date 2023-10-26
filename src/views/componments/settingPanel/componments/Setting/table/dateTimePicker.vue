<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="136px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />

      <el-collapse>
        <el-collapse-item title="配置项">
          <el-form-item label="选项文本：">
            <el-input
              v-model="config.selectionCommon.label"
              size="mini"
              placeholder="请输入文本"
            ></el-input>
          </el-form-item>
          <el-form-item label="选项宽度：">
            <el-input
              v-model="config.selection.width"
              size="mini"
              placeholder="请输入宽度"
            ></el-input>
          </el-form-item>
          <commonTab
            :config="config"
            type1="selectionCommon"
            :isShowFontStyle="false"
          />
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.selectionCommon.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.selectionCommon.borderWidth"
                size="mini"
                placeholder="请输入边框宽度"
                style="margin-right:12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="边框样式：">
            <el-select
              popper-class="setting-select"
              v-model="config.selectionCommon.borderStyle"
              placeholder="请选边框样式"
            >
              <el-option
                v-for="(item, i) in styleList"
                :label="item"
                :key="i"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="边框颜色：">
            <el-color-picker
              v-model="config.selectionCommon.borderColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框圆角：">
            <el-input
              v-model="config.selectionCommon.borderRadius"
              size="mini"
              placeholder="请输入边框圆角"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="下拉框样式">
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.dropdownBox.boxbackground"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框颜色：">
            <el-color-picker
              v-model="config.dropdownBox.borderColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="时间选择背景色：">
            <el-color-picker
              v-model="config.dropdownBox.timebackground"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import commonSetTitle from "../componments/commonSetTitle";
export default {
  name: "setting",
  components: { commonTab, commonSetTitle },
  data() {
    return {
      imgList1: [],
      styleList: ["solid", "dashed"],
      border: {
        width: "",
        type: "",
        color: "",
      },
      selectTypeData: [
        { txt: "日期时间", type: "dateTimePicker" },
        { txt: "时间", type: "timePicker" },
        { txt: "关键字搜索", type: "search" },
        { txt: "选择器", type: "select" },
      ],
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    changeSize: {
      type: Function,
    },
  },
  watch: {},
  mounted() {
    this.getImgList1();
  },
  methods: {
    change(val) {
      console.log(val);
    },
    getImgList1() {
      this.imgList1 = [
        { txt: "背景图1", url: require("@/assets/image/xiaokunshan/bg9.png") },
        { txt: "背景图2", url: require("@/assets/image/xiaokunshan/bg11.png") },
        { txt: "背景图3", url: require("@/assets/image/xiaokunshan/bg10.png") },
        { txt: "背景图4", url: require("@/assets/image/xiaokunshan/bg4.png") },
        { txt: "背景图5", url: require("@/assets/image/xiaokunshan/bg5.png") },
      ];
    },
    addShowTxt() {
      let length = this.config.data.tableHead.length;
      this.config.data.tableHead.push({
        label: "",
        value: "",
        width: "",
        color: "#fff",
        id: length,
      });
      this.$emit(
        "changeValue",
        "data",
        "tableHead",
        this.config.data.tableHead
      );
    },
    delShowTxt(i) {
      this.config.data.tableHead.splice(i, 1);
      this.$emit(
        "changeValue",
        "data",
        "tableHead",
        this.config.data.tableHead
      );
    },
    changeIndex(type, i, data) {
      let index;
      if (type === "pre") {
        if (i === 0) {
          this.$message.warning("当前已经是第一个，无法再上移");
          return;
        } else {
          index = i - 1;
        }
      } else {
        if (i === this.config.data.tableHead.length - 1) {
          this.$message.warning("当前已经是最后一个，无法再下移");
          return;
        } else {
          index = i + 1;
        }
      }
      let d = this.config.data.tableHead;
      d.splice(index, 1, ...d.splice(i, 1, d[index]));
      this.$emit(
        "changeValue",
        "data",
        "tableHead",
        this.config.data.tableHead
      );
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;

    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }
  }
  .button-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
.el-select-dropdown__list {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding: 6px !important;
  .el-select-dropdown__item {
    height: auto;
    padding: 0 7px;
  }
  .img-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
