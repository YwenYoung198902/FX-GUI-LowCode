<template>
  <div class="sheshanCockpit-rightBox" :style="sassStyle">
    <div v-if="!isShowPlayback" class="close" @click="close" />
    <div class="monitor">
      <!-- 
        :class="isMonitorFullScreen ? 'isFull' : ''" -->
      <div v-show="!isShowPlayback" class="content-box">
        <span class="back-icon" @click="closeFullScreen" />
        <div
          v-for="(item, index) in monitorArr"
          :key="index"
          class="monitor-wrapper"
          :class="[
            'monitorList' + activeBtn,
            !item.movieurls && !item.master_movieurls ? 'empty' : '',
            activeMonitorIndex === index ? 'active' : '',
            fullScreenIndex === index ? 'isFullScreen' : '',
          ]"
          @click="selectMonitor(index, item)"
        >
          <CameraPlay
            v-if="item.movieurls || item.master_movieurls"
            :camera_data="item"
            :config="config"
            :address="config.camera.videoAddress"
          />
          <div v-if="item.device_name" class="device-name">
            {{ item.device_name }}
          </div>
          <div class="btns" v-show="activeMonitorIndex === index && item.uuid">
            <!-- <div class="btns2" @click="delMovie(item)">
              <i class="el-icon-close">
            </div> -->
            <div
              class="playback"
              v-show="item.uuid"
              @click.stop="playback(index)"
            >
              <svgicon
                name="playback"
                width="25"
                height="25"
                :color="`${color}`"
              ></svgicon>
            </div>
            <div
              v-show="item.uuid && activeBtn !== 1"
              class="fullsrceen"
              :class="item.isFullScreen ? 'full' : ''"
              @click.stop="toFullScreen(index, item)"
            >
              <svgicon
                name="full"
                width="25"
                height="25"
                :color="`${color}`"
              ></svgicon>
            </div>
          </div>
          <!-- <span class="add-icon" @click="toggle()" /> -->
          <span class="add-icon" />
        </div>
      </div>
      <div v-if="isShowPlayback" class="content1">
        <Playback
          v-if="isShowPlayback"
          :camera_data="checkCamera[this.playbackIndex]"
          :address="config.camera.playAddress"
          :config="config"
        />
      </div>
    </div>
    <div class="pagination-box" v-if="total > 9 && !isShowPlayback">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="9"
        layout="prev, pager, next, total, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="bottom-box" v-show="!isShowPlayback">
      <div class="buttons">
        <div
          class="btn"
          :class="activeBtn === 1 ? 'active' : ''"
          @click="(activeBtn = 1), toggleActiveBtn(1)"
        >
          单屏
        </div>
        <div
          class="btn"
          :class="activeBtn === 4 ? 'active' : ''"
          @click="(activeBtn = 4), toggleActiveBtn(4)"
        >
          四屏
        </div>
        <div
          class="btn"
          :class="activeBtn === 9 ? 'active' : ''"
          @click="(activeBtn = 9), toggleActiveBtn(9)"
        >
          九屏
        </div>
      </div>
      <div class="exit-button">
        <svgicon
          name="exit"
          width="20"
          height="20"
          :color="`${color}`"
        ></svgicon>
        <span class="txt" @click.stop="$emit('closeSplit')">退出多屏</span>
      </div>
    </div>
    <!-- <div class="buttom"></div> -->
  </div>
</template>

