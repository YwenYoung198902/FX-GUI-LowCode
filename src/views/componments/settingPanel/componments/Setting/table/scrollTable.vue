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
        <el-collapse-item title="头部配置">
          <el-form-item label="高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.theader.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input
              >px
            </div>
          </el-form-item>
          <commonTab :config="config" type1="theader"></commonTab>
          <el-form-item label="背景色：">
            <el-color-picker
              v-model="config.theader.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.theader.borderWidth"
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
              v-model="config.theader.borderStyle"
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
              v-model="config.theader.borderColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="表格显示">
          <el-form-item label="开启滚动数量：">
            <el-input
              v-model="config.tbody.limitMoveNum"
              size="mini"
              placeholder="请输入开启滚动数量"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.tbody.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="外间距(上)：">
            <div class="flex align-center">
              <el-input
                v-model="config.tbody.marginTop"
                size="mini"
                placeholder="请输入外间距(上)"
                style="margin-right:12px"
              ></el-input>
            </div>
          </el-form-item>
          <commonTab
            :config="config"
            type1="tbody"
            :isShowColor="false"
          ></commonTab>
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addShowTxt"
              >添加文本</el-button
            >
          </div>
          <el-collapse-item
            v-for="(item, i) in config.otherData.tableHead"
            :key="i"
            :title="`文本 ${i + 1} 配置：`"
          >
            <el-form-item label="文本名称：">
              <el-input
                v-model="item.label"
                size="mini"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据：">
              <el-select
                popper-class="setting-select"
                v-model="item.value"
                placeholder="请选择数据key"
              >
                <el-option
                  v-for="(item, i) in config.otherData.tableKeyData"
                  :label="item"
                  :key="i"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文本宽度：">
              <el-input
                v-model="item.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="文本颜色：">
              <el-color-picker
                v-model="item.color"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <span style="margin-left:30px">
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('pre', i, item)"
                >上移</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('next', i, item)"
                >下移</el-button
              >
              <el-button type="danger" size="mini" @click="delShowTxt(i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import commonSetTitle from "../componments/commonSetTitle";
import txtGradient from "../componments/txtGradient";
export default {
  name: "setting",
  components: { commonTab, commonSetTitle, txtGradient },
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
      let length = this.config.otherData.tableHead.length;
      this.config.otherData.tableHead.push({
        label: "",
        value: "",
        width: "",
        color: "#fff",
        id: length,
      });
    },
    delShowTxt(i) {
      this.config.otherData.tableHead.splice(i, 1);
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
        if (i === this.config.otherData.tableHead.length - 1) {
          this.$message.warning("当前已经是最后一个，无法再下移");
          return;
        } else {
          index = i + 1;
        }
      }
      let d = this.config.otherData.tableHead;
      d.splice(index, 1, ...d.splice(i, 1, d[index]));
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
