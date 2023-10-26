<template>
  <el-dialog
    custom-class="settingDataDialog"
    v-bind="$attrs"
    :visible.sync="dialogVisible"
    width="70%"
    top="5vh"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div slot="title" class="dialog-header">
      {{ title }}
      <div class="save-btn">
        <el-button type="primary" size="small">保存</el-button>
      </div>
    </div>
    <div class="main">
      <div class="content-display">

        
      </div>
      <div class="content-setting">
        <div class="setting-data">333</div>
        <div class="setting-type">44</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { deepClone } from "@/utils/index.js";
import "./index.scss";
export default {
  props: {
    data: {
      type: Array | Object,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      tableHead: [],
      edit: false,
      currentEdit: {},
    };
  },
  computed: {},
  methods: {
    handleClose() {
      this.$emit("closeDialog", false);
    },
  },
};
</script>
<style lang="scss" scoped></style>
