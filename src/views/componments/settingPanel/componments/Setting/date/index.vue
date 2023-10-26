<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="90px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />

      <el-collapse>
        <el-collapse-item title="文本(日期)" name="date">
          <el-form-item label="显示日期：">
            <el-switch v-model="config.date.show"></el-switch>
          </el-form-item>
          <span v-if="config.date.show">
            <commonTab :config="config" type1="date"></commonTab>
            <el-form-item label="高度：">
              <el-input
                v-model="config.date.height"
                size="mini"
                placeholder="请输入组件高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.date.width"
                size="mini"
                placeholder="请输入组件高度"
              ></el-input>
            </el-form-item>
          </span>
        </el-collapse-item>
        <el-collapse-item title="文本(时间)" name="time">
          <el-form-item label="显示时间：">
            <el-switch v-model="config.time.show"></el-switch>
          </el-form-item>
          <span v-if="config.time.show">
            <commonTab :config="config" type1="time"></commonTab>
            <el-form-item label="高度：">
              <el-input
                v-model="config.time.height"
                size="mini"
                placeholder="请输入组件高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.time.width"
                size="mini"
                placeholder="请输入组件高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="左间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.time.marginLeft"
                  size="mini"
                  placeholder="请输入左间距"
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </span>
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
      dateShow: false,
      timeShow: false,
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
  mounted() {},
  methods: {
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeShow(e, type) {
      console.log(type, e);
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
}
</style>
