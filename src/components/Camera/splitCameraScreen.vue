<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-10-08 10:08:21
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-25 14:30:44
-->
<template>
  <div
    class="tree-camera-box"
    :style="sassStyle"
    v-show="isShowModuleFunc(config)"
  >
    <div class="realIsTree" :style="styleObj1">
      <el-tree
        v-if="isSHowTree"
        ref="tree"
        :data="config.data.treeData"
        :props="defaultProps"
        node-key="rowid"
        :default-expanded-keys="expandRowid"
        @node-expand="nodeChange"
        @node-collapse="nodeChange"
      >
        <div slot-scope="{ node, data }" class="span-ellipsis">
          <div v-if="checkStatuData[data.rowid]" class="checkBacg" />
          <div class="span-ellipsis-left" @click="handleNodeClick(data)">
            <span v-if="node.childNodes.length == 0" style="position: relative">
              <img
                style="position: absolute; top: 0; bottom: 0; margin: auto"
                :src="getImg(data)"
                alt=""
              />
            </span>
            <span
              :title="data.device_name || data.group_name"
              :class="['txt', data.device_status == '离线' ? 'offTxt' : '']"
              :style="{
                marginLeft: node.childNodes.length == 0 ? '30px' : '0px',
              }"
            >
              {{ data.device_name || data.group_name }}</span
            >
          </div>
          <div class="span-ellipsis-right">
            <div v-if="node.childNodes.length !== 0" class="span-box">
              <span>
                {{
                  data.device_count > 0
                    ? data.device_online_count + "/" + data.device_count
                    : ""
                }}</span
              >
            </div>
            <span
              v-else
              :class="[
                'star',
                config.data.collectData[data.rowid] ? 'shoucang1' : '',
              ]"
            />
          </div>
        </div>
      </el-tree>
    </div>
    <SplitVideo
      v-if="showSplit"
      :config="config"
      ref="splitVideo"
      @changeCkeckedCamera="changeCkeckedCamera"
      @closeSplit="closeSplit"
      @delCheckedCamera="delCheckedCamera"
    />
  </div>
</template>

<script>
import { setStyleObj, toLoadData } from "@/utils/index.js";
import SplitVideo from "./components/splitVideo";
export default {
  components: { SplitVideo },
  props: {
    config: {
      type: Object,
    },
    callBack: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      checkStatuData: {},
      checkedData: [],
      collectData: {},
      showSplit: true,
      expandData: {},
      expandRowid: [],
      isSHowTree: true,
    };
  },
  watch: {
    "config.data": {
      handler(nVal, oVal) {
        this.setExpandData(this.config.tree.isExpandOneLevel);
      },
      deep: true,
    },
    "config.tree.isExpandOneLevel"(nVal) {
      this.setExpandData(nVal);
    },
    "config.isShowModule"(nVal) {
      if (nVal) {
        this.showSplit = true;
      }
    },
  },
  computed: {
    sassStyle() {
      let d = this.config.tree;
      let b = this.config.box;
      let color = b.mainColor.slice(0, b.mainColor.lastIndexOf(","));
      let color1 = b.selectBackground.slice(
        0,
        b.selectBackground.lastIndexOf(",")
      );
      return {
        fontFamily: this.config.box.fontFamily,
        "--color": this.config.box.color,
        "--fs1": this.config.box.fontSize + "px",
        "--fs2": this.config.box.fontSize * 1 + 2 + "px",
        "--fs3": this.config.box.fontSize * 1 - 2 + "px",
        "--nodataBg": `url(${d.noDataBg}) no-repeat`,
        "--mainColor": b.mainColor,
        "--hoverBackground": color + ",0.2)",
        "--selectBackground": b.selectBackground,
        "--color1": color1 + ",0.5)",
        "--treeWidth": d.width + "px",
      };
    },
    styleObj1() {
      let d = setStyleObj({ ...this.config.tree });
      return d;
    },
  },
  mounted() {
    // this.showSplit = true;
    this.setExpandData(this.config.tree.isExpandOneLevel);
    // this.getTreeData();
  },
  methods: {
    setExpandData(nVal) {
      this.isSHowTree = false;
      if (nVal) {
        this.expandRowid = [...this.config.data.expandRowid];
      } else {
        this.expandRowid.splice(0, this.expandRowid.length);
      }
      setTimeout(() => {
        this.isSHowTree = true;
      }, 10);
    },
    async getTreeData() {
      toLoadData(this.config, "splitCameraScreen");
    },
    getImg(data) {
      const type = data.camera_type === "球机" ? "qiu" : "qiang";
      const statu = data.device_status === "在线" ? "online" : "offline";
      return require("@/assets/image/common/" + type + "_" + statu + ".png");
    },
    nodeChange(data) {
      if (this.expandData[data.rowid]) {
        delete this.expandData[data.rowid];
      } else {
        this.expandData[data.rowid] = data;
      }
    },
    handleNodeClick(data) {
      if (!data.children) {
        if (data.device_status == "在线") {
          this.playVideo(data, "", "one");
        }
      } else {
        this.multSelect(data.children, data);
      }
      if (data.device_list && data.device_list.length > 0) {
        this.multSelect(data.device_list, data);
      }
    },
    multSelect(data, p) {
      data.forEach((item) => {
        if (item.device_status == "在线") {
          this.playVideo(item, p);
        }
      });
    },
    playVideo(data, p, type = "nult") {
      if (!this.showSplit) {
        this.showSplit = true;
      }
      let c;
      let c1;
      if (type === "nult") {
        c = p ? (this.expandData[p.rowid] ? 1 : 0) : 0;
        c1 = this.checkStatuData[data.rowid] ? 1 : 0;
      } else {
        c = 0;
        c1 = 0;
      }
      if (c === c1) {
        if (this.checkStatuData[data.rowid]) {
          this.$delete(this.checkStatuData, data.rowid);
          this.checkedData.forEach((item, i) => {
            if (item.rowid === data.rowid) {
              this.checkedData.splice(i, 1);
            }
          });
        } else {
          this.$set(this.checkStatuData, data.rowid, data);
          this.checkedData.push(data);
        }
        this.$nextTick(() => {
          this.$refs.splitVideo.setMonitorArr(this.checkedData);
        });
      }
    },
    changeCkeckedCamera() {
      this.checkedData = [];
      this.checkStatuData = {};
    },
    closeSplit() {
      this.showSplit = false;
      this.checkedData = [];
      this.checkStatuData = {};
      this.callBack && this.callBack();
    },
    delCheckedCamera() {},
  },
};
</script>

