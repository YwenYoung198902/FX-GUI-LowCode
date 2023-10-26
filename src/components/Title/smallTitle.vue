<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-07-21 11:53:03
-->
<template>
  <div class="smallTitle"
  v-show="isShowModuleFunc(config)"
   :style="{
    width: config.width+'px',
    height: config.height+'px'
  }">
    <div>
        <div
         :style="[{
            width: config.width+'px',
           height: config.height+'px',
          position: 'absolute',
          background:config.textStyle.imgShow?`url(${config.bgImg.background}) 100% 100%/100% 100% no-repeat `
          :''
         },imgStylePx]"
        >
          <div :style="[linearBacaground, textStylePx, config.txtFamily,
            { display:config.textStyle.show?'':'none'}]">
          {{ config.txt }}
      
         </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      active: 1,
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
        // console.log(nVal, oVal, "===watch");
      },
      deep: true,
    },
  },
  computed: {
    linearBacaground() {
      let obj = this.config.textStyle.linearTxt
        ? {
            backgroundImage: `linear-gradient(180deg, ${this.config.txtColor.txtBackground[0]} 0%,
             ${this.config.txtColor.txtBackground[1]} 100%)`,
            ...this.config.txtColor,
          }
        : {
            color: this.config.txtColor.txtBackground[0],
          };
      return obj;
    },
    imgStylePx() {
      let style2 = { ...this.config.imgPos };
      Object.keys(style2).forEach((key) => {
        style2[key] = style2[key] + "px";
      });
      return style2;
    },
    textStylePx() {
      let style2 = { ...this.config.textStylePx };
      Object.keys(style2).forEach((key) => {
        style2[key] = style2[key] + "px";
      });
      return style2;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.smallTitle {
  color: aliceblue;
  position: absolute;
  overflow: hidden;
  img {
    pointer-events: none;
  }
  > div {
    color: aliceblue;
    width: 100%;
    height: 100%;
    position: relative;
  
  }
}
</style>
