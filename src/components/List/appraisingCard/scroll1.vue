<template>
  <div class="scroll1-wrapper">
    <vue-seamless-scroll
      v-for="item,index in list"
      :ref="`scroll${index}`"
      :key="index"
      :data="item"
      :hoverStop="true"
      :class-option="defaultOption"
      style="width: 100%; overflow: hidden;"
      :style="{
        width: config.box.direction === 'row'? '100%':'auto',
        height: config.box.direction === 'column'? '100%':'auto',
      }"
    >
      <div
        class="list"
        :style="{
          flexDirection: config.box.direction
        }"
      >
        <div
          class="box"
          v-for="el in item"
          :key="el.rowid"
          :style="{
           width: config.box.width + 'px',
           height: config.box.height + 'px',
           backgroundColor: config.box.backgroundColor,
           borderWidth: config.box.borderWidth + 'px',
           borderStyle: 'solid',
           borderColor: config.box.borderColor
          }"
        >
          <div :style="{height: (config.box.height - 12) + 'px'}">
            <img
              :src="el.photo.includes('http') ? el.photo: IMG_URL + el.photo"
              alt=""
              :style="{...photoStyle}"
            >
          </div>
          <div>
            <div
              :style="{
             display: config.first.display,
             fontFamily: config.first.fontFamily,
             fontStyle: config.first.fontStyle,
             textAlign: config.first.textAlign,
             color: config.first.color,
             fontSize: config.first.fontSize + 'px',
             fontWeight: config.first.fontWeight,
             letterSpacing: config.first.letterSpacing + 'px',
            }"
              style="padding-right: 3px"
            >{{el.name}}</div>
            <div :style="{
             display: config.second.display === 'block'? 'flex': config.second.display,
             fontFamily: config.second.fontFamily,
             fontStyle: config.second.fontStyle,
             textAlign: config.second.textAlign,
             color: config.second.color,
             fontSize: config.second.fontSize + 'px',
             fontWeight: config.second.fontWeight,
             letterSpacing: config.second.letterSpacing + 'px',
            }"><img
                v-if="config.second.firstPic"
                :src="config.second.selectedPic.url"
                style="max-width: 15px;max-height: 15px;margin-right: 5px"
                alt=""
              ><span style="flex: 1;padding-right: 3px">荣誉</span></div>
            <div
              :style="{
             display: config.third.display,
             fontFamily: config.third.fontFamily,
             fontStyle: config.third.fontStyle,
             textAlign: config.third.textAlign,
             color: config.third.color,
             fontSize: config.third.fontSize + 'px',
             fontWeight: config.third.fontWeight,
             letterSpacing: config.third.letterSpacing + 'px',
            }"
              style="padding-right: 3px"
            >{{el.description}}</div>
          </div>
        </div>
      </div>
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
  computed: {
    defaultOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: this.config.box.isScroll, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    },
    photoStyle() {
      if (this.config.pic.selfAdaption) {
        return {
          maxWidth: this.config.pic.width + 'px',
          maxHeight: this.config.pic.height + 'px'
        };
      } else {
        return {
          width: this.config.pic.width + 'px',
          height: this.config.pic.height + 'px'
        };
      }
    }
  },
  data() {
    return {
      IMG_URL:
        window.location.host.includes('localhost') ||
        window.location.host.includes('192.168') ||
        window.location.host.includes('127.0.0.1')
          ? 'https://www.sjxks.com'
          : window.location.protocol + '//' + window.location.host
    };
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
    // 根据参数设置成滚动或者停止,停止时回到原点
    if (this.config.box.isScroll && this.$refs.scroll0) {
      let length = this.list.length;
      for (let i = 0; i < length; i++) {
        this.$refs[`scroll${i}`][0]._startMove();
      }
    } else if (this.$refs.scroll0) {
      let length = this.list.length;
      for (let i = 0; i < length; i++) {
        this.$refs[`scroll${i}`][0].xPos = 0;
        this.$refs[`scroll${i}`][0].yPos = 0;
        this.$refs[`scroll${i}`][0]._stopMove();
      }
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
        // console.log(this.list, this.originArr);
        // if (nl.data.length) {
        //   this.getArr(nl.data, nl.data.length); //数组根据参数分割成n列
        //   this.originArr = JSON.parse(JSON.stringify(this.list)); //记录原始分割后的数据
        // }

        this.$forceUpdate();

        setTimeout(() => {
          if (nl.box.isScroll && this.$refs.scroll0) {
            let length = this.list.length;
            for (let i = 0; i < length; i++) {
              this.$refs[`scroll${i}`][0]._startMove();
            }
          } else if (this.$refs.scroll0) {
            let length = this.list.length;
            for (let i = 0; i < length; i++) {
              this.$refs[`scroll${i}`][0].xPos = 0;
              this.$refs[`scroll${i}`][0].yPos = 0;
              this.$refs[`scroll${i}`][0]._stopMove();
            }
          }
        }, 0);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.scroll1-wrapper {
  width: 100%;
  height: 100%;
}
.list {
  display: flex;

  .box {
    border-radius: 3px;
    padding: 6px;
    margin-right: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 10px;

    > div:nth-child(1) {
      overflow: hidden;
      font-size: 0;
      display: flex;
      align-items: center;
    }

    > div:nth-child(2) {
      flex: 1;
      margin-left: 10px;
      overflow: hidden;

      > div:nth-child(1) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      > div:nth-child(2) {
        align-items: center;
        margin: 5px 0;
      }
    }
  }
}
</style>