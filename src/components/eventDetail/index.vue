<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-09 10:58:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-24 15:14:59
-->
<template>
  <div
    class="eventDetail-wrapper"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      backgroundColor: config.box.backgroundColor,
    }"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="head"
      :style="{
        backgroundImage: 'url(' + config.box.headPic + ')',
      }"
    >
      <span :style="{
          fontSize: config.box.headFontSize + 'px',
        }">事件基本信息</span>
      <span
        class="close-icon"
        @click="config.isShowModule = false"
        :style="{
          width: config.box.closeIconWidth + 'px',
          height: config.box.closeIconHeight + 'px',
          backgroundImage: 'url(' + config.box.closePic + ')',
        }"
      ></span>
    </div>
    <div
      class="eventDetail-content"
      :style="scssStyle"
    >
      <div
        class="alarm-img"
        :style="{
          backgroundImage: 'url(' + config.box.emptyPic + ')',
        }"
      >
        <CanvasImg
          :id="eventDetail.rowid"
          ref="canvas"
          width="650"
          height="358"
          :link="eventDetail.alarm_img"
          :info="eventDetail.alam_drawbox"
          :area_new="area_new"
          :is-can-draw="false"
          :is-show-drag="showArea"
        />
        <span
          class="showArea"
          @click="showArea = !showArea"
        >{{showArea? '隐藏': '显示'}}区域</span>
      </div>
      <div
        class="alarm-info"
        :style="{
          fontSize: config.showField.fontSize + 'px',
        }"
      >
        <div>
          <span class="alarm-info-key">事件名称：</span><span class="alarm-info-value">{{eventDetail.event_name}}</span>
        </div>
        <div>
          <span class="alarm-info-key">事件状态：</span><span class="alarm-info-value"></span>
        </div>
        <div>
          <span class="alarm-info-key">发生时间：</span><span class="alarm-info-value">{{eventDetail.alarm_time}}</span>
        </div>
        <div>
          <span class="alarm-info-key">发生地址：</span><span class="alarm-info-value">{{eventDetail.alarm_address}}</span>
        </div>
      </div>
      <div class="buttons">
        <span
          v-for="(item, index) in config.buttons"
          :key="index"
        >
          <span
            v-if="item.effect === '作废'"
            style="border: 1px solid #0cb8f2; color: #0cb8f2"
            @click="cancel"
          >{{ item.title }}</span>
          <span
            v-if="item.effect !== '作废'"
            style="background: #0cb8f2; color: #081b22"
          >{{ item.title }}</span>
        </span>
      </div>
    </div>
    <!-- <div class="eventDetail-modal">
      <div class="modal-head">
        提示
        <span
          class="close-icon"
          :style="{
          width: config.box.closeIconWidth + 'px',
          height: config.box.closeIconHeight + 'px',
          backgroundImage: 'url('+ config.box.closePic+')'
          @click=""
      }"
        ></span>
      </div>
      <div class="modal-content">
        <div class="modal-info">请选择移交单位</div>
        <div class="modal-buttons">
          <span>移交城运</span>
          <span>移交区局</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import CanvasImg from './CanvasImg.vue';
