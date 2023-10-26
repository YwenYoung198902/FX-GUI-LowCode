<template>
  <div class="layer-management_wrap">
    <div class="search-wrap">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        size="mini"
        v-model="keyword"
      >
      </el-input>
    </div>
    <div class="drawing-tree">
      <el-tree
        class="filter-tree"
        :data="searchList"
        :filter-node-method="filterNode"
        ref="tree"
        node-key="id"
        :props="defaultProps"
      >
        <div
          slot-scope="{ node, data }"
          @contextmenu.prevent="onContextMenu($event, data, node.id - 1)"
          :class="{ active: currentConfig.id === data.id, 'tree-item': true }"
          ref="tree-item"
          @click="changeCurrectConfig($event, data, node)"
        >
          {{ data.config.name || data.config.key }}
        </div>
      </el-tree>
      <!-- <div class="menu-list" v-for="(item, index) in searchList" :key="item.id">
        <div
          class="menu-item"
          :class="{ active: currentConfig.id === item.id }"
          @contextmenu.prevent="onContextMenu($event, item, index)"
          @click="changeCurrectConfig(item)"
        >
          {{ item.config.key || item.config.name }}
        </div>
      </div> -->
    </div>
    <div
      v-show="visibleContextmenu"
      style="position: fixed; transition: 0.3s; z-index: 1000"
      class="canvasContextmenu"
      id="canvasContextmenu"
    >
      <div
        class="menu-list"
        v-for="(item, index) in contextMenuList"
        :key="item.key"
      >
        <div class="menu-item" @click="changeLayer(item, index)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { containerCom } from "@/utils/const";
export default {
  name: "LayerManagement",
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    // drawingList: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
  },
  data() {
    return {
      visibleContextmenu: false,
      contextMenuList: [
        { name: "上移一层", key: "moveUp" },
        { name: "下移一层", key: "moveDown" },
        { name: "图层置顶", key: "moveTop" },
        { name: "图层置底", key: "moveBottom" },
        { name: "删除", key: "deleteLayer" },
      ],
      currSelectedIndex: -1,
      keyword: "",
      defaultProps: { children: "drawingList", label: "name" },
    };
  },
  methods: {
    changeCurrectConfig(e, item, node) {
      e.stopPropagation();
      this.$store.commit("SET_CURRENT_CONFIG", {
        id: item.id,
        ...item.config,
        component: item.component,
      });
      this.visibleContextmenu = false;
    },
    // 删除当前图层
    deleteLayer(drawingList, currSelectedIndex) {
      // const currectParentIndex = this.drawingList.findIndex(item => item.id === this.currentConfig.id);
      // this.drawingList[currectParentIndex].config.drawingList = drawingList.filter((item, idnex) => currSelectedIndex !== idnex)

      // 如果是容器组件删除时清楚遮罩层
      if (containerCom.includes(this.currentConfig.component)) {
        this.$store.commit("SET_ISSHOWCONTAINERMASK", false);
        this.$store.commit("SET_SELECTEDCONTAINERID", "");
      }

      // 当前组件不是容器中的组件
      if (!this.currentConfig.parentId) {
        this.currentConfig = {};
      }

      return drawingList.filter((item, idnex) => currSelectedIndex !== idnex);
    },
    // 图层变化
    changeLayer(data, index) {
      const { key } = data;

      if (this.currentConfig.parentId) {
        const currentConfigParentIndex = this.drawingList.findIndex(
          (item) => item.id === this.currentConfig.parentId
        );

        console.log("this.drawingList::::::::::::::", this.drawingList[currentConfigParentIndex].config.drawingList)
        const currentConfigIndex = this.drawingList[
          currentConfigParentIndex
        ].config.drawingList.findIndex(
          (item) => item.id === this.currentConfig.id
        );

        this.drawingList[currentConfigParentIndex].config.drawingList = this[
          key
        ](
          this.drawingList[currentConfigParentIndex].config.drawingList,
          currentConfigIndex,
          data
        );
        console.log("this.drawingList::::::::::::::", this.drawingList[currentConfigParentIndex].config.drawingList)
        this.currentConfig = {
          ...this.drawingList[currentConfigParentIndex].config,
          id: this.drawingList[currentConfigParentIndex].id,
          component: this.drawingList[currentConfigParentIndex].component,
        };
      } else {
        this.drawingList = this[key](
          this.drawingList,
          this.currSelectedIndex,
          data
        );
      }

      this.visibleContextmenu = false;
    },
    // 置顶
    moveTop(fieldData, index) {
      if (index !== fieldData.length - 1) {
        fieldData.push(fieldData.splice(index, 1)[0]);
      }
      return fieldData;
    },
    // 置底
    moveBottom(fieldData, index) {
      if (index !== 0) {
        fieldData.unshift(fieldData.splice(index, 1)[0]);
      }
      return fieldData;
    },
    // 上移动一格
    moveUp(fieldData, index) {
      if (index !== fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0];
      }
      return fieldData;
    },
    // 下移动一格
    moveDown(fieldData, index) {
      if (index !== 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0];
      }
      return fieldData;
    },
    closeMenu() {
      this.visibleContextmenu = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 右键
    onContextMenu(e, data, index) {
      if (data.id !== this.currentConfig.id) return;
      const ptr = document.getElementById("canvasContextmenu");
      const ev = event || window.event;
      let { clientX, clientY } = ev;
      ptr.setAttribute(
        "style",
        ptr.getAttribute("style") +
          `left: ${Math.round(clientX - 2)}px; top: ${Math.round(
            clientY - 8
          )}px;`
      );
      this.visibleContextmenu = true;

      this.currSelectedIndex = this.drawingList.findIndex(
        (item) => item.id === data.id
      );
    },
  },
  computed: {
    searchList() {
      return this.drawingList
        .filter((item) => {
          if (item.config.name) {
            return item.config.name.includes(this.keyword);
          } else {
            return item.config;
          }
        })
        .map((item) => {
          const drawingList = item.config.drawingList || []
          drawingList.reverse()
          return { 
            ...item,
            drawingList: drawingList,
            name: item.config.name || item.config.key,
          };
        })
        .reverse();
    },
    drawingList: {
      get() {
        return this.$store.state.drawingList;
      },
      set(newvalue) {
        this.$store.commit("SET_DRAWING_LIST", newvalue);
      },
    },
    currentConfig: {
      get() {
        this.visibleContextmenu = false;
        return this.$store.state.currentConfig;
      },
      set(newvalue) {
        this.$store.commit("SET_CURRENT_CONFIG", newvalue);
      },
    },
  },
  watch: {
    visibleContextmenu(value) {
      if (value) document.body.addEventListener("click", this.closeMenu);
      else document.body.removeEventListener("click", this.closeMenu);
    },
  },
  mounted() {
    console.log("searchList::::::::::::::::::::::", this.searchList);
    // console.log("this.drawingList:::::::::::::", this.drawingList);
    // this.canvasList = this.drawingList;
    // 阻止指定元素下的菜单事件
    // const treeDom = document.getElementsByClassName("filter-tree")[0];
    // console.log("val:::::::::::::", this.drawingList, treeDom);
    // treeDom.addEventListener("contextmenu", this.onContextMenu, false);
  },
};
</script>

