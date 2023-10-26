<template>
  <span>
    <el-form-item :label="txt">
      <el-switch
        v-model="config[type].isShowColors"
        @change="changeData"
      ></el-switch>
    </el-form-item>
    <el-form-item label="颜色：">
      <el-color-picker
        v-if="!config[type].isShowColors"
        v-model="colorValue"
        size="mini"
        show-alpha
      ></el-color-picker>
      <span v-else>
        <div class="flex align-center">
          <el-color-picker
            v-model="color1"
            size="mini"
            show-alpha
          ></el-color-picker>
          <el-input
            v-model="per1"
            size="mini"
            placeholder="颜色占比"
            style="margin:0 5px"
          ></el-input
          >%
        </div>
        <div class="flex align-center" style="margin-top:10px">
          <el-color-picker
            v-model="color2"
            size="mini"
            show-alpha
          ></el-color-picker>
          <el-input
            v-model="per2"
            size="mini"
            placeholder="颜色占比"
            style="margin:0 5px"
          ></el-input
          >%
        </div>
      </span>
    </el-form-item>
  </span>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    type: {
      type: String,
    },
    parentType: {
      type: String,
    },
    gradientType: {
      type: String,
      default: "txtBg",
    },
    txt: {
      type: String,
      default: "是否渐变",
    },
  },
  data() {
    return {
      color1: "",
      color2: "",
      per1: "",
      per2: "",
      colorValue: "",
      gradientColorData: "",
    };
  },
  mounted() {
    this.getLinearColor();
  },
  watch: {
    color1() {
      this.setTitleStyle();
    },
    per1() {
      this.setTitleStyle();
    },
    color2() {
      this.setTitleStyle();
    },
    per2() {
      this.setTitleStyle();
    },
    colorValue() {
      console.log(this.colorValue);
      this.setBgColor();
    },
  },
  methods: {
    changeData(val) {
      if (val) {
        this.setGradientColor();
        this.setTitleStyle();
      } else {
        this.setBgColor();
      }
    },
    setBgColor() {
      if (this.gradientType === "txtBg") {
        this.config[this.parentType].color = this.colorValue;
      } else if (this.gradientType === "background") {
        this.config[this.type].background = this.colorValue;
      } else {
        this.config[this.type].borderColor = this.colorValue;
      }
    },
    getLinearColor() {
      let data = this.type ? this.config[this.type] : this.config;
      if (this.gradientType === "txtBg") {
        this.gradientColorData = data.backgroundColors;
        this.colorValue = this.config[this.parentType].color;
      } else if (this.gradientType === "background") {
        this.gradientColorData = data.backgroundColors;
        this.colorValue = this.config[this.type].background;
      } else {
        this.gradientColorData = data.borderColors;
        this.colorValue = this.config[this.type].borderColor;
      }

      if (this.config[this.type].isShowColors) {
        this.setGradientColor();
      }
    },
    setGradientColor() {
      let b = this.gradientColorData;
      this.color1 = b[0];
      this.per1 = b[1];
      this.color2 = b[2];
      this.per2 = b[3];
    },
    setTitleStyle() {
      let d = this.config[this.type];
      if (this.color1 && this.per1 && this.color2 && this.per2) {
        let linearDeg =
          this.gradientType === "txtBg" || this.gradientType === "background"
            ? "linear-gradient(180deg,"
            : "linear-gradient(0deg,";
        let linearLast =
          this.gradientType === "txtBg" || this.gradientType === "background"
            ? "%" + ")"
            : "%" + ")" + "1";
        let bglinear =
          linearDeg +
          this.color1 +
          " " +
          this.per1 +
          "%" +
          "," +
          this.color2 +
          " " +
          this.per2 +
          linearLast;
        let bgColors = [this.color1, this.per1, this.color2, this.per2];
        if (
          this.gradientType === "txtBg" ||
          this.gradientType === "background"
        ) {
          d.background = bglinear;
          d.backgroundColors = bgColors;
        } else {
          d.borderImage = bglinear;
          d.borderColors = bgColors;
        }
        this.gradientColorData = bgColors;
      }
    },
  },
};
</script>
