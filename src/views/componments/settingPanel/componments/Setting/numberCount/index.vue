<template>
    <el-scrollbar class="right-setting scrollbar-wrapper number">
        
  <el-form
        label-width="110px"
        size="small"
        class="border-box"
        style="padding: 8px 16px"
      >
      <el-form-item label="名称：">
          <div
          class="componentName"
          style="display:flex;align-items:center"
        >
          <el-input
           v-model="config.name"
            size="mini"
            placeholder=""
            @change="(val) => $emit('changeSize', 'name', val)"
          ></el-input>
          <span
            :class="config.isLock? 'active': ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow? 'active': ''"
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
        <el-collapse>
          <el-collapse-item title="文本(数值)" name="title">
            <el-form-item label="显示文本：">
              <el-switch v-model="config.title1.show"  style="margin-top: 7px;"></el-switch>
            </el-form-item>
    <div v-if="config.title1.show">
         <commonTab :config="config.title1" type1="txtFamily"  :isShowFontSet="false" ></commonTab>
            <el-form-item label="渐变颜色：">
              <el-switch v-model="config.title1.linearTxt"  style="margin-top: 7px;"></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title1.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title1.linearTxt"
                  v-model="config.title1.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title1.txtFamily.fontFamily"
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
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距："   >
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item title="文本(名称)">
          <el-form-item label="显示文本：">
            <el-switch v-model="config.title2.show"  style="margin-top: 7px;"></el-switch>
          </el-form-item>
          <div v-if="config.title2.show">
            <commonTab
              :config="config.title2"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>
         
            <el-form-item label="渐变颜色：">
              <el-switch v-model="config.title2.linearTxt"  style="margin-top: 7px;"></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title2.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title2.linearTxt"
                  v-model="config.title2.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title2.txtFamily.fontFamily"
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
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距："   >
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(说明)">
          <el-form-item label="显示文本：">
            <el-switch v-model="config.title3.show"  style="margin-top: 7px;"></el-switch>
          </el-form-item>
          <div v-if="config.title3.show">
            <commonTab
              :config="config.title3"
              type1="txtFamily"
              :isShowFontSet="false"
            ></commonTab>
            <el-form-item label="渐变颜色：">
              <el-switch v-model="config.title3.linearTxt"  style="margin-top: 7px;"></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title3.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title3.linearTxt"
                  v-model="config.title3.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title3.txtFamily.fontFamily"
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
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距："   >
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片1" name="img1">
          <el-form-item label="显示图片：">
            <el-switch v-model="config.backgroundImg1.show"  style="margin-top: 7px;"></el-switch>
          </el-form-item>
          <div v-if="config.backgroundImg1.show">
            <el-form-item label="图片宽度：">
              <el-input
                v-model="config.backgroundImg1.bgImg.width"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片高度：">
              <el-input
                v-model="config.backgroundImg1.bgImg.height"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input v-model="config.backgroundImg1.bgImg.top" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="左边距：">
              <el-input v-model="config.backgroundImg1.bgImg.left" size="mini"></el-input>
            </el-form-item>

            <el-collapse-item title="图标配置" name="rowfour" v-if="config.txtRowImgs&&config.txtRowImgs.length">
              <el-form-item
                v-for="(item, i) in config.txtRowImgs"
                :key="i"
                :label="`图标${i + 1}：`"
              > 
              <!-- 
                   -->
              <el-select
                  popper-class="setting-select"
                  :value="config.txtRowImgs[i].background"
                  placeholder="请选择图片"
                  @change="(val) => changeIcon(i,val)"
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
            </el-collapse-item>
              </div>  
         </el-collapse-item>
        <el-collapse-item title="图片2" name="img2">
          <el-form-item label="显示图片：">
            <el-switch v-model="config.backgroundImg2.show"  style="margin-top: 7px;"></el-switch>
          </el-form-item>
          <div v-if="config.backgroundImg2.show">
            <el-form-item label="图片：">
              <el-select
                  popper-class="setting-select"
                  v-model="config.backgroundImg2.bgImg.background"
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
              <!-- <el-select
                v-model="config.backgroundImg2.bgImg.background"
                placeholder="请选择图片"
              >
                <el-option
                  v-for="(item, i) in imgList2"
                  :label="item.name"
                  :key="i"
                  :value="item.src"
                >
                  <img class="img" :src="item.src" alt="" />
                </el-option>
                
              </el-select> -->
            </el-form-item>

            <el-form-item label="图片宽度：">
              <el-input
                v-model="config.backgroundImg2.bgImg.width"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片高度：">
              <el-input
                v-model="config.backgroundImg2.bgImg.height"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input v-model="config.backgroundImg2.bgImg.top" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="左边距：">
              <el-input v-model="config.backgroundImg2.bgImg.left" size="mini"></el-input>
            </el-form-item>
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
      imgList:[[],[]],
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
    this.getImgData()
  },
  methods: {
    changeIcon(i,v){
      this.$set(this.config.txtRowImgs[i],'background',v)
    },
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
          let b = item.tpyfj ? JSON.parse(item.tpyfj) : [];
          let d = item.tpefj ? JSON.parse(item.tpefj) : [];
          if (b.length > 0) {
            b.forEach((v) => {
              this.imgList[0].push(v.DownloadUrl);
            });
          }
          if (d.length > 0) {
            d.forEach((v) => {
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
