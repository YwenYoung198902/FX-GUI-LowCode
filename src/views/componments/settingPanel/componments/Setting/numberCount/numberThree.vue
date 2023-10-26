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
          <el-input v-model="config.name" size="mini" placeholder="" @change="(val) => $emit('changeSize', 'name', val)"></el-input>
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
        <el-form-item label="默认展示隐藏：" >
        <el-switch 
          style="margin-top: 7px;"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>
        <el-form-item label="单个容器宽度：">
          <el-input
            v-model="config.contain.width"
            size="mini"
            placeholder="请输入单个容器宽度"
          ></el-input>
        </el-form-item>
        <el-form-item label="单个容器高度：">
          <el-input
            v-model="config.contain.height"
            size="mini"
            placeholder="请输入单个容器高度"
          ></el-input>
        </el-form-item>
        <el-form-item label="排列：">
        <div
          class="flex"
          style="color: #fff"
        >
          <div style="margin-right: 10px">一行</div>
          <el-input-number
            v-model="config.contain.arrangeNum"
            :min="1"
            :max="config.data.length"
            label=""
          ></el-input-number>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <!-- <el-form-item label="是否滚动：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.contain.scroll"
            ></el-switch>
          </el-form-item> -->
      <el-form-item label="容器右边距：">
        <el-input
          v-model="config.contain.marginRight"
          size="mini"
          placeholder="请输入右边距高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="容器下边距：">
        <el-input
          v-model="config.contain.marginBottom"
          size="mini"
          placeholder="请输入下边距高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="背景颜色：">
        <div class="flex align-center">
          <el-color-picker
            v-model="config.contain.backgroundColor[0]"
            show-alpha
            size="mini"
            style="margin-right: 5px;"
          ></el-color-picker>
          <el-color-picker
            v-model="config.contain.backgroundColor[1]"
            show-alpha
            size="mini"
            style="margin-right: 5px;"
          ></el-color-picker>
          <el-color-picker
            v-model="config.contain.backgroundColor[2]"
            show-alpha
            size="mini"
            style="margin-right: 5px;"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="边框颜色：">
        <div class="flex align-center">
          <el-color-picker
            v-model="config.contain.borderColor"
            show-alpha
            size="mini"
            style="margin-right: 5px;"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="文本(标题)" name="titleNumber">
          <div>
            <commonTab
              :config="config"
              type1="textTitle"
              :isShowFontSet="false"
            ></commonTab>

            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTitle.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.textTitle.fontFamily"
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
            <el-form-item label="字体颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textTitle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="背景颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textTitle.backgroundColor[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.textTitle.backgroundColor[1]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="边框颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textTitle.borderColor"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTitle.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTitle.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(第一行)" name="rowone">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowOne.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowOne.show">
            <commonTab
              :config="config"
              type1="txtRowOne"
              :isShowFontSet="false"
            ></commonTab>

            <!-- <el-form-item label="高度：">
                <div class="flex align-center">
                  <el-input
                  v-model="config.txtRowOne.height"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item> -->
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtRowOne.fontFamily"
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
            <el-form-item label="字体颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowOne.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowOne.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowOne.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="后缀文字：">
              <el-input
                v-model="config.txtRowOne.txt"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowOne.txtStyle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowOne.txtStyle.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(第二行)" name="rowTwo">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowtwo.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowtwo.show">
            <commonTab
              :config="config"
              type1="txtRowtwo"
              :isShowFontSet="false"
            ></commonTab>

            <!-- <el-form-item label="高度：">
                <div class="flex align-center">
                  <el-input
                  v-model="config.txtRowtwo.height"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item> -->
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtRowtwo.fontFamily"
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
            <el-form-item label="字体颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowtwo.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="后缀文字：">
              <el-input
                v-model="config.txtRowtwo.txt"
                size="mini"
                placeholder="请选择文字内容"
                style="margin: 0 8px 0 0px"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowtwo.txtStyle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.txtStyle.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(第三行)" name="rowThree">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowthree.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowthree.show">
            <commonTab
              :config="config"
              type1="txtRowthree"
              :isShowFontSet="false"
            ></commonTab>

            <!-- <el-form-item label="高度：">
                <div class="flex align-center">
                  <el-input
                  v-model="config.txtRowthree.height"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item> -->
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtRowthree.fontFamily"
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
            <el-form-item label="字体颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowthree.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowthree.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowthree.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="后缀文字：">
              <el-input
                v-model="config.txtRowthree.txt"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowthree.txtStyle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowthree.txtStyle.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(第四行)" name="rowfour">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowfour.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowfour.show">
            <commonTab
              :config="config"
              type1="txtRowfour"
              :isShowFontSet="false"
            ></commonTab>

            <!-- <el-form-item label="高度：">
                <div class="flex align-center">
                  <el-input
                  v-model="config.txtRowfour.height"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item> -->
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtRowfour.fontFamily"
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
            <el-form-item label="字体颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowfour.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowfour.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowfour.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="后缀文字：">
              <el-input
                v-model="config.txtRowfour.txt"
                size="mini"
                placeholder="请选择文字内容"
                style="margin: 0 8px 0 0px"
              ></el-input>
            </el-form-item>
            <el-form-item label="字体颜色(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowfour.txtStyle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小(后缀)：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowfour.txtStyle.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="线" name="line">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.line.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.line.show">
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.line.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.line.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.line.backgroundColor[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.line.backgroundColor[1]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.line.backgroundColor[2]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.line.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="下边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.line.marginBottom"
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
import commonTab from "../componments/commonTab";
export default {
  name: "setting",
  components: { commonTab },
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
        "Microsoft YaHei",
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
        {
          name: "图3",
          src: require("@/assets/component/img/bg.png"),
        },
      ],
      imgList2: [
        {
          name: "图1",
          src: require("@/assets/component/img/bg.png"),
        },
        {
          name: "图2",
          src: require("@/assets/component/img/bg-active.png"),
        },
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
  methods: {
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
  .componentName {
    display: flex;
    align-items: center;

    .el-input {
      flex: 1;
    }

    > span:nth-of-type(1) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url("../../../../../../assets/image/jiesuo.png");
      cursor: pointer;

      &.active {
        background-image: url("../../../../../../assets/image/suoding.png");
      }
    }

    > span:nth-of-type(2) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url("../../../../../../assets/image/yanjing_yincang.png");
      cursor: pointer;

      &.active {
        background-image: url("../../../../../../assets/image/yanjing_xianshi.png");
      }
    }
  }
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
