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
      <el-form-item label="默认展示隐藏：">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="单个容器宽度：">
        <el-input
          v-model="config.text.width"
          size="mini"
          placeholder="请输入单个容器宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="单个容器高度：">
        <el-input
          v-model="config.text.height"
          size="mini"
          placeholder="请输入单个容器高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="下边距：">
        <el-input
          v-model="config.text.marginBottom"
          size="mini"
          placeholder="请输入下边距高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="显示背景图：">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.text.isBacagroundImg"
        ></el-switch>
      </el-form-item>
      <div v-if="config.text.isBacagroundImg">
        <el-form-item label="图片：">
          <imgSelect
            :backgroundData="backgroundData"
            :config="config"
            datatype1="backgroundImg"
            type="img"
          />
        </el-form-item>
        <el-form-item label="选中时图片：">
          <imgSelect
            :backgroundData="backgroundData"
            :config="config"
            datatype1="backgroundActive"
            type="img_active"
          />
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="背景：">
          <div class="flex align-center">
            <el-color-picker
              v-model="config.backgroundColors.backgroundColor"
              show-alpha
              size="mini"
              style="margin-right: 5px;"
            ></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="边框：">
          <div class="flex align-center">
            <el-color-picker
              v-model="config.backgroundColors.borderColor"
              show-alpha
              size="mini"
              style="margin-right: 5px;"
            ></el-color-picker>
          </div>
        </el-form-item>

        <el-form-item label="选中时背景：">
          <div class="flex align-center">
            <el-color-picker
              v-model="config.backgroundColorsActive.backgroundColor"
              show-alpha
              size="mini"
              style="margin-right: 5px;"
            ></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="选中时边框：">
          <div class="flex align-center" style="color: aliceblue;">
            <el-color-picker
              v-model="config.backgroundColorsActive.borderColor"
              show-alpha
              size="mini"
              style="margin-right: 5px;"
            ></el-color-picker>
          </div>
        </el-form-item>
        <el-form-item label="边框宽度：">
          <el-input
            v-model="config.backgroundColors.borderWidth"
            size="mini"
            placeholder="请输入边框宽度"
          ></el-input>
        </el-form-item>
      </div>
      <el-collapse>
        <el-collapse-item title="文本" name="titleNumber">
          <div>
            <commonTab
              :config="config"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>

            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.text.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
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
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.text.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="文字缩进：">
              <div class="flex align-center">
                <el-input
                  v-model="config.text.textIndent"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.text.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <el-form-item label="背景图：">
                <el-switch
                style="margin-top: 7px;"
                 v-model="config.textNumber.isBacaground"></el-switch>
              </el-form-item> -->
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import { getImgData } from "@/utils/index.js";
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
      fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
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
}
</style>
