<template>
  <div
    ref="progressBar"
    class="progressBar"
    v-show="isShowModuleFunc(config)"
    :style="{
     width: config.width,
     height: config.height
    }"
  >
    <vue-seamless-scroll
      ref="scroll"
      :data="list"
      :class-option="defaultOption"
      style="height: 100%; overflow: hidden"
    >
      <template v-if="config.box.showType === 1">
        <div
          class="line1"
          v-for="(item,index) in list"
          :key="index"
        >
          <div
            class="line1"
            v-for="el in item"
            :key="el.name"
            :style="{height: `${config.line.height}px`, marginRight: `${config.line.marginRight}px`}"
          >
            <span :style="{
           display: config.topFont.display,
           fontFamily: config.topFont.fontFamily,
           fontStyle: config.topFont.fontStyle, //是否倾斜
           textAlign: config.topFont.textAlign,
           width: config.topFont.width+'px',
           color: config.topFont.color,
           fontSize: config.topFont.fontSize+'px',
           letterSpacing: config.topFont.letterSpacing + 'px',
           marginRight: config.topFont.marginRight + 'px',
           fontWeight: config.topFont.fontWeight,
          }">TOP{{el.ranking}}</span>
            <span
              class="name"
              :style="{
           display: config.title.display,
           fontFamily: config.title.fontFamily,
           fontStyle: config.title.fontStyle, //是否倾斜
           textAlign: config.title.textAlign,
           width: config.title.width+'px',
           color: config.title.color,
           fontSize: config.title.fontSize+'px',
           fontWeight: config.title.fontWeight,
           letterSpacing: config.title.letterSpacing + 'px',
           marginRight: config.title.marginRight + 'px',
          }"
            >{{el.name}}</span>
            <div
              class="bar"
              :style="{
              display: config.progressBar.display,
              width: config.progressBar.width + 'px',
              height: config.progressBar.height + 'px',
              marginRight: config.progressBar.marginRight + 'px',
              borderRadius: config.progressBar.borderRadius + 'px',
              backgroundColor: config.progressBar.backgroundColor,
            }"
            >
              <div
                class="percentBar"
                :style="{
                background: `linear-gradient(to right, ${config.percentBar.backgroundFront}, ${config.percentBar.backgroundBehind})`,
                borderRadius: config.percentBar.borderRadius + 'px',
                width: el.per + '%'
              }"
              >
                <div
                  class="icon"
                  :style="{
                  width: config.percentBar.iconWidth + 'px',
                  height: config.percentBar.iconHeight + 'px',
                  right: -config.percentBar.iconWidth/4 + 'px',
                  top: config.percentBar.top + 'px',
                  border: '1px solid ' + config.percentBar.backgroundBehind,
                  borderRadius: config.percentBar.iconWidth/2 + 'px',

                }"
                >
                  <span :style="{
                    width: config.percentBar.iconWidth/2 + 'px',
                    height: config.percentBar.iconHeight/2 + 'px'
                  }"></span>
                </div>
                <!-- <img
                  class="icon"
                  :src="config.percentBar.icon"
                  :style="{
                  width: config.percentBar.iconWidth + 'px',
                  height: config.percentBar.iconHeight + 'px',
                  right: -config.percentBar.iconWidth/4 + 'px',
                  top: config.percentBar.top + 'px'
                }"
                > -->
              </div>
            </div>
            <span :style="{
             display: config.percent.display,
             fontFamily: config.percent.fontFamily,
             fontStyle: config.percent.fontStyle, //是否倾斜
             textAlign: config.percent.textAlign,
             width: config.percent.width+'px',
             color: config.percent.color,
             fontSize: config.percent.fontSize+'px',
             fontWeight: config.percent.fontWeight,
             letterSpacing:config.percent.letterSpacing + 'px',
             marginRight:config.percent.marginRight + 'px'
            }">{{el.per}}%</span>
            <span :style="{
            display: config.num.display,
            fontFamily: config.num.fontFamily,
            fontStyle: config.num.fontStyle, //是否倾斜
            textAlign: config.num.textAlign,
            width: config.num.width+'px',
            color: config.num.color,
            fontSize: config.num.fontSize+'px',
            fontWeight: config.num.fontWeight,
            letterSpacing: config.num.letterSpacing + 'px',
            marginRight: config.num.marginRight + 'px',
          }">{{el.value}}</span>
            <span :style="{
            display: config.unit.display,
            fontFamily: config.unit.fontFamily,
            fontStyle: config.unit.fontStyle, //是否倾斜
            textAlign: config.unit.textAlign,
            width: config.unit.width+'px',
            color: config.unit.color,
            fontSize: config.unit.fontSize+'px',
            fontWeight: config.unit.fontWeight,
            letterSpacing: config.unit.letterSpacing + 'px',
            marginRight: config.unit.marginRight + 'px',
          }">{{el.unit || '件'}}</span>
          </div>

        </div>
      </template>
      <template v-if="config.box.showType === 2">
        <div
          class="line2"
          v-for="(item,index) in list"
          :key="index"
        >
          <div
            class="line2"
            v-for="el in item"
            :key="el.name"
            :style="{height: `${config.line.height}px`, marginRight: `${config.line.marginRight}px`}"
          >
            <div class="top">
              <span :style="{
                display: config.topFont.display,
                fontFamily: config.topFont.fontFamily,
                fontStyle: config.topFont.fontStyle, //是否倾斜
                textAlign: config.topFont.textAlign,
                width: config.topFont.width+'px',
                color: config.topFont.color,
                fontSize: config.topFont.fontSize+'px',
                letterSpacing: config.topFont.letterSpacing + 'px',
                marginRight: config.topFont.marginRight + 'px',
                fontWeight: config.topFont.fontWeight,
                }">TOP{{el.ranking}}</span>
              <span
                class="name"
                :style="{
                  display: config.title.display,
                  fontFamily: config.title.fontFamily,
                  fontStyle: config.title.fontStyle, //是否倾斜
                  textAlign: config.title.textAlign,
                  width: config.title.width+'px',
                  color: config.title.color,
                  fontSize: config.title.fontSize+'px',
                  fontWeight: config.title.fontWeight,
                  letterSpacing: config.title.letterSpacing + 'px',
                  marginRight: config.title.marginRight + 'px',
                }"
              >{{el.name}}</span>
              <span :style="{
                display: config.unit.display,
                fontFamily: config.unit.fontFamily,
                fontStyle: config.unit.fontStyle, //是否倾斜
                textAlign: config.unit.textAlign,
                width: config.unit.width+'px',
                color: config.unit.color,
                fontSize: config.unit.fontSize+'px',
                fontWeight: config.unit.fontWeight,
                letterSpacing: config.unit.letterSpacing + 'px',
                marginRight: config.unit.marginRight + 'px',
              }">{{el.unit || '件'}}</span>
              <span :style="{
                display: config.num.display,
                fontFamily: config.num.fontFamily,
                fontStyle: config.num.fontStyle, //是否倾斜
                textAlign: config.num.textAlign,
                width: config.num.width+'px',
                color: config.num.color,
                fontSize: config.num.fontSize+'px',
                fontWeight: config.num.fontWeight,
                letterSpacing: config.num.letterSpacing + 'px',
                marginRight: config.num.marginRight + 'px',
              }">{{el.value}}</span>
              <span :style="{
                display: config.percent.display,
                fontFamily: config.percent.fontFamily,
                fontStyle: config.percent.fontStyle, //是否倾斜
                textAlign: config.percent.textAlign,
                width: config.percent.width+'px',
                color: config.percent.color,
                fontSize: config.percent.fontSize+'px',
                fontWeight: config.percent.fontWeight,
                letterSpacing:config.percent.letterSpacing + 'px',
                marginRight:config.percent.marginRight + 'px'
              }">{{el.per}}%</span>
            </div>
            <div
              class="bar"
              :style="{
              display: config.progressBar.display,
              width: config.progressBar.width + 'px',
              height: config.progressBar.height + 'px',
              marginRight: config.progressBar.marginRight + 'px',
              borderRadius: config.progressBar.borderRadius + 'px',
              backgroundColor: config.progressBar.backgroundColor,
            }"
            >
              <div
                class="percentBar"
                :style="{
                background: `linear-gradient(to right, ${config.percentBar.backgroundFront}, ${config.percentBar.backgroundBehind})`,
                borderRadius: config.percentBar.borderRadius + 'px',
                width: el.per + '%'
              }"
              >
                <img
                  class="icon"
                  :src="config.percentBar.icon"
                  :style="{
                width: config.percentBar.iconWidth + 'px',
                height: config.percentBar.iconHeight + 'px',
                right: -config.percentBar.iconWidth/4 + 'px',
                top: config.percentBar.top + 'px'
              }"
                >
              </div>
            </div>
          </div>

        </div>
      </template>
    </vue-seamless-scroll>

  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
