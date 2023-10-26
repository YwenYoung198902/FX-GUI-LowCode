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
      <el-form-item label="默认展示隐藏：">
        <el-switch 
        style="margin-top: 7px;"
        v-model="config.isShowModule"
        @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="是否滚动：">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.box.isScroll"
        ></el-switch>
      </el-form-item>
      <!-- <el-form-item label="单条标签宽高：">
        <el-input
        v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="宽度"
        ></el-input>
        <span style="margin: 0 10px">x</span>
        <el-input
          v-model="config.box.height"
          size="mini"
          placeholder="高度"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="单个容器宽：">
        <el-input v-model="config.width" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="单个容器高：">
        <el-input v-model="config.box.height" size="mini"></el-input>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="文本(名称)" name="titleName">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textName.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textName.show">
            <commonTab :config="config" type1="textName"></commonTab>
            <!-- <el-form-item label="宽：">
              <el-input v-model="config.textName.width" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="高：">
              <el-input v-model="config.textName.height" size="mini"></el-input>
            </el-form-item> -->
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textName.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <el-form-item label="下边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textName.marginBottom"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item> -->
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(时间)" name="titleTime">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textTime.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textTime.show">
            <commonTab :config="config" type1="textTime"></commonTab>
            <el-form-item label="宽：">
              <el-input v-model="config.textTime.width" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="高：">
              <el-input v-model="config.textTime.height" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTime.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <el-form-item label="下边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTime.marginBottom"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item> -->
          </div>
        </el-collapse-item>

        <el-collapse-item title="文本(地址)" name="titleAddress">
          <el-form-item label="显示文本：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textAddress.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textAddress.show">
            <commonTab :config="config" type1="textAddress"></commonTab>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textAddress.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <el-form-item label="下边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textAddress.marginBottom"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item> -->
          </div>
          <!-- <el-form-item label="显示图片：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textAddress.imgShow"
            ></el-switch>
          </el-form-item> -->
          <!-- <div v-if="config.textAddress.imgShow">
            <el-form-item label="图片：">
              <el-select
                v-model="config.textAddress.src"
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
              </el-select>
            </el-form-item>
          </div> -->
        </el-collapse-item>

        <el-collapse-item title="标签一" name="tag1">
          <el-form-item label="显示标签：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textTag.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textTag.show">
            <commonTab :config="config" type1="textTag"></commonTab>
            <el-form-item label="背景颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.textTag.background"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="宽：">
              <el-input v-model="config.textTag.minWidth" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="高：">
              <el-input v-model="config.textTag.height" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="行间距：">
              <el-input v-model="config.textTag.lineheight" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input v-model="config.textName.marginTop" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="右边距：">
              <el-input v-model="config.textTag.marginRight" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="枚举文本颜色：">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addColorTag()"
                >添加颜色配置</el-button
              >
            </el-form-item>
            <el-form-item
              class="no-margin"
              v-for="(v, index) in config.tagColor"
            >         
                <el-input
                v-model="v.label"
                size="mini"
                placeholder="请输入值"
              ></el-input>
              字体颜色：<el-color-picker
                v-model="v.color"
                size="mini"
                style="margin-left: 5px;margin-right:15px"
                show-alpha
              ></el-color-picker>
              背景颜色：<el-color-picker
                v-model="v.backgroundColor"
                size="mini"
                style="margin-left: 5px;"
                show-alpha
              ></el-color-picker>
              <i
                style="color: red"
                class="el-icon-delete"
                @click="delColorTag(i, index)"
              />
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="标签二" name="tag2">
          <el-form-item label="显示标签：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textStatus.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.textStatus.show" style="position: relative;">
            <div class="hidden"></div>
            <commonTab :config="config" type1="textStatus"></commonTab>
            
            <el-form-item label="宽：">
              <el-input v-model="config.textStatus.minWidth" size="mini"></el-input>
            </el-form-item>
            <!-- <el-form-item label="高：">
              <el-input v-model="config.textStatus.height" size="mini"></el-input>
            </el-form-item> -->
            <el-form-item label="上边距：">
              <el-input v-model="config.textAddress.marginTop" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="右边距：">
              <el-input v-model="config.textStatus.marginRight" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="枚举文本颜色：">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addColorData()"
                >添加颜色配置</el-button
              >
            </el-form-item>
            <el-form-item
              class="no-margin"
              v-for="(v, index) in config.statusColor"
            >
              <el-input
                v-model="v.label"
                size="mini"
                placeholder="请输入值"
              ></el-input>
              <el-color-picker
                v-model="v.color"
                size="mini"
                style="margin-left: 5px;"
                show-alpha
              ></el-color-picker>
              <i
                style="color: red"
                class="el-icon-delete"
                @click="delColor(i, index)"
              />
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片" name="alarmImg">
          <div>
            <el-form-item label="宽：">
              <el-input v-model="config.alarmImg.width" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="高：">
              <el-input v-model="config.alarmImg.height" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="自适应：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.alarmImg.auto"
              ></el-switch>
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
          src: require("@/assets/image/pos.png"),
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
    addColorData(i) {
      this.config.statusColor.push({
        label: "",
        color: "",
      });
    },
    delColor(i, index) {
      this.config.statusColor.splice(index, 1);
    },
    // 事件来源
    addColorTag(i) {
      this.config.tagColor.push({
        label: "",
        color: "",
        backgroundColor:'',
      });
    },
    delColorTag(i, index) {
      this.config.tagColor.splice(index, 1);
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
  .hidden{
    width: 100px;
    height: 30px;
    background-color: #1c1c1f;
    position: absolute;
    right: 100px;
    top: 0;
  }
}
</style>
