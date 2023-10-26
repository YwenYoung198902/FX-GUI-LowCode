<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-18 11:09:06
-->
<template>
  <div
    class="navigation-box"
    :style="styleObj"
    v-show="isShowModuleFunc(config)"
  >
    <span class="menu-box">
      <div
        v-for="(item, i) in menuData1"
        :style="styleObj1"
        @click="jumpToRouter(item)"
        ref="eventDom"
        v-if="item.name"
        :class="['menu', activeType === item.route ? 'left-active-menu' : '']"
      >
        <div
          :class="[
            'menu-txt',
            activeType === item.route
              ? config.menuActiveTxt.isShowColors
                ? 'gradient'
                : ''
              : config.menuTxt.isShowColors
              ? 'gradient'
              : '',
          ]"
          :style="{
            background:
              activeType === item.route
                ? config.menuActiveTxt.background
                : config.menuTxt.background,
          }"
        >
          {{ item.name }}
        </div>
      </div>
      <div v-else :style="{ width: config.menu.width + 'px' }"></div>
    </span>
    <div class="big-main" :style="styleObj2">
      <span
        :class="['big', config.titleTxt.isShowColors ? 'gradient' : '']"
        :style="{
          background: config.titleTxt.isShowColors
            ? config.titleTxt.background
            : '',
        }"
        >{{ config.title.txt }}</span
      >
    </div>
    <span class="menu-box">
      <div
        v-for="(item, i) in menuData2"
        :style="styleObj3"
        @click="jumpToRouter(item)"
        ref="eventDom"
        v-if="item.name"
        :class="['menu', activeType === item.route ? 'right-active-menu' : '']"
      >
        <div
          :class="[
            'menu-txt',
            config.menuTxt.background ||
            (config.menuActiveTxt.background && activeType === item.route)
              ? 'gradient'
              : '',
          ]"
          :style="{
            background:
              activeType === item.route
                ? config.menuActiveTxt.background
                : config.menuTxt.background,
          }"
        >
          {{ item.name }}
        </div>
      </div>
      <div v-else :style="{ width: config.menu.width + 'px' }"></div>
    </span>
  </div>
</template>

<script>
import { loadCustomApiData } from "@/utils/api";
import { changeArr, setStyleObj } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      menuData1: [],
      menuData2: [],
      pageData: [],
      operationNavLinks: [],
      activeType: "",
      hoverType: "",
      preDom: {
        dom: "",
        type: "",
      },
      isShow: true,
      mStyle: {},
    };
  },
  watch: {
    "config.data": {
      handler() {
        this.setMenuData();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    styleObj() {
      let c = setStyleObj({ ...this.config.box });
      return {
        ...c,
        "--leftActive": `url(${
          this.config.leftActiveMenu.background
        }) no-repeat`,
        "--rightActive": `url(${
          this.config.rightActiveMenu.background
        }) no-repeat`,
      };
    },
    styleObj1() {
      this.mStyle = setStyleObj(this.config.menu);
      let l = setStyleObj(this.config.leftMenu);
      let d = Object.assign({ ...this.mStyle }, l);
      return d;
    },
    styleObj2() {
      let d = setStyleObj({ ...this.config.title });
      return d;
    },
    styleObj3() {
      let r = setStyleObj(this.config.rightMenu);
      let d = Object.assign({ ...this.mStyle }, r);
      return d;
    },
  },
  created() {},
  mounted() {},
  methods: {
    setMenuData() {
      let d = [...this.config.data];
      let num = Math.ceil(d.length / 2);
      let data = changeArr(d, num);
      this.menuData1 = data[0] || [];
      this.menuData2 = data[1] || [];
      const c = this.menuData1.length - this.menuData2.length;
      if (c > 0) {
        for (var v = 1; v <= c; v++) {
          this.menuData2.push({});
        }
      }
    },
    jumpToRouter(item) {
      this.activeType = item.route;
    },
  },
};
</script>
<style lang="scss" scoped>
.navigation-box {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  background-size: 100% 100% !important;
  .big-main {
    background-size: 100% 100% !important;
  }
  .gradient {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
  }
  .menu-box {
    display: flex;
    align-items: center;
    .menu {
      background-size: 100% 100% !important;
      cursor: pointer;
    }
    .left-active-menu {
      background: var(--leftActive) !important;
      background-size: 100% 100% !important;
    }
    .right-active-menu {
      background: var(--rightActive) !important;
      background-size: 100% 100% !important;
    }
  }
}
</style>
