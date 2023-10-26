
<template>
    <div class="camera-box"
    v-show="isShowModuleFunc(config)"
    :style="{
    width: config.width+'px',
    height: config.height+'px',
    color:'#ffff'
  }">
     <div class="main">
            <div
              v-if="list && list.length"
              class="main-contant"
            >
              <el-carousel height="100%" width="100%" :interval="isNaN(video.time*1000) ?10000:(video.time*1000)"
              :arrow="config.video.scroll?'always':'never'"
              :autoplay="config.video.scroll?true:false"
              :indicator-position="config.video.scroll?'':'none'">
                <el-carousel-item
                  v-for="(item, i) in list"
                  :key="i"
                >
                  <div class="camera-outer"
                   :style="{justifyContent:item.length>1?'space-between':'center'}">
                    <div v-for="it in item" class="camera"
                    :style="{
                      width: video.width+'px',
                      height: video.height+'px'
                    }">
                      <cameraPlay :camera_data="it" 
                       :config='config'
                       :svs_url='config.svs_url'
                       :address="config.address"/>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
       
    </div>
  </template>
  
  <script>
  import cameraPlay from './components/cameraPlay.vue';
  import { loadCustomApiData } from "@/utils/api";
  export default {
    name:'importCamera',
    components:{cameraPlay},
    props: {
      config: {
        type: Object,
      },
    },
    data() {
      return {
        list: []
      };
    },
    watch: {
    config: {
      handler(nVal, oVal) {
        if (nVal.data.length && nVal.video.dataNumber) {
          this.getArr(nVal.data, Number(nVal.video.dataNumber));
        }
      },
      deep: true,
      immediate: true
    },
  },
  //   watch: {
  //   "config.data": {
  //     handler() {
  //       console.log(this.config.data, "====config.data");
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
    computed: {
     video(){
      let obj={...this.config.video}
      return obj
     }
      
    },
    created() {
    
    },
    mounted() {
      //  this.getImportCamera()
    },
    methods: {
      getArr(arr, num) {
      // console.log(arr, '数组数据===================');
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
    async getImportCamera() {
      const api = this.config.api;
      const { data } = await loadCustomApiData({
        api,
        type: this.config.requestType,
  
      });
      let d = [...data.list];
      this.config.data = d;
    },
    },
  
  };
  </script>
  <style lang="scss" scoped>
  .el-carousel {
    width: 100%;
    height: 100%;
  }
      .main {
          height: 100%;
          &-contant {
            width: 100%;
            // margin-right: 10px;
            height: 100%;
            display: flex;
            justify-content: space-between;
       
            flex-wrap: wrap;
            .camera-outer {
              align-items: center;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-between;
              align-content: space-around;
              flex-wrap: wrap;
              .camera {
                // width: 420px;
                // height: 220px;

                // background: url('../../assets/component/img/cameraUnline.png') no-repeat;
                // background-size:100% 100%;
              }
            }
          }
        }
  </style>
  