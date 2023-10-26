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
      <el-form-item label="富文本：">
      </el-form-item>
      <div>
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          ref="toolbar"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 300px; overflow-y: hidden;"
          v-model="config.data"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
          @onChange="onChange"
        />
      </div>
    </el-form>
  </el-scrollbar>
</template>
  
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default {
  data() {
    return {
      editor: null,
      toolbarConfig: {
        toolbarKeys: [
          'bold', // 粗体
          'italic', //斜体
          'underline', //下划线
          'through', // 删除线
          'fontSize', // 字号
          'fontFamily',
          'indent',
          'justifyJustify',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'lineHeight',
          'color', // 文字颜色
          'bgColor', // 背景颜色
          'clearStyle',
          'undo', // 撤销
          'redo', // 重复
          'fullScreen'
        ]
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'simple' // or 'default'
    };
  },
  components: {
    Editor,
    Toolbar
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
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onChange(val) {
      // console.log(val.getHtml());
      this.$emit('changeSize', 'data', val.getHtml());
    }
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  }
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style> 
<style lang="scss" >
.right-setting {
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }

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

  .w-e-full-screen-container {
    z-index: 999;
  }
  .w-e-bar {
    background-color: #191a1a;
    color: #fff;
  }
  .w-e-text-container {
    background-color: #191a1a;
    color: #fff;
  }
  .w-e-bar-item .active {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .w-e-bar svg {
    fill: #fff;
  }
  .w-e-bar-item button {
    color: #fff;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .w-e-select-list {
    background-color: #191a1a;
  }
  .w-e-select-list ul {
    li:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .selected {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .w-e-drop-panel {
    left: -120px !important;
  }
}
</style>
  