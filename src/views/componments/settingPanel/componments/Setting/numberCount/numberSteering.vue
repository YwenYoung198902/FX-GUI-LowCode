<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-21 10:16:06
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-19 10:12:25
-->
<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="138px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div class="componentName" style="display:flex;align-items:center">
          <el-input v-model="config.name" size="mini" placeholder=""></el-input>
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
      <el-form-item label="一行：">
        <el-input-number
          size="small"
          v-model="config.box.arrangeNum"
          :min="1"
          :max="10"
          label=""
        ></el-input-number
        >个
      </el-form-item>
      <el-form-item label="自动切换：">
        <el-switch v-model="config.box.autoplay"></el-switch>
      </el-form-item>
      <el-form-item label="轮播间隔：">
        <div class="display: flex;align-items:center">
          <el-input
            v-model="config.box.interval"
            size="mini"
            style="width: 135px"
          ></el-input>
          <span class="margin-left: 10px">毫秒</span>
        </div>
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
      <el-form-item label="单个宽高">
        <div style="display: flex;align-items:center">
          <el-input
            v-model="config.box.width"
            size="mini"
            placeholder=""
          ></el-input>
          <span>x</span>
          <el-input
            v-model="config.box.height"
            size="mini"
            placeholder=""
          ></el-input>
        </div>
      </el-form-item>
      <!-- <el-form-item label="元素横间距：">
        <el-input
          v-model="config.box.rowPadding"
          size="mini"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="元素纵间距：">
        <el-input v-model="config.box.columnPadding" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="组件默认是否显示：">
        <el-switch
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>

      <el-collapse>
        <el-collapse-item name="title" title="echarts图表">
          <el-form label-width="100px" size="small">
            <el-form-item label="图表宽高">
              <div style="display: flex;align-items:center">
                <el-input
                  v-model="config.echart.width"
                  size="mini"
                  placeholder=""
                ></el-input>
                <span>x</span>
                <el-input
                  v-model="config.echart.height"
                  size="mini"
                  placeholder=""
                ></el-input>
              </div>
            </el-form-item>
            <!-- <el-form-item label="图表颜色">
              <el-color-picker
                v-model="config.echart.backgroundFront"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-color-picker
                v-model="config.echart.backgroundBack"
                show-alpha
                size="mini"
              ></el-color-picker>
            </el-form-item> -->
            <el-form-item label="圆环宽度">
              <el-input v-model="config.echart.barWidth" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="圆环大小">
              <el-input v-model="config.echart.size" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="圆环位置">
              <div style="display: flex">
                <span style="margin: 0 5px">x</span>
                <el-input v-model="config.echart.xPos" size="mini"></el-input>
                <span style="margin: 0 5px">y</span>
                <el-input v-model="config.echart.yPos" size="mini"></el-input>
              </div>
            </el-form-item>
            <el-collapse-item name="echartBg" title="图表颜色配置">
              <div v-for="(item, i) in config.data">
                <el-form-item :label="`图表${i + 1}颜色`">
                  <el-color-picker
                    v-model="config.echartStyle[i].backgroundFront"
                    show-alpha
                    size="mini"
                  ></el-color-picker>
                  <el-color-picker
                    v-model="config.echartStyle[i].backgroundBack"
                    show-alpha
                    size="mini"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item :label="`图表${i + 1}缺省色`">
                  <el-color-picker
                    v-model="config.echartStyle[i].defaultBg"
                    show-alpha
                    size="mini"
                  ></el-color-picker>
                </el-form-item>
              </div>
            </el-collapse-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="文本(数值)" name="title">
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.number.fontWeight === 'bold' ? 'active' : ''"
                ><span
                  :class="
                    config.number.fontWeight === 'bold' ? 'bold' : 'non-bold'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'number',
                      'fontWeight',
                      config.number.fontWeight === 'bold' ? 'normal' : 'bold'
                    )
                  "
                ></span
              ></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.number.fontStyle === 'italic' ? 'active' : ''"
                ><span
                  :class="
                    config.number.fontStyle === 'italic'
                      ? 'incline'
                      : 'non-incline'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'number',
                      'fontStyle',
                      config.number.fontStyle === 'normal' ? 'italic' : 'normal'
                    )
                  "
                ></span
              ></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.number.textAlign === 'left' ? 'active' : ''"
                ><span
                  :class="
                    config.number.textAlign === 'left' ? 'left' : 'non-left'
                  "
                  @click="$emit('changeValue', 'number', 'textAlign', 'left')"
                ></span
              ></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.number.textAlign === 'center' ? 'active' : ''"
                ><span
                  :class="
                    config.number.textAlign === 'center'
                      ? 'center'
                      : 'non-center'
                  "
                  @click="$emit('changeValue', 'number', 'textAlign', 'center')"
                ></span
              ></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.number.textAlign === 'right' ? 'active' : ''"
                ><span
                  :class="
                    config.number.textAlign === 'right' ? 'right' : 'non-right'
                  "
                  @click="$emit('changeValue', 'number', 'textAlign', 'right')"
                ></span
              ></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.number.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.number.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.number.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.number.fontFamily"
                placeholder="请选择"
              >
                <el-option label="微软雅黑" value="微软雅黑"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.number.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="数值位置">
            <div style="display: flex">
              <span style="margin: 0 5px">x</span>
              <el-input v-model="config.number.xPos" size="mini"></el-input>
              <span style="margin: 0 5px">y</span>
              <el-input v-model="config.number.yPos" size="mini"></el-input>
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="文本(名称)" name="title">
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontWeight === 'bold' ? 'active' : ''"
                ><span
                  :class="
                    config.title.fontWeight === 'bold' ? 'bold' : 'non-bold'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'title',
                      'fontWeight',
                      config.title.fontWeight === 'bold' ? 'normal' : 'bold'
                    )
                  "
                ></span
              ></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.fontStyle === 'italic' ? 'active' : ''"
                ><span
                  :class="
                    config.title.fontStyle === 'italic'
                      ? 'incline'
                      : 'non-incline'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'title',
                      'fontStyle',
                      config.title.fontStyle === 'normal' ? 'italic' : 'normal'
                    )
                  "
                ></span
              ></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign === 'left' ? 'active' : ''"
                ><span
                  :class="
                    config.title.textAlign === 'left' ? 'left' : 'non-left'
                  "
                  @click="$emit('changeValue', 'title', 'textAlign', 'left')"
                ></span
              ></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign === 'center' ? 'active' : ''"
                ><span
                  :class="
                    config.title.textAlign === 'center'
                      ? 'center'
                      : 'non-center'
                  "
                  @click="$emit('changeValue', 'title', 'textAlign', 'center')"
                ></span
              ></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.title.textAlign === 'right' ? 'active' : ''"
                ><span
                  :class="
                    config.title.textAlign === 'right' ? 'right' : 'non-right'
                  "
                  @click="$emit('changeValue', 'title', 'textAlign', 'right')"
                ></span
              ></span>
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
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select v-model="config.title.fontFamily" placeholder="请选择">
                <el-option label="微软雅黑" value="微软雅黑"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.title.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称位置">
            <div style="display: flex">
              <span style="margin: 0 5px">x</span>
              <el-input v-model="config.title.xPos" size="mini"></el-input>
              <span style="margin: 0 5px">y</span>
              <el-input v-model="config.title.yPos" size="mini"></el-input>
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="文本(单位)" name="title">
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.unit.fontWeight === 'bold' ? 'active' : ''"
                ><span
                  :class="
                    config.unit.fontWeight === 'bold' ? 'bold' : 'non-bold'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'unit',
                      'fontWeight',
                      config.unit.fontWeight === 'bold' ? 'normal' : 'bold'
                    )
                  "
                ></span
              ></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.fontStyle === 'italic' ? 'active' : ''"
                ><span
                  :class="
                    config.unit.fontStyle === 'italic'
                      ? 'incline'
                      : 'non-incline'
                  "
                  @click="
                    $emit(
                      'changeValue',
                      'unit',
                      'fontStyle',
                      config.unit.fontStyle === 'normal' ? 'italic' : 'normal'
                    )
                  "
                ></span
              ></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign === 'left' ? 'active' : ''"
                ><span
                  :class="
                    config.unit.textAlign === 'left' ? 'left' : 'non-left'
                  "
                  @click="$emit('changeValue', 'unit', 'textAlign', 'left')"
                ></span
              ></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign === 'center' ? 'active' : ''"
                ><span
                  :class="
                    config.unit.textAlign === 'center' ? 'center' : 'non-center'
                  "
                  @click="$emit('changeValue', 'unit', 'textAlign', 'center')"
                ></span
              ></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.unit.textAlign === 'right' ? 'active' : ''"
                ><span
                  :class="
                    config.unit.textAlign === 'right' ? 'right' : 'non-right'
                  "
                  @click="$emit('changeValue', 'unit', 'textAlign', 'right')"
                ></span
              ></span>
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
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select v-model="config.unit.fontFamily" placeholder="请选择">
                <el-option label="微软雅黑" value="微软雅黑"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.unit.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="数值位置">
            <div style="display: flex">
              <span style="margin: 0 5px">x</span>
              <el-input v-model="config.unit.xPos" size="mini"></el-input>
              <span style="margin: 0 5px">y</span>
              <el-input v-model="config.unit.yPos" size="mini"></el-input>
            </div>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item title="图片" name="title">
          <el-form label-width="100px">
            <el-form-item label="icon：">
              <el-select v-model="config.pic.url">
                <el-option
                  v-for="(item, index) in piclist"
                  :key="index"
                  :label="`图片${index + 1}`"
                  :value="item"
                >
                  <img
                    :src="item"
                    alt=""
                    style="max-width: 100px;max-height: 100px"
                  />
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="背景宽高：">
              <div style="display: flex">
                <el-input v-model="config.pic.width" size="mini"></el-input>
                x
                <el-input v-model="config.pic.height" size="mini"></el-input>
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      piclist: [],
    };
  },
  mounted() {
    this.getPicData();
  },
  methods: {
    async getPicData() {
      // try {
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: "jspds",
        rowId: sessionStorage.getItem("rowid"),
        pageIndex: 1,
        pageSize: 100,
      };
      const result = await getFilterRows(data);
      this.piclist = result.data.rows.map(
        (item) => JSON.parse(item.url)[0].DownloadUrl
      );
      // this.numPiclist = result.data.rows.map(
      //   (item) => JSON.parse(item.numIcon)[0].DownloadUrl
      // );
      console.log(this.piclist);
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
    },
  },
};
</script>
