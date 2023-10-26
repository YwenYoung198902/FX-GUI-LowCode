<template>
  <el-scrollbar class="setting-panel dataSource-wrap scrollbar-wrapper">
    <el-form label-width="90px" size="small" class="border-box" style="padding: 8px 16px" label-position="top">
      <el-form-item label="数据类型" class="dataSourceType">
        <el-radio-group v-model="config.sourceType" @change="(val) => $emit('changeSize', 'sourceType', val)">
          <el-radio label="静态"></el-radio>
          <el-radio label="reportId"></el-radio>
          <el-radio label="api"></el-radio>
          <el-radio label="工作表"></el-radio>
        </el-radio-group>
      </el-form-item>

      <vue-json-editor class="json-editor" v-if="config.sourceType === '静态'" v-model="config.data" :showBtns="true"
        :mode="'text'" lang="zh" :expandedOnStart="true" @json-change="onJsonChange" @json-save="onJsonSave" />

      <div v-show="config.sourceType === 'reportId'">
        <el-form-item label="图表名称：" class="reportInput">
          <el-input v-model="config.reportName" @change="(val) => $emit('changeSize', 'reportName', val)" size="mini"
            disabled></el-input>
        </el-form-item>

        <!-- <el-button type="primary" size="mini" @click="saveReportId"
          >保存</el-button
        > -->
        <el-button type="primary" size="mini" @click="openDialog">选择图表</el-button>
      </div>

      <div v-show="config.sourceType === 'api'">
        <el-form-item label="请求URL">
          <el-input v-model="config.api" @change="(val) => $emit('changeSize', 'api', val)" size="mini">
          </el-input>
        </el-form-item>
        <el-form-item label="请求方法">
          <el-select v-model="config.requestType" @change="(val) => $emit('changeSize', 'requestType', val)"
            placeholder="请选择请求方法">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="config.requestType === 'POST'" label="请求参数">
          <vue-json-editor class="json-editor" v-model="config.requestParams" :showBtns="false" :mode="'code'" lang="zh"
            :expandedOnStart="true" @json-change="(val) => $emit('changeSize', 'requestParams', val)" />
        </el-form-item>
        <!-- <el-input
          v-model="config.api"
          @change="(val) => $emit('changeSize', 'api', val)"
          size="mini"
        ></el-input> -->
        <el-form-item>
          <template slot="label">
            <span style="marginright: 10px">数据过滤</span>
            <el-switch v-model="config.isShowDataFilter"
              @change="(val) => $emit('changeSize', 'isShowDataFilter', val)"></el-switch>
          </template>

          <CodeEdit v-show="config.isShowDataFilter" v-model="config.datafilterFunc"
            @change="(val) => $emit('changeSize', 'datafilterFunc', val)" />
        </el-form-item>
        <el-button type="primary" size="mini" @click="toLoadData">刷新数据</el-button>
      </div>


      <div v-show="config.sourceType === '工作表'" style="margin-bottom: 10px;">
        <el-form-item label="工作表名称：" class="worksheetInput">
          <el-input v-model="config.worksheetName" size="mini" disabled></el-input>
        </el-form-item>

        <!-- <el-button type="primary" size="mini" @click="saveReportId"
          >保存</el-button
        > -->
        <el-button type="primary" size="mini" @click="isShowWorkSheetDialog = true">选择工作表</el-button>
      </div>

      <div class="flex" style="display: flex;" v-show="config.sourceType === '工作表'">
        <el-form-item label="是否开启字段映射" class="isOpenFieldMap">
          <el-switch style="margin-left: 10px;" v-model="config.isOpenFieldMap"
            @change="(val) => $emit('changeSize', 'isOpenFieldMap', val)"></el-switch>
        </el-form-item>
      </div>


      <el-button v-show="config.isOpenFieldMap" type="primary" size="mini"
        @click="isShowFieldMapDialog = true">字段映射</el-button>
    </el-form>
    <reportIdDialog @toClose="isShowReportIdDialog = false" @toSave="toSave" :dialogFormVisible="isShowReportIdDialog"
      :type="this.config.component">
    </reportIdDialog>
    <workSheetDialog @toClose="isShowWorkSheetDialog = false" @toSave="toSaveWorkSheetDialog"
      :dialogFormVisible="isShowWorkSheetDialog" :type="this.config.component">
    </workSheetDialog>
    <fieldMapDialog @toClose="isShowFieldMapDialog = false" @toSave="toSaveFieldMap" :config="config" :data="fieldMapData"
      v-if="isShowFieldMapDialog" :isShow="isShowFieldMapDialog"></fieldMapDialog>
  </el-scrollbar>
