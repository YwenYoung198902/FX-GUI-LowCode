<template>
  <div class="filter-wrap">
    <el-collapse>
      <el-collapse-item title="滤镜">
        <el-form-item label="开启滤镜：">
          <el-switch
            v-model="isOpenFilter"
            @change="(val) => $emit('changeOpenFilter', val)"
          ></el-switch>
        </el-form-item>
        <div v-show="isOpenFilter">
          <el-form-item label="色相：">
            <div class="selector-item">
              <el-slider
                v-model="imgFilterObj.hueRotate"
                :step="3"
                :min="0"
                :max="360"
                :format-tooltip="degFormatTooltip"
              ></el-slider>
              <div class="item-value">
                值：{{ `${imgFilterObj.hueRotate}deg` }}
              </div>
            </div>
          </el-form-item>
          <el-form-item label="饱和度：">
            <div class="selector-item">
              <el-slider
                v-model="imgFilterObj.saturate"
                :step="0.1"
                :min="0"
                :max="2"
                :format-tooltip="sliderFormatTooltip"
              ></el-slider>
              <div class="item-value">
                值：{{
                  `${(parseFloat(imgFilterObj.saturate) * 100).toFixed(0)}%`
                }}
              </div>
            </div>
          </el-form-item>
          <el-form-item label="对比度：">
            <div class="selector-item">
              <el-slider
                v-model="imgFilterObj.contrast"
                :step="0.1"
                :min="0"
                :max="2"
                :format-tooltip="sliderFormatTooltip"
              ></el-slider>
              <div class="item-value">
                值：{{
                  `${(parseFloat(imgFilterObj.contrast) * 100).toFixed(0)}%`
                }}
              </div>
            </div>
          </el-form-item>
          <el-form-item label="亮度：">
            <div class="selector-item">
              <el-slider
                v-model="imgFilterObj.brightness"
                :step="0.1"
                :min="0"
                :max="2"
                :format-tooltip="sliderFormatTooltip"
              ></el-slider>
              <div class="item-value">
                值：{{
                  `${(parseFloat(imgFilterObj.brightness) * 100).toFixed(0)}%`
                }}
              </div>
            </div>
          </el-form-item>
          <el-form-item label="透明度：">
            <div class="selector-item">
              <el-slider
                v-model="imgFilterObj.opacity"
                :step="0.1"
                :min="0"
                :max="1"
                :format-tooltip="sliderFormatTooltip"
              ></el-slider>
              <div class="item-value">
                值：{{
                  `${(parseFloat(imgFilterObj.opacity) * 100).toFixed(0)}%`
                }}
              </div>
            </div>
          </el-form-item>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
  
  <script>
export default {
  name: "StylesFilter",
  data() {
    return {
      imgFilterObj: {},
    };
  },
  computed: {
    isOpenFilter: {
      get() {
        return this.openFilter;
      },
      set() {},
    },
  },
  methods: {
    degFormatTooltip(val) {
      return `${val}deg`;
    },
    // 百分比格式化 person
    sliderFormatTooltip(val) {
      return `${(parseFloat(val) * 100).toFixed(0)}%`;
    },
  },
  props: {
    // 过滤属性配置
    filterObj: {
      type: Object,
      default: () => {
        return {
          hueRotate: 0, // 色相
          saturate: 1, // 饱和度
          contrast: 1, // 对比度
          brightness: 1, // 亮度
          opacity: 1, // 透明度
        };
      },
    },
    // 是否开启过滤
    openFilter: {
      type: Boolean,
      default: false,
    },
    changeOpenFilter: {
      type: Function,
      default: () => {},
    },
    changefilterObj: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.imgFilterObj = this.filterObj;
    console.log("我是滤镜组件");
  },
  watch: {
    imgFilterObj: {
      handler(newVal) {
        this.$emit("changefilterObj", newVal);
      },
      deep: true,
      //   immediate: true,
    },
  },
};
</script>
  
  <style  lang="scss" >
.filter-wrap {
  .el-slider {
    width: 180px;
  }
}
</style>