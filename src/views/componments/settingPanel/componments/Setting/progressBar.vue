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
      <el-form-item label="排列：">
        <div
          class="flex"
          style="color: #fff"
        >
          <div style="margin-right: 10px">一行</div>
          <el-input-number
            v-model="config.box.arrangeNum"
            :min="1"
            :max="config.data.length"
            label=""
          ></el-input-number>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <el-form-item label="是否滚动：">
        <el-switch v-model="config.box.isScroll"></el-switch>
      </el-form-item>
      <el-form-item label="行高：">
        <el-input
          v-model="config.line.height"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="行右边距：">
        <el-input
          v-model="config.line.marginRight"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="显示方式：">
        <span
          class="cardType"
          :class="config.box.showType === 1? 'active':''"
          @click="changeShowType(1)"
        ></span>
        <span
          class="cardType"
          :class="config.box.showType === 2? 'active':''"
          @click="changeShowType(2)"
        ></span>
      </el-form-item>

      <el-collapse>
        <el-collapse-item
          title="文本(前缀)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.topFont.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.topFont.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'topFont','fontWeight', config.topFont.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.topFont.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.topFont.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'topFont','fontStyle', config.topFont.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.topFont.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.topFont.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'topFont','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.topFont.textAlign==='center'? 'active':''"
              ><span
                  :class="config.topFont.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'topFont','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.topFont.textAlign==='right'? 'active':''"
              ><span
                  :class="config.topFont.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'topFont','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.topFont.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.topFont.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.topFont.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.topFont.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.topFont.fontFamily"
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
              v-model="config.topFont.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.topFont.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(标题)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.title.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'title','fontWeight', config.title.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.title.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'title','fontStyle', config.title.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.title.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'title','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign==='center'? 'active':''"
              ><span
                  :class="config.title.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'title','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign==='right'? 'active':''"
              ><span
                  :class="config.title.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'title','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.title.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.title.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.title.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.title.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.title.fontFamily"
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
              v-model="config.title.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.title.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(百分比)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.percent.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.percent.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'percent','fontWeight', config.percent.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.percent.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.percent.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'percent','fontStyle', config.percent.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.percent.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.percent.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'percent','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.percent.textAlign==='center'? 'active':''"
              ><span
                  :class="config.percent.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'percent','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.percent.textAlign==='right'? 'active':''"
              ><span
                  :class="config.percent.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'percent','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.percent.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.percent.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.percent.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.percent.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.percent.fontFamily"
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
              v-model="config.percent.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.percent.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(数值)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.num.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.num.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'num','fontWeight', config.num.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.num.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.num.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'num','fontStyle', config.num.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.num.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.num.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'num','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.num.textAlign==='center'? 'active':''"
              ><span
                  :class="config.num.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'num','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.num.textAlign==='right'? 'active':''"
              ><span
                  :class="config.num.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'num','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.num.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.num.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.num.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.num.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.num.fontFamily"
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
              v-model="config.num.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.num.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(单位)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.unit.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.unit.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'unit','fontWeight', config.unit.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.unit.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'unit','fontStyle', config.unit.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.unit.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'unit','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign==='center'? 'active':''"
              ><span
                  :class="config.unit.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'unit','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign==='right'? 'active':''"
              ><span
                  :class="config.unit.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'unit','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.unit.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.unit.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.unit.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.unit.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.unit.fontFamily"
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
              v-model="config.unit.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.unit.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="进度条"
          name="title"
        >
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.progressBar.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="宽：">
            <el-input
              v-model="config.progressBar.width"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="高：">
            <el-input
              v-model="config.progressBar.height"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="右边距：">
            <el-input
              v-model="config.progressBar.marginRight"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="底色：">
            <el-color-picker
              v-model="config.progressBar.backgroundColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="进度条颜色：">
            <el-color-picker
              v-model="config.percentBar.backgroundFront"
              show-alpha
              size="mini"
            ></el-color-picker>
            <el-color-picker
              v-model="config.percentBar.backgroundBehind"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="图标宽高：">
            <div class="flex icon">
              <span>宽</span>
              <el-input
                v-model="config.percentBar.iconWidth"
                size="mini"
              ></el-input>
              <span>高</span>
              <el-input
                v-model="config.percentBar.iconHeight"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="图标位置：">
            <div class="flex icon">
              <span>top</span>
              <el-input
                v-model="config.percentBar.top"
                size="mini"
              ></el-input>
              <!-- <span>高</span>
              <el-input
                v-model="config.percentBar.iconHeight"
                size="mini"
              ></el-input> -->
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
<script>
export default {
  name: 'progressBar',
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
  mounted() {},
  methods: {
    changeShowType(data) {
      this.$emit('changeValue', 'box', 'showType', data);
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

  .cardType {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
    cursor: pointer;

    &:nth-child(1) {
      background-image: url('./image/arrange_1.png');
      background-size: 100% 100%;

      &.active {
        background-image: url('./image/arrange_1_active.png');
      }
    }

    &:nth-child(2) {
      background-image: url('./image/arrange_2.png');
      background-size: 100% 100%;

      &.active {
        background-image: url('./image/arrange_2_active.png');
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

    .icon {
      align-items: center;

      span {
        width: 20px;
        margin: 0 5px;
      }

      .el-input {
        flex: 1;
      }
    }

    .fontStyle {
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 12px;

      .block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
      }

      .bg {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &.active {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);

          .non-bold {
            background-image: url('./image/bold_hover.png');
          }
          .non-incline {
            background-image: url('./image/incline_hover.png');
          }
          .non-left {
            background-image: url('./image/left_hover.png');
          }
          .non-center {
            background-image: url('./image/center_hover.png');
          }
          .non-right {
            background-image: url('./image/right_hover.png');
          }
        }

        span {
          width: 18px;
          height: 18px;
          background-size: 100% 100%;

          &.non-bold {
            background-image: url('./image/bold.png');
          }
          &.bold {
            background-image: url('./image/bold_hover.png');
            background-color: rgba(255, 255, 255, 0.1);
          }
          &.non-incline {
            background-image: url('./image/incline.png');
          }
          &.incline {
            background-image: url('./image/incline_hover.png');
            background-color: rgba(255, 255, 255, 0.1);
          }
          &.left {
            background-image: url('./image/left_hover.png');
            background-color: rgba(255, 255, 255, 0.1);
          }
          &.non-left {
            background-image: url('./image/left.png');
          }
          &.center {
            background-image: url('./image/center_hover.png');
            background-color: rgba(255, 255, 255, 0.1);
          }
          &.non-center {
            background-image: url('./image/center.png');
          }
          &.right {
            background-image: url('./image/right_hover.png');
            background-color: rgba(255, 255, 255, 0.1);
          }
          &.non-right {
            background-image: url('./image/right.png');
          }
        }
      }

      span:nth-child(2) {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
  