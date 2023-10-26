
<template>
    <div class="num"
    v-show="isShowModuleFunc(config)"
    :style="{
    width: config.width+'px',
    height: config.height+'px'
    
  }">
        <div 
        class="txt1"
        v-show="config.textForword.show"
        :style="[config.textForword,config.textForword.txtFamily,
        {
            lineHeight:config.textForword.lineHeight+'px',
            fontSize:config.textForword.fontSize+'px',
            letterSpacing:config.textForword.letterSpacing+'px',
            width:config.textForword.width+'px',
            height:config.textForword.height+'px',
        }]
        "
        ><span>{{ config.textForword.txt }}</span></div>
        <div>
            <NumberCount
            :id="'chanzhi'+random"
            :total="Number(config.data)"
            :num="Number(config.dataLength)" 
            :numberStyle="numberStyle"
        />
        </div>
        <div
        v-show="config.textAfter.show"
        :style="[config.textAfter,config.textAfter.txtFamily,
        {
            lineHeight:config.textAfter.lineHeight+'px',
            fontSize:config.textAfter.fontSize+'px',
            letterSpacing:config.textAfter.letterSpacing+'px',
            width:config.textAfter.width+'px',
            height:config.textAfter.height+'px',
        }]
        ">
            <span>{{ config.textAfter.txt }}</span>
        </div>
    </div>
  </template>
  
  <script>
  import NumberCount from './components/numberScroll'
  export default {
    name:'numberScroll',
    components:{NumberCount},
    props: {
      config: {
        type: Object,
       
      },
    },
    data() {
      return {
        random:'',
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
        numberStyle(){
            let obj={...this.config.textNumber}
            obj.fontSize= obj.fontSize+'px'
            obj.width= obj.width+'px'
            obj.height= obj.height+'px'
            if(obj.background.includes('no-repeat')){
                }else{
                obj.background = `url(${obj.background}) 100%/100% no-repeat `
                }
            return obj
        }
    },
    created() {
    
    },
    mounted() {
        this.randomNumber()

    },
    methods: {
        randomNumber(){
        // 随机数不重复
        let old = -1;
        // 获取随机数
        let random = Math.floor(Math.random()*10);
        // 避免重复
        if(old  == random){
            while(old  == random){
                random = Math.floor(Math.random()*10);
            }
        }
        old  = random;
        this.random=random
        }
    },
  };
  </script>
  <style lang="scss" scoped>
 .num{
    padding:20px;
    color: #fff;
    display: flex;
    align-items: center;
    overflow: hidden;
    .txt1{
        >span{
            display: block;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
 }
  </style>
  