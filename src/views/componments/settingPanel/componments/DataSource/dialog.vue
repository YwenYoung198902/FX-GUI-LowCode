<template>
  <el-dialog
    v-if="dialogFormVisible"
    title="数据源"
    width="500px"
    class="importDataDialog"
    :visible="dialogFormVisible"
    @close="toClose"
  >
    <el-form
      :rules="rules"
      ref="ruleForm"
      :model="form"
      label-position="top"
      size="small "
    >
      <el-form-item label="应用" :label-width="formLabelWidth" prop="appId">
        <el-select
          v-model="form.appId"
          placeholder="请选择应用"
          @change="handleChangeAppId"
          class="form_select"
        >
          <el-option
            v-for="item in appList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作表" prop="sheetId" :label-width="formLabelWidth">
        <el-select
          v-model="form.sheetId"
          placeholder="请选择工作表"
          @change="handleChangeSheetId"
          filterable
        >
          <el-option
            v-for="item in sheetList"
            :key="item.workSheetId"
            :label="item.workSheetName"
            :value="item.workSheetId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图表" prop="viewId" :label-width="formLabelWidth">
        <el-select filterable v-model="form.viewId" placeholder="请选择图表">
          <el-option
            v-for="item in viewList"
            :key="item.viewId"
            :label="item.name"
            :value="item.viewId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="mini"
        class="cancel-btn dialog-btn"
        :loading="isLoading"
        @click="toClose"
        >取 消</el-button
      >
      <el-button
        type="primary"
        :loading="isLoading"
        class="dialog-btn"
        size="mini"
        @click="importData"
        >确 定</el-button
      >
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
} from "@/utils/api";
import { guid } from "@/utils/index";
import {
  appKey,
  sign,
  chartTypeList,
  chartReportTypeMap,
  projectId
} from "@/utils/const.js";

export default {
  name: "dataSourceDialog",
  components: {},
  data() {
    return {
      sheetList: [],
      appList: [],
      viewList: [],
      form: {
        viewId: "",
        sheetId: "",
        appId: "",
      },
      formLabelWidth: "120px",
      rules: {
        viewId: [{ required: true, message: "请选择应用", trigger: "change" }],
        sheetId: [
          { required: true, message: "请选择工作表", trigger: "change" },
        ],
        appId: [{ required: true, message: "请选择视图", trigger: "change" }],
      },
      isLoading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  watch: {},
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
    },
  },
  methods: {
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
    importData() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            const { name } = this.viewList.find(
              (item) => item.value === this.form.viewId
            );
            this.$emit("toSave", { ...this.form, viewName: name });
            this.isLoading = false;
           
          } catch (error) {
            console.log("error:::::::::::::", error);
            this.isLoading = false;
          }

          //   this.dialogFormVisible = false
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getAppSection() {
      const { viewId = "", sheetId = "", appId = "" } = this.form;
      try {
        const result = await getAppSectionDetail({
          appId,
          appSectionId: sheetId,
        });
        // { data: { childSections } }
        const sheetList = [];
        for (
          let index = 0;
          index < result.data.childSections.length - 1;
          index++
        ) {
          console.log(
            "result.data.childSections[index]:::::::::",
            result.data.childSections[index]
          );
          sheetList.push(
            ...result.data.childSections[index].workSheetInfo.filter(
              (item) => item.type === 0
            )
          );
        }
        console.log(
          "result:::::::::::::",
          result.data.childSections,
          sheetList
        );
        return sheetList;
      } catch (error) {
        console.log("error::::::::::::", error);
        return [];
      }
    },
    async handleChangeAppId(e) {
      // type
      // 0 // 表格
      // 1 // 看板
      const { data } =
        (await getWorksheetsByAppId({ appId: e, type: 1 })) || {};
      this.sheetList = data;
    },
    async handleChangeSheetId(e) {
      const { viewId = "", sheetId = "", appId = "" } = this.form;
      console.log("type:::::", this.type, this.form);
      if (chartTypeList.includes(this.type)) {
        const {
          data: { components },
        } = await getPage({ appId: sheetId });
        this.viewList = components
          .filter((item) => item.reportType === chartReportTypeMap[this.type])
          .map((item) => {
            return { ...item, viewId: item.value };
          });
        console.log("result:::::", components);
      } else {
        const {
          data: { views = [] },
        } = await getWorksheetInfo({
          worksheetId: e,
          getTemplate: false,
          getViews: true,
        });
        this.viewList = views;
      }
    },
    async loadData() {
      const {
        data: { apps },
      } =
        (await getAppInfo({
          // projectId: "24a85a41-897a-4388-84ae-a1af2e525e84",
          // projectId: "2f688cc5-f79f-4468-a165-89aed3dc2740", // 145
          projectId, // 66
        })) || {};
      this.appList = apps;
    },
  },
  watch:{
    dialogFormVisible() {
      this.reset()
    }
  }
};
</script>
<style lang="scss" >
.v-modal {
  z-index: 9 !important;
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
    