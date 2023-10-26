<template>
  <el-scrollbar class="right-setting scrollbar-wrapper switch-wrapper">
    <el-form
      label-width="120px"
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
      <el-form-item
        label="有无勾选框："
        label-width="110px"
      >
        <el-switch
          style="margin-top: 7px;"
          v-model="config.isShowCheckbox"
          @change="(val) => $emit('changeSize', 'isShowCheckbox', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="样式：">
        <el-select
          clearable
          v-model="config.box.backgroundImage"
        >
          <el-option
            v-for="item,index in bgPiclist"
            :key="index"
            :label="`图片${index + 1}`"
            :value="item.DownloadUrl"
          >
            <img
              :src="item.DownloadUrl"
              alt=""
              style="max-width: 100px;max-height: 100px"
            >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主题颜色：">
        <el-color-picker
          v-model="config.box.mainColor"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="不透明度：">
        <el-slider
          v-model="config.box.opacity"
          :min="0"
          :max="1"
          :step="0.01"
        ></el-slider>
      </el-form-item>

      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">分页选项卡</span>
              <el-switch
                v-model="config.level_1.display"
                active-value="flex"
                inactive-value="none"
              >
              </el-switch>
            </div>
          </template>
          <div style="display: flex;">
            <el-select
              v-model="config.input.level_1_option_value"
              placeholder="请选择"
              style="width: 100%;margin-bottom: 20px"
              size="mini"
              @change="select1Change"
            >
              <el-option
                v-for="item,index in config.level_1_tab"
                :key="index"
                :label="item"
                :value="index"
              >
                <div class="outer-select">
                  <span>{{item}}</span>
                  <i
                    class="el-icon-circle-close"
                    @click.stop="delLevel1Tab(index)"
                  ></i>
                </div>
              </el-option>
            </el-select>
            <i
              class="el-icon-circle-plus-outline"
              style="color: #fff;font-size: 28px;cursor:pointer;margin-left: 10px"
              @click="addTab"
            ></i>
          </div>
          <div style="display:flex">
            <span style="width: 50px;color: #fff">名称</span>
            <el-input
              v-model="config.input.level_1_input_value"
              size="mini"
              style="margin-bottom: 20px;margin-left: 10px"
              @input="level1Change"
            ></el-input>
          </div>
          <el-form-item label="背景色：">
            <el-color-picker
              v-model="config.level_1.background"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="高：">
            <el-input
              v-model="config.level_1.height"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="文字：">
            <div
              class="fontStyle"
              style="margin-bottom: 0"
            >
              <div class="block">
                <span
                  class="bg"
                  :class="config.level_1.fontWeight=== 'bold'? 'active':''"
                ><span
                    :class="config.level_1.fontWeight=== 'bold'? 'bold':'non-bold'"
                    @click="$emit('changeValue', 'level_1','fontWeight', config.level_1.fontWeight=== 'bold'? 'normal':'bold')"
                  ></span></span>
                <span class="title">加粗</span>
              </div>
              <div class="block">
                <span
                  class="bg"
                  :class="config.level_1.fontStyle === 'italic'? 'active':''"
                ><span
                    :class="config.level_1.fontStyle === 'italic'? 'incline':'non-incline'"
                    @click="$emit('changeValue', 'level_1','fontStyle', config.level_1.fontStyle=== 'normal'? 'italic':'normal')"
                  ></span></span>
                <span class="title">倾斜</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.level_1.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.level_1.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.level_1.fontFamily"
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
              v-model="config.level_1.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="边框粗细：">
            <div style="display: flex">
              <el-input
                v-model="config.level_1.borderWidth"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">二级分页选项卡</span>
              <el-switch
                v-model="config.level_2.display"
                active-value="flex"
                inactive-value="none"
              >
              </el-switch>
            </div>
          </template>
          <el-select
            v-model="config.input.level_2_option_value"
            placeholder="请选择"
            size="mini"
            style="width: 100%;margin-bottom: 20px"
          >
            <el-option
              v-for="item,index in config.level_1_tab"
              :key="index"
              :label="item"
              :value="index"
            ></el-option>
          </el-select>
          <div style="display: flex;">
            <el-select
              v-model="config.input.level_2_option_childValue"
              placeholder="请选择"
              size="mini"
              style="width: 100%;margin-bottom: 20px"
              @change="chooseTab"
            >
              <!-- <el-option
                v-for="item,index in config.level_2_tab[config.input.level_2_option_value]"
                :key="index"
                :label="item"
                :value="index"
              ></el-option> -->
              <el-option
                v-for="item,index in config.level_2_tab[config.input.level_2_option_value]"
                :key="index"
                :label="item"
                :value="index"
              >
                <div class="outer-select">
                  <span>{{item}}</span>
                  <i
                    class="el-icon-circle-close"
                    @click.stop="delLevel2Tab(index)"
                  ></i>
                </div>
              </el-option>
            </el-select>
            <i
              class="el-icon-circle-plus-outline"
              style="color: #fff;font-size: 28px;cursor:pointer;margin-left: 10px"
              @click="addTab2"
            ></i>
          </div>
          <!-- <div style="display:flex">
            <span style="width: 50px;color: #fff">名称</span>
            <el-input
              v-model="config.input.level_2_input_value"
              @input="input2Change"
              style="margin-bottom: 20px;margin-left: 10px"
              size="mini"
            ></el-input>
          </div> -->
          <el-form-item label="名称：">
            <el-input
              v-model="config.input.level_2_input_value"
              @input="input2Change"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="组织结构worksheetid：">
            <el-input
              v-model="config.input.worksheetid"
              @input="input3Change"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="组织结构参数：">
          </el-form-item>
          <vue-json-editor
            class="json-editor"
            v-model="config.input.param"
            style="width: 100%;height: 300px;margin-bottom: 20px"
            :showBtns="false"
            :mode="'code'"
            lang="zh"
            :expandedOnStart="true"
            @json-change="input4Change"
          />
          <el-form-item label="列表worksheetid：">
            <el-input
              v-model="config.input.worksheetid1"
              @input="input5Change"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="列表参数：">
          </el-form-item>
          <vue-json-editor
            class="json-editor"
            v-model="config.input.param1"
            style="width: 100%;height: 300px;margin-bottom: 20px"
            :showBtns="false"
            :mode="'code'"
            lang="zh"
            :expandedOnStart="true"
            @json-change="input6Change"
          />
          <el-form-item label="高：">
            <el-input
              v-model="config.level_2.height"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="文字：">
            <div
              class="fontStyle"
              style="margin-bottom: 0"
            >
              <div class="block">
                <span
                  class="bg"
                  :class="config.level_2.fontWeight=== 'bold'? 'active':''"
                ><span
                    :class="config.level_2.fontWeight=== 'bold'? 'bold':'non-bold'"
                    @click="$emit('changeValue', 'level_2','fontWeight', config.level_2.fontWeight=== 'bold'? 'normal':'bold')"
                  ></span></span>
                <span class="title">加粗</span>
              </div>
              <div class="block">
                <span
                  class="bg"
                  :class="config.level_2.fontStyle === 'italic'? 'active':''"
                ><span
                    :class="config.level_2.fontStyle === 'italic'? 'incline':'non-incline'"
                    @click="$emit('changeValue', 'level_2','fontStyle', config.level_2.fontStyle=== 'normal'? 'italic':'normal')"
                  ></span></span>
                <span class="title">倾斜</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.level_2.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.level_2.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <el-select
              v-model="config.level_2.fontFamily"
              placeholder="请选择"
            >
              <el-option
                label="微软雅黑"
                value="微软雅黑"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.level_2.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">文本(一级目录)</span>
              <el-switch
                v-model="config.level_1_text.display"
                active-value="flex"
                inactive-value="none"
                @change="switchChange"
              >
              </el-switch>
            </div>
          </template>
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.level_1_text.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.level_1_text.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'level_1_text','fontWeight', config.level_1_text.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_1_text.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.level_1_text.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'level_1_text','fontStyle', config.level_1_text.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_1_text.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.level_1_text.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'level_1_text','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_1_text.textAlign==='center'? 'active':''"
              ><span
                  :class="config.level_1_text.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'level_1_text','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_1_text.textAlign==='right'? 'active':''"
              ><span
                  :class="config.level_1_text.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'level_1_text','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.level_1_text.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.level_1_text.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.level_1_text.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">文本(二级目录)</span>
              <el-switch
                v-model="config.level_2_text.display"
                :disabled="config.level_1_text.display !== 'flex'"
                active-value="flex"
                inactive-value="none"
              >
              </el-switch>
            </div>
          </template>
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.level_2_text.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.level_2_text.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'level_2_text','fontWeight', config.level_2_text.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_2_text.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.level_2_text.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'level_2_text','fontStyle', config.level_2_text.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_2_text.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.level_2_text.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'level_2_text','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_2_text.textAlign==='center'? 'active':''"
              ><span
                  :class="config.level_2_text.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'level_2_text','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_2_text.textAlign==='right'? 'active':''"
              ><span
                  :class="config.level_2_text.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'level_2_text','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.level_2_text.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.level_2_text.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.level_2_text.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="文本(数据行)">
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.level_3_text.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.level_3_text.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'level_3_text','fontWeight', config.level_3_text.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_3_text.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.level_3_text.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'level_3_text','fontStyle', config.level_3_text.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_3_text.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.level_3_text.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'level_3_text','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_3_text.textAlign==='center'? 'active':''"
              ><span
                  :class="config.level_3_text.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'level_3_text','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.level_3_text.textAlign==='right'? 'active':''"
              ><span
                  :class="config.level_3_text.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'level_3_text','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.level_3_text.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.level_3_text.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.level_3_text.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="有无图标：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.level_3_text.isShowIcon"
            ></el-switch>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">搜索框</span>
              <el-switch
                v-model="config.searchBox.display"
                active-value="flex"
                inactive-value="none"
              >
              </el-switch>
            </div>
          </template>
          <el-form-item label="提示文字：">
            <el-input
              v-model="config.searchBox.placeHolder"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.searchBox.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.searchBox.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="宽高：">
            <div style="display: flex">
              <el-input
                v-model="config.searchBox.width"
                size="mini"
              ></el-input>x
              <el-input
                v-model="config.searchBox.height"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="位置：">
            <div style="display: flex">
              <el-input
                v-model="config.searchBox.left"
                size="mini"
              ></el-input>x
              <el-input
                v-model="config.searchBox.top"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="搜索字段：">
            <el-select
              v-model="config.searchBox.select"
              placeholder="请选择"
            >
              <el-option
                label="全局搜索"
                value="全局搜索"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <div @click.stop>
              <span style="margin-right: 10px">右侧显示</span>
              <el-switch v-model="config.right.show">
              </el-switch>
            </div>
          </template>
          <el-form-item label="显示类型：">
            <el-select
              v-model="config.right.type"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="数字文本"
                :value="1"
              ></el-option>
              <el-option
                label="右侧按钮配置"
                :value="2"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="颜色/字号："
            v-if="config.right.type === 1"
          >
            <div class="flex align-center">
              <el-color-picker
                v-model="config.right.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.right.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item
            label="默认图标："
            v-if="config.right.type === 2"
          >
            <el-select
              clearable
              v-model="config.right.defaultPic"
            >
              <el-option
                v-for="item,index in defaultPics"
                :key="index"
                :label="`图标${index + 1}`"
                :value="item.DownloadUrl"
              >
                <img
                  :src="item.DownloadUrl"
                  alt=""
                  style="max-width: 100px;max-height: 100px"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="选中图标："
            v-if="config.right.type === 2"
          >
            <el-select
              clearable
              v-model="config.right.hoverPic"
            >
              <el-option
                v-for="item,index in selectPics"
                :key="index"
                :label="`图标${index + 1}`"
                :value="item.DownloadUrl"
              >
                <img
                  :src="item.DownloadUrl"
                  alt=""
                  style="max-width: 100px;max-height: 100px"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="图标大小："
            v-if="config.right.type === 2"
          >
            <div style="display: flex">
              <el-input
                v-model="config.right.picWidth"
                size="mini"
              ></el-input>x
              <el-input
                v-model="config.right.picHeight"
                size="mini"
              ></el-input>
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="点击颜色">
          <el-form-item label="鼠标悬浮颜色：">
            <el-color-picker
              v-model="config.box.hoverColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="点击颜色：">
            <el-color-picker
              v-model="config.box.activeColor"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
