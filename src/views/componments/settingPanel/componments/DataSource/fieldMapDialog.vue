<template>
  <el-dialog v-if="isShow" title="数据源" width="700px" class="importDataDialog" :visible="isShow" @close="toClose">
    <div class="fieldMapDialogWrap">
      <div class="data-list">
        <div class="data-item">
          <div class="data-source_wrap title">
            <div class="title">组件字段</div>
          </div>
          <div class="data-point-to">

          </div>
          <div class="data-target_wrap  title">
            <div class="title">工作表字段</div>

          </div>
        </div>
        <div class="data-item" v-for="(item, index) in targetData" :key="index">
          <div class="data-source_wrap">
            {{ targetData[index].sourceFiled }}
          </div>
          <div class="data-point-to">
            <img :src="require('@/assets/image/arrow.png')" width="20px" alt="" srcset="">
          </div>
          <div class="data-target_wrap">
            <el-select size="mini" filterable v-model="targetData[index].targetFiled" clearable placeholder="请选择">
              <el-option v-for="item in targetOptions" :key="item.label" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button size="mini" class="cancel-btn dialog-btn" :loading="isLoading" @click="toClose">取 消</el-button>
      <el-button type="primary" :loading="isLoading" class="dialog-btn" size="mini" @click="importData">确 定</el-button>
    </div>
  </el-dialog>
</template>
    
<script>
import "./index.scss";
import {
  getAppInfo,
  getWorksheetInfo,
  getSheetInfo,
  getFilterRows,
  getAppSectionDetail,
  getWorksheetsByAppId,
  getPage,
  getWorksheetApiInfo
} from "@/utils/api";
import { guid } from "@/utils/index";
import {
  appKey,
  sign,
  chartTypeList,
  chartReportTypeMap,
  
} from "@/utils/const.js";

export default {
  name: "dataSourceDialog",
  components: {},
  data() {
    return {
      targetData: [],
      isLoading: false,
      targetOptions: [{}]
    };
  },
  created() {
    this.loadData();
  },
  watch: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    config: {
      type: Object
    }
  },
  async mounted() {
    const appInfo = localStorage.getItem("appInfo")
    const { data: filedData } = await getWorksheetApiInfo({ "worksheetId": this.config.worksheetId, "appId": JSON.parse(appInfo).id })
    const targetOptions = [];
    this.targetOptions = filedData[0].controls.map(item => { return { label: item.controlName , value: item.alias || item.controlId } });
    if (this.config.fieldMap && (this.config.fieldMap.length > 0)) {
      this.targetData = this.config.fieldMap;
      return;
    }
    const data = [];
    const targetDataList = Object.keys(this.data[0]);
    const colList = this.config.otherData.tableHead;
    for (let index = 0; index < colList.length; index++) {
      const { label } = this.config.otherData.tableHead[index] || {}
      data.push({
        sourceFiled: label || `第${index + 1}列`,
        isMatchComplete: false,
        targetFiled: ''
      })
    }
    this.targetData = data;
  },
  methods: {
    importData() {
      this.$emit('toSave', this.targetData)
    },
    reset() {
      this.form = {
        viewId: "",
        sheetId: "",
        appId: "",
      };
    },
    toClose() {
      this.$emit("toClose", false);
    },

  },
  watch: {
    isShow() {
      this.reset()
    }
  }
};
</script>
<style lang="scss" >
.v-modal {
  z-index: 9 !important;
}

.fieldMapDialogWrap {
  max-height: 400px;
  // overflow-y: scroll;

  .data-list {
    .data-item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      height: 40px;

      .data-source_wrap,
      .data-target_wrap {
        flex: 1;
      }

      .data-source_wrap {
        background-color: #242729;
        line-height: 30px;
        border-radius: 4px;
        padding-left: 20px;
        box-sizing: border-box;

        &.title {
          background-color: rgba($color: #000000, $alpha: 0);
        }
      }


      .data-point-to {
        width: 50px;
        margin: 0 15px;
        text-align: center;
      }
    }
  }
}


.importDataDialog {
  z-index: 2001 !important;

  .el-dialog {
    background: #323538;

    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }

    .el-dialog__body {
      padding-top: 10px;

      .el-form-item__label {
        color: #ffffff;
        padding: 0 !important;
      }

      .el-select {
        width: 100%;
      }

      .el-input__inner {
        background: #242729;
        border: none;
      }

      .el-select-dropdown {
        background: #242729;
      }
    }

    .cancel-btn {
      background: #666666;
      color: #ffffff;
    }

    .dialog-btn {
      border: none;
    }
  }
}

.el-select-dropdown.el-popper {
  z-index: 999999 !important;
}

.setting-select {
  border: none !important;
  background: #45494c !important;

  .el-select-dropdown__empty {
    background: #45494c;
    color: #ffffff;
    border-radius: 4px;
  }

  // el-select-dropdown el-popper
  .el-select-dropdown__item.hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .el-select-dropdown__item {
    color: #ffffff !important;
    min-height: 40px;
    width: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;

    .img {
      height: auto;
      max-width: 200px;
      align-self: center;
    }
  }

  .popper__arrow:after,
  .popper__arrow {
    border-bottom-color: #45494c !important;
  }
}
</style>
    