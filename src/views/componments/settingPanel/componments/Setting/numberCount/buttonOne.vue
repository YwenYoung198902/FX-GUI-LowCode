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
      <el-collapse>
        <el-collapse-item title="按钮图片" name="titleNumber">
          <div>
            <el-form-item label="默认图片：">
              <imgSelect
          :backgroundData="backgroundData"
                :config="config"
                datatype1="backgroundImg"
                type="default_img"
              />
            </el-form-item>
            <!-- <el-form-item label="选中图片：">
              <imgSelect
                :config="config"
                datatype1="backgroundActive"
                type="active_img"
              />
            </el-form-item> -->

            <div v-if="config.buttonStyle.imgShow">
              <el-form-item label="图片宽度：">
                <el-input
                  v-model="config.buttonStyle.width"
                  size="mini"
                  placeholder="请输入图片宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input
                  v-model="config.buttonStyle.height"
                  size="mini"
                  placeholder="请输入图片高度"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="按钮是否显示文字：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.buttonStyle.txtShow"
              ></el-switch>
            </el-form-item>
            <div v-if="config.buttonStyle.txtShow">
              <el-form-item label="文字内容：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.buttonStyle.txt"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="文字颜色：">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.buttonStyle.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="字体大小：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.buttonStyle.fontSize"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="行间距：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.buttonStyle.lineHeight"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
            </div>
          </div>
          <el-collapse-item
            title="浮入时文字"
            style="margin-bottom:5px"
            name="hoverTxt"
          >
            <el-form-item label="是否显示浮入文字：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.buttonStyle.hoverShow"
              ></el-switch>
            </el-form-item>

            <div v-if="config.buttonStyle.hoverShow">
              <el-form-item label="边框图片：">
                <imgSelect
          :backgroundData="backgroundData"
                  :config="config"
                  datatype1="hoverStyle"
                  type="hover_img"
                />
              </el-form-item>
              <el-form-item label="图片宽度：">
                <el-input
                  v-model="config.hoverStyle.width"
                  size="mini"
                  placeholder="请输入图片宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input
                  v-model="config.hoverStyle.height"
                  size="mini"
                  placeholder="请输入图片高度"
                ></el-input>
              </el-form-item>
              <el-form-item label="文字内容：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.txt"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="文字颜色：">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.hoverStyle.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="字体大小：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.fontSize"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="行间距：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.lineHeight"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="下拉选项" name="droupOption">
            <el-form-item label="是否显示下拉选项：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.optionStyle.optionShow"
              ></el-switch>
            </el-form-item>

            <div v-if="config.optionStyle.optionShow">
              <el-form-item label="宽度：">
                <el-input
                  v-model="config.optionStyle.width"
                  size="mini"
                  placeholder="请输入宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="高度：">
                <el-input
                  v-model="config.optionStyle.height"
                  size="mini"
                  placeholder="请输入..."
                ></el-input>
              </el-form-item>
              <el-form-item label="文本缩进值：">
                <el-input
                  v-model="config.optionStyle.span.textIndent"
                  size="mini"
                  placeholder="请输入..."
                ></el-input>
              </el-form-item>
              <el-form-item label="行间距：">
                <el-input
                  v-model="config.optionStyle.span.height"
                  size="mini"
                  placeholder="请输入高度"
                ></el-input>
              </el-form-item>
              <el-form-item label="边框颜色：" label-width="125px">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.optionStyle.borderColor"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="填充颜色：" label-width="125px">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.optionStyle.background"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="鼠标滑过背景色：" label-width="125px">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.optionStyle.span.background"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <div class="button-box">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addShowTab"
                  >添加Tab</el-button
                >
              </div>
              <el-collapse-item
                v-for="(item, i) in config.data"
                :key="i"
                :title="`选项 ${i + 1} 配置：`"
                style="margin-top:2px;"
              >
                <el-form-item label="文本：">
                  <div class="flex align-center">
                    <el-input v-model="item.name" size="mini"></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="文本颜色：">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="item.color"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
                <el-form-item label="字体大小：">
                  <div class="flex align-center">
                    <el-input v-model="item.fontSize" size="mini"></el-input>
                  </div>
                </el-form-item>
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData(i)"
                  style="margin-left:110px"
                  >删除Tab</el-button
                >
              </el-collapse-item>
            </div>
          </el-collapse-item>
          <!-- <StylesFilter
                    @changeOpenFilter="(val) => $emit('changeSize', 'openFilter', val)"
                    :openFilter="config.openFilter"
                    :filterObj="config.filterObj"
                    @changefilterObj="changefilterObj"
                ></StylesFilter> -->
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getImgData } from "@/utils/index.js";
import commonTab from "../componments/commonTab";
import imgSelect from "../imgSelect";
import StylesFilter from "../common";
export default {
  name: "setting",
  components: { commonTab, imgSelect, StylesFilter },
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
    addShowTab() {
      this.config.data.push({
        color: "#fff",
        fontSize: 14,
        name: "默认文本",
      });
      //   this.config.dataStyle.push({
      //     isShowImg: false,
      //     img: "",
      //     activeImg: "",
      //   });
    },
    delData(i) {
      this.config.data.splice(i, 1);
      //   this.config.dataStyle.splice(i, 1);
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