import vueJsonEditor from 'vue-json-editor';
export default {
  props: {
    config: {
      type: Object
    }
  },
  components: {
    vueJsonEditor
  },
  data() {
    return {
      condition: '',
      bgPiclist: [],
      defaultPics: [],
      selectPics: []
    };
  },
  // watch: {
  //   config: {
  //     handler(nl) {
  //       // console.log(nl, nl.data.level_1_tab, 'config===form==================');
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  mounted() {
    this.getPicData();
  },
  methods: {
    async getPicData() {
      // try {
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'fylbbj',
        rowId: sessionStorage.getItem('rowid'),
        pageIndex: 1,
        pageSize: 100
      };
      const result = await getFilterRows(data);
      this.bgPiclist = result.data.rows
        .map((item) => {
          if (item.pic_url) {
            return JSON.parse(item.pic_url);
          }
        })
        .filter((item) => item)[0];
      this.defaultPics = result.data.rows
        .map((item) => {
          if (item.default_icon) {
            return JSON.parse(item.default_icon);
          }
        })
        .filter((item) => item)[0];
      this.selectPics = result.data.rows
        .map((item) => {
          if (item.select_icon) {
            return JSON.parse(item.select_icon);
          }
        })
        .filter((item) => item)[0];
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
    },
    level1Change() {
      this.config.level_1_tab[this.config.input.level_1_option_value] =
        this.config.input.level_1_input_value;
      this.$emit('changeSize', 'level_1_tab', this.config.level_1_tab);
    },
    select1Change() {
      this.config.input.level_1_input_value =
        this.config.level_1_tab[this.config.input.level_1_option_value];
    },
    switchChange() {
      if (this.config.level_1_text.display !== 'flex') {
        this.config.level_2_text.display = 'none';
      }
    },
    delLevel1Tab(index) {
      this.config.level_1_tab.splice(index, 1);
      this.config.level_2_tab.splice(index, 1);
      this.$emit(
        'changeValue',
        'input',
        'level_1_option_value',
        this.config.level_1_tab.length - 1
      );
      this.$emit(
        'changeValue',
        'input',
        'level_1_input_value',
        this.config.level_1_tab[this.config.level_1_tab.length - 1]
      );
      this.$emit('changeSize', 'level_1_tab', this.config.level_1_tab);
      this.$emit('changeSize', 'level_2_tab', this.config.level_2_tab);
    },
    delLevel2Tab(index) {
      this.config.level_2_tab[this.config.input.level_2_option_value].splice(
        index,
        1
      );
      let data = this.config.level_2_tab;
      // this.$emit(
      //   'changeValue',
      //   'input',
      //   'level_1_option_value',
      //   this.config.level_1_tab.length - 1
      // );
      this.$emit('changeSize', 'level_2_tab', data);
    },
    addTab() {
      let data = this.config.level_1_tab;
      data.push('新增');
      this.$emit('changeSize', 'level_1_tab', data);
      this.$emit('changeValue', 'input', 'level_1_input_value', '新增');
      this.config.input.level_1_option_value =
        this.config.level_1_tab.length - 1;
      this.config.level_2_tab.push([]);
      this.config.level_2_worksheetid.push([]);
      this.config.level_2_params.push([]);
      this.config.level_2_worksheetid1.push([]);
      this.config.level_2_params1.push([]);
    },
    addTab2() {
      let level_2_tab = this.config.level_2_tab;
      let level_2_worksheetid = this.config.level_2_worksheetid;
      let level_2_params = this.config.level_2_params;
      let level_2_worksheetid1 = this.config.level_2_worksheetid1;
      let level_2_params1 = this.config.level_2_params1;
      level_2_tab[this.config.input.level_2_option_value].push('新增');
      level_2_worksheetid[this.config.input.level_2_option_value].push('');
      level_2_params[this.config.input.level_2_option_value].push('');
      level_2_worksheetid1[this.config.input.level_2_option_value].push('');
      level_2_params1[this.config.input.level_2_option_value].push('');
      this.config.input.level_2_option_childValue =
        level_2_tab[this.config.input.level_2_option_value].length - 1;
      this.$emit('changeSize', 'level_2_tab', level_2_tab);
      this.$emit('changeValue', 'input', 'level_2_input_value', '新增');
      this.$emit('changeValue', 'input', 'worksheetid', '');
      this.$emit('changeValue', 'input', 'param', '');
      this.$emit('changeValue', 'input', 'worksheetid1', '');
      this.$emit('changeValue', 'input', 'param1', '');
    },
    chooseTab(item) {
      this.$emit(
        'changeValue',
        'input',
        'level_2_input_value',
        this.config.level_2_tab[this.config.input.level_2_option_value][item]
      );
      this.$emit(
        'changeValue',
        'input',
        'worksheetid',
        this.config.level_2_worksheetid[this.config.input.level_2_option_value][
          item
        ]
      );
      this.$emit(
        'changeValue',
        'input',
        'param',
        this.config.level_2_params[this.config.input.level_2_option_value][item]
      );
      this.$emit(
        'changeValue',
        'input',
        'worksheetid1',
        this.config.level_2_worksheetid1[
          this.config.input.level_2_option_value
        ][item]
      );
      this.$emit(
        'changeValue',
        'input',
        'param1',
        this.config.level_2_params1[this.config.input.level_2_option_value][
          item
        ]
      );
    },
    input2Change() {
      let data = this.config.level_2_tab;
      data[this.config.input.level_2_option_value][
        this.config.input.level_2_option_childValue
      ] = this.config.input.level_2_input_value;
      this.$emit('changeSize', 'level_2_tab', data);
    },
    input3Change() {
      let data = this.config.level_2_worksheetid;
      data[this.config.input.level_2_option_value][
        this.config.input.level_2_option_childValue
      ] = this.config.input.worksheetid;
      this.$emit('changeSize', 'level_2_worksheetid', data);
    },
    input4Change() {
      let data = this.config.level_2_params;
      data[this.config.input.level_2_option_value][
        this.config.input.level_2_option_childValue
      ] = this.config.input.param;
      this.$emit('changeSize', 'level_2_params', data);
    },
    input5Change() {
      let data = this.config.level_2_worksheetid1;
      data[this.config.input.level_2_option_value][
        this.config.input.level_2_option_childValue
      ] = this.config.input.worksheetid1;
      this.$emit('changeSize', 'level_2_worksheetid1', data);
    },
    input6Change() {
      console.log(this.config.input.param1);
      let data = this.config.level_2_params1;
      data[this.config.input.level_2_option_value][
        this.config.input.level_2_option_childValue
      ] = this.config.input.param1;
      this.$emit('changeSize', 'level_2_params1', data);
    }
  }
};
</script>

<style lang="scss">
.el-slider {
  width: 100%;
}
.el-collapse-item__header {
  display: flex;

  > span {
    margin-right: 20px;
  }
}
.outer-select {
  position: relative;
  padding-right: 18px;

  .el-icon-circle-close {
    position: absolute;
    right: 0;
    top: 3px;
  }
}
.switch-wrapper {
  .jsoneditor-vue {
    height: 300px;
  }
}
</style>