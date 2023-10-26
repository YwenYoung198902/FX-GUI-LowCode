<template>
  <el-dialog
    :close-on-click-modal="false"
    custom-class="sceneSelector"
    title="场景选择"
    :visible.sync="isShow"
    width="862"
    height="auto"
    @close="onClose"
  >
    <div class="scene-selector_wrap">
      <div class="scene-list">
        <div
          v-for="(item, index) in scenceData"
          :key="index + '_scene'"
          class="scene-item"
          @click="changeScenceData(item)"
        >
          <div
            class="scene-item-img"
            :class="{ active: selectedObj.rowid === item.rowid }"
          >
            <div
              class="selected-icon"
              v-show="selectedObj.rowid === item.rowid"
            >
              当前
            </div>
            <img
              :src="
                (item.scene_snapshot && (JSON.parse(item.scene_snapshot).lenght > 0))
                  ? JSON.parse(item.scene_snapshot)[0].DownloadUrl
                  : require('../../../assets/image/cockpit_default.png')
              "
              alt=""
            /> 
          </div>
          <div class="scene-item-title">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="onSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import "./index.scss";
export default {
  name: "SceneSelector",
  data() {
    return {
      isShow: false,
      scenceData: [],
      activeIndex: -1,
      selectedObj: {},
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    scenceList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sceneId: {
      type: String,
      default: "",
    },
  },
  methods: {
    changeScenceData(item) {
      this.selectedObj = item;
    },
    onClose() {
      this.selectedObj = {};
      this.$emit("onClose");
    },
    onSure() {
      this.$emit("onSure", this.selectedObj);
      this.selectedObj = {};
    },
  },
  mounted() {
    
    // this.isShow = this.dialogVisible;
  },
  watch: {
    dialogVisible(nVal) {
      this.isShow = nVal;
      console.log("nVal::::::::::::::::::::", nVal, this.selectedObj.rowid)
      this.selectedObj.rowid = this.sceneId;
    },
    scenceList(nVal) {
      console.log("scenceList:::::", nVal)
      this.scenceData = nVal;
    },
    sceneId(nVal) {
      console.log("nVal::::::::::::::::::::", nVal)
      // this.selectedObj.rowid = nVal;
    }
  },
};
</script>
    