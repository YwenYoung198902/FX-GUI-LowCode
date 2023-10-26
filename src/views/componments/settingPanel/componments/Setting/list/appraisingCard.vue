<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-08 14:54:17
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-12 10:10:20
-->
<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="113px"
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
      <el-form-item label="单条数据宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.width"
            size="mini"
            placeholder="高度"
          ></el-input>
          <span style="margin: 0 10px">x</span>
          <el-input
            v-model="config.box.height"
            size="mini"
            placeholder="宽度"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="是否滚动：">
        <el-switch
          v-model="config.box.isScroll"
          style="margin-right: 10px"
        ></el-switch>
      </el-form-item>
      <el-form-item label="排列方向：">
        <el-select v-model="config.box.direction">
          <el-option
            label="横"
            value="row"
          ></el-option>
          <el-option
            label="竖"
            value="column"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否错落排序：">
        <el-switch
          v-model="config.box.multiple"
          style="margin-right: 10px"
        ></el-switch>
      </el-form-item> -->
      <el-form-item label="排列数量：">
        <span>一{{config.box.direction === 'row'? '行':'列'}}</span>
        <el-input-number
          v-model="config.box.arrangeNum"
          :min="1"
          label=""
        ></el-input-number>
        <span>个</span>
      </el-form-item>
      <el-form-item label="卡片背景颜色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框：">
        <el-color-picker
          v-model="config.box.borderColor"
          show-alpha
        ></el-color-picker>
        <span>粗细</span>
        <el-slider v-model="config.box.borderWidth"></el-slider>
      </el-form-item>

      <el-collapse>
        <el-collapse-item
          title="文本(标题)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.first.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.first.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'first','fontWeight', config.first.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.first.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'first','fontStyle', config.first.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.first.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'first','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign==='center'? 'active':''"
              ><span
                  :class="config.first.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'first','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign==='right'? 'active':''"
              ><span
                  :class="config.first.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'first','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.first.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.first.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.first.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.first.fontFamily"
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
              v-model="config.first.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(第二行)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.second.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.second.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'second','fontWeight', config.second.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.second.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'second','fontStyle', config.second.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.second.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'second','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign==='center'? 'active':''"
              ><span
                  :class="config.second.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'second','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign==='right'? 'active':''"
              ><span
                  :class="config.second.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'second','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.second.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.second.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.second.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.second.fontFamily"
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
              v-model="config.second.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="文本前置图片：">
            <el-switch
              v-model="config.second.firstPic"
              style="margin-right: 10px"
            ></el-switch>
          </el-form-item>
          <el-form-item
            label="图片："
            v-if="config.second.firstPic"
          >
            <el-select
              popper-class="selectedPic-select"
              v-model="config.first.selectedPic"
              size="small"
            >
              <el-option
                v-for="(item,index) in picLibrary"
                :key="item.rowid"
                :value="item.rowid"
              >
                <img
                  :class="item.rowid === config.first.selectedPic ? 'active':''"
                  :src="item.url"
                  alt=""
                  @click="selectPic(item)"
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(第三行)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.third.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.third.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'third','fontWeight', config.third.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.third.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'third','fontStyle', config.third.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.third.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'third','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign==='center'? 'active':''"
              ><span
                  :class="config.third.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'third','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign==='right'? 'active':''"
              ><span
                  :class="config.third.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'third','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.third.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.third.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.third.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.third.fontFamily"
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
              v-model="config.third.letterSpacing"
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
          <el-form-item label="宽高">
            <div style="display: flex">
              <el-input
                v-model="config.pic.width"
                size="mini"
                placeholder="高度"
              ></el-input>
              <span style="margin: 0 10px">x</span>
              <el-input
                v-model="config.pic.height"
                size="mini"
                placeholder="宽度"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="自适应: ">
            <el-switch
              v-model="config.pic.selfAdaption"
              style="margin-right: 10px"
            ></el-switch>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      selectedPic: 1,
      picLibrary: [
        {
          rowid: 1,
          url: 'https://www.sjxks.com/file/mdpic/pic/20230526/6I287U8MaU4yb92h38es1ocl7766fzfp28cL547kdNdWfUaJcu0T6M4Ifw7R93ec.png'
        },
        {
          rowid: 2,
          url: 'https://www.sjxks.com/file/mdpic/pic/20230526/0t1q94152pcX880I4tecbzdg2Z5c0G3J5c9Ef0bK9k8YeGaC8haKbv8Bfb4h7C8Y.png'
        },
        {
          rowid: 3,
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAMiSURBVDiNdZNfaFtVHMc/5/7rTdL8bbqmYtNuTsR1KPRB50DmdOLTBMH55p4E8UEm+CJsxYeosGeF+aYiA6cM+lql6IPoKgjidFsdLaEztbltkiY3yU3uvbnHh9s0M5k/+HHO7/f9/b6/c76cI3iAyeWTh5DqmyBekVIe831X9bqdatd1rqXjE5fF2Z9Lwz1ihOTb06cIel8SjcyQTEIkAkhwOniWhV0uNU3TfD326s2l/yWSy88dJwi+JzeZJZWCegMcJwQjEUgm8K0y9bU7XcM0ziReu/Vjv1c7IPn6nEpQ/oSJdJZ4HIqb0O0OptQbUNtDyz9MtN0e62zd+1RKnhCCAEA5KIxbC6jKKSYyUN4ZkOh66BDmti3M/CyBZL51/ckX++0DIhE8TSwKUoJtg6JANAKZdOjRSJizbYSUGOkMXrf91MjVkGIWXQfXDeMgAE2HVDKMnQ4E+3q5Lopp4spgfJRIyAa+H07tm+MMrtgXHUBRkL4PgeI96ES/4nTANENNvP2a4uZAq/5qmnj1OpphFEc0cu7O7UpbA7sJuakw6R0MHOxzU3iVCoHtIn+ZXx8hEtuPXnBvzkLZAl2DuXwocN9iMZjLIzWV5t07iD8O015VLhz0A9Q/ePuEsTvzk1vcFNGXHLSjGzCZhWQCxP6blRK5V6fx120U6yhyZQZ7q4p6xDg9/dXnP2gAWmvqfc+qCjWdwV/PEDRTqA/9jjq5A4YBUuLaDZyqg2Y9g2odp5euYrY92pu1AvCscArvPC93p1e84t8YjxwBRdCr1+mWSvRi1lry/HbBddoJpXjyjd5vsQUllkBNJiGQuOsb2FsVxvLqy5p0sh/6VgU1F3el7inC07XebgVnp4mujl8cO3vjOkCz8MK6ljm07JVKqPEEUvd8NRcPIp2u0dyoXP7Pp20U3npMFDO3O8Wy6DTt1ZnVayfux1vvffRdcK9xBlOVcq76eGLxyhrAn8fOGcr9hYnFK2tBu3bVqTXRp82LDJk//s+ikk0j27WrfRKA+VvfuMpwcUvsXVJTylJu6YuVYSx56eMbxFufiYXg3WHsX+MhXShZ4rChAAAAAElFTkSuQmCC'
        }
      ]
    };
  },
  methods: {
    selectPic(item) {
      this.$emit('changeValue', 'second', 'selectedPic', item);
    }
  }
};
</script>