<style lang="scss" scoped>
.tree-camera-box {
  background: transparent;
  display: flex;
  pointer-events: all;
  .realIsTree {
    ::v-deep .el-tree {
      width: 100%;
      height: 100%;
      background: transparent;
      font-size: var(--fs1);
      overflow: auto;
      overflow-x: hidden;
      .el-tree-node:focus > .el-tree-node__content {
        background: transparent;
      }
      .el-tree-node__content {
        height: 40px;
      }
      .el-tree__empty-block {
        background: var(--nodataBg);
        background-position: center center;
        .el-tree__empty-text {
          display: none;
        }
      }
      .el-tree-node__content:hover {
        background: var(--hoverBackground);
      }
      .is-checked > .el-tree-node__content {
        background: var(--selectBackground);
      }
      .span-ellipsis {
        //节点按钮
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        color: var(--color);

        .checkBacg {
          width: var(--treeWidth);
          height: 40px;
          left: 0;
          background-color: var(--selectBackground);
          position: absolute;
          pointer-events: none;
        }

        &-left {
          width: 85%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .txt {
            font-size: var(--fs1);
          }
          .offTxt {
            color: var(--color1);
          }
        }

        &-right {
          display: flex;
          align-items: center;
          .span-box {
            display: flex;
            align-items: center;
          }
          .star {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          .shoucang {
            background: url("../../assets/image/common/icon20.png") no-repeat;
          }
          .shoucang1 {
            background: url("../../assets/image/common/icon22.png") no-repeat;
          }
        }
      }
      .el-tree-node__expand-icon {
        color: var(--mainColor);
        font-size: var(--fs2);
      }
      .el-tree-node__expand-icon.is-leaf {
        visibility: hidden;
      }
      // .el-tree-node__expand-icon {
      //   display: none;
      // }
      .expand-box {
        i {
          color: var(--mainColor);
          font-size: var(--fs2);
          padding: 6px;
        }
      }
      .is-expanded {
        > .el-tree-node__content {
          .span-ellipsis {
            .expand-box > i {
              transform: rotate(90deg);
            }
          }
        }
      }
    }
  }
}
</style>
