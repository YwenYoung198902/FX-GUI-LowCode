<template>
  <div
    class="buttonOne"
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  > 
  <!-- 按钮 -->
    <div
      class="element"
      @click="flag = !flag"
      @mouseover="isShowTxt = true"
      @mouseleave="isShowTxt = false"
      :style="{
        width: config.buttonStyle.width + 'px',
        height: config.buttonStyle.height + 'px',
        background:backgroundImg.background,
    }"
    >
      <span v-show="config.buttonStyle.txtShow"
      :style="{
        color:config.buttonStyle.color,
        fontSize:config.buttonStyle.fontSize+'px',
        lineHeight:config.buttonStyle.lineHeight+'px',
      }"
      >{{config.buttonStyle.txt}}</span>
    </div>
    <!-- 鼠标滑过出现文字 -->
    <div
      class="hover"
      v-show="isShowTxt && (!config.optionStyle.optionShow || !flag) && config.buttonStyle.hoverShow"
      :style="{
        width: config.hoverStyle.width + 'px',
        height: config.hoverStyle.height + 'px',
        color:config.hoverStyle.color,
        fontSize:config.hoverStyle.fontSize+'px',
        lineHeight:config.hoverStyle.lineHeight+'px',
        background:`url(${config.hoverStyle.background}) 100% 100%/100% 100% no-repeat`,
      }"
    >
      {{ config.hoverStyle.txt }}
    </div>
    <!-- 下拉框 -->
    <div class="clickShow" v-show="config.optionStyle.optionShow&&flag"
    :style="{
        width: config.optionStyle.width + 'px',
        height: config.optionStyle.height + 'px',
        color:config.optionStyle.color,
        fontSize:config.optionStyle.fontSize+'px',
        lineHeight:config.optionStyle.lineHeight+'px',
        background:config.optionStyle.background,
        borderColor:config.optionStyle.borderColor,
      }"
    >
      <span v-for="(item, i) in config.data" :key="i" ref="eventDom"
       @mouseover="isShowBac = true,active=i"
       @mouseleave="isShowBac = false"
      :style="{
        height: config.optionStyle.span.height + 'px',
        textIndent:config.optionStyle.span.textIndent+'px',
        lineHeight: config.optionStyle.span.height+'px',
        color:item.color,
        fontSize:item.fontSize+'px',
        background:isShowBac&&active===i?config.optionStyle.span.background:'transparent',
      }"
      
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      active:'0',
      flag: false,
      isShowTxt: false,
      isShowBac:true,
      dropdown: [
        {
          name: "三维地图",
        },
        {
          name: "二维地图",
        },
      ],
      id: 1
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
      },
      deep: true,
    },
  },
  computed: {
    backgroundImg(){
            let obj={...this.config.backgroundImg}
              if(obj.background.includes('no-repeat')){
                }else{
                obj.background = `url(${obj.background}) 100% 100%/100% 100% no-repeat `
                }  
         return obj
        },
        backgroundActive(){
            let obj={...this.config.backgroundActive}
              if(obj.background.includes('no-repeat')){
                }else{
                obj.background = `url(${obj.background}) 100% 100%/100% 100% no-repeat `
                }  
         return obj
        },
  },
  created() {},
  mounted() {},
  methods: {
   
    // changeComponmentData({ id }) {
    //     this.id = id
    //     this.init()
    //     this.config.isShowModule = true
    // }
  },
};
</script>
<style lang="scss" scoped>
.buttonOne {
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  pointer-events: all;
  .element {
    width: 60px;
    height: 65px;
    // display:flex;
    //   align-items: center;
    // background: url("../../assets/image/xiaokunshan/icon3.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 65px;
    //    overflow: hidden;
    white-space: nowrap;
    
    cursor: pointer;
    //    text-overflow: ellipsis;
  }

  // .element:hover+.hover{
  //     display:block;
  //     [data-theme=true] & {
  //         display:none;
  //     }
  // }
  .hover {
    // width: 80px;
    // height: 30px;
    // background: url("../../assets/image/xiaokunshan/img1.png") no-repeat;
    // background-size: 100% 100%;
    text-align: center;
    // line-height: 30px;
  }
  .clickShow {
    // width: 120px;
    // height: 60px;
    // background: rgba(14, 39, 70, 0.95);
    border: 1px solid #1b7ef2;
    display: flex;
    flex-direction: column;
    > span {
      width: 100%;
      cursor: pointer;
    //   height: 30px;
    //   line-height: 30px;
    //   text-indent: 5px;
    //   &:hover {
    //     background: rgba(69, 162, 255, 0.3);
    //   }
    }
  }
}
</style>
