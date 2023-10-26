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
          v-model="config.box.direction"
          placeholder="请选择"
        >
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
      <el-form-item label="是否滚动：">
        <el-switch v-model="config.box.isScroll"></el-switch>
      </el-form-item>
      <el-form-item label="单个容器宽：">
        <el-input
          v-model="config.box.width"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="单个容器高：">
        <el-input
          v-model="config.box.height"
          size="mini"
        ></el-input>
      </el-form-item>

      <el-collapse>
        <el-collapse-item
          title="文本(标题)"
          name="title"
        >
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.title.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
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
          <el-form-item label="icon：">
            <el-select v-model="config.title.iconUrl">
              <el-option
                v-for="item,index in titlePiclist"
                :key="index"
                :label="`图片${index + 1}`"
                :value="item"
              >
                <img
                  :src="item"
                  alt=""
                  style="max-width: 100px;max-height: 100px"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="icon宽：">
            <el-input
              v-model="config.title.iconWidth"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="icon高：">
            <el-input
              v-model="config.title.iconHeight"
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
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.unit.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
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
          <el-form-item label="高：">
            <el-input
              v-model="config.num.height"
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
          <el-form-item label="icon：">
            <el-select v-model="config.num.iconUrl">
              <el-option
                v-for="item,index in numPiclist"
                :key="index"
                :label="`图片${index + 1}`"
                :value="item"
              >
                <img
                  :src="item"
                  alt=""
                  style="max-width: 100px;max-height: 100px"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="icon宽：">
            <el-input
              v-model="config.num.iconWidth"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="icon高：">
            <el-input
              v-model="config.num.iconHeight"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
<script>
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'statistic',
  data() {
    return {
      titlePiclist: [],
      numPiclist: []
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.getPicData();
  },
  methods: {
    async getPicData() {
      try {
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: 'tjslzj',
          rowId: sessionStorage.getItem('rowid'),
          pageIndex: 1,
          pageSize: 100
        };
        const result = await getFilterRows(data);
        this.titlePiclist = result.data.rows.map(
          (item) => JSON.parse(item.titleIcon)[0].DownloadUrl
        );
        this.numPiclist = result.data.rows.map(
          (item) => JSON.parse(item.numIcon)[0].DownloadUrl
        );
        if (this.titlePiclist.length) {
          this.$emit('changeValue', 'title', 'iconUrl', this.titlePiclist[0]);
        }
        if (this.numPiclist.length) {
          this.$emit('changeValue', 'num', 'iconUrl', this.numPiclist[0]);
        }
        if (result.success) {
          // this.$message.success('获取成功');
        } else {
          this.$message.error('获取失败');
        }
      } catch (error) {
        this.$message.error('获取失败');
      }
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
      margin-bottom: 18px;

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
  