<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="100px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <el-form-item label="背景图：">
        <imgSelect
          :backgroundData="backgroundData"
          :config="config"
          datatype1="box"
        />
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="中间标题" name="centertitle">
          <el-form-item label="文本：">
            <el-input
              v-model="config.title.txt"
              size="mini"
              placeholder="请输入文本"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.title.height"
              size="mini"
              placeholder="请输入组件高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="宽度：">
            <el-input
              v-model="config.title.width"
              size="mini"
              placeholder="请输入组件高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="行高：">
            <el-input
              v-model="config.title.lineHeight"
              size="mini"
              placeholder="请输入行高"
            ></el-input>
          </el-form-item>
          <commonTab
            :config="config"
            type1="title"
            :isShowColor="false"
          ></commonTab>
          <txtGradient :config="config" type="titleTxt" parentType="title" />
          <!-- <el-form-item label="外间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.title.margin"
                size="mini"
                placeholder="请输入外间距"
                style="margin-right: 12px"
              ></el-input>
            </div>
          </el-form-item> -->
          <el-form-item label="背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="title"
              type="zjbtbjt"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="两侧标题" name="title">
          <el-form-item label="宽度：">
            <el-input
              v-model="config.menu.width"
              size="mini"
              placeholder="请输入组件高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.menu.height"
              size="mini"
              placeholder="请输入组件高度"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="行高：">
            <div class="flex align-center">
              <el-input
                v-model="config.menu.lineHeight"
                size="mini"
                placeholder="请输入行高"
                style="margin-right:12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <commonTab
            :config="config"
            type1="menu"
            :isShowColor="false"
          ></commonTab>
          <txtGradient :config="config" type="menuTxt" parentType="menu" />
          <el-form-item label="左侧外间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.leftMenu.margin"
                size="mini"
                placeholder="请输入外间距"
                style="width: 125px;"
              ></el-input>
              <div style="width: 80px;">(上右下左)</div>
            </div>
          </el-form-item>
          <el-form-item label="左侧背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="leftMenu"
              type="zcbjt"
            />
          </el-form-item>
          <el-form-item label="右侧外间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.rightMenu.margin"
                size="mini"
                placeholder="请输入外间距"
                style="width: 125px;"
              ></el-input>
              <div style="width: 80px;">(上右下左)</div>
            </div>
          </el-form-item>
          <el-form-item label="右侧背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="rightMenu"
              type="ycbjt"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="两侧标题选中效果" name="activetitle">
          <txtGradient
            :config="config"
            type="menuActiveTxt"
            parentType="menu"
          />
          <el-form-item label="左侧背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="leftActiveMenu"
              type="zcxzbjt"
            />
          </el-form-item>
          <el-form-item label="右侧背景图：">
            <imgSelect
              :backgroundData="backgroundData"
              :config="config"
              datatype1="rightActiveMenu"
              type="ycxzbjt"
            />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="按钮" name="button">
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addMenu"
              >添加选项</el-button
            >
          </div>
          <el-form-item
            v-for="(item, i) in config.data"
            v-if="
              item.route != 'camera' &&
                item.route != 'operation' &&
                item.route != 'eventDetail'
            "
            :label="`选项 ${i + 1} ：`"
          >
            <el-input
              v-model="item.name"
              size="mini"
              placeholder="请输入名称"
              style="margin-right: 5px"
            ></el-input>
            <el-input
              v-model="item.route"
              size="mini"
              placeholder="请输入路由"
              style="margin-right:5px;"
            ></el-input>
            <el-button type="danger" size="mini" @click="delMenu(i)"
              >删除选项</el-button
            >
            <!-- <i style="color: red" class="el-icon-delete" @click="delMenu(i)" /> -->
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import txtGradient from "../componments/txtGradient";
import commonSetTitle from "../componments/commonSetTitle";
import imgSelect from "../imgSelect";
import { getImgData } from "@/utils/index.js";
export default {
  name: "setting",
  components: { commonTab, txtGradient, imgSelect, commonSetTitle },
  data() {
    return {
      backgroundData: "",
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    changeSize: {
      type: Function,
    },
  },
  watch: {},
  mounted() {
    this.getBackgroundData();
  },
  methods: {
    async getBackgroundData() {
      this.backgroundData = await getImgData(this.config);
    },
    addMenu() {
      let length = this.config.data.length;
      this.config.data.push({ name: "", route: length + 1 });
    },
    delMenu(i) {
      this.config.data.splice(i, 1);
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
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
  }
  .button-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
.el-select-dropdown__list {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding: 6px !important;
  .el-select-dropdown__item {
    height: auto;
    padding: 0 7px;
  }
  .img-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
