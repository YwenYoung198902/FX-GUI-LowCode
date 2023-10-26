<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-25 17:54:07
-->
<template>
  <div
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      overflow:'hidden',
    }"
  >
    <div
      class="tab"
      :style="{
        flexDirection: config.contain.direction,
      }"
    >
      <div
        v-for="(item, i) in config.data"
           ref="eventDom"
        :style="[
          {
            width: config.contain.width + 'px',
            height: config.contain.height + 'px',
          },
          config.contain.defaultIndex == i + 1
            ? {
                color: config.ActiveTxt.color,
                backgroundColor: config.ActiveTxt.backgroundColor,
                borderColor: config.ActiveTxt.borderColor,
                borderWidth: config.ActiveTxt.borderWidth + 'px',
                fontSize: config.defaultTxt.fontSize + 'px',
                lineHeight: config.defaultTxt.lineHeight + 'px',
                fontWeight: config.defaultTxt.fontWeight,
                fontStyle: config.defaultTxt.fontStyle,
                textAlign: config.defaultTxt.textAlign,
                fontFamily: config.defaultTxt.fontFamily,
              }
            : {
                color: config.defaultTxt.color,
                backgroundColor: config.defaultTxt.backgroundColor,
                borderColor: config.defaultTxt.borderColor,
                lineHeight: config.defaultTxt.lineHeight + 'px',
                fontSize: config.defaultTxt.fontSize + 'px',
                borderWidth: config.defaultTxt.borderWidth + 'px',
                fontWeight: config.defaultTxt.fontWeight,
                fontStyle: config.defaultTxt.fontStyle,
                textAlign: config.defaultTxt.textAlign,
                fontFamily: config.defaultTxt.fontFamily,
                cursor:!config.dataStyle.length || !config.dataStyle[i].isShowImg ?'pointer':''
              },
        ]"
        @click="config.dataStyle.length > 0 && config.dataStyle[i].isShowImg?'':activeColor(i)"
      >
        <span  class='title'
        v-if="config.dataStyle.length > 0 && config.dataStyle[i].isShowTxt">{{ item.name }}</span> 
        <img
          v-if="config.dataStyle.length > 0 && config.dataStyle[i].isShowImg"
          @click="activeColor(i)"
          :src="
            config.contain.defaultIndex == i + 1
              ? config.dataStyle[i].activeImg
              : config.dataStyle[i].img
          "
          :style="{
            width:config.dataStyle[i].width + 'px',
            height: config.dataStyle[i].height + 'px',
            cursor: 'pointer',
          }"
        />
      
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabPanel",
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
      },
      deep: true,
    },
  },
  computed: {},
  created() {},
  mounted() {
    // this.dealData();
  },
  methods: {
    activeColor(i){
      this.config.contain.defaultIndex = i + 1
    }
    // dealData() {
    //   this.config.dataStyle = [];
    //   this.config.data.forEach(() => {
    //     this.config.dataStyle.push({
    //       isShowTxt:true,
    //       isShowImg: false,
    //       img: "",
    //       activeImg: "",
    //       width:24,
    //       height:24,
    //     });
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.tab {
  display: flex;
  // height: 30px;
  // line-height: 30px;
  // font-size: 16px;
  // font-family: MicrosoftYaHei-Bold;
  > div {
    // padding: 0 8px;
    // text-align: center;
    // border-width: 1px;
    border-style: solid;
    padding-right: 3px;
    pointer-events: all;
    position:relative;
    // border-color: #759ac7;
    // color: #759ac7;
  }
  img{
    z-index:1;
  }
  .title{
    z-index:2;
    pointer-events:none;
  }
  img,.title{
    position:absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;

  }
  .active {
    // color: #ffffff;
    // background: rgba(27, 126, 242, 0.3);
    // border-width: 1px;
    // border-style: solid;
    // border-color:  #1b7ef2;
  }
}
</style>
