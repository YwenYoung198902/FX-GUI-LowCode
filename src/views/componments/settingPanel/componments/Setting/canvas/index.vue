<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="100px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
     <el-form-item label="名称：">
        画布
      </el-form-item>
      <el-form-item label="画布宽高：">
        <div class="flex">
          <el-input
            v-model="canvasConfig.width"
            size="mini"
            type="number"
            placeholder="请输入画布宽度："
          ></el-input>
          <span style="margin: 0 8px">x</span>
          <el-input
            v-model="canvasConfig.height"
            size="mini"
            type="number"
            placeholder="请输入画布高度："
          ></el-input>
        </div>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<script>

import StylesFilter from "../common";
export default {
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
  components: { StylesFilter },
  data() {
    return {
      aa: 10,
      imgList1: [],
    };
  },
  mounted() {
  
  },
  computed: {
    canvasConfig: {
      get() {
        return this.$store.state.canvasConfig
      },
      set(val) {
        console.log("val:::::::::::::::::", val);
        this.$store.commit('SET_CANVASCONFIG', val);
      }
    }
  },
  methods: {
  
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
