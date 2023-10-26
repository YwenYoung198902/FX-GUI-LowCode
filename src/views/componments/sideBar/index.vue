<template>
  <div class="silder-bar-wrap" :class="isExpand ? '' : 'hiddenSilder'">
    <div class="silder-bar-content">
      <div class="silder-search">
        <el-input
          class="search-input"
          placeholder="请输入关键词..."
          v-model="keyWord"
          clearable
        >
        </el-input>
      </div>
      <div class="silder-bar">
        <div class="silder-nav">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-submenu
              :index="String(index)"
              v-for="(item, index) in siderList"
              :key="item.key"
            >
              <template slot="title">
                <img :src="item.icon" alt="" />
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="(ele, inx) in item.children"
                :key="ele.key"
                :index="index + '-' + inx"
                @click="changeMenu(ele)"
              >
                <div class="menu-infor">
                  <div class="menu_point"></div>
                  {{ ele.title }}
                </div>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="nav-example">
          <div class="nav-example-list">
            <draggable
              :group="{ name: 'componentDrag', pull: 'clone' }"
              :sort="false"
              class="nav-example-list"
              draggable=".nav-example-item"
              @end="handleEnd"
              v-model="comList"
              :clone="cloneComponent"
            >
              <div
                class="nav-example-item"
                v-for="(item, idnex) in comList"
                :key="item.title"
              >
                <div class="example-img">
                  <img :src="item.url" alt="" />
                </div>
                <div class="example-title">
                  {{ item.title }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="silder_switch-img" @click="changeSilderStatus">
      <img
        :src="
          isExpand
            ? require('@/assets/component/silder_left.png')
            : require('@/assets/component/silder_right.png')
        "
        alt=""
      />
    </div>
  </div>
</template>

<script>
import "./index.scss";
import draggable from "vuedraggable";
import componentList from "@/assets/component/list";
export default {
  name: "siderBar",
  components: { draggable },
  data() {
    return {
      siderSourceList: [
        {
          title: "图表",
          icon: require("@/assets/image/silder_chart-icon.png"),
          icon_active: require("@/assets/image/silder_chart-icon-active.png"),
          key: "chart",
          children: [
            {
              title: "折线图",
              icon: "",
              key: "lineChart",
            },
            {
              title: "饼图",
              icon: "",
              key: "barChart",
            },
          ],
        },
        {
          title: "组件",
          icon: "",
          key: "componment",
          children: [
            {
              title: "标题",
              icon: "",
              key: "titleInput",
            },
          ],
        },
      ],
      siderList: [],
      keyWord: "",
      // componentList: [
      //   {
      //     key: "lineChart",
      //     example: [
      //       {
      //         title: "柱形图1",
      //         url: require("@/assets/component/img/line.png"),
      //       },
      //       {
      //         title: "柱形图2",
      //         url: require("@/assets/component/img/line.png"),
      //       },
      //       {
      //         title: "柱形图3",
      //         url: require("@/assets/component/img/line.png"),
      //       },
      //     ],
      //   },
      //   {
      //     key: "barChart",
      //     example: [
      //       { title: "柱形图1", url: require("@/assets/image/5162.png") },
      //       { title: "柱形图2", url: require("@/assets/image/5162.png") },
      //       { title: "柱形图3", url: require("@/assets/image/5162.png") },
      //     ],
      //   },
      // ],
      currentNavBarKey: "",
      isExpand: true,
    };
  },
  props: {
    // cloneComponent: {
    //   type: Object,
    //   default: function (params) {
    //     return {}
    //   }
    // }
  },
  methods: {
    /*
     * arr:树形结构数组
     *keyword:搜索关键词
     *first:是否首次执行
     */
    filterTree(arr, keyword, first = true) {
      if (first) {
        //首次传入深度克隆数据防止修改源数据
        arr = JSON.parse(JSON.stringify(arr));
      }
      let emptyArr = [];
      for (let item of arr) {
        if (item.title.includes(keyword)) {
          if (
            item.children &&
            Array.isArray(item.children) &&
            item.children.length > 0
          ) {
            item.children = this.filterTree(item.children, keyword, false);
          }
          emptyArr.push(item);
        } else if (
          item.children &&
          Array.isArray(item.children) &&
          item.children.length > 0
        ) {
          item.children = this.filterTree(item.children, keyword, false);
          if (item.children.length) {
            emptyArr.push(item);
          }
        }
      }
      return emptyArr;
    },
    onMove(currentMove) {
      return true
    },
    // 监听菜单是否收起
    changeSilderStatus() {
      this.isExpand = !this.isExpand;
    },
    // 监听菜单变化
    changeMenu(data) {
      console.log("data::::::::::::::", data);
      this.currentNavBarKey = data.key;
    },
    //盒子移动到指定盒子
    handleEnd(e) {
      console.log(e, "====e");
      this.$emit("moveEnd", e);
    },
    //克隆盒子
    cloneComponent(e) {
      console.log("e============>>>>>>>>>>>>>>>>>", e);
      this.$emit("cloneComponent", e);
    },
    toOpenSettingDialog(data) {
      this.$emit("openDialog", data);
      console.log("data:::::::::::", data);
    },
  },
  mounted() {
    this.siderList = componentList;
    console.log(this.siderList, "===siderList");
  },
  watch: {
    keyWord(value) {
      const list = this.filterTree(this.siderSourceList, value);
      this.siderList = list;
    },
  },
  computed: {
    // leftList() {
    //   return componentList.map((item) => item.icon);
    // },
    comList() {
      // let index = this.leftList.indexOf("echarts");
      // if (index !== -1) {
      //   return componentList[index].children;
      // }
      // return [];
      for (let index = 0; index < componentList.length; index++) {
        const currectSilderData = componentList[index].children.find((item) => {
          // console.log("item::::::::::::::::", item, this.currentNavBarKey);
          return item.key === this.currentNavBarKey;
        });
        console.log(componentList, currectSilderData, "===currectSilderData");
        // console.log("currectSilderData:::::::::", currectSilderData);
        if (currectSilderData) {
          return currectSilderData.example;
        }
      }
    },
  },
};
</script>

<style lang="scss"></style>
