<template>
    <div ref="scrollBox" class="scroll-box"
     >
      <div class="infiniteScroll">
        <div class="scroll_parent_box" @mouseenter="isScroll?mEnter():''" @mouseleave="isScroll?mLeave():''">
          <div
            class="scroll_list"
            :style="{ transform: `translate(0px,-${scrollTop}px)` }"
          >
            <div ref="scrollItemBox">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      list: {
        type: Array,
        default: [],
      },
      count: {
        type: Number,
      },
      type: {
        type: String,
        default: "list",
      },
      height: {
        type: Number,
      },
      speed: {
        type: Number,
        default: 50,
      },
      isScroll:{
        type:Boolean,
      }
    },
    data() {
      return {
        scrollBoxHeight: 0,
        showDataNum: 0,
        showDataHeight: 0,
        scrollTop: 0, // 列表滚动高度
        timer: "",
      };
    },
    watch:{
      isScroll(nval,oval){
         if(nval){
            this.getCameraBoxHeight();
            setTimeout(()=>{
            this.startScroll()
            },1000)
         }else{
          this.mEnter()
          this.scrollTop = 0;
         }
      }
    },
    mounted() {
      if(this.isScroll){
        this.getCameraBoxHeight();
          setTimeout(()=>{
          this.startScroll()
          },1000)
      }
     
    },
    destroyed() {
      this.timer && clearInterval(this.timer);
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
    },
    methods: {
      getCameraBoxHeight() {
        this.$nextTick(() => {
          this.scrollBoxHeight = this.$refs.scrollBox.offsetHeight;
          this.showDataNum = Math.floor(this.scrollBoxHeight / this.height);
          const height = this.type === "camera" ? 140 : 0;
          this.showDataHeight = this.showDataNum * this.height + height;
          const time = this.count === 1 ? 5000 : 0;
          setTimeout(() => {
            if (this.type === this.$route.name) {
              if (this.type === "camera") {
                const checkedTab = this.$store.state.sheshanCamera.checkedTab;
                if (checkedTab !== "split_screen") {
                  this.startScroll();
                }
              } else {
                this.startScroll();
              }
            }
          }, time);
        });
      },
      // 鼠标移入停止滚动
      mEnter() {
        this.timer && clearInterval(this.timer);
      },
      // 鼠标移出继续滚动
      mLeave() {
        this.startScroll();
      },
      // 开始滚动
      startScroll() {
        this.timer && clearInterval(this.timer);
        if (this.type === "camera") {
          if (this.list.length > 4) {
            this.timer = setInterval(this.autoScroll, this.speed);
          } else {
            this.scrollTop = 0;
          }
        } else {
          if (this.list.length > this.showDataNum) {
            this.timer = setInterval(this.autoScroll, this.speed);
          } else {
            this.scrollTop = 0;
          }
        }
      },
      // 滚动处理方法
      autoScroll() {
        this.scrollTop++;
        this.$nextTick(() => {
          // 获取需要滚动的盒子的高度
          const scrollItemBox = this.$refs.scrollItemBox.offsetHeight;
          // 当判断滚动的高度大于等于盒子高度时，从头开始滚动
          if (this.scrollTop + this.showDataHeight >= scrollItemBox) {
            this.scrollTop = 0;
          }
        });
      },
      scrollToTop(){
        this.scrollTop = 0;
      }
    },
  };
  </script>
  
  <style lang="scss">
  .scroll-box {
    height: 100%;
    width: 100%;
  }
  </style>
  