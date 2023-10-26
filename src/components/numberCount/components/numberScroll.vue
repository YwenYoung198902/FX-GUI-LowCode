<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-06-06 14:43:50
 * @LastEditors: ydl
 * @LastEditTime: 2023-03-21 18:08:35
-->
<template>
    <div class="num-box">
      <div class="box-item">
        <div
          v-for="(item, index) in sum"
          :key="index"
          :class="['number-item', 'number-item-bg', `number-item-${project}`]"
          :style="numberStyle"
          >
        
        <!-- v-if="!isNaN(item)" -->
          <span >
            <i :id="`${id || 'numberItem'}${index}`" ref="1111" :style="{top:numberStyle.topnumber+'px'}">0123456789.</i>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {},
    props: {
      total: {
        type: Number,
        default: 0,
      },
      num: {
        type: Number,
        default: 0,
      },
      id: {
        type: String,
        default: "",
      },
      project: {
        type: String,
        default: "",
      },
      numberStyle:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        sum: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
      };
    },
    computed: {},
    watch: {
      total(newVal, oldVal) {
        this.$nextTick(() => {
          const num = this.num === 0 ? this.total.toString().length : this.num;
          this.toOrderNum(newVal, num);
          this.setNumberTransform();
        });
      },
      num(newVal, oldVal) {
        this.$nextTick(() => {
          this.toOrderNum(this.total, newVal);
          this.setNumberTransform();
        });
      },
    },
    created() {},
    mounted() {
  
      const num = this.num === 0 ? this.total.toString().length : this.num;
      this.toOrderNum(this.total, num);
      this.setNumberTransform();
      // setInterval(()=>{

      //   this.toOrderNum(0, num);
      //   this.setNumberTransform();
      //   setTimeout(()=>{
      //     this.toOrderNum(this.total, num);
      //     this.setNumberTransform();
      //   },1000)
      // },5000)
    },
    methods: {
      // 处理事件总数 使其展示8位
      toOrderNum(num, length) {
        num = num.toString();
        if (num.length < length) {
          num = "0" + num; // 如未满八位数，添加"0"补位
          this.toOrderNum(num, length); // 递归添加"0"补位
        } else if (num.length === length) {
          // 订单数中加入逗号
          this.sum = num.split(""); // 将其便变成数据，渲染至滚动数组
        } else {
          // 订单总量数字超过八位显示异常
          // this.$alert({ content: '事件数字过大，显示异常' });
        }
      },
      // 设置文字滚动
      setNumberTransform() {
        this.$nextTick(() => {
          // 结合CSS 对数字字符进行滚动
          for (let index = 0; index < this.num; index++) {
            const el = document.getElementById((this.id || "numberItem") + index);
            if(this.sum[index]=='.'){
              el.style.transform = `translateY(-89.5%)`;
            }else{
              el.style.transform = `translateY(-${(this.sum[index]) * (9.1)}%)`;
            }
           
          }
        });
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .num-box {
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    margin: 0 10px;
    .txt {
      font-size: 16px;
      color: #fff;
    }
  }
  
  .num-box {
    .box-item {
      position: relative;
      font-size: 36px;
      line-height: 36px;
      text-align: center;
      list-style: none;
      writing-mode: vertical-lr;
      text-orientation: upright;
      /*文字禁止编辑*/
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      -khtml-user-select: none; /*早期浏览器*/
      user-select: none;
    }
    /*滚动数字设置*/
    .number-item-bg {
      // width: 28px;
      // height: 38px;
      // background: url("../../../assets/component/img/scroll-bg.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-family: "Din";
      & > span {
        & > i {
          width: 100%;
          top: 2px;
          left: 3px;
        }
      }
    }
    .number-item-agriculture {
    //   background-image: url("../assets/img/xiaokunshan/agriculture/bg3.png");
      height: 45px;
    }
    .number-item {
      list-style: none;
      margin-right: 10px;
      border-radius: 4px;
      & > span {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
        writing-mode: vertical-rl;
        text-orientation: upright;
        overflow: hidden;
        & > i {
          // font-style: normal;
          position: absolute;
          // transform: translate(-50%, 0);
          transition: transform 1s ease-in-out;
          letter-spacing: 10px;
        }
      }
    }
    .number-item:last-child {
      margin-right: 0;
    }
  }
  
  .community-population .number-item-bg {
    width: 56px;
    height: 78px;
    font-size: 60px;
  
    i {
      left: -17%;
    }
  }
  
  .event-total {
    width: 28px;
    height: 38px;
  
    .num-box .number-item-bg > span > i {
      top: -2px;
    }
  }
  </style>