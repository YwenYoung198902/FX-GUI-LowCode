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
      <el-form-item
        label="默认展示隐藏："
        label-width="110px"
      >
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
            v-for="item,index in headPicList"
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
            v-for="item,index in closePicList"
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
      <el-form-item label="暂无画面图片：">
        <el-select v-model="config.box.emptyPic">
          <el-option
            v-for="item,index in emptyPicList"
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
          class="currentPic"
          multiple=""
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
          title="控制按钮图片"
          name="title"
        >
          <el-form-item label="按钮宽度：">
            <el-input
              v-model="config.controlBtn.width"
              size="mini"
              placeholder="请输入按钮宽度"
            ></el-input>
          </el-form-item>
          <el-form-item label="按钮高度：">
            <el-input
              v-model="config.controlBtn.height"
              size="mini"
              placeholder="请输入按钮高度"
            ></el-input>
          </el-form-item>
          <el-select
            v-model="picType"
            style="width: 100%;margin-bottom: 20px"
          >
            <el-option
              label="默认图片"
              value="默认图片"
            >
            </el-option>
            <el-option
              label="选中图片"
              value="选中图片"
            >
            </el-option>
          </el-select>
          <div v-show="picType === '默认图片'">
            <el-form-item label="上：">
              <el-select v-model="config.controlBtn.upwardPic">
                <el-option
                  v-for="item,index in upwardPicList"
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
            <el-form-item label="放大：">
              <el-select v-model="config.controlBtn.enlargePic">
                <el-option
                  v-for="item,index in enlargeList"
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
            <el-form-item label="缩小：">
              <el-select v-model="config.controlBtn.shrinkPic">
                <el-option
                  v-for="item,index in shrinkList"
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
          </div>
          <div v-show="picType === '选中图片'">
            <el-form-item label="上：">
              <el-select v-model="config.controlBtn.upwardPic_hover">
                <el-option
                  v-for="item,index in upwardSPicList"
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
            <el-form-item label="放大：">
              <el-select v-model="config.controlBtn.enlargePic_hover">
                <el-option
                  v-for="item,index in enlargeSelectList"
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
            <el-form-item label="缩小：">
              <el-select v-model="config.controlBtn.shrinkPic_hover">
                <el-option
                  v-for="item,index in shrinkSelectList"
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
          </div>
        </el-collapse-item>
      </el-collapse>

    </el-form>

    <el-form
      label-width="130px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-collapse>
        <el-collapse-item
          title="控制按钮图片"
          name="title"
        >
          <template slot="title">
            <span style="margin-right: 10px">掉线记录</span>
            <el-switch v-model="config.offline_record.isShow">
            </el-switch>
          </template>
          <el-form-item label="tab选项卡图片：">
            <el-select v-model="config.offline_record.pic">
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
          <el-form-item label="标题行字体大小：">
            <el-input
              v-model="config.offline_record.headFont"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据行字体大小：">
            <el-input
              v-model="config.offline_record.dataFont"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="标题与第二列文字颜色：">
            <el-color-picker
              v-model="config.offline_record.color"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="奇偶行交错颜色：">
            <el-color-picker
              v-model="config.offline_record.lineColor"
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
export default {
  name: 'SingleCamera',
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      relationWorksheetId: '',
      relationLayerId: '',
      layerList: [],
      bgPiclist: [],
      picType: '默认图片',
      upword: '',
      enlarge: '',
      shrink: '',
      headPicList: [],
      closePicList: [],
      emptyPicList: [],
      upwardPicList: [],
      upwardSPicList: [],
      enlargeList: [],
      enlargeSelectList: [],
      shrinkList: [],
      shrinkSelectList: []
    };
  },
  watch: {
    config: {
      handler() {
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
        worksheetId: '6528a0cb1f76aeb5855bbf72',
        rowId: sessionStorage.getItem('rowid'),
        pageIndex: 1,
        pageSize: 100
      };
      const result = await getFilterRows(data);
      this.headPicList = result.data.rows
        .map((item) => {
          if (item.headPic) {
            return JSON.parse(item.headPic);
          }
        })
        .filter((item) => item)[0];
      this.closePicList = result.data.rows
        .map((item) => {
          if (item.closePic) {
            return JSON.parse(item.closePic);
          }
        })
        .filter((item) => item)[0];
      this.emptyPicList = result.data.rows
        .map((item) => {
          if (item.emptyPic) {
            return JSON.parse(item.emptyPic);
          }
        })
        .filter((item) => item)[0];
      this.upwardPicList = result.data.rows
        .map((item) => {
          if (item.upwardPic) {
            return JSON.parse(item.upwardPic);
          }
        })
        .filter((item) => item)[0];
      this.upwardSPicList = result.data.rows
        .map((item) => {
          if (item.upwardSPic) {
            return JSON.parse(item.upwardSPic);
          }
        })
        .filter((item) => item)[0];
      this.enlargeList = result.data.rows
        .map((item) => {
          if (item.enlarge) {
            return JSON.parse(item.enlarge);
          }
        })
        .filter((item) => item)[0];
      this.enlargeSelectList = result.data.rows
        .map((item) => {
          if (item.enlargeSelect) {
            return JSON.parse(item.enlargeSelect);
          }
        })
        .filter((item) => item)[0];
      this.shrinkList = result.data.rows
        .map((item) => {
          if (item.shrink) {
            return JSON.parse(item.shrink);
          }
        })
        .filter((item) => item)[0];
      this.shrinkSelectList = result.data.rows
        .map((item) => {
          if (item.shrinkSelect) {
            return JSON.parse(item.shrinkSelect);
          }
        })
        .filter((item) => item)[0];
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
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