<style lang="scss" scoped>
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
        background-image: url('../image/bold_hover.png');
      }
      .non-incline {
        background-image: url('../image/incline_hover.png');
      }
      .non-left {
        background-image: url('../image/left_hover.png');
      }
      .non-center {
        background-image: url('../image/center_hover.png');
      }
      .non-right {
        background-image: url('../image/right_hover.png');
      }
    }

    span {
      width: 18px;
      height: 18px;
      background-size: 100% 100%;

      &.non-bold {
        background-image: url('../image/bold.png');
      }
      &.bold {
        background-image: url('../image/bold_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-incline {
        background-image: url('../image/incline.png');
      }
      &.incline {
        background-image: url('../image/incline_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.left {
        background-image: url('../image/left_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-left {
        background-image: url('../image/left.png');
      }
      &.center {
        background-image: url('../image/center_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-center {
        background-image: url('../image/center.png');
      }
      &.right {
        background-image: url('../image/right_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-right {
        background-image: url('../image/right.png');
      }
    }
  }

  span:nth-child(2) {
    width: 100%;
    text-align: center;
  }
}
.el-input-number--small {
  width: 110px;
}
.el-slider {
  width: 113px;
}
.selectedPic {
  display: flex;

  > span {
    color: #fff;
    margin-right: 20px;
  }
}
.selectedPic-select {
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      width: 50px !important;
      margin: 0 5px;
    }

    img {
      width: 50px;
      height: 50px;
      border: 1px solid transparent;

      &.active {
        border: 1px solid #fff;
      }
    }
  }
}
</style>