<style lang="scss">
.layer-management_wrap {
  position: absolute;
  top: 74px;
  left: -220px;
  width: 220px;
  height: 336px;
  overflow-y: auto;
  border-radius: 4px;
  opacity: 1;
  background: #25262a;
  border: 0.5px solid #333333;

  .search-wrap {
    padding: 10px;
    box-sizing: border-box;
    .el-input__inner {
      background: #191a1a !important;
      border: none;
      color: #fff;
    }
  }

  .el-tree {
    background-color: #25262a;

    .el-tree-node:focus > .el-tree-node__content {
      background: rgba(40, 121, 255, 1);
      position: relative;
    }

    .el-tree-node__content {
      overflow: hidden;

      .el-tree-node__expand-icon {
        position: relative;
        z-index: 9;
      }

      .tree-item {
        color: #fff;
        padding: 0px 12px;
        font-size: 13px;
        cursor: pointer;
        line-height: 26px;
        position: relative;
        width: 150%;
        height: 100%;
        margin-left: -35px;
        padding-left: 50px;

        &.active {
          background: rgba(40, 121, 255, 1);
        }
      }

      &:hover {
        background: rgba(40, 121, 255, 1);
      }
    }
  }

  .filter-tree {
    .tree-item {
      width: 100%;
      background-color: rgba(40, 121, 255, 0);
    }
  }

  .drawing-tree {
    .menu-list {
      .menu-item {
        padding: 0px 12px;
        color: #fff;
        font-size: 13px;
        cursor: pointer;
        line-height: 34px;

        &:hover {
          background: rgba(40, 121, 255, 1);
        }

        &.active {
          background: rgba(40, 121, 255, 1);
        }
      }
    }
  }

  .canvasContextmenu {
    width: 116px;
    height: 200px;
    background-color: #323538;
    border: none;
    -webkit-box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 2px;

    .menu-list {
      .menu-item {
        padding: 7px 12px;
        color: #fff;
        font-size: 13px;
        background-color: #323538;
        cursor: pointer;

        &:hover {
          background: rgba(40, 121, 255, 0.3);
        }
      }
    }
  }
}
</style>