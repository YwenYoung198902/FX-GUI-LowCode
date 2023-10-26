<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-08-11 16:39:16
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-16 17:00:25
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-16 16:49:40
-->
<template>
  <div class="table-box" :style="styleObj1" v-show="config.data.isShow">
    <div class="box" :style="sassStyle">
      <div class="top" :style="styleObj2" v-show="config.header.show">
        <div class="top-left">
          <img
            :src="config.header.icon"
            v-if="config.header.icon"
            class="icon"
          />
          <div
            :class="['title', config.headerTxt.background ? 'gradient' : '']"
            :style="{ background: config.headerTxt.background }"
          >
            {{ config.header.txt }}
          </div>
        </div>
        <div class="top-right" v-show="config.close.show">
          <div class="tab-list" v-if="config.header.isShowChange">
            <span :class="{ hight1: active == 1 }" @click="active = 1" />
            <span :class="{ hight2: active == 2 }" @click="active = 2" />
          </div>
          <div
            class="close"
            :style="styleObj3"
            @click="config.data.isShow = false"
          ></div>
        </div>
      </div>
      <div class="middle" ref="middle" :style="styleObj4">
        <div
          class="select-box"
          v-for="item in config.data.selectTypeData"
          :key="item.id"
          :style="styleObj5(item)"
        >
          <span style="margin-right: 8px;">{{ item.data.label }}</span>
          <span v-if="item.data.type === 'dateTimePicker'">
            <el-date-picker
              v-model="timevalue"
              popper-class="cockpit-daterange"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :style="styleObj6(item)"
              @focus="showPopper"
              size="mini"
            />
          </span>
          <span class="search" v-if="item.data.type === 'search'">
            <el-input
              v-model="filter[item.data.value]"
              :placeholder="`请输入${item.data.label}搜索`"
              size="mini"
              :style="styleObj6(item)"
            >
              <el-button slot="append" icon="el-icon-search">
                搜索
              </el-button>
            </el-input>
            <i />
          </span>
          <span v-if="item.data.type === 'select'">
            <el-select
              v-model="filter[item.data.value]"
              class="cockpit-select-blue"
              popper-class="cockpit-select"
              placeholder="请选择"
              :style="styleObj6(item)"
              :popper-append-to-body="false"
              clearable
            >
              <el-option
                v-for="item in eventSourceData"
                :key="item.rowid"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </span>
        </div>
      </div>
      <Common-table
        v-if="active === 1"
        v-bind="option"
        :option="option"
        :config="config"
        :offsetHeight="offsetHeight"
      ></Common-table>
      <div v-else :style="{ height: config.table.height + 'px' }">
        <!-- 
          @click="rowHandleclick(item)" -->
        <el-scrollbar style="height: 100%;">
          <div class="list-box">
            <div
              v-for="(item, index) in config.data.tableData"
              :key="index"
              :style="styleObj7"
              class="box"
              ref="eventDom"
            >
              <div
                class="data-box"
                v-for="(v, i) in config.data.cardData"
                :key="i"
                :style="styleObj9(v)"
              >
                <div class="img-box" v-if="v.value.includes('img')">
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="imgUrl + item[v.value]"
                    :preview-src-list="[imgUrl + item[v.value]]"
                    @click.native.stop
                  >
                    <div
                      slot="error"
                      class="image-slot"
                      style=" max-width: 100%; max-height: 100%"
                    >
                      <img
                        style="max-width: 100%;max-height: 100%;"
                        src="@/assets/image/xiaokunshan/default-img.png"
                        alt=""
                      />
                    </div>
                  </el-image>
                </div>
                <div class="title txt-ellipsis" v-else>
                  <span v-if="v.label">{{ v.label }}:</span>
                  {{ item[v.value] }}
                </div>
              </div>
              <div class="btn">
                <div
                  v-for="(v, i) in config.data.buttonData"
                  :key="i"
                  class="txt-box"
                  :style="styleObj8(v)"
                >
                  {{ item[v.value] }}
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <el-pagination
        ref="pagination"
        v-if="config.pagination.show && config.data.tableData.length > 0"
        layout="prev, pager, next, total,jumper"
        :page-size="config.table.tbody.pageSize"
        :total="config.data.total"
        :current-page="config.requestParams.page"
        @current-change="getMoreEnventList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import CommonTable from "../CommonTable/index.vue";
