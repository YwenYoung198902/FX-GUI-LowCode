
<template>
    <div class="num"
    v-show="isShowModuleFunc(config)"
    :style="{
    width: config.width+'px',
    height: config.height+'px'
  }">  

           <div  class="data-box"
                :style="{   
                        height: config.contain.height+'px',
                        marginBottom: config.contain.marginBottom+'px',
                        }" 
                v-for="(item, i) in  list">
                <!-- <vue-seamless-scroll
                    ref="scroll"
                    :data="item"
                    :class-option="defaultOption"
                    style="width:100%;height: 100%; overflow: hidden;"
                    > -->
             <div 
               class="data-box"
                :style="{   
                        height: '100%',
                        marginBottom: config.contain.marginBottom+'px',
                        }" >
                <div
                v-for="(it, i) in item"
                class="main-box"
                ref="eventDom"
                :style="{
                        width: config.contain.width+'px',
                        height: config.contain.height+'px',
                        marginRight: config.contain.marginRight+'px',
                        background: `linear-gradient(
                                180deg,
                                ${config.contain.backgroundColor[0]} 0%,
                                ${config.contain.backgroundColor[1]} 100%
                            ),
                            ${config.contain.backgroundColor[2]}`,
                    }"
                >
                <div class="main-box-top"
                :style="{
                    height: config.textTitle.height+'px',
                    fontSize: config.textTitle.fontSize+'px',
                    lineHeight: config.textTitle.lineHeight+'px',
                    fontWeight: config.textTitle.fontWeight,
                    fontStyle: config.textTitle.fontStyle,
                    textAlign: config.textTitle.textAlign,
                    fontFamily: config.textTitle.fontFamily,
                    color:config.textTitle.color,
                    background: `linear-gradient(
                                180deg,
                                ${config.textTitle.backgroundColor[0]} 0%,
                                ${config.textTitle.backgroundColor[1]} 100%
                            )`,
                  borderColor:config.textTitle.borderColor
                }"
                >
                  {{ it.name }}
                </div>
                <div class="main-box-bottom"
                :style="{
                    height: `calc(100% - (${config.textTitle.height}px)`,
                    borderColor:config.contain.borderColor
                }">
                  <div class="main-box-bottom-info1"
                  v-show="config.txtRowOne.show"
                  :style="{
                    fontSize: config.txtRowOne.fontSize+'px',
                    lineHeight: config.txtRowOne.lineHeight+'px',
                    fontWeight: config.txtRowOne.fontWeight,
                    fontStyle: config.txtRowOne.fontStyle,
                    textAlign: config.txtRowOne.textAlign,
                    fontFamily: config.txtRowOne.fontFamily,
                    color:config.txtRowOne.color
                }"
                  >
                    <span>{{ it.value[0].name }}</span><span
                    :style="{
                         fontSize: config.txtRowOne.txtStyle.fontSize+'px',
                         color:config.txtRowOne.txtStyle.color
                     }">{{ config.txtRowOne.txt }}</span>
                  </div>
                  <div class="main-box-bottom-info2"
                  v-show="config.txtRowtwo.show"
                  :style="{
                    fontSize: config.txtRowtwo.fontSize+'px',
                    lineHeight: config.txtRowtwo.lineHeight+'px',
                    fontWeight: config.txtRowtwo.fontWeight,
                    fontStyle: config.txtRowtwo.fontStyle,
                    textAlign: config.txtRowtwo.textAlign,
                    fontFamily: config.txtRowtwo.fontFamily,
                    color:config.txtRowtwo.color
                }"
                >
                    <span
                    >{{ it.value[0].value }}</span><span
                     :style="{
                         fontSize: config.txtRowtwo.txtStyle.fontSize+'px',
                         color:config.txtRowtwo.txtStyle.color
                     }"
                    >{{config.txtRowtwo.txt}}</span>
                  </div>
                
                  <div class="main-box-bottom-info5"
                  v-show="config.line.show"
                  :style="{
                    height: config.line.height+'px',
                    width: config.line.width+'px',
                    marginTop: config.line.marginTop+'px',
                    marginBottom: config.line.marginBottom+'px',
                    background: `linear-gradient(
                        90deg,
                        ${config.line.backgroundColor[0]} 0%,
                        ${config.line.backgroundColor[1]} 53%,
                        ${config.line.backgroundColor[2]} 100%
                        )`
                }" />
                  <div class="main-box-bottom-info3"
                  v-show="config.txtRowthree.show"
                  :style="{
                    fontSize: config.txtRowthree.fontSize+'px',
                    lineHeight: config.txtRowthree.lineHeight+'px',
                    fontWeight: config.txtRowthree.fontWeight,
                    fontStyle: config.txtRowthree.fontStyle,
                    textAlign: config.txtRowthree.textAlign,
                    fontFamily: config.txtRowthree.fontFamily,
                    color:config.txtRowthree.color
                }">
                    <span>{{ it.value[1].name }}</span><span
                    :style="{
                         fontSize: config.txtRowthree.txtStyle.fontSize+'px',
                         color:config.txtRowthree.txtStyle.color
                     }">{{ config.txtRowthree.txt }}</span>
                  </div>
                  <div class="main-box-bottom-info4"
                  v-show="config.txtRowfour.show"
                  :style="{
                    fontSize: config.txtRowfour.fontSize+'px',
                    lineHeight: config.txtRowfour.lineHeight+'px',
                    fontWeight: config.txtRowfour.fontWeight,
                    fontStyle: config.txtRowfour.fontStyle,
                    textAlign: config.txtRowfour.textAlign,
                    fontFamily: config.txtRowfour.fontFamily,
                    color:config.txtRowfour.color
                }">
                    <span
                         >{{ it.value[1].value }}</span><span
                     :style="{
                         fontSize: config.txtRowfour.txtStyle.fontSize+'px',
                         color:config.txtRowfour.txtStyle.color
                     }"
                    >{{config.txtRowfour.txt}}</span>
                  </div>
                </div>
              </div>
             </div>
             <!-- </vue-seamless-scroll> -->
            </div>
    </div>
  </template>
  
  <script>
  import vueSeamlessScroll from 'vue-seamless-scroll';
  export default {
    name:'numberThree',
    components:{vueSeamlessScroll},
    props: {
      config: {
        type: Object,
       
      },
    },
    data() {
      return {
        active:0,
        list:[]
   
      };
    },
    computed: {
        defaultOption() {
            return {
                step: 0.4, // 数值越大速度滚动越快
                limitMoveNum: this.config.contain.scroll? 1:this.config.data.length, // 开始无缝滚动的数据量 this.dataList.length
                hoverStop: this.config.contain.scroll, // 是否开启鼠标悬停stop
                direction: 2, // 0向下 1向上 2向左 3向右
                openWatch: true, // 开启数据实时监控刷新dom
                singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
            };
            }
    },
    watch: {
    config: {
        handler(nVal, oVal) {
        if (nVal.data.length && nVal.contain.arrangeNum) {
          this.getArr(nVal.data, Number(nVal.contain.arrangeNum));
        }
        // if (this.config.contain.scroll&&this.list.length) {
            // this.$nextTick(()=>{
            //         for(let i=0;i< this.list.length;i++){
            //             this.$refs.scroll[i]._startMove();
            //         }  
            //     })
            // } else if (this.list.length) {
                // this.$nextTick(()=>{
                //     for(let i=0;i< this.list.length;i++){
                //         this.$refs.scroll[i]._stopMove();
                //         this.$refs.scroll[i].xPos = 0;
                //         this.$refs.scroll[i].yPos = 0;
                //     }  
                // })
         
          
            // }
      },
      deep: true,
      immediate: true
    },
  },

    mounted() {
       
    },
    methods: {
      getArr(arr, num) {
      let newArr = arr.map((item, index) => {
        return {
          ...item,
          rank: index + 1
        };
      }); // 因为splice会改变原数组，要深拷贝一下
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    },
}
   
  };
  </script>
  <style lang="scss" scoped>
 .num{
    color: #fff;
    overflow: hidden;
    pointer-events: all;
          .data-box {
            width: 100%;
            display: flex;
            // flex-wrap: wrap;
            align-content: space-around;
            justify-content: flex-start;
            // margin-bottom: 20px;
            // >div{
            //     height: 230px;
            //      width: 160px;
            //      margin-right: 20px;
            // }
          }
          .main-box {
            // background: linear-gradient(
            //     180deg,
            //     rgba(69, 162, 255, 0.15) 0%,
            //     rgba(135, 190, 255, 0.15) 100%
            //   ),
            //   #051d37;
            // border: 1px solid rgba(255, 231, 72, 0.3);
            // text-align: center;
            cursor: pointer;
            &-top {
            //   height: 40px;
            //   line-height: 40px;
            //   color: #90e7ff;
            //   background: linear-gradient(
            //     180deg,
            //     rgba(69, 162, 255, 0.15) 0%,
            //     rgba(135, 190, 255, 0.15) 100%
            //   );
            border-width: 1px;
            border-style: solid;
            padding: 0  3px;
            //   border: 1px solid rgba(69, 162, 255, 0.3);
            }
            &-bottom {
            //   height: calc(100% - 40px);
            border-width: 1px;
            border-style: solid;
            //   border: 1px solid rgba(69, 162, 255, 0.3);
              border-top: 0;
              padding: 10px 0;
            //   color: #fff;
              &-info1,
              &-info3 {
                // line-height: 21px;
                // font-size: 16px;
                padding: 0  3px;
              }
              &-info2,
              &-info4 {
                padding: 0  3px;
                // margin-top: 4px;
                // font-size: 30px;
                // line-height: 40px;
                // background: linear-gradient(180deg, rgba(255,255,255,1) , #bfe4ff 100%);
                // -webkit-background-clip: text;
                // -webkit-text-fill-color: transparent;
                // background-clip: text;
                // text-fill-color: transparent;
              }
              &-info5 {
                // margin: 10px 0;
                // width: 150px;
                // height: 1px;
                // background: linear-gradient(
                //   90deg,
                //   rgba(135, 190, 255, 0) 0%,
                //   #87beff 53%,
                //   rgba(135, 190, 255, 0) 100%
                // );
                // background: url("../../../../assets/img/xiaokunshan/livelihood/line1.png");
              }
            }
          }
          .active {
            background: linear-gradient(
                180deg,
                rgba(69, 162, 255, 0.4) 0%,
                rgba(135, 190, 255, 0.4) 100%
              ),
              #051d37;
            .main-box-top {
            //   background: linear-gradient(
            //     180deg,
            //     rgba(69, 162, 255, 0.15) 0%,
            //     rgba(135, 190, 255, 0.15) 100%
            //   );
            //   border: 1px solid rgba(69, 162, 255, 0.3);
            }
            .main-box-bottom {
            //   border: 1px solid rgba(69, 162, 255, 0.6);
              border-top: 0 !important;
            }
          }
        // }
    //   }
   
 }
  </style>
  