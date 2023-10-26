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
          <el-form-item label="地图主题：">
            <el-input v-model="config.box.map" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="人员可多选：">
            <el-switch v-model="config.box.ismultiple"></el-switch>
          </el-form-item>
          <el-form-item label="主题颜色：">
            <el-color-picker
              v-model="config.box.mainColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选择框背景色：">
            <el-color-picker
              v-model="config.box.selectBg"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <commonTab
            :config="config"
            type1="box"
            :isShowLetterSpacing="false"
            :isShowFontStyle="false"
          ></commonTab>
          <el-form-item label="顶部框宽度：">
            <div class="flex align-center">
              <el-input v-model="config.option.width" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="顶部框高度：">
            <div class="flex align-center">
              <el-input v-model="config.option.height" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="顶部框y距离：">
            <div class="flex align-center">
              <el-input v-model="config.option.top" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="时间条宽度：">
            <div class="flex align-center">
              <el-input v-model="config.time.width" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="时间条高度：">
            <div class="flex align-center">
              <el-input v-model="config.time.height" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="播放暂停图标：">
            <div class="flex align-center">
              <el-input v-model="config.time.iconSize" size="mini"></el-input>
              px
            </div>
          </el-form-item>
          <el-form-item label="速度框宽度：">
            <div class="flex align-center">
              <el-input v-model="config.time.speedWidth" size="mini"></el-input>
              px
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="路线配置" name="polyline">
          <el-form-item label="默认展示路线：">
            <el-switch v-model="config.polyline.isShow"></el-switch>
          </el-form-item>
          <el-form-item label="宽度：">
            <el-input v-model="config.polyline.width" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="颜色：">
            <el-color-picker
              v-model="config.polyline.color"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="样式：">
            <el-select
              v-model="config.polyline.style"
              placeholder="请选择路线样式"
            >
              <el-option label="solid" value="solid"></el-option>
              <el-option label="dashed" value="dashed"></el-option>
            </el-select>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="接口配置" name="apiset">
          <div class="txt-box">
            <div class="txt">获取人员数据：</div>
            <el-input
              v-model="config.track.trackPersonApi"
              size="mini"
            ></el-input>
          </div>
          <div class="txt-box">
            <div class="txt">获取轨迹记录：</div>
            <el-input
              v-model="config.track.trackRecordApi"
              size="mini"
            ></el-input>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
export default {
  name: "setting",
  components: { commonTab },
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