<script>
import CameraPlay from "./cameraPlay";
import Playback from "./playback.vue";
import { rgbaToHex, setStyleObj } from "../../../utils/index.js";
export default {
  props: {
    // checkedData: {
    //   type: Array,
    // },
    config: {
      type: Object,
    },
  },
  components: {
    CameraPlay,
    Playback,
  },
  data() {
    return {
      activeBtn: 1, // 单屏/四屏/九屏
      activeMonitorIndex: 0, // 当前高亮的摄像头
      dialogVisible: false,
      activeShowType: 0, // 0 摄像头列表 1 摄像头图片
      tableList: [], // 全部摄像头列表
      fullScreenIndex: null,
      isShowPlayback: false,
      param: null,
      monitorArr: [{}], // 播放的摄像头数组
      select_type: "",
      camera_type_list: [],
      srcList: [],
      checkCamera: [],
      currentPage: 1,
      total: 0,
      color: "",
    };
  },
  computed: {
    sassStyle() {
      let color = this.config.box.mainColor.slice(
        0,
        this.config.box.mainColor.lastIndexOf(",")
      );
      let acolor = this.config.box.selectBackground.slice(
        0,
        this.config.box.selectBackground.lastIndexOf(",")
      );
      let s = this.config.splitVideo;
      let p = setStyleObj({ padding: this.config.splitVideo.padding });
      return {
        ...p,
        width: this.config.splitVideo.width + "px",
        height: this.config.splitVideo.height + "px",
        background: this.config.box.background,
        "--color": this.config.box.color,
        "--fs1": this.config.box.fontSize + "px",
        "--fs2": this.config.box.fontSize * 1 + 2 + "px",
        "--fs3": this.config.box.fontSize * 1 - 2 + "px",
        "--rgbaColor1": color + ",1)",
        "--rgbaColor2": color + ",0.2)",
        "--rgbaColor3": color + ",0.5)",
        "--rgbaColor4": color + ",0.1)",
        "--argbaColor1": acolor + ",1)",
        "--argbaColor2": acolor + ",0.8)",
        "--selectBackground": this.config.box.selectBackground,
        "--anbjt": `url(${s.anbjt}) no-repeat`,
        "--anxzbj": `url(${s.anxzbj}) no-repeat`,
        "--whmtp": `url(${s.whmtp}) no-repeat`,
        "--wxzsxtmrtp": `url(${s.wxzsxtmrtp}) no-repeat`,
        "--defaultBg": s.background,
        "--bottom": s.bottom + "px",
      };
    },
  },
  watch: {
    "config.box.mainColor"(nVal, oVal) {
      this.color = rgbaToHex(nVal);
    },
    // checkedData(newVal, oldVal) {
    //   this.setMonitorArr(newVal);
    // },
  },
  mounted() {
    this.color = rgbaToHex(this.config.box.mainColor);
    // this.param = this.$route.query;
    // if (!this.param.UserAccountId) {
    //   this.$message.error("缺少参数！");
    // }
    this.init();
  },
  methods: {
    init() {
      // this.setMonitorArr(this.checkedData);
    },
    delMovie(data) {
      this.$emit("delCheckedCamera", data);
    },
    setMonitorArr(newVal) {
      this.checkCamera = newVal;
      this.total = newVal.length;
      let data = [...newVal];
      // 当已选择的摄像头数量变化, 右侧监控画面数量发生改变
      this.monitorArr = [];
      if (newVal.length <= 1) {
        this.activeBtn = 1;
      } else if (newVal.length > 1 && newVal.length <= 4) {
        this.activeBtn = 4;
      } else if (newVal.length > 4) {
        this.activeBtn = 9;
        data = data.slice(0, 9);
      }
      for (let i = 0; i < this.activeBtn; i++) {
        this.monitorArr.push({});
      }
      data.forEach((item, index) => {
        this.monitorArr[index] = data[index];
      });
      this.handleCurrentChange(this.currentPage);
    },
    handleCurrentChange(value) {
      const start = 9 * (value - 1);
      const end = 9 * value;
      const data = [...this.checkCamera].slice(start, end);
      if (data.length <= 1) {
        this.activeBtn = 1;
      } else if (data.length > 1 && data.length <= 4) {
        this.activeBtn = 4;
      } else if (data.length > 4) {
        this.activeBtn = 9;
      }
      this.monitorArr = [];
      for (let i = 0; i < this.activeBtn; i++) {
        this.monitorArr.push({});
      }
      data.forEach((item, index) => {
        this.monitorArr[index] = data[index];
      });
    },
    toggleActiveBtn(newVal) {
      this.checkCamera = [];
      this.total = 0;
      this.$emit("changeCkeckedCamera");
      // 根据7461bug修改: 实时监控画面，切换屏数建议初始化，不播放监控
      this.monitorArr = [];
      if (newVal.length <= 1) {
        this.activeBtn = 1;
      } else if (newVal.length > 1 && newVal.length <= 4) {
        this.activeBtn = 4;
      } else if (newVal.length > 4 && newVal.length <= 9) {
        this.activeBtn = 9;
      }
      for (let i = 0; i < this.activeBtn; i++) {
        this.monitorArr.push({});
      }
    },
    // 点击单个摄像头全屏
    toFullScreen(index, item) {
      this.$set(item, "isFullScreen", !item.isFullScreen);
      // if (this.activeBtn === 1) {
      //   this.$store.commit("setMonitorFullScreen");
      //   return;
      // }
      if (index === this.fullScreenIndex) {
        this.fullScreenIndex = null;
      } else {
        this.fullScreenIndex = index;
      }
    },
    selectMonitor(index, item) {
      this.activeMonitorIndex = index;
    },
    showFullScreen() {
      if (this.activeBtn === 1) {
        this.$set(
          this.monitorArr[0],
          "isFullScreen",
          !this.monitorArr[0].isFullScreen
        );
      }
      // this.$store.commit("setMonitorFullScreen");
    },
    closeFullScreen() {
      // this.$store.commit("setMonitorFullScreen");
      this.monitorArr.forEach((item) => {
        item.isFullScreen = false;
      });
    },
    toggle() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    playback(index) {
      this.playbackIndex = index;
      this.isShowPlayback = true;
    },
    close() {
      this.$emit("closeSplit");
      this.$store.commit("changeCheckedArr", [{}]);
    },
  },
};
</script>

