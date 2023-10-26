<template>
  <div class="data-source flex relative">
    <div class="data-list">
      <div class="data-serch-wrap">
        <el-input
          placeholder="请输入关键词... "
          size="small"
          v-model="filterText"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="data-main">
        <div v-if="data.length > 0" class="data-tree">
          <el-tree
            class="filter-tree"
            :data="data"
            show-checkbox
            node-key="id"
            @check-change="handleCheckChange"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree2"
          >
            <div
              slot-scope="{ node, data }"
              @dblclick="($event) => handleNodeDbClick1($event, data, node)"
              @click="($event) => handleNodeClick1(data, node, $event)"
              class="span-ellipsis"
              @mouseenter="nodeMouseEnter(data)"
              @mouseleave="nodeMouseleave(data)"
            >
              <div class="span-ellipsis-left">
                <span style="font-size: 16px">{{ node.label }}</span>
              </div>

              <!-- 批量操作按钮 -->
              <div class="btn-group" v-if="data.level === 1">
                <div
                  v-show="!isEdit && editBtnId === data.id"
                  class="btn-group"
                >
                  <el-button
                    size="mini"
                    @click="($event) => toEditBatch($event, data)"
                    class="data-btn batch-btn"
                    >批量编辑</el-button
                  >
                </div>
                <div v-show="isEdit && editBtnId === data.id" class="btn-group">
                  <el-button
                    size="mini"
                    @click="($event) => toCancel($event, data)"
                    :loading="isLoading"
                    class="data-btn"
                    >取消</el-button
                  >
                  <el-button
                    size="mini"
                    @click="($event) => toSave($event, data, node)"
                    :loading="isLoading"
                    class="data-btn batch-btn"
                    >批量保存</el-button
                  >
                </div>
              </div>

              <!-- 单体操作按钮 -->
              <div class="btn-group" v-if="data.level === 2">
                <div
                  v-show="
                    (!isEdit && editBtnId === data.id) ||
                    (hoverId === data.id && editBtnId !== data.id)
                  "
                  class="edit-btn"
                >
                  <el-button
                    size="mini"
                    class="data-btn"
                    :loading="isLoading"
                    @click="($event) => toEdit($event, data)"
                    >编辑</el-button
                  >
                </div>
                <div v-show="isEdit && editBtnId === data.id" class="btn-group">
                  <el-button
                    size="mini"
                    @click="($event) => toCancel($event, data)"
                    :loading="isLoading"
                    class="data-btn cancel-btn"
                    >取消</el-button
                  >
                  <el-button
                    size="mini"
                    @click="($event) => toSave($event, data, node)"
                    :loading="isLoading"
                    class="data-btn"
                    >保存</el-button
                  >
                </div>
              </div>
            </div>
          </el-tree>
        </div>
        <div v-if="data.length === 0" class="empty-wrap">
          <div class="default_img">
            <img
              :src="require('../../assets/image/default_img.png')"
              alt=""
              srcset=""
            />
          </div>
          <div class="empty_data">暂无数据</div>
        </div>
      </div>
      <div class="import-data">
        <el-button
          type="primary"
          class="import-btn"
          @click="openDialog"
          style="
             {
              width: '100%';
            }
          "
        >
          <img
            width="14"
            height="14"
            :src="require('../../assets/image/import.png')"
            class="import-icon"
            alt=""
            srcset=""
          />
          录入数据源</el-button
        >
      </div>
    </div>
    <div class="data-main">
      <div id="main2">
        <div class="messageDialog" id="messageDialog"></div>
      </div>
      <el-button
        class="choose-scene"
        :disabled="isShowSceneSelector"
        size="mini"
        @click="isShowSceneSelector = true"
        type="primary"
        >场景选择</el-button
      >
    </div>
    <addDataDialog
      @toClose="toClose"
      :dialogFormVisible="dialogFormVisible"
      @toSave="(data) => importData(data)"
      :data="data"
    ></addDataDialog>

    <!-- 场景选择器弹窗 -->
    <SceneSelector
      @onClose="onClose"
      @onSure="onSure"
      :scenceList="scenceList"
      :dialogVisible="isShowSceneSelector"
      :sceneId="currectSceneId"
    ></SceneSelector>
  </div>
</template>
  
