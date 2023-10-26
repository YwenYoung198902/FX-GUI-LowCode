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
        <el-collapse-item title="tab标签" name="title">
          <commonTab :config="config" type1="defaultTxt"></commonTab>
          <el-form-item label="标签宽度：">
            <el-input
              v-model="config.contain.width"
              size="mini"
              placeholder="标签宽度"
            ></el-input>
          </el-form-item>
          <el-form-item label="标签高度：">
            <el-input
              v-model="config.contain.height"
              size="mini"
              placeholder="标签高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="排列方向：">
            <el-select v-model="config.contain.direction">
              <el-option label="横" value="row"></el-option>
              <el-option label="竖" value="column"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="默认选中：">
            <div class="flex" style="color: #fff">
              <div style="margin-right: 10px">第</div>
              <el-input-number
                v-model="config.contain.defaultIndex"
                :min="1"
                :max="config.data.length"
                label=""
              ></el-input-number>
              <div style="margin-left: 10px">个</div>
            </div>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.defaultTxt.backgroundColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="边框：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.defaultTxt.borderColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
              <span style="margin-right: 15px;">粗细</span>
              <el-slider v-model="config.defaultTxt.borderWidth"></el-slider>
            </div>
          </el-form-item>
          <el-form-item label="选中字体：">
        <el-select
          popper-class="setting-select"
          v-model="config.ActiveTxt.fontFamily"
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
          <el-form-item label="选中字体颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.ActiveTxt.color"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="选中背景颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.ActiveTxt.backgroundColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="选中边框颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.ActiveTxt.borderColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
              <span style="margin-right: 15px;">粗细</span>
              <el-slider v-model="config.ActiveTxt.borderWidth"></el-slider>
            </div>
          </el-form-item>
          <el-form-item label="行高：">
            <div class="flex align-center">
              <el-input
                v-model="config.defaultTxt.lineHeight"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
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
            :title="`tab ${i + 1} 配置：`"
            style="margin-top:2px;"
          >
            <el-form-item label="图片：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.dataStyle[i].isShowImg"
              ></el-switch>
            </el-form-item>
            <span v-if="config.dataStyle[i].isShowImg">
              <el-form-item label="图片：">
                <el-select
                  v-model="config.dataStyle[i].img"
                  placeholder="请选择图片"
                >
                  <el-option
                    v-for="(item, i) in imgList[0]"
                    :key="i"
                    :label="item"
                    :value="item"
                  >
                    <img class="img" :src="item" alt="" />
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选中图片：">
                <el-select
                  v-model="config.dataStyle[i].activeImg"
                  placeholder="请选择选中图片"
                >
                  <el-option
                    v-for="(item, i) in imgList[1]"
                    :key="i"
                    :label="item"
                    :value="item"
                  >
                    <img class="img" :src="item" alt="" />
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="图片宽度：">
                <el-input v-model="config.dataStyle[i].width" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input v-model="config.dataStyle[i].height" size="mini"></el-input>
              </el-form-item>
            </span>
            <el-form-item label="文本：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.dataStyle[i].isShowTxt"
              ></el-switch>
            </el-form-item>
            <span v-if="config.dataStyle[i].isShowTxt">
              <el-form-item label="文本：">
                <div class="flex align-center">
                  <el-input v-model="item.name" size="mini"></el-input>
                </div>
              </el-form-item>
            </span>
            <el-button
              type="danger"
              size="mini"
              @click="delData(i)"
              style="margin-left:110px"
              >删除Tab</el-button
            >
          </el-collapse-item>
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
      fontList: ["YouSheBiaoTiHei", "Microsoft YaHei", "Helvetica"],
      imgList: [[],[]
        // { src: require("@/assets/image/xiaokunshan/icon1.png") },
        // { src: require("@/assets/image/xiaokunshan/icon2.png") },
        // { src: require("@/assets/image/xiaokunshan/aicon1.png") },
        // { src: require("@/assets/image/xiaokunshan/aicon2.png") },
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
  created() {
    this.getImgData()
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
      let dataImg = data
      this.imgList=[[],[]]
      dataImg.rows.forEach((item) => {
        if (item.sfqy === "启用") {
          let d = item.default_img ? JSON.parse(item.default_img) : [];
          let b = item.active_img ? JSON.parse(item.active_img) : [];
          if (d.length > 0) {
            d.forEach((v) => {
              this.imgList[0].push(v.DownloadUrl);
            });
          }
          if (b.length > 0) {
            b.forEach((v) => {
              this.imgList[1].push(v.DownloadUrl);
            });
          }
        }
      });
    },
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addShowTab() {
      this.config.data.push({});
      this.config.dataStyle.push({
        isShowImg: false,
        isShowTxt:true,
        img: "",
        activeImg: "",
        width:24,
        height:24,
      });
    },
    delData(i) {
      this.config.data.splice(i, 1);
      this.config.dataStyle.splice(i, 1);
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
  .el-slider {
    width: 93px;
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
