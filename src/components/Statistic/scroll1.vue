<template>
  <div class="scroll1" >
    <vueSeamlessScroll
      ref="scroll"
      :data="list"
      :class-option="defaultOption"
      style="width: 100%;height: 100%; overflow: hidden"
    >
      <ul :style="{'display': config.box.direction === 'row'? 'flex':''}">
        <li
          v-for="(item,index) in list"
          ref="eventDom"
          :key="item.name + index"
          :style="{
          width: config.box.width + 'px',
          height: config.box.height + 'px'
          }"
        >
          <div class="top">
            <div class="icon">
              <img
                :style="{
                  width: config.title.iconWidth + 'px',
                  height: config.title.iconHeight + 'px'
                }"
                :src="config.title.iconUrl? config.title.iconUrl: icon1"
                alt=""
              >
            </div>
            <div
              class="text"
              :style="{
                display: config.title.display,
                fontFamily: config.title.fontFamily,
                fontStyle: config.title.fontStyle,
                textAlign: config.title.textAlign,
                width: config.title.width+'px',
                color: config.title.color,
                fontSize: config.title.fontSize+'px',
                fontWeight: config.title.fontWeight,
                letterSpacing: config.title.letterSpacing + 'px',
                marginRight: config.title.marginRight + 'px',
                }"
            >{{item.name}}</div>
            <div
              class="unit"
              :style="{
                display: config.unit.display,
                fontFamily: config.unit.fontFamily,
                fontStyle: config.unit.fontStyle,
                textAlign: config.unit.textAlign,
                width: config.unit.width+'px',
                color: config.unit.color,
                fontSize: config.unit.fontSize+'px',
                fontWeight: config.unit.fontWeight,
                letterSpacing: config.unit.letterSpacing + 'px',
                marginRight: config.unit.marginRight + 'px',
              }"
            >{{item.unit}}</div>
          </div>
          <div
            class="bottom"
            :style="{
            height: config.num.height+'px',
          }"
          >
            <div class="icon">
              <img
                :style="{
                  width: config.num.iconWidth + 'px',
                  height: config.num.iconHeight + 'px'
                }"
                :src="config.num.iconUrl? config.num.iconUrl: icon2"
                alt=""
              >
            </div>
            <div
              class="num"
              :style="{
                display: config.num.display,
                fontFamily: config.num.fontFamily,
                fontStyle: config.num.fontStyle,
                textAlign: config.num.textAlign,
                width: config.num.width+'px',
                color: config.num.color,
                fontSize: config.num.fontSize+'px',
                fontWeight: config.num.fontWeight,
                letterSpacing: config.num.letterSpacing + 'px',
                marginRight: config.num.marginRight + 'px',
            }"
            >{{item.value}}</div>
          </div>
        </li>
      </ul>
    </vueSeamlessScroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  components: {
    vueSeamlessScroll
  },
  props: {
    config: {
      type: Object
    },
    icon1: {
      type: String
    },
    icon2: {
      type: String
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.6, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    }
  },
  data() {
    return {
      list: [],
      originArr: []
    };
  },
  watch: {
    config: {
      handler(nl) {
        this.originArr = JSON.parse(JSON.stringify(nl.data));
        this.list = JSON.parse(JSON.stringify(nl.data));

        //当前数组长度没有组件宽度宽时,自动补齐宽度
        let Length = Math.ceil(
          this.config.width / nl.box.width / this.config.data.length
        );
        if (
          nl.box.width &&
          this.config.data.length &&
          this.config.width &&
          nl.box.width * this.config.data.length < this.config.width
        ) {
          for (let i = 0; i < Length - 1; i++) {
            this.list = this.list.concat(this.originArr);
            console.log(this.list);
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
  },
  data() {
    return {
      list: [],
      originArr: []
    };
  },
  mounted() {
    if (this.config.box.isScroll && this.$refs.scroll) {
      this.$refs.scroll._startMove();
    } else if (this.$refs.scroll) {
      this.$refs.scroll.xPos = 0;
      this.$refs.scroll.yPos = 0;
      this.$refs.scroll._stopMove();
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll1 {
  width: 100%;
  height: 100%;
  color: #fff;

  li {
    list-style: none;
  }

  .top {
    display: flex;
    align-items: center;

    .icon {
      font-size: 0;
    }

    .text {
      padding-right: 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .bottom {
    display: flex;
    align-items: center;

    .icon {
      font-size: 0;
    }
  }
}
</style>