export default {
  components: {
    vueSeamlessScroll
  },
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      list: [],
      originArr: []
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  methods: {
    getArr(arr, num) {
      let newArr = JSON.parse(JSON.stringify(arr));
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    }
  },
  mounted() {
    //根据参数设置成滚动或者停止,停止时回到原点
    if (this.config.box.isScroll && this.$refs.scroll) {
      this.$refs.scroll._startMove();
    } else if (this.$refs.scroll) {
      this.$refs.scroll.xPos = 0;
      this.$refs.scroll.yPos = 0;
      this.$refs.scroll._stopMove();
    }
  },
  watch: {
    config: {
      handler(nl) {
        this.list = [];
        if (nl.data.length && nl.box.arrangeNum) {
          this.getArr(nl.data, Number(nl.box.arrangeNum)); //数组根据参数分割成n列
          this.originArr = JSON.parse(JSON.stringify(this.list)); //记录原始分割后的数据
        }

        //当前数组长度没有组件宽度高时,自动补齐高度
        let Length = Math.ceil(
          this.config.height / nl.line.height / this.list.length
        );
        if (
          nl.line.height &&
          this.list.length &&
          this.config.height &&
          nl.line.height * this.list.length < this.config.height
        ) {
          for (let i = 0; i < Length - 1; i++) {
            this.list = this.list.concat(this.originArr);
          }
        }

        if (nl.box.isScroll && this.$refs.scroll) {
          this.$refs.scroll._startMove();
        } else if (this.$refs.scroll) {
          this.$refs.scroll.xPos = 0;
          this.$refs.scroll.yPos = 0;
          this.$refs.scroll._stopMove();
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
.progressBar {
  color: #fff;

  .line1 {
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // .bar {
    //   position: relative;
    //   .percentBar {
    //     display: flex;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     height: 100%;

    //     .icon {
    //       position: absolute;
    //     }
    //   }
    // }
  }

  .line2 {
    .top {
      overflow: hidden;

      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: left;
      }
      span:nth-child(3) {
        float: right;
        order: 3;
      }
      span:nth-child(4) {
        float: right;
        order: 2;
      }
      span:nth-child(5) {
        float: right;
        order: 3;
      }
    }
  }
  .bar {
    position: relative;
    margin-top: 5px;
    .percentBar {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;

      .icon {
        position: absolute;
        display: flex;

        > span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background-color: #fff;
          opacity: 0.2;
        }
      }
    }
  }
}
</style>
