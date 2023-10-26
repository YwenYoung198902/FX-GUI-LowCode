<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-08-17 11:42:52
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-17 13:16:00
-->
<template>
  <span>
    <el-form-item label="名称：">
      <div class="componentName" style="display:flex;align-items:center">
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
        placeholder="请输入组件宽度"
        @change="(val) => $emit('changeSize', 'width', val)"
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
    <el-form-item label="默认展示隐藏：">
      <el-switch
        v-model="config.isShowModule"
        @change="(val) => $emit('changeSize', 'isShowModule', val)"
      ></el-switch>
    </el-form-item>
  </span>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
    },
  },
};
</script>