<script>
import "./index.scss";
import addDataDialog from "./dialog.vue";
import SceneSelector from "../componments/SceneSelector";
import { editSceneJsonBatch, getRowDetail, getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
import { guid } from "@/utils/index";
export default {
  name: "dataSource",
  components: { addDataDialog, SceneSelector },
  data() {
    return {
      isShowSceneSelector: false,
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogFormVisible: false,
      currectClcikEditId: -1,
      editBtnId: -1,
      hoverId: -1,
      isEdit: false,
      _earth: null,
      count: 0,
      dataJson: "",
      isLoading: false,
      isInit: true,
      timer: null,
      treeSceneData: [],
      scenceList: [],
      currectSceneId: "",
    };
  },
  mounted() {
    this.loadAllScene();
    let cloneXbsjEarthUI = null;
    if (this.$store.state.XbsjEarthUI) {
      cloneXbsjEarthUI = this.$lodash.cloneDeep(this.$store.state.XbsjEarthUI);
    } else {
      this.$store.commit("SET_XBSJEARTHUI", XbsjEarthUI);
      cloneXbsjEarthUI = XbsjEarthUI;
    }
    cloneXbsjEarthUI.create("main2").then(async (earthUI) => {
      // earthUI.controls.mainBar.show = false;
      //隐藏图层管理
      // earthUI.tools.sceneTree.show = false;
      // earthUI._sceneTree.show = false
      this._earth = earthUI;
      // 加载场景信息
      // const rowId = sessionStorage.getItem("rowid");
      // await this._earth.labScene.loadScene(rowId);

      // 设置earth导航
      this._earth._mainbar.mainBarList = [
        // "navigate",
        // "view",
        // "imagery",
        // "model",
        "terrain",
        "analysis",
        "effect",
        "entity",
        // "other",
        "extend",
      ];
      this._earth._mainbar.page = "terrain";

      // 获取配置信息
      setTimeout(() => {
        // this.dataJson = earthUI.labScene.getSenceJson();
      }, 2500);

      // 获取配置信息
      // this._earth.labScene.getSenceJson()
      // console.log("this._earth.labScene.getSenceJson()::::::::::", this._earth.labScene.getSenceJson())
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  methods: {
    onSure(data) {
      const sceneData = data.scene_json && JSON.parse(data.scene_json);
      this.dataJson = sceneData;
      this._earth._earth.sceneTree.root.children = [
        {
          title: "场景",
          type: "scene",
          children: sceneData.sceneTree.root.children,
        },
      ];
      this.isShowSceneSelector = false;
    },
    onClose() {
      this.isShowSceneSelector = false;
    },
    // 获取所有场景
    async loadAllScene() {
      try {
        const {
          data: { rows },
        } = await getFilterRows({
          appKey: appKey,
          sign: sign,
          // worksheetId: "cockpit",
          worksheetId: "scene",
          pageSize: 100,
          pageIndex: 1,
          notGetTotal: true,
        });
        console.log("rows:::::::::::::::::", rows);
        this.scenceList = rows;
      } catch (error) {}
    },
    // 鼠标移入
    nodeMouseEnter(data) {
      this.hoverId = data.id;
    },
    // 鼠标移出
    nodeMouseleave(data) {
      this.hoverId = -1;
    },
    toClose() {
      this.dialogFormVisible = false;
    },
    // 取消编辑
    toCancel(e, data) {
      e.stopPropagation();
      this.editBtnId = -1;
      this.hoverId = data.id;
      this.clearCheckedNode();
      this.isEdit = false;
      // this._earth.earth.sceneTree.root.children =
      //   this.dataJson.sceneTree.root.children;
      this.resetScene();
    },
    resetScene() {
      this._earth.earth.sceneTree.root.children = [
        {
          title: "场景",
          type: "scene",
          children: this.dataJson.sceneTree.root.children,
        },
      ];
    },
    // 保存场景数据
    async toSave(e, data, node) {
      e.stopPropagation();
      try {
        // 获取所有被选中的节点
        const allCheckedNode = this.$refs.tree2.getCheckedNodes();
        const sceneJson = this._earth.labScene.getSenceJson();
        const rowIds = allCheckedNode
          .filter((item) => item.level !== 1)
          .map((item) => item.rowid);
        // const initIds = this.dataJson.sceneTree.root.children
        //   .map((item) => item.czmObject && item.czmObject.xbsjGuid)
        //   .filter((item) => item);
        console.log("sceneJson:::::::::::::::", sceneJson);
        // return;
        // const senceJsonParams = sceneJson.sceneTree.root.children.filter(
        //   (item) => item.czmObject && !initIds.includes(item.czmObject.xbsjGuid)
        // );
        const senceJsonParams = sceneJson.sceneTree.root.children.filter(
          (item) => item.title !== "场景"
        );
        const senceJsonParamsNew = senceJsonParams.map((item) => {
          const tmp = item;
          tmp.czmObject.xbsjGuid = guid();
          return tmp;
        });
        console.log(
          "senceJsonParamsNew:::::::::::::",
          senceJsonParamsNew,
          allCheckedNode
        );
        const params = {
          appKey: appKey,
          sign: sign,
          worksheetId: allCheckedNode[0].worksheetId,
          rowIds: rowIds,
          control: {
            controlId: "json",
            value: JSON.stringify(senceJsonParamsNew),
          },
        };
        this.isLoading = true;

        const result = await editSceneJsonBatch(params);
        // this._earth.earth.sceneTree.root.children.splice(-1, 1);
        if (result.success) {
          this.$message.success("保存成功");
          this.isLoading = false;
          this.isEdit = false;
          this.editBtnId = -1;
          this.resetScene();
          this.clearCheckedNode();
          this._earth._earth.czm.viewer.entities.removeAll();
          return;
        }
        this.$message.error("保存失败");
        this.isLoading = false;
        this.editBtnId = -1;
        this.clearCheckedNode();
        this.isEdit = false;
        // this.resetScene()
      } catch (error) {
        console.log("error::::::::::", error);
        this.$message.error("保存失败");
        this.isLoading = false;
      }
    },
    // 场景添加元素
    addSceneElement(data) {
      // if (!this.isInit) {
      //   this._earth.earth.sceneTree.root.children.splice(-1, 1);
      // }
      this.resetScene();
      this.isInit = false;
      console.log(
        "this._earth.earth.sceneTree.root.children::::::::::",
        this._earth.earth.sceneTree.root.children,
        data
      );

      // 场景添加数据并非行到当前节点位置
      for (let index = 0; index < data.length; index++) {
        this._earth.earth.sceneTree.root.children.push({
          czmObject: data[index].czmObject,
        });
      }

      this._earth.earth.camera.flyTo(data[0].czmObject.position, 8000);

      // 打开当前节点属性设置弹窗
      const czmObjectList = this._earth._earth.sceneTree.root.children;
      const czmObject =
        czmObjectList[czmObjectList.length - data.length].czmObject;
      this._earth._vm.$refs.mainUI.showPropertyWindow(czmObject);
    },
    // 批量编辑
    toEditBatch(e, data, node) {
      e.stopPropagation();
      this.editBtnId = data.id;
      this.isEdit = true;
    },
    // 编辑
    async toEdit(e, data, node) {
      e.stopPropagation();
      let getAllcheckedNode = this.$refs.tree2.getCheckedNodes();

      try {
        const {
          appId,
          id,
          wsid,
          viewId = "",
          parentId,
          rowid,
          worksheetId,
        } = data;
        let result;
        let czmObject;
        if (data.level !== 1) {
          this.isLoading = true;
          result = await getRowDetail({
            appKey: appKey,
            worksheetId: worksheetId,
            sign: sign,
            rowId: rowid,
            getSystemControl: true,
          });
          this.isLoading = false;
          czmObject = result.data.json && JSON.parse(result.data.json);
          console.log("czmObject:::::::::::", czmObject);
        }
        if (data.level === 1) {
          getAllcheckedNode = getAllcheckedNode.filter(
            (item) => item.level === 1
          );
        }

        this.hoverId = -1;
        if (
          getAllcheckedNode &&
          getAllcheckedNode.length > 1
          // data.level !== 1
        ) {
          this.$confirm("已有选中数据，是否取消勾选?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.clearCheckedNode();
              this.$refs.tree2.setChecked(data, true);
              // this.currectClcikEditId = data.id;
              this.editBtnId = data.id;
              this.isEdit = true;
              // 添加数据
              data.level !== 1 && czmObject && this.addSceneElement(czmObject);
              data.level === 1 && this.checkedAllChildrenNode(data.id, true);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          this.clearCheckedNode();
          this.$refs.tree2.setChecked(data, true);
          // this.currectClcikEditId = data.id;
          this.editBtnId = data.id;
          this.isEdit = true;
          this.resetScene();
          data.level === 1 && this.checkedAllChildrenNode(data.id, true);
          // 添加数据
          data.level !== 1 && czmObject && this.addSceneElement(czmObject);
        }
      } catch (error) {
        console.log("error::::::::::::", error);
        this.$message.error("场景数据加载失败");
      }
    },
    // 获取当前元素的父id
    getParentId(id) {
      for (let index = 0; index < this.data.length; index++) {
        if (this.data[index].children.find((item) => item.id === id)) {
          return this.data[index].id;
        }
      }
    },
    // 获取所有被选中的父节点id
    getAllCheckParentIds() {
      const allcheckedNode = this.$refs.tree2.getCheckedNodes() || [];
      const checkedAllList = [];
      for (let index = 0; index < allcheckedNode.length; index++) {
        let parentId = this.getParentId(allcheckedNode[index].id);
        parentId && checkedAllList.push(parentId);
      }
      return checkedAllList;
    },
    // 清空除了自己外其他已经勾选的数据
    clearCheckedNode(parentId, level = 2) {
      const allParentIds = this.$refs.tree2.getCheckedNodes();
      for (let index = 0; index < allParentIds.length; index++) {
        if (
          allParentIds[index].parentId !== parentId &&
          allParentIds[index].id !== parentId
        ) {
          this.$refs.tree2.setChecked(allParentIds[index], false);
        }
      }
    },
    // 勾选当前节点下的所有子节点
    checkedAllChildrenNode(id, checked) {
      const t = setTimeout(() => {
        const { children = [] } = this.data.find((item) => item.id === id);
        for (let index = 0; index < children.length; index++) {
          this.$refs.tree2.setChecked(children[index], checked);
        }
        clearTimeout(t);
      }, 200);
    },
    // 点击tree节点
    handleNodeClick1(data, { checked, type = "" }, e) {
      data.level === 1 && e.stopPropagation();
      clearTimeout(this.timer); //清除未执行的定时器

      this.timer = setTimeout(() => {
        // e.stopPropagation();
        const getAllcheckedNode = this.$refs.tree2
          .getCheckedNodes()
          .filter((item) => !this.getAllCheckParentIds().includes(item.id));
        if (getAllcheckedNode.length > 0) {
          const currectParentId = this.getParentId(data.id);
          const allParentIds = this.getAllCheckParentIds();

          // 已经选中其他工作表
          if (!allParentIds.includes(currectParentId)) {
            this.$confirm("已有选中数据，是否取消勾选?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.clearCheckedNode(
                  allParentIds.filter((item) => item.id !== currectParentId)[0]
                );
                this.$refs.tree2.setChecked(data, !checked);
                this.editBtnId = data.id;
                data.level === 1 &&
                  this.checkedAllChildrenNode(data.id, !checked);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除",
                });
              });
          } else {
            const allCheckedNode = getAllcheckedNode.filter(
              (item) => item.id !== data.id
            );
            console.log("getAllcheckedNode:::::::::::::", allCheckedNode);
            // 获取当前节点下的子节点
            if (allCheckedNode.length <= 1 && checked) {
              this.editBtnId =
                allCheckedNode.length === 1 ? allCheckedNode[0].id : -1;
            } else {
              this.editBtnId = currectParentId;
            }
            this.$refs.tree2.setChecked(data, !checked);
          }
        } else {
          this.$refs.tree2.setChecked(data, !checked);
          data.level === 1 && this.checkedAllChildrenNode(data.id, !checked);
          this.editBtnId = data.id;
        }
      }, 400);
    },
    // 双击节点
    handleNodeDbClick1(e, data, node) {
      // if (data.level === 1) return;
      clearTimeout(this.timer);
      e.stopPropagation();
      this.toEdit(e, data, node);
    },
    // 监听勾选框变化
    handleCheckChange(data, checked, indeterminate) {
      const getAllcheckedNode = this.$refs.tree2
        .getCheckedNodes()
        .filter((item) => !this.getAllCheckParentIds().includes(item.id));

      if (getAllcheckedNode.length > 0) {
        const currectParentId = this.getParentId(data.id);
        const allParentIds = Array.from(new Set(this.getAllCheckParentIds()));

        // 已经选中其他工作表
        if (currectParentId && allParentIds.length > 1) {
          this.$confirm("已有选中数据，是否取消勾选?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              console.log("currectParentId::::::::::::", currectParentId, data);
              this.clearCheckedNode(currectParentId, data.level);
              this.editBtnId = data.id;
              this.$refs.tree2.setChecked(data, true);
            })
            .catch(() => {
              console.log(
                "currectParentId::::::::::::++",
                currectParentId,
                data
              );
              this.$refs.tree2.setChecked(data, false);
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
        } else {
          this.editBtnId =
            getAllcheckedNode.length > 1
              ? currectParentId
              : getAllcheckedNode[0].id;
        }
      } else {
        this.editBtnId = -1;
      }
    },
    importData(data) {
      this.data = [...this.data, data];
      this.dialogFormVisible = false;
    },
    openDialog() {
      if (!this.dataJson) {
        this.$message({
          message: "请先选择场景",
          type: "warning",
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },
};
</script>
  <style lang="scss" >
#main2 {
  position: relative;
}
</style>
  