import { setStyleObj } from "@/utils/index.js";
import { loadCustomApiData } from "@/utils/api";
import apiDataProcessing from "../../views/componments/apiDataProcessing.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  components: { CommonTable },
  data() {
    return {
      imgUrl: "https://www.sjxks.com",
      option: {},
      timevalue: "",
      filter: {},
      eventSourceData: [
        { name: "选项一", rowid: 1 },
        { name: "选项二", rowid: 2 },
      ],
      offsetHeight: 0,
      isShow: true,
      active: 1,
    };
  },
  watch: {
    "config.requestParams.pageSize"() {
      this.config.requestParams.page = 1;
      this.toLoadData();
    },
  },
  created() {
    this.toLoadData();
    this.setTableHeadStyle();
  },
  methods: {
    showPopper() {
      setTimeout(() => {
        let daterangeDom = document.getElementsByClassName("cockpit-daterange");
        let timeDom = document.getElementsByClassName("el-time-panel");
        for (let item of daterangeDom) {
          item.style.background = this.config.dropdownBox.boxbackground;
          item.style.border =
            "1px" + " solid " + this.config.dropdownBox.borderColor;
        }
        for (let item of timeDom) {
          item.style.background = this.config.dropdownBox.timebackground;
        }
      }, 0);
    },
    // 加载接口数据
    async toLoadData() {
      const { data } = await loadCustomApiData({
        api: this.config.api,
        type: this.config.requestType,
        data: {
          ...this.config.requestParams,
        },
      });
      let componentData = await apiDataProcessing.commonTable(
        data,
        this.config
      );
      this.$emit("changeSize", "data", componentData);
    },
    getMoreEnventList(val) {
      this.config.requestParams.page = val;
      this.toLoadData();
    },
    setTableHeadStyle() {
      this.config.data.tableHead.forEach((item) => {
        this.config.tableHeadStyle.styleData.push({
          width: "",
          color: "#fff",
          colorData: [],
        });
      });
    },
  },
  computed: {
    styleObj1() {
      let c = { ...this.config };
      let d = setStyleObj(c);
      let b = c.box;
      if (c.isShowBackgroundImg) {
        c.background && (d.background = `url(${c.background}) no-repeat`);
      } else {
        c.background && (d.background = c.background);
        c.borderWidth && (d.borderWidth = c.borderWidth + "px");
        c.borderStyle && (d.borderStyle = c.borderStyle);
        b.borderImage && (d.borderImage = b.borderImage);
        b.borderColor && (d.borderColor = b.borderColor);
      }
      return d;
    },
    styleObj2() {
      let d = setStyleObj({ ...this.config.header });
      d.display = d.display === "block" ? "flex" : "none";
      return d;
    },
    styleObj3() {
      let d = setStyleObj({ ...this.config.close });
      return d;
    },
    styleObj4() {
      let d = setStyleObj({
        margin: this.config.selection.margin,
      });
      return d;
    },
    styleObj5() {
      return function(item) {
        let d = setStyleObj({
          color: this.config.selection.color,
          marginLeft: item.marginLeft,
          marginTop: item.marginTop,
        });
        return d;
      };
    },
    styleObj6() {
      return function(item) {
        let d = setStyleObj(item);
        let s = setStyleObj(this.config.selection);
        delete s.margin;
        delete d.marginLeft;
        delete d.marginTop;
        Object.assign(d, s);
        return d;
      };
    },
    styleObj7() {
      let d = setStyleObj({ ...this.config.card });
      return d;
    },
    styleObj8() {
      return function(v) {
        let d = setStyleObj({ ...this.config.card.button });
        let s = setStyleObj(v);
        Object.assign(d, s);
        return d;
      };
    },
    styleObj9() {
      return function(v) {
        let d = setStyleObj(v);
        return d;
      };
    },
    sassStyle() {
      return {
        "--btnLine": this.config.card.button.height + "px",
        "--paginationMarginTop": this.config.pagination.marginTop + "px",
        "--paginationBackground": this.config.pagination.background,
        "--paginationColor": this.config.pagination.color,
        "--paginationActiveBackground": this.config.pagination.activeBackground,
        "--paginationActiveColor": this.config.pagination.activeColor,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "../../styles/darkTable.scss";
.table-box {
  background-size: 100% 100% !important;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    background-size: 100% 100% !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 15px;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      .tab-list {
        width: 64px;
        height: 32px;
        display: flex;
        cursor: pointer;
        margin-right: 20px;

        > span {
          width: 32px;
          height: 32px;
        }

        > span:nth-child(1) {
          background: url("../../assets/image/xiaokunshan/icon1.png") no-repeat;
          background-size: 100% 100%;
        }

        > span:nth-child(2) {
          background: url("../../assets/image/xiaokunshan/icon2.png") no-repeat;
          background-size: 100% 100%;
        }

        > span:nth-child(1).hight1 {
          background: url("../../assets/image/xiaokunshan/aicon1.png") no-repeat;
          background-size: 100% 100%;
        }

        > span:nth-child(2).hight2 {
          background: url("../../assets/image/xiaokunshan/aicon2.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      .close {
        background-size: 100% 100% !important;
        cursor: pointer;
      }
    }
  }
  .gradient {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
  }
  .middle {
    display: flex;
    flex-wrap: wrap;
    .select-box {
      display: flex;
      align-items: center;
      ::v-deep .el-range-input {
        background: transparent;
      }
      ::v-deep .el-input__inner {
        background: transparent;
        border: 0;
        color: var(--selectColor);
        height: 100%;
      }
      ::v-deep .el-range-input {
        color: var(--selectColor);
      }
      ::v-deep .el-input-group__append {
        background: transparent;
        color: var(--selectColor);
        border: 0;
        .el-button {
          background: transparent;
          border: 0;
        }
      }
      ::v-deep .el-date-editor {
        .el-range-separator {
          display: flex;
          align-items: center;
          color: var(--selectColor);
        }
      }
    }
  }
  ::v-deep .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .pagination {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 10px;
  }
  ::v-deep .el-pagination {
    margin-top: var(--paginationMarginTop);
    color: var(--paginationColor);
    display: flex;
    justify-content: center;
    .btn-prev,
    .btn-next {
      background: var(--paginationBackground);
    }
    .btn-next {
      margin-left: 10px;
    }
    .el-pager {
      li {
        background: var(--paginationBackground);
        color: var(--paginationColor);
        margin-left: 10px;
      }
      li.active {
        background: var(--paginationActiveBackground);
        color: var(--paginationActiveColor);
      }
    }
    .el-pagination__total {
      margin: 0 30px 0 10px;
      color: var(--paginationColor);
    }
    .el-pagination__jump {
      margin-left: 24px;
      color: var(--paginationColor);
      .el-pagination__editor {
        margin: 0 6px;
        .el-input__inner {
          background: var(--paginationBackground);
          color: var(--paginationColor);
          border: 0;
        }
      }
    }
  }
  .list-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 10px;
    // overflow-y: auto;
    .box {
      padding: 0 10px;
      .img-box {
        width: 100%;
        height: 100%;
        margin-bottom: 5px;
        position: relative;
        ::v-deep.el-image {
          .el-image__inner {
            max-width: 100% !important;
            max-height: 100% !important;
            width: auto !important;
            height: auto !important;
            position: absolute;
            left: 0;
            bottom: 0;
            top: 0;
            right: 0;
            margin: auto;
          }
          .image-slot {
            padding-top: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .btn {
      display: flex;
      margin-top: 5px;
      .txt-box {
        line-height: var(--btnLine);
        margin-right: 10px;
      }
    }
  }
}
</style>
