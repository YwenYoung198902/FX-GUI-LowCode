<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="110px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div class="componentName" style="display:flex;align-items:center">
          <el-input
            v-model="config.name"
            @change="(val) => $emit('changeSize', 'name', val)"
            size="mini"
            placeholder=""
          ></el-input>
          <span
            :class="config.isLock ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'width', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="默认展示隐藏：" label-width="110px">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="基本配置" name="base">
          <txtGradient
            :config="config"
            type="box"
            gradientType="background"
            txt="背景是否渐变："
          />
          <!-- <el-form-item label="背景颜色：">
            <el-input v-model="config.box.background" size="mini"></el-input>
          </el-form-item> -->
          <el-form-item label="字体颜色：">
            <el-color-picker
              v-model="config.box.color"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-collapse-item title="温度配置" name="temperature">
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input v-model="config.box.fontSize1" size="mini"></el-input>
                px
              </div>
            </el-form-item>
            <el-form-item label="字体是否加粗：">
              <el-switch
                v-model="config.box.fontWeight1"
                active-value="bold"
                inactive-value="normal"
              >
              </el-switch>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="天气配置" name="weather">
            <el-form-item label="是否展示天气：">
              <el-switch v-model="config.box.isShowWeather"> </el-switch>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input v-model="config.box.fontSize2" size="mini"></el-input>
                px
              </div>
            </el-form-item>
            <el-form-item label="字体是否加粗：">
              <el-switch
                v-model="config.box.fontWeight2"
                active-value="bold"
                inactive-value="normal"
              >
              </el-switch>
            </el-form-item>
          </el-collapse-item>

          <el-collapse-item title="分割线配置" name="line">
            <el-form-item label="是否显示：">
              <el-switch v-model="config.box.isShowLine"> </el-switch>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.lineHeight"
                  size="mini"
                ></el-input>
                px
              </div>
            </el-form-item>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import txtGradient from "../componments/txtGradient";
export default {
  name: "setting",
  components: { commonTab, txtGradient },
  data() {
    return {};
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.right-setting {
  .txt-box {
    margin-bottom: 18px;
    .txt {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0em;
      color: #ffffff;
      line-height: 32px;
    }
  }
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
