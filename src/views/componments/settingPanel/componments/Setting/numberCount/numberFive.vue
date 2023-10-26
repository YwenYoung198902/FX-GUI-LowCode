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
          <el-input v-model="config.name" size="mini" placeholder=""></el-input>
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
      <el-form-item label="默认展示数量：">
        <div class="flex" style="color: #fff">
          <el-input-number
            v-model="config.contain.arrangeNum"
            :min="1"
            :max="config.data.length"
            label=""
          ></el-input-number>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <el-form-item label="是否显示翻页按钮：" label-width="138px">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.contain.scroll"
        ></el-switch>
      </el-form-item>
      <el-form-item label="间隔时间：" v-show="config.contain.scroll">
        <div class="flex align-center">
          <el-input
            v-model="config.contain.time"
            size="mini"
            style="margin: 0 8px 0 0px"
          ></el-input
          >秒
        </div>
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
      <el-form-item label="容器右边距：">
        <el-input
          v-model="config.contain.marginRight"
          size="mini"
          placeholder="请输入右边距高度"
        ></el-input>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="文本(名称)" name="titleNumber">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textTitle.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.textTitle.show">
            <commonTab :config="config" type1="textTitle"></commonTab>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTitle.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(数值一)" name="rowone">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowOne.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowOne.show">
            <commonTab :config="config" type1="txtRowOne"></commonTab>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowOne.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(数值二)" name="rowTwo">
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
            <el-form-item label="字体颜色(左中右)：" label-width="135px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowtwo.colorLeft"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.txtRowtwo.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.txtRowtwo.colorRight"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>

            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片" name="rowThree">
          <el-form-item label="背景图：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.contain.show"
            ></el-switch>
          </el-form-item>
          <el-form-item label="背景图片：" v-if="config.contain.show">
            <el-select
              popper-class="setting-select"
              v-model="config.contain.background"
              placeholder="请选择图片"
              clearable
            >
              <el-option
                v-for="(item, i) in imgList[0]"
                :key="i"
                :label="item"
                :value="item"
              >
                <div class="img-box">
                  <img :src="item" />
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="背景色：" v-else>
            <div class="flex align-center">
              <el-color-picker
                v-model="config.contain.backgroundColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="选中边框颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.contain.borderColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="中心图标：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowImg.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowImg.show">
            <el-form-item label="中心图标宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>

            <el-form-item label="中心图标高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.marginLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-collapse-item
              title="图标配置"
              name="rowfour"
              v-if="config.txtRowImgs && config.txtRowImgs.length"
            >
              <el-form-item
                v-for="(item, i) in config.txtRowImgs"
                :key="i"
                :label="`图标${i + 1}：`"
              >
                <el-select
                  popper-class="setting-select"
                  v-model="config.txtRowImgs[i].background"
                  placeholder="请选择图片"
                  clearable
                >
                  <el-option
                    v-for="(item, i) in imgList[1]"
                    :key="i"
                    :label="item"
                    :value="item"
                  >
                    <div class="img-box">
                      <img :src="item" />
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-collapse-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import { appKey, sign } from "@/utils/const.js";
import { getFilterRows } from "@/utils/api";
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
      fontList: ["Microsoft YaHei"],
      imgList: [[], []],
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
  watch: {
  'config.txtRowImgs':{
      handler(nVal, oVal) {
      },
      deep: true,
    },
  },
  created() {
    this.getImgData();
  },
  methods: {
    async getImgData() {
      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.worksheetId,
        pageSize: 500,
        pageIndex: 1,
      });
      let dataImg = data;
      this.imgList = [[], []];
      dataImg.rows.forEach((item) => {
        if (item.sfqy === "启用") {
          let d = item.center_img ? JSON.parse(item.center_img) : [];
          let b = item.background_img ? JSON.parse(item.background_img) : [];
          if (d.length > 0) {
            d.forEach((v) => {
              this.imgList[1].push(v.DownloadUrl);
            });
          }
          if (b.length > 0) {
            b.forEach((v) => {
              this.imgList[0].push(v.DownloadUrl);
            });
          }
        }
      });
    },
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
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
