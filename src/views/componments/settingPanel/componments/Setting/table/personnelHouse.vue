<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="110px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <el-form-item label="背景图片：">
        <el-select v-model="config.box.backgroundImg" clearable>
          <el-option
            v-for="(item, index) in imgList.bg_img"
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
      <el-form-item label="关闭按钮图片：">
        <el-select v-model="config.box.closeImg" clearable>
          <el-option
            v-for="(item, index) in imgList.close_img"
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
      <el-form-item label="是否POI点弹窗:">
        <el-switch
          v-model="config.isRelationPoi"
          @change="(val) => $emit('changeSize', 'isRelationPoi', val)"
        ></el-switch>
      </el-form-item>
       <div v-if='config.isRelationPoi'>
        <el-form-item label="关联图层表ID："  label-width="115px">
        <el-input
          v-model="relationWorksheetId"
          size="mini"
          @blur="getLayer"
        ></el-input>
      </el-form-item>
      <el-form-item label="关联图层：">
        <!-- <el-select
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
        </el-select> -->
      </el-form-item>
       </div>
      <el-collapse>
        <el-collapse-item title="弹窗头部">
          <commonTab :config="config" type1="box" />
          <el-form-item label="头部图片：">
            <el-select v-model="config.box.headImg" clearable>
              <el-option
                v-for="(item, index) in imgList.header_img"
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
          <el-form-item label="图片高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.height"
                size="mini"
                placeholder="请输入..."
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="页面中小标题样式">
          <commonTab :config="config" type1="box" type2="smallTitle" />
          <el-form-item label="文本缩进值：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.smallTitle.textIndent"
                size="mini"
                placeholder="请输入..."
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="标题样式图片：">
            <el-select v-model="config.box.smallImg" clearable>
              <el-option
                v-for="(item, index) in imgList.small_img"
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
          <el-form-item label="图片高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.smallTitle.height"
                size="mini"
                placeholder="请输入..."
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="房屋信息" >
          <el-collapse-item title="标题"  style="margin-bottom:10px;">
            <el-form-item label="表ID：">
              <el-input
                size="mini"
                placeholder="请输入..."
              ></el-input
              >
          </el-form-item>
          <el-form-item label="字段值：">
            <el-select
              popper-class="setting-select"
              placeholder="请选择字体"
            >
              <!-- <el-option
                v-for="(item, i) in fontList"
                :label="item"
                :key="i"
                :value="item"
              ></el-option> -->
            </el-select>
          </el-form-item>
           </el-collapse-item>
           <el-collapse-item title="字段展示" >
            <el-form-item label="表ID："   label-width="90px">
              <el-input
                size="mini"
                placeholder="请输入..."
              ></el-input
              >
          </el-form-item>
           <!-- <div class="box">
            <span >字段展示</span>
            <el-button type="primary" @click.stop="dialogVisible = true" size="mini" 
                  >显示字段选择</el-button>
            <el-dialog
              title="显示字段信息"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <div>

              </div>


              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.stop="dialogVisible = false"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
          </div> -->
          <el-form-item label="字段排列：" label-width="90px">
          <div
            class="flex"
            style="color: #fff;"
          > 
          <div style="margin-right: 10px">一行</div>
            <el-input-number
              :min="1"
              :step="1" step-strictly
              label=""
            ></el-input-number>
            <div style="margin-left: 10px">个</div>
          </div>
        </el-form-item>
        <el-form-item label="字段名称宽高："  label-width="120px">
            <div class="flex align-center">
              <el-input
                size="mini"
                placeholder="宽"
              ></el-input
              >x<el-input
                size="mini"
                placeholder="高"
              ></el-input
              >
            </div>
          </el-form-item>
          <el-form-item label="字段值宽高："  label-width="120px">
            <div class="flex align-center">
              <el-input
                size="mini"
                placeholder="宽"
              ></el-input
              >x<el-input
                size="mini"
                placeholder="高"
              ></el-input
              >
            </div>
          </el-form-item>
          <el-form-item label="字体大小：">
            <div class="flex align-center">
              <!-- 
                v-model="config.box.height" -->
              <el-input
                size="mini"
                placeholder="请输入..."
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="字体颜色(左右)：" label-width="120px">
        <el-color-picker
          size="mini"
          show-alpha
          style='margin-right:10px'
        ></el-color-picker>
        <el-color-picker
          size="mini"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框颜色(左右)： " label-width="120px">
        <el-color-picker
          size="mini"
          show-alpha
          style='margin-right:10px'
        ></el-color-picker>
        <el-color-picker
          size="mini"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="背景颜色(左右)：" label-width="120px">
        <el-color-picker
          size="mini"
          show-alpha
          style='margin-right:10px'
        ></el-color-picker>
        <el-color-picker
          size="mini"
          show-alpha
        ></el-color-picker>
      </el-form-item>
        </el-collapse-item>
       
        </el-collapse-item>
          </el-collapse-item>
        </div>
        <!-- <el-collapse-item title="表格数据">
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addShowTxt"
                >添加文本</el-button
              >
            </div>
            <el-collapse-item
              v-for="(item, i) in config.data.tableHead"
              :key="i"
              :title="`文本 ${i + 1} 配置：`"
              style="margin-top:2px;"
            >
              <el-form-item label="文本名称：">
                <el-input
                  v-model="item.label"
                  size="mini"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="数据：">
                <el-select
                  popper-class="setting-select"
                  v-model="item.value"
                  placeholder="请选择数据key"
                >
                  <el-option
                    v-for="(item, i) in config.data.tableKeyData"
                    :label="item"
                    :key="i"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文本宽度：">
                <el-input
                  v-model="config.tableHeadStyle.styleData[i].width"
                  size="mini"
                  placeholder="请输入宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="文本颜色：">
                <el-color-picker
                  v-model="config.tableHeadStyle.styleData[i].color"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="枚举文本颜色：">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addColorData(i)"
                  >添加颜色配置</el-button
                >
              </el-form-item>
              <el-form-item
                class="no-margin"
                v-for="(v, index) in config.tableHeadStyle.styleData[i].colorData"
              >
                <el-input
                  v-model="v.label"
                  size="mini"
                  placeholder="请输入值"
                ></el-input>
                <el-color-picker
                  v-model="v.color"
                  size="mini"
                  style="margin-left: 5px;"
                  show-alpha
                ></el-color-picker>
                <i
                  style="color: red"
                  class="el-icon-delete"
                  @click="delColor(i, index)"
                />
              </el-form-item>
              <el-form-item label="内容是否隐藏：">
                <el-switch v-model="item.showOverflow"></el-switch>
              </el-form-item>
              <span style="margin-left:30px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('pre', 'tableHead', i, item)"
                  >上移</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('next', 'tableHead', i, item)"
                  >下移</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData('tableHead', i)"
                  >删除选项</el-button
                >
              </span>
            </el-collapse-item>
          </el-collapse-item> -->
        <!-- <el-collapse-item title="表头样式">
          <commonTab :config="config" type1="table" type2="theader"></commonTab>
          <el-form-item label="高度：">
            <el-input
              v-model="config.table.theader.height"
              size="mini"
              placeholder="请输入高度"
              style="margin-right:12px"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.table.theader.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="表格样式">
          <el-form-item label="显示下边框：">
            <el-switch v-model="config.table.borderShow"></el-switch>
          </el-form-item>
          <span v-if="config.table.borderShow">
            <el-form-item label="边框宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.table.borderWidth"
                  size="mini"
                  placeholder="请输入边框宽度"
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="边框样式：">
              <el-select
                popper-class="setting-select"
                v-model="config.table.borderStyle"
                placeholder="请选边框样式"
              >
                <el-option
                  v-for="(item, i) in styleList"
                  :label="item"
                  :key="i"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="边框颜色：">
              <el-color-picker
                v-model="config.table.borderColor"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
          </span>
          <el-form-item label="高度：">
            <el-input
              v-model="config.table.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="行高：">
            <el-input
              v-model="config.table.tbody.height"
              size="mini"
              placeholder="请输入行高"
            ></el-input>
          </el-form-item>
          <el-form-item label="单行文本背景色：">
            <el-color-picker
              v-model="config.table.tbody.background1"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="双行文本背景色：">
            <el-color-picker
              v-model="config.table.tbody.background2"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="鼠标滑过背景色：">
            <el-color-picker
              v-model="config.table.tbody.background3"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <commonTab
            :config="config"
            type1="table"
            type2="tbody"
            :isTxtAlign="false"
          ></commonTab>
        </el-collapse-item> -->
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import commonSetTitle from "../componments/commonSetTitle";
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
export default {
  name: "setting",
  components: { commonTab, commonSetTitle },
  data() {
    return {
      styleList: ["solid", "dashed"],
      border: {
        width: "",
        type: "",
        color: "",
      },
      selectTypeData: [
        { txt: "日期时间", type: "dateTimePicker" },
        // { txt: "时间", type: "timePicker" },
        { txt: "关键字搜索", type: "search" },
        { txt: "选择器", type: "select" },
      ],
      optionData: [],
      selectData: [],
      imgList: {},
      dialogVisible: false,
      relationWorksheetId:'',
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
    this.getSelectData();

    this.getImgData();
  },
  methods: {
    getLayer(){},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getImgData() {
      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.worksheetId,
        pageSize: 500,
        pageIndex: 1,
      });
      let dataImg = data;
      this.imgList = {};
      dataImg.rows.forEach((item) => {
        if (item.sfqy === "启用") {
          let bg_img = item.bg_img ? JSON.parse(item.bg_img) : [];
          let close_img = item.close_img ? JSON.parse(item.close_img) : [];
          let header_img = item.header_img ? JSON.parse(item.header_img) : [];
          let small_img = item.small_img ? JSON.parse(item.small_img) : [];
          bg_img.length &&
            bg_img.forEach((v) => {
              this.imgList.bg_img = [];
              this.imgList.bg_img.push(v.DownloadUrl);
            });
          close_img.length &&
            close_img.forEach((v) => {
              this.imgList.close_img = [];
              this.imgList.close_img.push(v.DownloadUrl);
            });
          header_img.length &&
            header_img.forEach((v) => {
              this.imgList.header_img = [];
              this.imgList.header_img.push(v.DownloadUrl);
            });
          small_img.length &&
            small_img.forEach((v) => {
              this.imgList.small_img = [];
              this.imgList.small_img.push(v.DownloadUrl);
            });
        }
      });
    },
    addShowTxt() {
      let length = this.config.data.tableHead.length;
      this.config.data.tableHead.push({
        label: "",
        value: "",
        showOverflow: false,
        id: length,
      });
      this.config.tableHeadStyle.styleData.push({
        width: "",
        color: "#fff",
        colorData: [],
      });
    },
    addColorData(i) {
      this.config.tableHeadStyle.styleData[i].colorData.push({
        label: "",
        color: "",
      });
    },
    delColor(i, index) {
      this.config.tableHeadStyle.styleData[i].colorData.splice(index, 1);
    },
    addShowCardTxt() {
      let length = this.config.data.cardData.length;
      this.config.data.cardData.push({
        label: "",
        value: "",
        width: "",
        height: "",
        id: length,
      });
    },
    addShowButtonTxt() {
      let length = this.config.data.buttonData.length;
      this.config.data.buttonData.push({
        label: "",
        value: "",
        width: "",
        background: "",
        color: "",
        id: length,
      });
    },
    delData(dataType, i) {
      this.config.data[dataType].splice(i, 1);
      if (dataType === "tableHead") {
        this.getSelectData();
      }
    },
    getSelectData() {
      this.selectData = this.config.data.tableHead.filter((item) => item.type);
      this.selectData.push({ label: "关键字", type: "search" });
    },
    changeIndex(type, dataType, i, data) {
      let index;
      if (type === "pre") {
        if (i === 0) {
          this.$message.warning("当前已经是第一个，无法再上移");
          return;
        } else {
          index = i - 1;
        }
      } else {
        if (i === this.config.data[dataType].length - 1) {
          this.$message.warning("当前已经是最后一个，无法再下移");
          return;
        } else {
          index = i + 1;
        }
      }
      let d = this.config.data[dataType];
      d.splice(index, 1, ...d.splice(i, 1, d[index]));
      if (dataType === "tableHead") {
        let s = this.config.tableHeadStyle.styleData;
        s.splice(index, 1, ...s.splice(i, 1, s[index]));
      }
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
  .no-margin {
    .el-form-item__content {
      margin-left: 0 !important;
      display: flex;
      align-items: center;
      .el-icon-delete {
        line-height: normal;
        margin-left: 10px;
        cursor: pointer;
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
    .el-input-number--small{
      width:100px;
    }
    .box {
      color: #fff;
      height: 48px;
      font-size: 13px;
      display: flex;
      align-items: center;
      margin-top:5px;
      margin-bottom:18px;
      >span{
        margin-right:20px;
        width:70px;
        text-align:right;
      }
      .el-dialog__wrapper {
        display: flex;
        align-items: center;
        .el-dialog{
          margin-top:0 !important; 
          .el-dialog__header{
            font-weight:900;
          }
        }
      }
    }
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
