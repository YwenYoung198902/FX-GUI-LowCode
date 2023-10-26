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
          <el-form-item label="主题颜色：">
            <el-color-picker
              v-model="config.box.mainColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选中颜色：">
            <el-color-picker
              v-model="config.box.selectBackground"
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
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="树状配置" name="tree">
          <el-form-item label="宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.tree.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.tree.height"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="上间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.tree.marginTop"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="左间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.tree.marginLeft"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="默认展开第一层：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.tree.isExpandOneLevel"
            ></el-switch>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item title="分屏配置" name="splitScreen">
          <el-form-item label="宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.splitVideo.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.splitVideo.height"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="背景色：">
            <el-color-picker
              v-model="config.box.background"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="内间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.splitVideo.padding"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="视频框背景色：">
            <el-color-picker
              v-model="config.splitVideo.background"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="按钮背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="splitVideo"
              imgType="anbjt"
              type="anbjt"
            />
          </el-form-item>
          <el-form-item label="按钮选中背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="splitVideo"
              imgType="anxzbj"
              type="anxzbj"
            />
          </el-form-item>
          <el-form-item label="未选中背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="splitVideo"
              imgType="wxzsxtmrtp"
              type="wxzsxtmrtp"
            />
          </el-form-item>
          <el-form-item label="无画面背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="splitVideo"
              imgType="whmtp"
              type="whmtp"
            />
          </el-form-item>
          <el-form-item label="分页离底部间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.splitVideo.bottom"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="视频配置" name="camera">
          <div class="txt-box">
            <div class="txt">播放地址：</div>
            <el-input
              v-model="config.camera.videoAddress"
              size="mini"
            ></el-input>
          </div>
          <div class="txt-box">
            <div class="txt">播放回放地址：</div>
            <el-input
              v-model="config.camera.playAddress"
              size="mini"
            ></el-input>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import imgSelect from "../imgSelect";
import commonTab from "../componments/commonTab";
import { getImgData } from "@/utils/index.js";
export default {
  name: "setting",
  components: { imgSelect, commonTab },
  data() {
    return {
      backgroundData: "",
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
  mounted() {
    this.getBackgroundData();
  },
  methods: {
    async getBackgroundData() {
      this.backgroundData = await getImgData(this.config);
    },
  },
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
