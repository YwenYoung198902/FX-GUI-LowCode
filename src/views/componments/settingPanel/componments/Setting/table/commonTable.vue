<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="136px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <el-form-item label="数据展示类型">
        <el-radio-group
          v-model="config.showDataType"
          @input="(val) => $emit('changeSize', 'showDataType', val)"
        >
          <el-radio label="table">表格</el-radio>
          <el-radio label="list">卡片</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="表格数据">
          <!-- <el-form-item label="显示序号：">
            <el-switch v-model="config.table.indexShow"></el-switch>
          </el-form-item> -->
          <el-form-item label="每页显示条数：">
            <el-input
              v-model="config.requestParams.pageSize"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
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
              <!-- <el-input
                v-model="item.value"
                size="mini"
                placeholder="请输入数据"
              ></el-input> -->
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
        </el-collapse-item>
        <el-collapse-item title="表头样式">
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
        </el-collapse-item>
        <el-collapse-item title="卡片式数据展示内容">
          <el-form-item label="宽度：">
            <el-input
              v-model="config.card.width"
              size="mini"
              placeholder="请输入宽度："
            ></el-input>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.card.height"
              size="mini"
              placeholder="请输入高度："
            ></el-input>
          </el-form-item>
          <el-form-item label="外间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.card.margin"
                size="mini"
                placeholder="请输入外间距"
                style="margin-right:12px"
              ></el-input>
            </div>
          </el-form-item>
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addShowCardTxt"
              >添加文本</el-button
            >
          </div>
          <commonTab :config="config" type1="card"></commonTab>
          <el-form-item label="高度：">
            <el-input
              v-model="config.card.button.height"
              size="mini"
              placeholder="请输入高度："
            ></el-input>
          </el-form-item>
          <el-collapse-item
            v-for="(item, i) in config.data.cardData"
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
            <span v-if="item.value.includes('img')">
              <el-form-item label="快照宽度：">
                <el-input
                  v-model="item.width"
                  size="mini"
                  placeholder="请输入快照宽度："
                ></el-input>
              </el-form-item>
              <el-form-item label="快照高度：">
                <el-input
                  v-model="item.height"
                  size="mini"
                  placeholder="请输入快照高度："
                ></el-input>
              </el-form-item>
            </span>
            <span style="margin-left:30px">
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('pre', 'cardData', i, item)"
                >上移</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('next', 'cardData', i, item)"
                >下移</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delData('cardData', i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
          <el-collapse-item title="按钮内容">
            <commonTab
              :config="config"
              :isShowColor="false"
              type1="card"
              type2="button"
            ></commonTab>
            <el-form-item label="高度：">
              <el-input
                v-model="config.card.height"
                size="mini"
                placeholder="请输入高度："
              ></el-input>
            </el-form-item>
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addShowButtonTxt"
                >添加文本</el-button
              >
            </div>
            <el-collapse-item
              v-for="(item, i) in config.data.buttonData"
              :key="i"
              :title="`文本 ${i + 1} 配置：`"
              style="margin-top:2px;"
            >
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
              <el-form-item label="宽度：">
                <el-input
                  v-model="item.width"
                  size="mini"
                  placeholder="请输入宽度："
                ></el-input>
              </el-form-item>
              <el-form-item label="背景色：">
                <el-color-picker
                  v-model="item.background"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="颜色：">
                <el-color-picker
                  v-model="item.color"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <span style="margin-left:20px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('pre', 'buttonData', i, item)"
                  >上移</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('next', 'buttonData', i, item)"
                  >下移</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData('buttonData', i)"
                  >删除选项</el-button
                >
              </span>
            </el-collapse-item>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="分页">
          <el-form-item label="显示分页：">
            <el-switch v-model="config.pagination.show"></el-switch>
          </el-form-item>
          <el-form-item label="外间距(上)：">
            <el-input
              v-model="config.pagination.marginTop"
              size="mini"
              placeholder="请输入外间距(上)"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景色：">
            <el-color-picker
              v-model="config.pagination.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体颜色：">
            <el-color-picker
              v-model="config.pagination.color"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选中背景色：">
            <el-color-picker
              v-model="config.pagination.activeBackground"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选中字体颜色：">
            <el-color-picker
              v-model="config.pagination.activeColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import commonSetTitle from "../componments/commonSetTitle";
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
  },
  methods: {
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
