<template>
  <div
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  >
    <div class="camera-carousel-right">
      <div class="prev" v-show="config.contain.scroll">
        <img
          src="@/assets/component/img/arrow_left.png"
          @click="arrowClick('prev')"
        />
      </div>
      <div style="width: 100%;height:100%">
        <el-carousel
          ref="cardShow"
          arrow="never"
          :autoplay="config.contain.scroll ? true : false"
          height="100%"
          width="100%"
          :interval="Number(config.contain.time) * 1000"
          indicator-position="none"
        >
          <el-carousel-item v-for="(data, i) in list" :key="i">
            <div class="camera-carousel-list">
              <template>
                <div
                v-for="(item, index) in data"
                  :key="item.rowid"
                  ref="eventDom"
                  @click="active = index"
                  :class="[
                    'camera-carousel-item',
                    'txt-ellipsis',
                    {
                      'active-carousel': active == index,
                    },
                  ]"
                  :style="{
                    width: config.contain.width + 'px',
                    minWidth: config.contain.width + 'px',
                    height: config.contain.height + 'px',
                    marginRight: config.contain.marginRight + 'px',
                    borderWidth: '1px',
                    borderStyle:'solid',
                    borderColor:
                      active ==index? config.contain.borderColor : 'transparent',
                    background:config.contain.show?`url(${config.contain.background}) 100% 100%/100% 100% no-repeat `:config.contain.backgroundColor
                  }"
                >
                  <div
                    class="camera-item-total"
                    v-show="config.txtRowOne.show"
                    :style="{
                      fontSize: config.txtRowOne.fontSize + 'px',
                      marginTop: config.txtRowOne.marginTop + 'px',
                      fontWeight: config.txtRowOne.fontWeight,
                      fontStyle: config.txtRowOne.fontStyle,
                      textAlign: config.txtRowOne.textAlign,
                      fontFamily: config.txtRowOne.fontFamily,
                      color: config.txtRowOne.color,
                    }"
                  >
                    {{ item.camera_info.total }}
                  </div>
                  <div class="camera-item-icon"
                  v-show="config.txtRowImg.show"
                  :style="{
                      marginTop: config.txtRowImg.marginTop + 'px',
                      marginLeft: config.txtRowImg.marginLeft + 'px',
                      width: config.txtRowImg.width + 'px',
                      height: config.txtRowImg.height + 'px',
                    }"
                  > 
                  
                    <img
                      width="100%"
                      height="100%"
                      :src="config.txtRowImgs[item.rank].background"
                    />
                  </div>
                  <div
                    class="camera-name"
                    v-show="config.textTitle.show"
                    :title="item.name"
                    :style="{
                      fontSize: config.textTitle.fontSize + 'px',
                      marginTop: config.textTitle.marginTop + 'px',
                      fontWeight: config.textTitle.fontWeight,
                      fontStyle: config.textTitle.fontStyle,
                      textAlign: config.textTitle.textAlign,
                      fontFamily: config.textTitle.fontFamily,
                      color: config.textTitle.color,
                    }"
                  >
                    {{ item.name }}
                  </div>
                  <div
                    class="camera-online"
                    v-show="config.txtRowtwo.show"
                    :style="{
                      marginTop: config.txtRowtwo.marginTop + 'px',
                      fontWeight: config.txtRowtwo.fontWeight,
                      fontStyle: config.txtRowtwo.fontStyle,
                      textAlign: config.txtRowtwo.textAlign,
                      fontFamily: config.txtRowtwo.fontFamily,
                      color: config.txtRowtwo.color,
                      fontSize: config.txtRowtwo.fontSize + 'px',
                    }"
                  >
                    <span
                      class="camera-line-total"
                      :style="{
                        color: config.txtRowtwo.colorLeft,
                      }"
                      >{{ item.camera_info.online }}</span
                    >/<span class="camera-line-all-total"
                    :style="{
                        color: config.txtRowtwo.colorRight,
                      }">{{
                      item.camera_info.total
                    }}</span>
                  </div>
                </div>
              </template>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="next" v-show="config.contain.scroll">
        <img
          src="@/assets/component/img/arrow_right.png"
          @click="arrowClick('next')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "numberFive",
  components: {},
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      active: 0,
      list: [],
    };
  },
  computed: {},
  watch: {
    'config.data': {
      handler(nVal, oVal) {
        let d = this.config;
        if (nVal.length && d.contain.arrangeNum) {
            if(d.txtRowImgs.length !== nVal.length){
              d.txtRowImgs=[]
              nVal.forEach((item) => {
                d.txtRowImgs.push({
                  background: require("@/assets/component/img/icon1.png"),
                });
              });
              this.$emit('changeSize', 'txtRowImgs', d.txtRowImgs)
            }
          this.getArr(nVal, Number(d.contain.arrangeNum));
        }
      },
      deep: true,
      immediate: true,
    },
    'config.contain.arrangeNum':{
      handler(nVal, oVal){
        if (nVal != oVal) {
          this.getArr(this.config.data, Number(nVal));
        }
      },
      deep: true,
    }
  },

  created() {
   
  },
  methods: {
    getArr(arr, num) {
      let newArr = arr.map((item, index) => {
        return {
          ...item,
          rank: index,
        };
      }); // 因为splice会改变原数组，要深拷贝一下
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    },
    arrowClick(val) {
      if (val === "next") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    },
    console() {},
  },
};
</script>
<style lang="scss" scoped>
.el-carousel--horizontal {
  height: 100%;
  overflow: hidden;
}
.el-carousel__arrow--left {
  display: none;
}
.camera-carousel-right {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  .prev {
    margin-right: 10px;
    pointer-events: all;
    cursor: pointer;
  }
  .next {
    cursor: pointer;
    pointer-events: all;
    margin-left: 10px;
  }
  .camera-carousel-list {
    display: flex;
    align-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;
    .camera-carousel-item {
      pointer-events: all;
      cursor: pointer;
    //   background: url("../../assets/component/img/camera_list.png") no-repeat;
    //   background-size: 100% 100%;
      .camera-name {
        width: 100%;

        padding:0 5px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .camera-online {
        width: 100%;
        padding-right: 3px;
        .camera-line-total {
          padding-right: 2px;
        }
        .camera-line-all-total {
          padding-left: 2px;
        }
      }
      .camera-item-total {
        width: 100%;
        padding-right: 5px;
      }
      .camera-item-icon,
      .camera-item-layer {
        display: flex;
        justify-content: center;
        .layer {
          align-self: flex-start;
        }
      }
    }
   
    .camera-carousel-item:last-child {
      margin-right: 0px !important;
    }
  }
}
</style>