</template>
<script>
import "./index.scss";
import vueJsonEditor from "vue-json-editor";
import {
  products,
  loadCustomApiData,
  getReportConfigDetail,
  getFilterRows
} from "@/utils/api";
import apiDataProcessing from "../../../apiDataProcessing";
import reportIdDataProcessing from "../../../reportIdDataProcessing";
import fieldMap from "../../../fieldMap";
import CodeEdit from "@/components/codeEditor";
import reportIdDialog from "./dialog";
import workSheetDialog from "./workSheetDialog";
import fieldMapDialog from "./fieldMapDialog";
import { appKey, sign } from "@/utils/const.js";

export default {
  name: "data",
  components: {
    fieldMapDialog,
    reportIdDialog,
    workSheetDialog,
    vueJsonEditor,
    CodeEdit,
  },
  data() {
    return {
      isShowWorkSheetDialog: false,
      isShowReportIdDialog: false,
      isShowFieldMapDialog: false,
      resultInfo: [
        {
          name: "星期一",
          value: "60",
          id: 0,
        },
        {
          name: "星期二",
          value: "100",
          id: 1,
        },
        {
          name: "星期三",
          value: "140",
          id: 2,
        },
        {
          name: "星期四",
          value: "80",
          id: 3,
        },
      ],
      fieldMapData: []
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
  mounted() {
    console.log("config::::::::::::::111111111", this.config);
  },
  methods: {
    // 字段映射
    toSaveFieldMap(data) {
      console.log("fieldMapData::::::::::::", this.fieldMapData, data)

      const mapData = fieldMap[this.config.component] && fieldMap[this.config.component](this.fieldMapData, data, this.config)
      if (this.config.component === "scrollTable") {
        this.$emit("changeSize", "otherData", mapData);
      }
      this.$emit("changeSize", "fieldMap", data);
      this.isShowFieldMapDialog = false
      // console.log("mapData:::::", mapData)
      // const mapData = this.fieldMapData.map(item => {

      //   return {
      //     ...item,

      //   }
      // })
    },
    toSaveWorkSheetDialog({ sheetId, workSheetName, viewId, viewName }) {
      this.$emit("changeSize", "worksheetId", sheetId);
      this.$emit("changeSize", "worksheetName", workSheetName + "-" + viewName);
      // this.$emit("changeSize", "viewName", viewName);
      this.$emit("changeSize", "viewId", viewId);
      this.$emit("changeSize", "fieldMap", []);
      this.$nextTick(() => {
        this.isShowWorkSheetDialog = false;
        this.saveWorkSheetId();
      });
    },
    toSave({ viewId, viewName }) {
      this.$emit("changeSize", "reportId", viewId);
      this.$emit("changeSize", "reportName", viewName);
      this.$nextTick(() => {
        this.isShowReportIdDialog = false;
        this.saveReportId();
      });
    },
    openDialog() {
      this.isShowReportIdDialog = true;
    },
    // 监听代码编辑器内容
    changeContent(data) {
      console.log("data:::::::::::::::", data);
    },
    // 加载接口数据
    async toLoadData() {
      try {
        const api =
          this.config.api || "http://192.168.6.66/report/report/getData";
        const { data } = await loadCustomApiData({
          api,
          type: this.config.requestType,
          data: {
            ...this.config.requestParams,
          },
        });
        try {
          let componentData;
          if (this.config.isShowDataFilter) {
            const datafilterFunc = eval(this.config.datafilterFunc);
            componentData = datafilterFunc(data);
          } else {
            componentData = await apiDataProcessing[this.config.component](
              data,
              this.config
            );
          }
          this.$emit("changeSize", "data", componentData);
        } catch (error) {
          console.log("error:::::::::", error);
          this.$message({
            type: "error",
            message: "数据失败",
          });
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "请求失败",
        });
      }
    },
    // json编辑器内容变化
    onJsonChange(value) {
      console.log("value:", value);
      // this.$emit('changeSize', 'data', value)
    },
    // json编辑器内容保存
    onJsonSave(value) {
      console.log("value==========>>>>>>>>", value, this.config.data);
      this.$emit("changeSize", "data", value);
      console.log("value==========>>>>>>>>", value, this.config.data);
    },
    async saveWorkSheetId() {
      const { data: { rows } } = await getFilterRows({
        appKey,
        sign,
        viewId: this.config.viewId,
        "worksheetId": this.config.worksheetId,
        "pageSize": 100,
        "pageIndex": 1
      })
      this.fieldMapData = rows;
      this.$emit("changeSize", "data", rows);
    },
    async saveReportId() {
      const { data } = await products({
        reportId: this.config.reportId,
        appId: "",
        // version: "6.5",
        // reload: false,
        // filters: [],
      });
      console.log("reportIdDataProcessing::::::::::", reportIdDataProcessing);
      const componentData = await reportIdDataProcessing[this.config.component](
        data
      );
      this.$emit("changeSize", "data", componentData);
    },
    // 请求参数变化
    onRequestParamsChange(value) {
      console.log("value::::::::::::::::", value);
    },
  },
  mounted() {
    console.log("config:::::::::::::::", this.config);
  },
};
</script>
