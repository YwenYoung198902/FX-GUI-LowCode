<template>
  <div
    class="danbingStyle"
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      background: config.wholeStyle.wholeBackground,
      borderColor: config.wholeStyle.borderColor,
    }"
  >
    <div
      class="title"
      :style="{
        height: config.wholeStyle.height + 'px',
        lineHeight: config.wholeStyle.lineHeight + 'px',
        fontSize: config.wholeStyle.fontSize + 'px',
        textIndent: config.wholeStyle.textIndent + 'px',
        color: config.wholeStyle.color,
        background: `url(${
          config.wholeStyle.background
        }) 100% 100%/100% 100% no-repeat`,
      }"
    >
    <span>{{config.wholeStyle.txt}}</span>
      <span :style="{
         width: config.closeImg.width + 'px',
        height: config.closeImg.height + 'px',
        marginRight: config.closeImg.marginRight + 'px',
        marginTop: config.closeImg.marginTop + 'px',
        background:`url(${config.closeImg.background}) 100% 100%/100% 100% no-repeat`,
      }
      "
      ></span>
    </div>
    <div  v-if="dataList && dataList.length" 
      class='outerBox'
    >
      <div v-for="(item, index) in dataList" :key="index"
        :class="dataList.length==1?'one_video':dataList.length==4?
        'four_video':'nine_video'"
      >
        <sinngleVue
          ref="child"
          :danbin="item"
          :close-more-video="'closeMoreVideo'"
        />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import sinngleVue from "./deceiveDanbin/sinngle";
export default {
  components: {
    sinngleVue,
  },
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      dataList: [],
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.changeComponmentData(
      // {}
      [{id:0},{id:1},{id:2},{},{}]
    )
  },
  methods: {
    changeComponmentData(data) {
      this.dataList = [];
      if (!(data instanceof Array)) {
        this.dataList.push(data);
      } else {
         this.dataList = data;
         if(data.length>9){
          this.dataList.splice(0,9);
         }else  if(data.length>0&&data.length<=4){
            const count = 4 - data.length;
            for (let i = 0; i < count; i++) {
              this.dataList.push({ type: 'noSelect' });
            }
         }else if(data.length==1){
           this.dataList = data;
         } else{
            const count = 9 - data.length;
              for (let i = 0; i < count; i++) {
                this.dataList.push({ type: 'noSelect' });
              }
         }
      }
      this.config.isShowModule = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.danbingStyle {
  color: #fff;
  pointer-events: all;
  border: 1px solid;
  .title {
    width: 100%;
    display:flex;
    justify-content:space-between;
    // > span {
    //   background: linear-gradient(180deg, #ffffff 0%, #68aeff 100%);
    //   -webkit-background-clip: text;
    //   -webkit-text-fill-color: transparent;
    //   background-clip: text;
    //   text-fill-color: transparent;
    //   font-size: 24px;
    //   font-weight: 900;
    //   font-family: " MicrosoftYaHei-Bold";
    //   line-height: 50px;
    //   margin-left: 20px;
    // }
  }
  .outerBox{
    width:100%;
    height:100%;
    padding:20px;
    display:flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .one_video{
      width:100%;
      height:calc(100% - 50px);
    }
    .four_video{
      width:49%;
      height:46%;
      margin-right:20px;
      margin-bottom:20px;
      background-color:#000;
      &:nth-child(2n){
        margin-right:0px;
      }
    }
    .nine_video{
      width:32.45%;
      height:30%;
      margin-right:20px;
      margin-bottom:20px;
      background-color:#000;
      &:nth-child(3n){
        margin-right:0px;
      }
    }
  }
}
</style>
