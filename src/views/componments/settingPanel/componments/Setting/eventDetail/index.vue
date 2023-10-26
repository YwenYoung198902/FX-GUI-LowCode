<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-09 11:05:32
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-24 15:16:44
-->
<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="115px"
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
      <el-form-item label="默认展示隐藏：">
        <el-switch
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
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
      <el-form-item label="背景颜色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="弹窗头部图片：">
        <el-select v-model="config.box.headPic">
          <el-option
            v-for="item,index in headPiclist"
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
      <el-form-item label="关闭按钮图片：">
        <el-select v-model="config.box.closePic">
          <el-option
            v-for="item,index in closePiclist"
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
      <el-form-item label="标题字体大小：">
        <el-input
          v-model="config.box.headFontSize"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否POI点弹窗:">
        <el-switch
          v-model="config.isRelationPoi"
          @change="(val) => $emit('changeSize', 'isRelationPoi', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="关联图层表ID：">
        <el-input
          v-model="relationWorksheetId"
          size="mini"
          @blur="getLayer"
        ></el-input>
      </el-form-item>
      <el-form-item label="关联图层：">
        <el-select
          v-model="relationLayerId"
          @change="$emit('changeSize', 'relationLayerId', relationLayerId)"
          size="small"
          multiple
          class="currentPic"
        >
          <el-option
            v-for="(item) in layerList"
            :key="item.rowid"
            :label="item.name"
            :value="item.rowid"
          ></el-option>
        </el-select>

      </el-form-item>
      <el-collapse>
        <el-collapse-item
          title="展示字段"
          name="title"
        >
          <el-form-item label="第一列颜色：">
            <el-color-picker
              v-model="config.showField.first"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="第二列颜色：">
            <el-color-picker
              v-model="config.showField.second"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小：">
            <el-input
              v-model="config.showField.fontSize"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>事件操作按钮</span>
              <i
                class="el-icon-circle-plus-outline"
                @click="addBtn"
              ></i>
            </div>
          </template>
          <el-form
            label-width="90px"
            size="small"
            class="border-box"
            style="padding: 8px 16px"
          >
            <el-select
              v-model="currentBtn"
              @change="selectChange"
              size="small"
              class="currentPic"
            >
              <el-option
                v-for="item,index in config.buttons"
                :key="item.id"
                :label="`图片位${index + 1}`"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-form-item label="标题：">
              <el-input
                v-model="title"
                @input="contentChange"
              ></el-input>
            </el-form-item>
            <el-form-item label="操作效果：">
              <el-select
                v-model="currentEffect"
                @change="effectChange"
                size="small"
                class="currentPic"
              >
                <el-option
                  label="结案归档"
                  value="结案归档"
                ></el-option>
                <el-option
                  label="处置完成"
                  value="处置完成"
                ></el-option>
                <el-option
                  label="移交上报"
                  value="移交上报"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-collapse-item>

      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'eventDetail',
  data() {
    return {
      buttons: [],
      currentBtn: null,
      currentEffect: '',
      title: '',
      relationWorksheetId: '',
      relationLayerId: '',
      layerList: [],
      headPiclist: [],
      closePiclist: []
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
  watch: {
    config: {
      handler() {
        this.buttons = this.config.buttons;
        this.layerList = this.config.layerList;
        this.relationWorksheetId = this.config.relationWorksheetId;
        this.relationLayerId = this.config.relationLayerId;
      },
      immediate: true,
      deep: true
    }
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
        worksheetId: '6528a0cb1f76aeb5855bbf73',
        rowId: sessionStorage.getItem('rowid'),
        pageIndex: 1,
        pageSize: 100
      };
      const result = await getFilterRows(data);
      this.headPiclist = result.data.rows
        .map((item) => {
          if (item.headPic) {
            return JSON.parse(item.headPic);
          }
        })
        .filter((item) => item)[0];
      this.closePiclist = result.data.rows
        .map((item) => {
          if (item.closePic) {
            return JSON.parse(item.closePic);
          }
        })
        .filter((item) => item)[0];
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
    },
    addBtn() {
      this.buttons.push({
        id: new Date().getTime(),
        title: '',
        effect: ''
      });
      this.$emit('changeSize', 'data', this.buttons);
    },
    selectChange() {
      let index = this.buttons.findIndex((item) => item.id === this.currentBtn);
      this.title = this.buttons[index].title;
      this.currentEffect = this.buttons[index].effect;
    },
    contentChange() {
      let index = this.buttons.findIndex((item) => item.id === this.currentBtn);
      this.buttons[index].title = this.title;
      this.$emit('changeSize', 'data', this.buttons);
      this.$forceUpdate();
    },
    effectChange() {
      let index = this.buttons.findIndex((item) => item.id === this.currentBtn);
      this.buttons[index].effect = this.currentEffect;
      this.$emit('changeSize', 'data', this.buttons);
      this.$forceUpdate();
    },
    async getLayer() {
      this.$emit('changeSize', 'relationWorksheetId', this.relationWorksheetId);

      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.relationWorksheetId,
        pageSize: 500,
        pageIndex: 1
      });
      this.layerList = data.rows;
      this.$emit('changeSize', 'layerList', this.layerList);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-bock {
  display: inline-block;
  font-size: 0;
  margin-right: 10px;
  position: relative;
  height: 50px;

  > div {
    height: 0;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  img {
    width: 50px;
    height: 50px;
  }

  i {
    color: red;
    width: 20px;
    height: 20px;
    z-index: 1;
    font-size: 16px;
  }

  .el-icon-delete {
    position: absolute;
    right: 0;
    top: 5px;
    cursor: pointer;
  }

  .icon-delete {
    position: absolute;
    right: 3px;
    top: 0px;
  }
}

.el-form-item {
  .el-icon-plus.avatar-uploader-icon {
    color: #fff;
    font-size: 50px;
  }

  .el-form-item__content {
    flex-wrap: wrap;
  }
}
</style>