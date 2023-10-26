<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="90px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div class="componentName" style="display:flex;align-items:center">
          <el-input
            v-model="config.name"
            size="mini"
            placeholder=""
            @change="(val) => $emit('changeSize', 'name', val)"
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

      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'width', val)"
          placeholder="请输入组件宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="请输入组件高度"
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
        <el-collapse-item title="文本(数值)" name="titleNumber">
          <div style="position: relative;">
            <div class="hidden"></div>
            <commonTab
              :config="config"
              type1="textNumber"
              :isShowFontSet="false"
            ></commonTab>

            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textNumber.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.textNumber.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textNumber.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="图片：">
              <imgSelect
                :backgroundData="backgroundData"
                :config="config"
                datatype1="textNumber"
                type="img"
              />
              <!-- <el-select
                v-model="config.textNumber.background"
                placeholder="请选择图片"
              >
                <el-option
                  v-for="(item, i) in imgList"
                  :label="item.name"
                  :key="i"
                  :value="item.src"
                >
                  <img class="img" :src="item.src" alt="" />
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textNumber.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textNumber.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="文字上边距：" label-width="110px">
              <div class="flex align-center">
                <el-input
                  v-model="config.textNumber.topnumber"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="展示位数：">
              <el-input
                v-model="config.dataLength"
                size="mini"
                @change="(val) => $emit('changeSize', 'dataLength', val)"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="背景图：">
              <el-switch
              style="margin-top: 7px;"
               v-model="config.textNumber.isBacaground"></el-switch>
            </el-form-item> -->
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(前缀)" name="title">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textForword.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textForword.show">
            <commonTab
              :config="config.textForword"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.textForword.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="高度：">
              <el-input
                v-model="config.textForword.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="文本内容：">
              <el-input
                v-model="config.textForword.txt"
                size="mini"
                placeholder="请输入文本内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textForword.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.textForword.txtFamily.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textForword.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>

            <!-- <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textForword.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item> -->
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textForword.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item title="文本(后缀)" name="titleAfter">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textAfter.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textAfter.show">
            <commonTab
              :config="config.textAfter"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.textAfter.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="高度：">
              <el-input
                v-model="config.textAfter.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="文本内容：">
              <el-input
                v-model="config.textAfter.txt"
                size="mini"
                placeholder="请输入文本内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textAfter.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.textAfter.txtFamily.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textAfter.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>

            <!-- <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textAfter.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item> -->
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textAfter.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getImgData } from "@/utils/index.js";
import commonTab from "../componments/commonTab";
import imgSelect from "../imgSelect";
export default {
  name: "setting",
  components: { commonTab, imgSelect },
  data() {
    return {
      directionOption: [
        {
          label: "纵向",
          value: "vertical",
        },
        {
          label: "横向",
          value: "horizontal",
        },
      ],
      iconOption: [
        {
          label: "圆形",
          icon: "circle",
        },
        {
          label: "矩形",
          icon: "rect",
        },
        {
          label: "圆矩形",
          icon: "roundRect",
        },
        {
          label: "三角形",
          icon: "triangle",
        },
        {
          label: "菱形",
          icon: "diamond",
        },
        {
          label: "椭圆形",
          icon: "pin",
        },
      ],
      orientOption: [
        {
          label: "水平",
          value: "horizontal",
        },
        {
          label: "垂直",
          value: "vertical",
        },
      ],
      positionOption: [
        {
          label: "内部",
          value: "inside",
        },
        {
          label: "外部",
          value: "outside",
        },
      ],
      fontList: [
        "Helvetica Neue",
        "Helvetica",
        "PingFang SC",
        "Hiragino Sans GB",
        "Microsoft YaHei",
        "Arial",
        "sans - serif",
      ],
      imgList: [
        {
          name: "图1",
          src: require("@/assets/component/img/scroll-bg.png"),
        },
        {
          name: "图2",
          src: require("@/assets/component/img/scroll-bg2.png"),
        },
      ],
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
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.right-setting {
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
    display: flex;
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
  .hidden {
    width: 100px;
    height: 30px;
    background-color: #1c1c1f;
    position: absolute;
    right: 100px;
    top: 0;
  }
}
</style>
