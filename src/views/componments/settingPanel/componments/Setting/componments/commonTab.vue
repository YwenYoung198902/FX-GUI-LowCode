<template>
  <div class="font-box">
    <div class="tab-box" v-if="isShowFontStyle">
      <div
        :class="[
          'tab1',
          'tab',
          fontData.fontWeight === 'bold' ? 'active1' : '',
        ]"
        @click="changeFontWeight()"
      ></div>
      <div
        :class="[
          'tab2',
          'tab',
          fontData.fontStyle === 'italic' ? 'active2' : '',
        ]"
        @click="changeFontStyle()"
      ></div>
      <span v-if="isTxtAlign" style="display: flex;">
        <div
          :class="[
            'tab3',
            'tab',
            txtData.textAlign === 'left' ? 'active3' : '',
          ]"
          @click="changeTxtAlign('left')"
        ></div>
        <div
          :class="[
            'tab4',
            'tab',
            txtData.textAlign === 'center' ? 'active4' : '',
          ]"
          @click="changeTxtAlign('center')"
        ></div>
        <div
          :class="[
            'tab5',
            'tab',
            txtData.textAlign === 'right' ? 'active5' : '',
          ]"
          @click="changeTxtAlign('right')"
        ></div>
      </span>
      <span v-else style="display: flex;">
        <div
          :class="['tab3', 'tab', txtData.align === 'left' ? 'active3' : '']"
          @click="changeTxtAlign('left')"
        ></div>
        <div
          :class="['tab4', 'tab', txtData.align === 'center' ? 'active4' : '']"
          @click="changeTxtAlign('center')"
        ></div>
        <div
          :class="['tab5', 'tab', txtData.align === 'right' ? 'active5' : '']"
          @click="changeTxtAlign('right')"
        ></div>
      </span>
    </div>
    <span v-if="isShowFontSet">
      <el-form-item v-if="isTxtAlign && isShowColor" label="字体颜色：">
        <el-color-picker
          v-model="fontData.color"
          size="mini"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="字体大小：">
        <div class="flex align-center">
          <el-input
            v-model="fontData.fontSize"
            size="mini"
            placeholder="请输入字体大小"
            style="margin-right:12px"
          ></el-input
          >px
        </div>
      </el-form-item>
      <el-form-item label="字体：">
        <el-select
          popper-class="setting-select"
          v-model="fontData.fontFamily"
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
      <el-form-item label="字间距：" v-show="isShowLetterSpacing">
        <div class="flex align-center">
          <el-input
            v-model="fontData.letterSpacing"
            size="mini"
            placeholder="请输入字间距"
            style="margin-right:12px"
          ></el-input
          >px
        </div>
      </el-form-item>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontData: "",
      txtData: "",
      // fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
      fontList: ["YouSheBiaoTiHei", "Microsoft YaHei", "Helvetica"],
      isShowLetterSpacing: false,
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    type1: {
      type: String,
    },
    type2: {
      type: String,
    },
    isTxtAlign: {
      type: Boolean,
      default: true,
    },
    isShowFontSet: {
      type: Boolean,
      default: true,
    },
    isShowColor: {
      type: Boolean,
      default: true,
    },
    isShowFontStyle: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    type1() {
      this.setType();
    },
    type2() {
      this.setType();
    },
  },
  mounted() {
    this.setType();
  },
  methods: {
    setType() {
      if (this.type2) {
        this.fontData = this.config[this.type1][this.type2];
      } else {
        this.fontData = this.config[this.type1];
      }
      if (this.isTxtAlign) {
        this.txtData = this.fontData;
      } else {
        this.txtData = this.config[this.type1];
      }
      if (typeof this.fontData.letterSpacing == "undefined") {
        this.isShowLetterSpacing = false;
      } else {
        this.isShowLetterSpacing = true;
      }
    },
    changeFontWeight() {
      this.fontData.fontWeight =
        this.fontData.fontWeight === "normal" ? "bold" : "normal";
    },
    changeFontStyle() {
      this.fontData.fontStyle =
        this.fontData.fontStyle === "normal" ? "italic" : "normal";
    },
    changeTxtAlign(align) {
      if (this.isTxtAlign) {
        this.txtData.textAlign = align;
      } else {
        this.txtData.align = align;
      }
    },
  },
};
</script>

<style lang="scss">
.tab-box {
  display: flex;
  height: 30px;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 18px;
  .tab {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
  .tab1 {
    background: url("../../../../../../assets/image/tab1.png");
  }
  .tab2 {
    background: url("../../../../../../assets/image/tab2.png");
  }
  .tab3 {
    background: url("../../../../../../assets/image/tab3.png");
  }
  .tab4 {
    background: url("../../../../../../assets/image/tab4.png");
  }
  .tab5 {
    background: url("../../../../../../assets/image/tab5.png");
  }
  .active1 {
    background: url("../../../../../../assets/image/active1.png");
  }
  .active2 {
    background: url("../../../../../../assets/image/active2.png");
  }
  .active3 {
    background: url("../../../../../../assets/image/active3.png");
  }
  .active4 {
    background: url("../../../../../../assets/image/active4.png");
  }
  .active5 {
    background: url("../../../../../../assets/image/active5.png");
  }
}
</style>
