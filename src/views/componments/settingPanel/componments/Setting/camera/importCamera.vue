<template>
    <el-scrollbar class="right-setting scrollbar-wrapper">
        
     <el-form
        label-width="110px"
        size="small"
        class="border-box"
        style="padding: 8px 16px"
      >
    
      <el-form-item label="名称：">
          <div
          class="componentName"
          style="display:flex;align-items:center"
        >
          <el-input
           v-model="config.name"
           @change="(val) => $emit('changeSize', 'name', val)"
            size="mini"
            placeholder=""
          ></el-input>
          <span
            :class="config.isLock? 'active': ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow? 'active': ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
        </el-form-item>
        <el-form-item label="组件宽度：">
          <el-input
            v-model="config.width"
            size="mini"
            @change="(val) => $emit('changeSize', 'width', val)"
            placeholder="请输入组件宽度"
          ></el-input>
        </el-form-item>
        <el-form-item label="组件高度：">
          <el-input
            v-model="config.height"
            size="mini"
            @change="(val) => $emit('changeSize', 'height', val)"
            placeholder="请输入组件高度"
          ></el-input>
        </el-form-item>
        <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="默认展示隐藏：" label-width="110px">
        <el-switch 
        style="margin-top: 7px;"
        v-model="config.isShowModule"
        @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="视频播放地址：">
          <el-input
          @change="(val) => $emit('changeSize', 'address', val)"
            v-model="config.address"
            size="mini"
            placeholder="视频播放地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="获取视频流地址："  label-width="130px"> 
          <el-input
          @change="(val) => $emit('changeSize', 'svs_url', val)"
            v-model="config.svs_url"
            size="mini"
            placeholder="视频流地址"
          ></el-input>
        </el-form-item>
        <el-collapse>
          <el-collapse-item title="视频" name="title">
            
          <div>
            <el-form-item
            label="是否滚动："
          >
            <el-switch v-model="config.video.scroll"></el-switch>
          </el-form-item>
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.video.width"
                  size="mini"
                  style="margin: 0 8px 0 12px"
                ></el-input
                >px
              </div>
            </el-form-item>

            <el-form-item label="高度："   >
              <div class="flex align-center">
                <el-input
                  v-model="config.video.height"
                  size="mini"
                  style="margin: 0 8px 0 12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="默认展示数量：">
          <div
            class="flex"
            style="color: #fff;margin-left:10px"
          >
            <el-input-number
            v-model="config.video.dataNumber"
              :min="1"
              :max="config.data.length"
              :step="1" step-strictly
              label=""
            ></el-input-number>
            <div style="margin-left: 10px">个</div>
          </div>

        </el-form-item>
            <!-- <el-form-item label="数量："   >
              <div class="flex align-center">
                <el-input
                  v-model="config.video.dataNumber"
                  size="mini"
                  style="margin: 0 8px 0 12px"
                ></el-input
                >
              </div>
            </el-form-item> -->
            
            <el-form-item label="间隔时间："   >
              <div class="flex align-center"    style="margin-left:10px">
                <el-input-number
                  v-model="config.video.time"
                    :min="1"
                    :step="0.1" step-strictly
                    label=""
                  ></el-input-number>
                  <div style="margin-left: 10px">秒</div>
                <!-- <el-input
                  v-model="config.video.time"
                  size="mini"
                  style="margin: 0 8px 0 12px"
                ></el-input
                > -->
              </div>
            </el-form-item>
         </div>
          </el-collapse-item>
      
        </el-collapse> 

  
      </el-form>
    </el-scrollbar>
  </template>
    
  <script>
  import commonTab from "../componments/commonTab";
  export default {
    name: "setting",
    components: { commonTab },
    data() {
      return {
        directionOption: [
          {
            label: "纵向",
            value: "vertical",
          },
          {
            label: "横向",
            value: "horizontal",
          },
        ],
        iconOption: [
          {
            label: "圆形",
            icon: "circle",
          },
          {
            label: "矩形",
            icon: "rect",
          },
          {
            label: "圆矩形",
            icon: "roundRect",
          },
          {
            label: "三角形",
            icon: "triangle",
          },
          {
            label: "菱形",
            icon: "diamond",
          },
          {
            label: "椭圆形",
            icon: "pin",
          },
        ],
        orientOption: [
          {
            label: "水平",
            value: "horizontal",
          },
          {
            label: "垂直",
            value: "vertical",
          },
        ],
        positionOption: [
          {
            label: "内部",
            value: "inside",
          },
          {
            label: "外部",
            value: "outside",
          },
        ],
        fontList: ["Microsoft YaHei"],
        imgList:[ require("@/assets/component/img/titlebg1.png"),
        require("@/assets/component/img/titlebg2.png")]
      };
    },
    props: {
      config: {
        type: Object,
        default: () => {
          return {};
        },
      },
      changeSize: {
        type: Function,
      },
    },
    methods: {
      changeBar(data) {
        this.currectBar = data.key;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
  };
  </script>
    
    <style lang="scss" scoped>
  .right-setting {
    .el-form-item__label {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      letter-spacing: 0em;
      color: #ffffff;
    }
  
    .el-input__inner {
      background-color: #191a1a;
      color: #ffffff;
      border: none;
    }
  
    .el-collapse {
      border: none;
  
      .el-collapse-item__header {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
  
      .el-collapse-item__content {
        padding-bottom: 0;
      }
  
      .el-collapse-item__wrap {
        background: #1c1c1f;
        border: none;
        padding: 10px;
        box-sizing: border-box;
  
        .el-input__inner {
          background-color: #25262a;
          color: #ffffff;
          border: none;
        }
      }
    }
  }
  </style>
    