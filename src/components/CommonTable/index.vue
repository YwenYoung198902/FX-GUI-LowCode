<template>
  <div class="dataTable" :key="number" :style="sassStyle">
    <!-- 
      @selection-change="(item) => $emit('handleSelectionChange', item)" -->
    <el-table
      :data="config.data.tableData"
      :stripe="config.table.stripe"
      :height="config.table.height"
      :key="number"
      ref="eventDom"
      :header-cell-style="headerStyle"
      @row-click="(item) => $emit('handleRowClick', item)"
    >
      <el-table-column
        label="序号"
        type="index"
        width="70"
        align="center"
        v-if="config.table.indexShow"
      >
        <template scope="scope">
          <span v-if="pageObj">{{
            (pageObj.currentPage - 1) * pageObj.size + scope.$index + 1
          }}</span>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <template v-for="(item, i) in config.data.tableHead">
        <el-table-column
          :key="item.value"
          :align="config.table.align"
          :label="item.label"
          :prop="item.value"
          :width="config.tableHeadStyle.styleData[i].width"
          :formatter="item.formatter"
          :show-overflow-tooltip="item.showOverflow"
          :min-width="fixWidth(item.label)"
          :fixed="item.fixed"
        >
          <template scope="scope">
            <div class="img-box"  v-if="item.value.includes('img')">
              <el-image :src="imgUrl + scope.row[item.value]">
                <div slot="error" class="image-slot">
                  <span class="img">
                    <img
                      src="@/assets/image/xiaokunshan/default-img1.png"
                      alt=""
                    />
                  </span>
                </div>
              </el-image>
            </div>
            <span v-else :style="cellStyle(item, i, scope.row[item.value])">{{
              scope.row[item.value]
            }}</span>
          </template>
        </el-table-column>
      </template>
      <div slot="empty">
        <Empty />
      </div>
    </el-table>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
import Empty from "../Empty/index";
export default {
  props: {
    config: {
      type: Object,
    },
    offsetHeight: {
      type: Number,
    },
  },
  components: { Empty },
  data() {
    return {
      imgUrl: "https://www.sjxks.com",
      number: Math.random() * 1000,
    };
  },
  computed: {
    headerStyle() {
      let d = setStyleObj({ ...this.config.table.theader });
      return d;
    },
    cellStyle() {
      return function(item, i, label) {
        let d = setStyleObj({ ...this.config.table.tbody });
        delete d.height;
        let c = this.getColor(i, label);
        c && Object.assign(d, { color: c });
        return d;
      };
    },
    tableHeight() {
      if (this.pageObj) {
        return `calc(${this.height} - 40px)`;
      }
      return this.height;
    },
    sassStyle() {
      let border;
      if (this.config.table.borderShow) {
        let b = setStyleObj({ ...this.config.table });
        border = b.borderWidth + " " + b.borderStyle + " " + b.borderColor;
      }
      return {
        "--border": this.config.table.borderShow ? border : 0,
        "--badyheight": this.config.table.tbody.height + "px",
        "--headerheight": this.config.table.theader.height + "px",
        "--background1": this.config.table.tbody.background1,
        "--background2": this.config.table.tbody.background2,
        "--background3": this.config.table.tbody.background3,
        "--rowColor": this.config.table.tbody.color,
      };
    },
  },

  methods: {
    fixWidth(val) {
      if (!val) return 0;
      let length = val.length * 16 + 10;
      if (length < 80) {
        length = 80;
      }
      return length;
    },
    getColor(i, label) {
      let styleData = this.config.tableHeadStyle.styleData[i];
      let color;
      if (styleData.colorData.length > 0) {
        styleData.colorData.forEach((v) => {
          if (v.label === label) {
            color = v.color;
          }
        });
      } else {
        color = styleData.color;
      }
      return color;
    },
  },
  watch: {
    "config.data.tableHead": {
      handler(nl) {
        this.number = Math.random() * 1000;
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.dataTable {
  width: 100%;
  position: relative;
  background: transparent;
  ::v-deep {
    .el-table {
      background: transparent;
      th,
      tr {
        background: transparent;
      }
      .empty-description {
        color: #fff;
      }
      .el-table__body {
        .image-slot {
          width: 100%;
          height: 100%;
          display: table;
          .img {
            width: 100%;
            height: 100%;
            display: table-cell;
            vertical-align: middle;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        tr {
          height: var(--badyheight);
          .img-box {
            width: 100%;
            height: var(--badyheight);
            padding: 5px 0;
            .el-image {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              // display: flex;
              // align-items: center;
              .el-image__inner {
                max-width: 100%;
                max-height: 100%;
                width: auto !important;
                height: auto !important;
              }
            }
          }
        }
      }
      .el-table__header {
        tr {
          height: var(--headerheight);
        }
      }
      th,
      td {
        padding: 0;
      }
      .el-table__body {
        .el-table__row:nth-child(2n-1) {
          background: var(--background1);
        }
        .el-table__row:nth-child(2n) {
          background: var(--background2);
        }
        tr:hover > td {
          background: var(--background3);
        }
      }
    }
    .el-table::before {
      height: 0 !important;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: var(--border);
    }
  }
}
</style>
