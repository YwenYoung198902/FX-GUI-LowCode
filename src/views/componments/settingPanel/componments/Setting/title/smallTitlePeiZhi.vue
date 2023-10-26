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
        <el-collapse-item title="文本" name="title">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textStyle.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textStyle.show">
            <commonTab
              :config="config"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>
            <el-form-item label="标题：">
              <el-input
                v-model="config.txt"
                size="mini"
                @change="(val) => $emit('changeSize', 'txt', val)"
                placeholder="请输入文本内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="渐变颜色：">
              <el-switch
                v-model="config.textStyle.linearTxt"
                style="margin-top: 7px;"
              ></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.textStyle.linearTxt"
                  v-model="config.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtFamily.fontFamily"
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
            <el-form-item label="缩进：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStylePx.textIndent"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStylePx.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片" name="img">
          <el-form-item label="显示图片：">
            <el-switch
              v-model="config.textStyle.imgShow"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textStyle.imgShow">
            <el-form-item label="图片：">
              <imgSelect
                :backgroundData="backgroundData"
                :config="config"
                datatype1="bgImg"
                type="title_name"
              />
              <!-- <el-select v-model="config.bgImg.src" placeholder="请选择图片">
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
            <!-- <el-form-item label="图片宽度：">
              <el-input v-model="config.imgPos.width" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="图片高度：">
              <el-input v-model="config.imgPos.height" size="mini"></el-input>
            </el-form-item> -->
            <el-form-item label="左边距：">
              <el-input v-model="config.imgPos.left" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input v-model="config.imgPos.top" size="mini"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import imgSelect from "../imgSelect";
import { getImgData } from "@/utils/index.js";
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
      fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
      imgList: [
        { name: "图1", src: require("@/assets/component/img/titlebg1.png") },
        { name: "图1", src: require("@/assets/component/img/titlebg2.png") },
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