<style lang="scss">
.sheshanCockpit-rightBox {
  border: 2px solid var(--rgbaColor1);
  box-shadow: 0px 0px 14px 0px var(--rgbaColor2),
    inset 0px 0px 50px 0px var(--rgbaColor3);
  pointer-events: all;
  z-index: 3;
  padding: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  .pagination-box {
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: var(--bottom);
    .el-pagination {
      text-align: center;
      .btn-prev,
      .btn-next,
      .number,
      .btn-quicknext,
      .btn-quickprev {
        width: 25px;
        height: 25px;
        line-height: 25px;
        border-radius: 2px;
        background: var(--rgbaColor4);
        margin-right: 10px;
        color: var(--color);
      }
      button:disabled {
        background: var(--rgbaColor4) !important;
        color: rgba(255, 255, 255, 0.3) !important;
      }
      .el-pager li.active {
        background: var(--rgbaColor1);
        color: #081b22;
      }
      .el-pagination__total {
        color: var(--color);
      }
      .el-pagination__jump {
        color: var(--color);
        .el-input__inner {
          width: 45px;
          height: 25px;
          line-height: 25px;
          background: var(--rgbaColor4) !important;
          border-radius: 2px;
          border: 0;
          color: var(--color);
        }
      }
    }
  }
  .bottom-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    .buttons {
      display: flex;
      .btn {
        width: 120px;
        height: 44px;
        background: var(--anbjt);
        background-size: 100% 100%;
        font-size: var(--fs2);
        text-align: center;
        line-height: 44px;
        align-self: flex-end;
        color: var(--rgbaColor3);
        cursor: pointer;
        margin-right: 20px;

        &.active {
          background: var(--anxzbj);
          background-size: 100% 100%;
          color: var(--color);
          text-shadow: 0px 0px 5px #00aaff;
        }
      }
    }
    .exit-button {
      width: 128px;
      height: 38px;
      display: flex;
      align-items: center;
      background: var(--anbjt);
      background-size: 100% 100%;
      padding-left: 20px;
      cursor: pointer;
      .txt {
        margin-left: 6px;
        color: var(--rgbaColor3);
      }
    }
  }
  .monitor {
    flex: 1 1 auto;
    .content1 {
      height: 100%;
      box-sizing: border-box;
      position: relative;
    }
    .content-box {
      height: 100%;
      // padding: 10px;
      // padding-right: 0;
      box-sizing: border-box;
      // margin-top: 40px;
      position: relative;
      &.isFull {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 8;
        padding: 20px 70px 45px;
        background: #061729;
        border: 1px solid rgba(33, 163, 255, 0.5);
        box-shadow: inset 0px 0px 15px 0px rgba(33, 163, 255, 0.8);

        .back-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          position: absolute;
          bottom: 20px;
          right: 20px;
          cursor: pointer;
        }
      }

      .monitorList1 {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .monitorList4 {
        display: inline-block;
        width: calc(50% - 10px);
        height: calc(50% - 30px);
        margin-bottom: 15px;
        margin-right: 10px;
      }

      .monitorList9 {
        display: inline-block;
        width: calc(33% - 7px);
        height: calc(33% - 20px);
        margin-bottom: 10px;
        margin-right: 10px;
      }

      .monitorList16 {
        display: inline-block;
        width: calc(25% - 5px);
        height: calc(25% - 5px);
        margin-right: 5px;
      }

      .monitor-wrapper {
        cursor: pointer;
        vertical-align: top;
        overflow: hidden;
        position: relative;
        background: var(--defaultBg);

        .device-name {
          position: absolute;
          width: 50%;
          height: 48px;
          line-height: 48px;
          background-color: rgba(0, 0, 0, 0.5);
          left: 0;
          top: 0;
          z-index: 1;
          font-size: var(--fs3);
          padding-left: 10px;
          border-radius: 0px 0px 24px;
          color: var(--color);
        }

        &.isFullScreen {
          position: absolute !important;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        &.empty {
          border: 1px solid transparent;
          background: var(--defaultBg);
          background-size: 100% 100%;
          position: relative;

          .add-icon {
            display: inline-block;
            width: 80px;
            height: 80px;
            background: var(--wxzsxtmrtp);
            background-position: 50% 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        &.active {
          border: 2px solid var(--argbaColor1);
          box-shadow: 0px 2px 15px 0px var(--argbaColor2);
          position: relative;

          &.empty {
            background-image: none;
          }
          .btns2 {
            position: absolute;
            right: 20px;
            top: 20px;
            display: none;
            width: 24px;
            height: 24px;
            // background-image: url("../../../../assets/img/zhongshan/common/cancel.png");
            background-size: 100% 100%;
          }
          .btns {
            display: flex;
            position: absolute;
            right: 20px;
            bottom: 60px;
            display: none;

            .toggle {
              width: 102px;
              height: 36px;
              border-radius: 28px;
              background: rgba(33, 163, 255, 0.2);
              color: #21a3ff;
              text-align: center;
              line-height: 36px;
              font-family: "Source Han Sans CN";
              margin-right: 30px;
            }

            .playback {
              // background-image: url("../../../../assets/img/zhongshan/common/playback.png");
              background-size: 100% 100%;
              margin-right: 30px;
              .vue-svg-playback {
                color: var(--rgbaColor1);
              }
            }

            .fullsrceen {
              z-index: 3;
              // background-image: url("../../../../assets/img/zhongshan/common/fullScreen.png");
              background-size: 100% 100%;

              &.full {
                // background-image: url("../../../../assets/img/zhongshan/common/not-FullScreen.png") !important;
              }
            }
          }

          &:hover {
            .btns,
            .btns2 {
              display: flex;
            }
          }
        }

        &.isFullScreen .fullsrceen {
          // background-image: url("../../../../assets/img/jinshan/monitorPlan/monitor/not-FullScreen.png") !important;
        }
      }
    }
  }
}
</style>
