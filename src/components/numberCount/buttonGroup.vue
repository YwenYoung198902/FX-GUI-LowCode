
<template>
    <div class="num"
    v-show="isShowModuleFunc(config)"
    :style="{
    width: config.width+'px',
    height: config.height+'px'
  }">
       <div class="data-box">
                <div
                    v-for="(v, i) in config.data"
                    ref='eventDom'
                    :key="i"
                    :style="[txtStyle,txtFamily,
                    config.text.isBacagroundImg? backgroundImg :  backgroundColors,
                    {background:active==i&&config.text.isBacagroundImg?
                        backgroundActive.background:
                        active !=i&&config.text.isBacagroundImg?
                        backgroundImg.background :
                        active==i&&!(config.text.isBacagroundImg)?
                        backgroundColorsActive.backgroundColor :
                        backgroundColors.backgroundColor,
                         borderColor: active==i&&!(config.text.isBacagroundImg)?
                        backgroundColorsActive.borderColor : active !=i&&!(config.text.isBacagroundImg)?
                        backgroundColors.borderColor : '',
                        paddingRight: '5px'
                    }  
                    ]"
                    @click="active=i"
                >
                    <span>{{ v.name }}</span>
                </div>
       </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'buttonGroup',
    components:{},
    props: {
      config: {
        type: Object,
       
      },
    },
    data() {
      return {
        active:0,
   
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
        txtStyle(){
            let obj={...this.config.text}
            obj.fontSize= obj.fontSize+'px'
            obj.lineHeight=obj.lineHeight+'px'
            obj.textIndent=obj.textIndent+'px'
            obj.marginTop=obj.marginBottom+'px'
            obj.width=obj.width+'px'
            obj.height=obj.height+'px'
           
            return obj
        },
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
        backgroundColors(){
            let obj={...this.config.backgroundColors}
            obj.borderWidth=obj.borderWidth+'px'
            return obj
        },
        backgroundColorsActive(){
            let obj={...this.config.backgroundColorsActive}
            return obj
        },
        txtFamily(){
            return {...this.config.txtFamily}
        }

    },
    created() {
    
    },
    mounted() {
       

    },
    methods: {
    
    },
  };
  </script>
  <style lang="scss" scoped>
 .num{
    color: #fff;
    display: flex;
    align-items: center;
    overflow: hidden;
    pointer-events: all;
        .data-box {
          width: 100%;
           height: 100%;
          .title-box {
            // background-color: rgba(255,217,164,0.1);
            // border: 1px solid rgba(255,217,164,0.15);
            // width: 390px;
            // height: 55px;
            // min-height: 45px;
            // max-height: 55px;
            // background-image: url('../../assets/component/img/bg.png');
            // background-size: 100% 100%;
            // margin: 5px 0;
            // text-align: center;
            cursor: pointer;
            // display: flex;
            // align-items: center;
            // > span {
            //   font-size: 20px;
            //   line-height: 27px;
            //   color: #ffe6c3;
            //   padding-left: 54px;
            // }
          }
      }
   
 }
  </style>
  