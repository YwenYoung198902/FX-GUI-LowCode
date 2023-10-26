<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="100px"
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
            :class="config.isLock ? 'active': ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow ? 'active': ''"
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
      <el-form-item
        label="默认展示隐藏："
        label-width="110px"
      >
        <el-switch
          style="margin-top: 7px;"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
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
      <el-form-item label="排列：">
        <el-select
          v-model="config.writingMode"
          @change="(val) => $emit('changeSize', 'writingMode', val)"
        >
          <el-option
            label="横"
            value="horizontal-tb"
          ></el-option>
          <el-option
            label="竖"
            value="vertical-lr"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-collapse>
        <el-collapse-item
          title="文本"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.text.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.text.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'text','fontWeight', config.text.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.text.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.text.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'text','fontStyle', config.text.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.text.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.text.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'text','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.text.textAlign==='center'? 'active':''"
              ><span
                  :class="config.text.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'text','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.text.textAlign==='right'? 'active':''"
              ><span
                  :class="config.text.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'text','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.text.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.text.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.text.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.text.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="文本内容：">
            <el-input
              type="textarea"
              v-model="config.data"
              @input="textChange"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
  <script>
export default {
  name: 'basicText',
  data() {
    return {};
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    textChange(val) {
      this.$emit('changeSize', 'data', val);
    }
  }
};
</script>
  
  <style lang="scss" >
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
      background-image: url('../../../../../../assets/image/jiesuo.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../../assets/image/suoding.png');
      }
    }

    > span:nth-of-type(2) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url('../../../../../../assets/image/yanjing_yincang.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../../assets/image/yanjing_xianshi.png');
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

    .el-textarea__inner {
      background-color: transparent;
      color: #fff;
    }
  }
}
</style>
  