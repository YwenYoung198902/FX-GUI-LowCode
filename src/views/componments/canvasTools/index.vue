<template>
  <div class="tools-wrap">
    <div class="tool-list">
      <div
        class="tool-item"
        v-for="(item, index) in toolsList"
        :key="item.title"
      >
        <img
          :src="item.isDisabled ? item.iconDisabled : item.icon"
          @click="handleTools(item, index)"
          :alt="item.title"
          :title="item.title"
          srcset=""
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import "./index.scss";
import { deepClone } from "@/utils/index.js";
export default {
  name: "tools",
  props: {},
  components: {},
  data() {
    return {
      toolsList: [
        {
          title: "撤销",
          key: "undo",
          icon: require("../../../assets/image/undo.png"),
          iconDisabled: require("../../../assets/image/undo_disabled.png"),
          isDisabled: true,
        },
        {
          title: "前进", 
          key: "advance",
          icon: require("../../../assets/image/advance.png"),
          iconDisabled: require("../../../assets/image/advance_disabled.png"),
          isDisabled: true,
        },
      ],
    };
  },
  watch: {
    // 监听  撤回栈  变化
    "$store.state.operationStackList"(newValue, oldValue){
      this.toolsList[0].isDisabled = newValue.length === 0
    },
    // 坚挺  前进栈  变化
    "$store.state.operationAdvanceStackList"(newValue, oldValue){
      this.toolsList[1].isDisabled = newValue.length === 0
    }
  },  
  computed: {
    drawingList: {
      get() {
        console.log("drawingList:::::::::::::", this.$store.state.drawingList);
        return this.$store.state.drawingList;
      },
      set(newvalue) {
        this.$store.commit("SET_DRAWING_LIST", newvalue);
      },
    },
  },
  methods: {
    handleTools(data, index) {
      this[data.key](data);
    },
    // 画布 移动事件处理
    move({ drawingListIndex, stackNodeData }) {
      // this.drawingList[drawingListIndex].config.left = stackNodeData.left;
      // this.drawingList[drawingListIndex].config.top = stackNodeData.top;
      this.drawingList[drawingListIndex].config = {
        ...this.drawingList[drawingListIndex].config,
        left: stackNodeData.left,
        top: stackNodeData.top,
      };
    },
    // 画布 新增事件处理
    add({ drawingListIndex, stackNodeId }) {
      this.drawingList = this.drawingList.filter(
        (item) => item.id !== stackNodeId
      );
    },
    // 画布 删除事件处理
    delete({ stackNodeData }) {
      this.drawingList.push(stackNodeData);
    },
    // 撤回
    undo(data) {
      const operationStackList = deepClone(
        this.$store.state.operationStackList
      );
      if (operationStackList.length === 0) {
        return;
      }
      this.$store.commit("SET_isClickUndoTools", true);
      const drawingListIndex = this.drawingList.findIndex((item) => {
        return item.id === operationStackList[0].id;
      });

      console.log(
        "operationStackList[0]:::::::::::::::",
        operationStackList[0],
        operationStackList
      );
      this[operationStackList[0].type]({
        drawingListIndex,
        stackNodeId: operationStackList[0].id,
        stackNodeData: operationStackList[0].data,
      });
      // this.$store.commit("SET_OPERATIONSTACKINDEX", ++operationStackIndex);
      // 防止撤销等操作  记录到栈
      this.$nextTick(() => {
        const shiftObj = this.$store.state.operationStackList.shift();
        console.log("shiftObj:::::::::::::", shiftObj);
        if (shiftObj.type === "delete") {
          this.$store.commit("ADD_OPERATIONADVANCESTACKLIST", {
            ...shiftObj,
            type: "add",
          });
        }

        if (shiftObj.type === "add") {
          this.$store.commit("ADD_OPERATIONADVANCESTACKLIST", {
            ...shiftObj,
            type: "delete",
          });
        }
        // this.$store.commit("ADD_OPERATIONADVANCESTACKLIST", shiftObj);
        // console.log("shiftObj:::::::::::::::::::", shiftObj);
        // this.$store.commit("SET_OPERATIONSTACKLIST", operationStackList);
        // this.$store.commit("SET_isClickUndoTools", false);
      });
    },
    // 前进
    advance() {
      const operationAdvanceStackList =
        this.$store.state.operationAdvanceStackList;
      console.log(
        "operationAdvanceStackList::::::::::::::",
        operationAdvanceStackList
      );
      if (operationAdvanceStackList.length === 0) {
        return;
      }
      this.$store.commit("SET_ISCLICKADVANCETOOLS", true);

      const { id, data, type } = operationAdvanceStackList[0];
      const drawingListIndex = this.drawingList.findIndex((item) => {
        return item.id === id;
      });
      this[type]({
        drawingListIndex,
        stackNodeId: id,
        stackNodeData: data,
      });
      this.$nextTick(() => {
        const shiftObj = this.$store.state.operationAdvanceStackList.shift();
        if (shiftObj.type === "delete") {
          this.$store.commit("ADD_OPERATIONSTACKLIST", {
            ...shiftObj,
            type: "add",
          });
        }

        if (shiftObj.type === "add") {
          this.$store.commit("ADD_OPERATIONSTACKLIST", {
            ...shiftObj,
            type: "delete",
          });
        }
        // this.$store.commit("ADD_OPERATIONSTACKLIST", shiftObj);
        // console.log("shiftObj:::::::::::::::::::", shiftObj);
        // this.$store.commit("SET_OPERATIONSTACKLIST", operationStackList);
        // this.$store.commit("SET_ISCLICKADVANCETOOLS", false);
      });
    },
  },
};
</script>
  