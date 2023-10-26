<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
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
            :class="config.isLock ? 'active': ''"
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
      <el-form-item label="排列：">
        <div style="display: flex;">
          <div style="margin-right: 10px;width: 42px">一行</div>
          <el-input
            v-model="config.label.columns"
            size="mini"
          ></el-input>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <el-form-item label="单个宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.width"
            size="mini"
          ></el-input>x
          <el-input
            v-model="config.box.height"
            size="mini"
          ></el-input>
        </div>
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
      <el-collapse>
        <el-collapse-item
          title="文本"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.label.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.label.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'label','fontWeight', config.label.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.label.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.label.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'label','fontStyle', config.label.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.label.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.label.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'label','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.label.textAlign==='center'? 'active':''"
              ><span
                  :class="config.label.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'label','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.label.textAlign==='right'? 'active':''"
              ><span
                  :class="config.label.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'label','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="宽：">
            <el-input
              v-model="config.label.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="高：">
            <el-input
              v-model="config.label.height"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.label.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.label.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.label.fontFamily"
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
              v-model="config.label.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item
          title="图片"
          name="title"
        >
          <el-form-item label="宽：">
            <el-input
              v-model="config.icon.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="高：">
            <el-input
              v-model="config.icon.height"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item
          title="搜索框"
          name="title"
        >
          <el-form-item label="是否显示：">
            <el-switch v-model="config.search.show"></el-switch>
          </el-form-item>
          <el-form-item label="提示文字：">
            <el-input
              v-model="config.search.placeholder"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.search.backgroundColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.search.fontColor"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.search.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="宽高：">
            <div style="display: flex">
              <el-input
                v-model="config.search.width"
                size="mini"
              ></el-input>x
              <el-input
                v-model="config.search.height"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="搜索字段：">
            <el-select
              v-model="config.search.searchField"
              placeholder="请选择"
            >
              <el-option
                label="全局搜索"
                value="全局搜索"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
  <script>
export default {
  name: 'layerControl',
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
  methods: {}
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
      background-image: url('../../../../../assets/image/jiesuo.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../assets/image/suoding.png');
      }
    }

    > span:nth-of-type(2) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url('../../../../../assets/image/yanjing_yincang.png');
      cursor: pointer;

      &.active {
        background-image: url('../../../../../assets/image/yanjing_xianshi.png');
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

  .el-form-item__content {
    display: flex;
    align-content: center;
    color: #fff;

    > span {
      margin: 0 10px;
    }
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
  