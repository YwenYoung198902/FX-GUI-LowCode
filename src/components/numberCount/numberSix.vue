<template>
  <div v-show="isShowModuleFunc(config)" class="num" :style="sassStyle">
    <div v-for="(item, i) in list" :key="i" class="box">
      <div
        v-for="(v, ii) in item"
        :key="ii"
        :class="[
          'box1',
          selectedData === v.rowid && config.contain.isShowActiveBg
            ? 'active'
            : '',
        ]"
        :style="styleObj(config.contain)"
        ref="eventDom"
        @click="changeSelectedData(v)"
      >
        <img
          class="img"
          v-show="config.bImg.show"
          :style="styleObj(config.bImg)"
          :src="v.icon"
        />
        <div class="right-box">
          <div
            v-show="config.rowOne.show"
            :style="styleObj1(config.rowOne, config.rowOneBgStyle)"
          >
            <div
              :style="styleObj2"
              :class="['txt', config.titleTxt1.isShowColors ? 'gradient' : '']"
            >
              {{ v.name }}
            </div>
          </div>
          <div
            class="row-two"
            :style="styleObj1(config.rowTwo, config.rowTwoBgStyle)"
          >
            <div
              v-show="config.rowTwoTxt1.show"
              :class="['txt', config.titleTxt2.isShowColors ? 'gradient' : '']"
              :style="textStyle1(config.rowTwoTxt1, config.titleTxt2)"
            >
              {{ v.num }}
            </div>
            <div
              v-show="config.rowTwoTxt2.show"
              :class="['txt', config.titleTxt3.isShowColors ? 'gradient' : '']"
              :style="textStyle1(config.rowTwoTxt2, config.titleTxt3)"
            >
              {{ v.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  name: "numberCount",
  props: {
    config: {
      type: Object,
    },
    // isShow: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      isShow: true,
      list: [],
      selectedData: "",
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
        if (nVal.data.length && nVal.contain.arrangeNum) {
          this.getArr(nVal.data, Number(nVal.contain.arrangeNum));
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    sassStyle() {
      let d = setStyleObj({ ...this.config });
      return {
        ...d,
        "--activeBg": `url(${this.config.contain.activeBg}) no-repeat`,
      };
    },
    styleObj() {
      return function(r) {
        let d = setStyleObj({ ...r });
        return d;
      };
    },
    styleObj1() {
      return function(r, b) {
        let s1 = setStyleObj({ ...r });
        let s2 = {};
        if (r.isShowBg && !r.isBgImg) {
          s2 = setStyleObj({ ...b });
          delete s1.background;
        }
        let s3 = r.isShowBorder ? setStyleObj({ ...r.borderStyle }) : {};
        return Object.assign(s1, s2, s3);
      };
    },
    styleObj2() {
      let t = this.config.titleTxt1;
      let c = t.isShowColors
        ? {
            background: t.background,
          }
        : {
            background: "transparent",
          };
      return c;
    },
    textStyle1() {
      return function(r, t) {
        let d = setStyleObj({ ...r });
        let c = t.isShowColors
          ? {
              background: t.background,
            }
          : {
              background: "transparent",
              color: r.color,
            };
        return Object.assign(d, c);
      };
    },
    textStyle2() {
      let arr = [];
      //字体颜色
      let obj = this.config.title2.linearTxt
        ? {
            backgroundImage: `linear-gradient(180deg, ${
              this.config.title2.txtColor.txtBackground[0]
            } 0%,
               ${this.config.title2.txtColor.txtBackground[1]} 100%)`,
            ...this.config.title2.txtColor,
          }
        : {
            color: this.config.title2.txtColor.txtBackground[0],
          };
      arr.push(obj);
      //px
      let txtPx = { ...this.config.title2.textStylePx };
      Object.keys(txtPx).forEach((key) => {
        txtPx[key] = txtPx[key] + "px";
      });
      arr.push(txtPx);
      //字体样式
      let txtFamily = { ...this.config.title2.txtFamily };
      arr.push(txtFamily);
      return arr;
    },
    textStyle3() {
      let arr = [];
      //字体颜色
      let obj = this.config.title3.linearTxt
        ? {
            backgroundImage: `linear-gradient(180deg, ${
              this.config.title3.txtColor.txtBackground[0]
            } 0%,
                  ${this.config.title3.txtColor.txtBackground[1]} 100%)`,
            ...this.config.title3.txtColor,
          }
        : {
            color: this.config.title3.txtColor.txtBackground[0],
          };
      arr.push(obj);
      //px
      let txtPx = { ...this.config.title3.textStylePx };
      Object.keys(txtPx).forEach((key) => {
        txtPx[key] = txtPx[key] + "px";
      });
      arr.push(txtPx);
      //字体样式
      let txtFamily = { ...this.config.title3.txtFamily };
      arr.push(txtFamily);
      return arr;
    },
    imgStyle1() {
      let obj = { ...this.config.backgroundImg1 };
      if (obj.bgImg.background.includes("no-repeat")) {
      } else {
        obj.bgImg.background = `url(${
          obj.bgImg.background
        }) 100%/100% no-repeat `;
      }
      return obj;
    },
    imgStyle2() {
      let obj = { ...this.config.backgroundImg2 };
      if (obj.bgImg.background.includes("no-repeat")) {
      } else {
        obj.bgImg.background = `url(${
          obj.bgImg.background
        }) 100%/100% no-repeat `;
      }
      return obj;
    },
  },
  created() {},
  mounted() {},
  methods: {
    getArr(arr, num) {
      let newArr = arr.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      }); // 因为splice会改变原数组，要深拷贝一下
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    },
    changeSelectedData(v) {
      this.selectedData = v.rowid;
    },
  },
};
</script>
<style lang="scss" scoped>
.num {
  color: #fff;
  width: 100%;
  height: 100%;
  pointer-events: all !important;
  overflow: hidden;
  .box {
    display: flex;
    .box1 {
      display: flex;
      align-items: center;
      .img {
        // position: absolute;
      }
      .row-two {
        display: flex;
        align-items: center;
      }
      .txt {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .gradient {
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
      }
    }
    .active {
      background: var(--activeBg) !important;
      background-size: 100% 100% !important;
    }
  }
}
</style>
