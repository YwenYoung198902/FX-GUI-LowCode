<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="136px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />

      <el-collapse>
        <el-collapse-item title="组件配置">
          <el-form-item label="是否使用背景图：">
            <el-switch
              v-model="config.isShowBackgroundImg"
              @change="(val) => $emit('changeSize', 'isShowBackgroundImg', val)"
            ></el-switch>
          </el-form-item>
          <el-form-item label="背景图：" v-if="config.isShowBackgroundImg">
            <el-select
              popper-class="setting-select"
              v-model="config.background"
              placeholder="请选择背景图"
              @change="(val) => $emit('changeSize', 'background', val)"
            >
              <el-option
                v-for="(item, i) in imgList1"
                :label="item.txt"
                :key="i"
                :value="item.url"
              >
                <div class="img-box">
                  <img :src="item.url" />
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          <span v-else>
            <el-form-item label="背景色：">
              <el-color-picker
                v-model="config.box.background"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="边框宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.borderWidth"
                  size="mini"
                  placeholder="请输入边框宽度"
                  style="margin-right: 12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="边框样式：">
              <el-select
                popper-class="setting-select"
                v-model="config.box.borderStyle"
                placeholder="请选边框样式"
              >
                <el-option
                  v-for="(item, i) in styleList"
                  :label="item"
                  :key="i"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <txtGradient
              :config="config"
              type="box"
              gradientType="border"
              txt="边框是否渐变："
            />
          </span>
        </el-collapse-item>
        <el-collapse-item title="头部">
          <el-form-item label="显示头部：">
            <el-switch v-model="config.header.show"></el-switch>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.header.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景图：">
            <el-select
              popper-class="setting-select"
              v-model="config.header.background"
              placeholder="请选择背景图"
            >
              <el-option
                v-for="(item, i) in imgList1"
                :label="item.txt"
                :key="i"
                :value="item.url"
              >
                <div class="img-box">
                  <img :src="item.url" />
                </div>
              </el-option>
            </el-select>
          </el-form-item>
          <el-collapse-item title="标题">
            <el-form-item label="标题：">
              <el-input
                v-model="config.header.txt"
                size="mini"
                placeholder="请输入文本"
              ></el-input>
            </el-form-item>
            <commonTab
              :config="config"
              type1="header"
              :isShowFontStyle="false"
            />
            <txtGradient
              :config="config"
              type="headerTxt"
              parentType="header"
              txt="标题是否渐变："
              @changeSize="(type, val) => $emit('changeSize', type, val)"
            />
            <ImageSelector
              label="图标："
              @changeSrc="(val) => $emit('changeSize', 'header.icon', val)"
              worksheetId="cockpit_dialog"
              imageField="gbanbjt"
              @changeOpenFilter="
                (val) => $emit('changeSize', 'openFilter', val)
              "
              :openFilter="config.openFilter"
              :src="config.header.icon"
              :filterObj="config.filterObj"
              @changefilterObj="changefilterObj"
            ></ImageSelector>
            <!-- <el-form-item label="图标：">
              <el-select
                popper-class="setting-select"
                v-model="config.header.icon"
                placeholder="请选择图标"
                clearable
              >
                <el-option
                  v-for="(item, i) in imgList1"
                  :label="item.txt"
                  :key="i"
                  :value="item.url"
                >
                  <div class="img-box">
                    <img :src="item.url" />
                  </div>
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-collapse-item>
          <el-collapse-item title="关闭按钮" style="margin-top: 2px">
            <el-form-item label="显示关闭按钮：">
              <el-switch v-model="config.close.show"></el-switch>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.close.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="高度：">
              <el-input
                v-model="config.close.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input>
            </el-form-item>

            <ImageSelector
              label="背景图："
              @changeSrc="(val) => $emit('changeSize', 'close.background', val)"
              worksheetId="cockpit_dialog"
              imageField="gbanbjt"
              @changeOpenFilter="
                (val) => $emit('changeSize', 'openFilter', val)
              "
              :openFilter="config.openFilter"
              :src="config.close.background"
              :filterObj="config.filterObj"
              @changefilterObj="changefilterObj"
            ></ImageSelector>
            <!-- <el-form-item label="背景图：">
              <el-select
                popper-class="setting-select"
                v-model="config.close.background"
                placeholder="请选择背景图"
              >
                <el-option
                  v-for="(item, i) in imgList1"
                  :label="item.txt"
                  :key="i"
                  :value="item.url"
                >
                  <div class="img-box">
                    <img :src="item.url" />
                  </div>
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="遮罩层">
          <el-form-item label="是否开启遮罩层：">
            <el-switch
              v-model="config.isMask"
              @change="(val) => $emit('changeSize', 'isMask', val)"
            ></el-switch>
          </el-form-item>
          <el-form-item label="背景色：" v-show="config.isMask">
            <el-color-picker
              v-model="config.maskBackgroundColor"
              size="mini"
              show-alpha
              @change="(val) => $emit('changeSize', 'maskBackgroundColor', val)"
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import txtGradient from "../componments/txtGradient";
import commonSetTitle from "../componments/commonSetTitle";
import ImageSelector from "../componments/ImageSelector";
export default {
  name: "setting",
  components: { commonTab, txtGradient, commonSetTitle, ImageSelector },
  data() {
    return {
      imgList1: [],
      styleList: ["solid", "dashed"],
      border: {
        width: "",
        type: "",
        color: "",
      },
      optionData: [],
      selectData: [],
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
  watch: {},
  mounted() {},
  methods: {
    changefilterObj(val) {
      this.$emit("changeSize", "filterObj", val);
    },
    changeValue(type, value) {
      console.log(type, value);
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
  .no-margin {
    .el-form-item__content {
      margin-left: 0 !important;
      display: flex;
      align-items: center;
      .el-icon-delete {
        line-height: normal;
        margin-left: 10px;
        cursor: pointer;
      }
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
  .button-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
.el-select-dropdown__list {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding: 6px !important;
  .el-select-dropdown__item {
    height: auto;
    padding: 0 7px;
  }
  .img-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
