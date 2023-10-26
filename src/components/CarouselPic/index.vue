<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-07 16:46:23
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-12 11:00:15
-->
<template>
  <div
    class="carousel-wrapper"
    v-show="isShowModuleFunc(config)"
    :style="{
    }"
  >
    <el-carousel
      class="outside-carousel"
      indicator-position="outside"
      :autoplay="config.box.autoplay"
      :interval="config.box.interval*1000"
      :direction="config.box.direction"
      :style="{ cssVars}"
      arrow="always"
    >
      <el-carousel-item
        v-for="item,index in list"
        :key="index"
        :style="{
          flexDirection: config.box.direction === 'horizontal' ? 'row':'column'
        }"
      >
        <div
          :style="{
            width: config.box.boxWidth + 'px',
            height: config.box.boxHeight + 'px',
            backgroundColor: config.box.backgroundColor,
          }"
          v-for="el in item"
          :key="el.rowid"
        >
          <el-carousel
            class="inner-carousel"
            indicator-position="none"
            :autoplay="false"
            direction="horizontal"
            :arrow="el.photo.length && el.photo.length>1? 'hover': 'never'"
            :style="{
              width: config.box.width + 'px',
              height: config.box.height + 'px'
            }"
          >
            <el-carousel-item
              v-for="e,index in el.photo"
              :key="index"
            >
              <img
                :src="e.includes('http') ? e: e.includes('base64')? e: IMG_URL + e"
                :style="{
                  width: config.box.width + 'px',
                  height: config.box.height + 'px'
                }"
                alt=""
              >
            </el-carousel-item>
          </el-carousel>
          <div
            class="title"
            :style="{
            display: config.title.display,
            fontFamily: config.title.fontFamily,
            fontStyle: config.title.fontStyle, //是否倾斜
            textAlign: config.title.textAlign,
            color: config.title.color,
            fontSize: config.title.fontSize+'px',
            fontWeight: config.title.fontWeight,
            letterSpacing: config.title.letterSpacing + 'px'
          }"
          >
            {{el.name}}
          </div>
          <div
            class="description"
            :style="{
                display: config.description.display,
                fontFamily: config.description.fontFamily,
                fontStyle: config.description.fontStyle, //是否倾斜
                textAlign: config.description.textAlign,
                color: config.description.color,
                fontSize: config.description.fontSize+'px',
                fontWeight: config.description.fontWeight,
                letterSpacing: config.description.letterSpacing + 'px'
              }"
          >
            {{el.desc}}
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    }
  },
  watch: {
    // handler: {

    // }
    config: {
      handler() {
        this.getArr(this.config.data, this.config.box.arrangeNum);
      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      list: [],
      IMG_URL:
        window.location.host.includes('localhost') ||
        window.location.host.includes('192.168') ||
        window.location.host.includes('127.0.0.1')
          ? 'https://www.sjxks.com'
          : window.location.protocol + '//' + window.location.host
    };
  },
  computed: {
    cssVars() {
      return {
        '--ul-margin-top': this.config.box.height / 2 + 'px',
        '--ul-margin-right':
          (this.config.height - this.config.box.height) / 2 + 'px',
        '--ul-margin-bottom': 100 + 'px',
        '--button-margin-right':
          (this.config.width - this.config.box.width) / 2 - 36 + 'px',
        '--button-margin-top': this.config.box.height / 2 + 'px'
      };
    }
  },
  mounted() {
    this.getArr(this.config.data, this.config.box.arrangeNum);
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
  }
};
</script>

<style lang="scss">
.carousel-wrapper {
  pointer-events: all;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
  }
  .el-carousel.outside-carousel {
    width: 100%;
    height: 100%;

    > .el-carousel__container > .el-carousel__item {
      display: flex;
      justify-content: space-evenly;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
      }
    }
  }
  .el-carousel__container {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    top: 0;
    left: 0;
  }

  .el-carousel__item {
    width: 100%;
    height: 100%;
    display: flex;
    // flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }

  .el-carousel__indicators--horizontal {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }

  .el-carousel__indicators--vertical {
    height: fit-content;
    position: absolute;
    display: flex;
    flex-direction: column;

    button {
      height: 30px;
    }
  }

  .description,
  .title {
    width: 100%;
    height: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 8px;
  }
}
</style>