import { getRowDetail } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  components: {
    CanvasImg
  },
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      id: '',
      showArea: true,
      eventDetail: {
        // alam_drawbox: [
        //   {
        //     w: 0.015104166666666667,
        //     h: 0.053703703703703705,
        //     x: 0.3072916666666667,
        //     y: 0.49907407407407406,
        //     text: '越界',
        //     confident: '0.85',
        //     attr: []
        //   }
        // ],
        // alarm_address: '',
        // alarm_grade: '紧急',
        // alarm_img_url:
        //   'http://skyinfor.yikuaida.cn/file/mdpic/doc/20231011/d419f991d5944ffe9ada8ef808f01bc3.jpg',
        // alarm_time: '2023-10-11 11:55:06',
        // alarm_type: '人员越界',
        // camera_name: '顶楼鹰眼',
        // event_name: '[人员越界] 顶楼鹰眼 20231011-00007',
        // position: '121.246544,31.057797',
        // rowid: '366b41a4-aa82-4134-b201-d97bb3f7afc1'
      },
      area_new: {
        area_n: [],
        area_y: [],
        max_box: '',
        min_box: ''
      }
    };
  },
  computed: {
    scssStyle() {
      return {
        '--firstColor': this.config.showField.first,
        '--secondColor': this.config.showField.second
      };
    }
  },
  mounted() {
    // this.updateComponentData('99e5fd8e-37cc-45b1-ae6d-7af06375b495');
  },
  methods: {
    cancel() {
      this.isShowModal = true;
    },
    async updateComponentData({ rowid }) {
      this.id = rowid;
      this.config.isShowModule = true;
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'AI_alarm',
        rowId: rowid
      };
      const result = await getRowDetail(data);
      this.eventDetail = result.data;
      // this.eventDetail.alam_drawbox = data.alam_drawbox
      //   ? JSON.parse(data.alam_drawbox)
      //   : [];
      // this.eventDetail.alarm_img_url =
      //   'http://skyinfor.yikuaida.cn/file/mdpic/doc/20231011/d419f991d5944ffe9ada8ef808f01bc3.jpg';
    }
  }
};
</script>

<style lang="scss" scoped>
.eventDetail-wrapper {
  position: relative;
  pointer-events: all;
  .head {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    padding-left: 20px;
    font-size: 20px;
    font-family: Alibaba PuHuiTi 2;
    font-weight: normal;
    color: #fff;
  }
  .close-icon {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-size: 100% 100%;
    cursor: pointer;
  }
  .eventDetail-content {
    padding: 10px;
    width: 100%;
    height: calc(100% - 48px);

    .alarm-img {
      width: 100%;
      height: 358px;
      background-size: 100% 100%;
      position: relative;

      .showArea {
        display: inline-block;
        width: 84px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border: 1px solid #0cdff2;
        background: rgba(8, 27, 34, 0.8);
        color: #0cdff2;
        position: absolute;
        bottom: 10px;
        right: 10px;
        cursor: pointer;
      }
    }

    .alarm-info {
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;
      margin-top: 10px;

      > div {
        line-height: 32px;

        .alarm-info-key {
          color: var(--firstColor);
        }

        .alarm-info-value {
          color: var(--secondColor);
        }
      }
    }

    .buttons {
      height: 38px;
      margin-top: 30px;
      display: flex;
      justify-content: space-evenly;

      span {
        width: 90px;
        height: 38px;

        > span {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 38px;
          text-align: center;
          font-size: 16px;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }
  // .eventDetail-modal {
  //   width: 350px;
  //   height: 232px;
  //   background: #04151b;
  //   border: 1px solid rgba(12, 184, 242, 0.3);
  //   box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5),
  //     inset 0px 4px 50px 0px rgba(12, 184, 242, 0.1);
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   color: #fff;

  //   .modal-head {
  //     width: 100%;
  //     height: 40px;
  //     background: rgba(12, 184, 242, 0.15);
  //     line-height: 40px;
  //     text-align: center;
  //     position: relative;
  //   }

  //   .modal-info {
  //     font-size: 18px;
  //     text-align: center;
  //     margin: 50px 0;
  //   }

  //   .modal-buttons {
  //     display: flex;
  //     justify-content: space-evenly;

  //     span:nth-child(1) {
  //       width: 100px;
  //       height: 38px;
  //       line-height: 38px;
  //       text-align: center;
  //       border-radius: 2px;
  //       border: 1px solid #0cb8f2;
  //       color: #0cb8f2;
  //     }

  //     span:nth-child(2) {
  //       width: 100px;
  //       height: 38px;
  //       line-height: 38px;
  //       text-align: center;
  //       border-radius: 2px;
  //       background: #0cb8f2;
  //       color: #081b22;
  //     }
  //   }
  // }
}
</style>