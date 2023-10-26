<template>
  <div
    v-show="isShowModuleFunc(config)"
    class="num"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  >
   <div  
     v-for="(item, i) in list"
      :key="i"
      class="box1"
        :style="{
        width: config.width + 'px',
      }"
    >
    <div
      v-for="(v, ii) in item"
      :key="ii"
      class="box1"
      :style="{ width: config.contain.width+'px',
               height: config.contain.height+'px',
               marginRight: config.contain.marginRight+'px',
               marginBottom: config.contain.marginBottom+'px' }"
      ref="eventDom"
    >
      <div
        class="img"
        :style="styleObj(v)"
      />
      <div v-show="config.title1.show" :style="textStyle1" class="txt">
          {{ v.per? v.per:'' }}</div>
      <div
        class="img"
        :style="{
              background: config.backgroundImg2.show
               ? imgStyle2.bgImg.background
              : '',
              width:  imgStyle2.bgImg.width+'px',
               height:  imgStyle2.bgImg.height+'px',
               left: imgStyle2.bgImg.left+'px',
               top: imgStyle2.bgImg.top+'px',
          }"
      />
      <div    class="txt"
      :style="textStyle2" v-show="config.title2.show">
          {{ v.name? v.name:'' }}
      </div>
      <div   class="txt" :style="textStyle3" v-show="config.title3.show">
        {{ v.txt?v.txt:'' }}
      </div>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  name: "numberCount",
  props: {
    config: {
      type: Object,
    },
    changeSize: {
      type: Function
    }
    // isShow: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      isShow: true,
      list:[],
    };
  },
  watch: {
    'config.txtRowImgs':{
      handler(nVal, oVal) {
      },
      immediate:true,
      deep: true,
    },
    'config.data': {
      handler(nVal, oVal) {
        let d = this.config;
        if (nVal.length && d.contain.arrangeNum) {
            if(d.txtRowImgs.length !== nVal.length){
              d.txtRowImgs=[]
              nVal.forEach((item) => {
                d.txtRowImgs.push({
                  background: require("@/assets/component/img/img1.png"),
                });
              });
              this.$emit('changeSize', 'txtRowImgs', d.txtRowImgs)
              // this.config.txtRowImgs =  d.txtRowImgs
            }
          this.getArr(nVal, Number(d.contain.arrangeNum));
        }
      },
      deep: true,
      immediate: true
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
  computed: {
    styleObj(){
      return function(v){
        let d = this.config.backgroundImg1;
        let obj = {
            'background': d.show? `url(${this.config.txtRowImgs[v.rank].background}) 100% 100%/100% 100% no-repeat `
            : '',
              'width': d.bgImg.width+'px',
              'height': d.bgImg.height+'px',
              'left':d.bgImg.left+'px',
              'top': d.bgImg.top+'px',

        }
        return obj;
      }
    },
    textStyle1() {
      let arr = [];
      //字体颜色
      let obj = this.config.title1.linearTxt
        ? {
            backgroundImage: `linear-gradient(180deg, ${
              this.config.title1.txtColor.txtBackground[0]
            } 0%,
               ${this.config.title1.txtColor.txtBackground[1]} 100%)`,
            ...this.config.title1.txtColor,
          }
        : {
            color: this.config.title1.txtColor.txtBackground[0],
          };
      arr.push(obj);
      //px
      let txtPx = { ...this.config.title1.textStylePx };
      Object.keys(txtPx).forEach((key) => {
        txtPx[key] = txtPx[key] + "px";
      });
      arr.push(txtPx);
      //字体样式
      let txtFamily = { ...this.config.title1.txtFamily };
      arr.push(txtFamily);
      return arr;
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
    imgStyle2() {
      let obj = { ...this.config.backgroundImg2 };
      if (obj.bgImg.background.includes("no-repeat")) {
      } else {
        obj.bgImg.background = `url(${
          obj.bgImg.background
        }) 100% 100%/100% 100% no-repeat `;
      }
      return obj;
    },
  },
  created() {
  
  },
  mounted() {},
  methods: {
    getArr(arr, num) {
      let newArr = arr.map((item, index) => {
        return {
          ...item,
          rank: index
        };
      }); // 因为splice会改变原数组，要深拷贝一下
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    },
  },
};
</script>
<style lang="scss" scoped>
.num {
  padding: 15px;
  color: #fff;
  width: 100%;
  height: 100%;
  pointer-events: all !important;
  overflow: hidden;
  .box1 {
    display: flex;
    // flex-direction: column;
    // align-content: center;
    position: relative;
    .img {
      position: absolute;
      > span {
        display: block;
      }
    }
    .txt{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
