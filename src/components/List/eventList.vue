<template>
  <div
    class="eventList"
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  >
    <div class="alarm-list">
      <Scroll
        ref="scroll"
        type="manage"
        :list="config.data"
        :height="100"
        :isScroll="config.box.isScroll"
      >
        <div
          class="rows rows-alarm"
          :style="{
            width: config.width + 'px',
            height: config.box.height + 'px',
          }"
          v-for="(item, index) in config.data"
          :key="index"
          :data-v="item.rowid"
          ref="eventDom"
          @click="clickItem(item)"
        >
          <div
            class="rows-left"
            :style="{
              width: config.alarmImg.width + 'px',
              height: config.alarmImg.height + 'px',
              minWidth: config.alarmImg.width + 'px',
            }"
          >
            <img
              :class="config.alarmImg.auto ? 'imgauto' : 'img'"
              :style="{ maxWidth: config.alarmImg.width + 'px' ,
                       maxHeight: config.alarmImg.height + 'px'}"
              :src="item.alarm_img"
              :onerror="defaultImg"
              alt=""
            />
            <!-- <canvasImg :link="item.alarm_img_url" :width="120" :height="68" :info="item.drawbox" :area="[]" /> -->
          </div>
          <div
            class="rows-right"
            :style="{
              width: `calc(100% - (${config.alarmImg.width}px)`,
            }"
          >
            <div
              class="line-name"
              :style="{
                marginBottom: config.textName.marginBottom + 'px',
                marginTop: config.textName.marginTop + 'px',
              }"
            >
              <span
                v-show="config.textName.show"
                :style="[
                  {
                    color:config.textName.color,
                    fontWeight:config.textName.fontWeight,
                    fontStyle:config.textName.fontStyle,
                    textAlign:config.textName.textAlign,
                    fontFamily:config.textName.fontFamily,
                    lineHeight: config.textName.lineHeight + 'px',
                    fontSize: config.textName.fontSize + 'px',
                    width: `calc(100% - (${config.textTag.minWidth}px)`,
                  },
                ]"
                :title="item.event_name"
                >{{ item.event_name }}</span
              >
              <span
                v-show="config.textTag.show"
                :style="[
                  config.textTag,
                  getColor(item.alarm_source, '事件来源'),
                  {
                    fontSize: config.textTag.fontSize + 'px',
                    marginRight: config.textTag.marginRight + 'px',
                    minWidth: config.textTag.minWidth + 'px',
                    height: config.textTag.height + 'px',
                    lineHeight: config.textTag.lineheight + 'px',
                  },
                ]"
              >
                {{ item.alarm_source }}</span
              >
            </div>
            <div
              v-show="config.textTime.show"
              class="line-date ellipsis"
              :title="item.alarm_time"
              :style="[
                config.textTime,
                {
                  lineHeight: config.textTime.lineHeight + 'px',
                  fontSize: config.textTime.fontSize + 'px',
                  width: config.textTime.width + 'px',
                  height: config.textTime.height + 'px',
                  marginBottom: config.textTime.marginBottom + 'px',
                  marginTop: config.textTime.marginTop + 'px',
                },
              ]"
            >
              {{ item.alarm_time }}
            </div>
            <div class="line-address"
               :style="{
                  marginTop: config.textAddress.marginTop + 'px',
                }">
              <span
                v-show="config.textAddress.show"
                :title="item.address"
                :style="[
                  { 
                    fontWeight:config.textAddress.fontWeight,
                    fontStyle:config.textAddress.fontStyle,
                    textAlign:config.textAddress.textAlign,
                    fontFamily:config.textAddress.fontFamily,
                    color: config.textAddress.color,
                    fontSize: config.textAddress.fontSize + 'px',
                    width: `calc(100% - (${config.textStatus.minWidth}px)`,
                  
                  },
                ]"
                >{{ item.address || "未知" }}</span
              >
              <span
                class="status"
                v-show="config.textStatus.show"
                :style="[
                  config.textStatus,
                  {
                    color: getColor(item.alarm_status, '事件状态'),
                    fontSize: config.textStatus.fontSize + 'px',
                    minWidth: config.textStatus.minWidth + 'px',
                    marginRight: config.textStatus.marginRight + 'px',
                  },
                ]"
              >
                <i
                  :style="{
                    backgroundColor: getColor(item.alarm_status, '事件状态'),
                  }"
                />
                {{ item.alarm_status }}</span
              >
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/scroll.vue";
export default {
  name: "eventList",
  components: { Scroll },
  props: {
    config: {
      type: Object,
    },
    callBack: {
      type: Function,
    },
  },
  data() {
    return {
      isShow: true,
      defaultImg: 'this.src="' + require("@/assets/image/default.png") + '"',
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {
        // if(nVal.data.length){
        //   nVal.data.forEach((item,i) =>{
        //    item.statusColor= this.getColor(item.alarm_status)
        //   })
        // }
      },
      deep: true,
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    clickItem(item) {
      this.callBack && this.callBack(item)
    },
    getColor(label, type) {
      if (type == "事件状态") {
        let styleData = this.config.statusColor;
        let color;
        if (styleData.length > 0) {
          styleData.forEach((v) => {
            if (v.label === label) {
              color = v.color;
            } else {
              color = this.config.textStatus.color;
            }
          });
        } else {
          color = this.config.textStatus.color;
        }
        return color;
      } else {
        let styleData = this.config.tagColor;
        let color;
        let backgroundColor;
        if (styleData.length > 0) {
          styleData.forEach((v) => {
            if (v.label === label) {
              color = v.color;
              backgroundColor = v.backgroundColor;
            } else {
              color = this.config.textTag.color;
              backgroundColor = this.config.textTag.background;
            }
          });
        } else {
          color = this.config.textTag.color;
          backgroundColor = this.config.textTag.background;
        }

        return { color, backgroundColor };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.eventList {
  // padding: 10px;
  overflow: hidden;
  pointer-events: all;
}
.alarm-list {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .rows {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;

    .rows-left {
      // width: 120px;
      // height: 90%;
      align-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .imgauto {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
      .img {
        width: 100%;
        height: 100%;
      }
    }

    .rows-right {
      // color: #FFFFFF;
      box-sizing: border-box;
      padding-left: 10px;
      height: 100%;
      .line-name,
      .line-address {
        display: flex;
        justify-content: space-between;
        width: 100%;
        > span:nth-child(1) {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        > span:nth-child(2) {
          // padding: 0px 6px;
          border-radius: 2px;
          color: #fff;
          // min-width: 60px;
          // height: 20px;
          // line-height: 20px;
          // margin-top: 10px;
        }
        .status {
          display: flex;
          align-items: center;
          i {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            display: block;
            margin-right: 3px;
          }
        }
      }

      // .line-date {
      //     font-size: 14px;
      //     margin-top: 5px;
      // }

      // .line-address {
      //   box-sizing: border-box;
      //   // font-size: 16px;
      //   // padding-left: 20px;
      //   // color: #ACCEFF;
      //   // width: 280px;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   // background: url('../../assets/image/pos.png') no-repeat;
      //   background-position-y: 5px;
      // }
    }

    .rows-tag {
      position: absolute;
      // right: 0px;
      // top: 10px;
      // // font-size: 12px;
      // padding: 2px 6px;
      // border-radius: 2px;
      // color: #67DDFE;
      // background: rgba(103, 221, 254, 0.15);
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
