<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: renhailing
 * @Date: 2022-10-28 10:28:24
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-16 18:00:34
-->
<template>
  <div class="track-wrapper" :style="sassStyle" v-if="config.data">
    <Map
      ref="map"
      :config="config"
      class="fullScreenMap"
      @loadComplete="loadComplete"
    />
    <div>
      <div class="options" v-if="isShow" :style="styleObj1">
        <div style="margin-right: 10px">人员轨迹</div>
        <el-select
          v-if="isShowSelect"
          ref="optionRef"
          v-model="userRowid"
          clearable
          :multiple="config.box.ismultiple"
          collapse-tags
          placeholder="请选择"
          style="width: 260px;"
          @change="getPlayBlackList()"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in options"
            :key="item.rowid"
            :label="item.user_name"
            :value="item.rowid"
          />
        </el-select>
        <div style="margin:0 10px 0 30px;">选择时间</div>
        <el-date-picker
          v-model="date"
          popper-class="cockpit-daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          style="width: 521px; margin-right: 0"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="timeChange"
          @focus="showPopper"
        />
        <span class="confirm-btn btn" @click="getSoldierLocationList"
          >确认</span
        >
        <span class="exit-btn btn" @click="exit">退出</span>
      </div>
      <!-- <div class="inForm">
        <div>
          <span>{{ value.user_name ? value.user_name : "无" }}-轨迹回放</span>
          <span />
        </div>
        <ul v-if="flag">
          <vue-seamless-scroll
            :data="trackPlayback"
            :class-option="defaultOption1"
            style="height: 100%; overflow: hidden"
          >
            <li v-for="(item, index) in trackPlayback.slice(0, 20)" :key="index">
              <span
                :style="{
                  backgroundColor: item.post_status == 1 ? '#00B578' : '#FA5151',
                }"
              />
              <span :title="item.create_time">{{ item.create_time }}</span>
              <span :title="item.desc">{{ item.desc }}</span>
            </li>
          </vue-seamless-scroll>
        </ul>
        <div v-else>暂无人员轨迹数据</div>
      </div> -->
      <TrackCtrl
        v-if="duration"
        ref="trackCtrl"
        :duration="duration"
        :config="config"
        @on-move="handleMove"
      />
    </div>
  </div>
</template>

<script>
import Map from "../Map/map";
import { positionToGCJ02 } from "../Map/util.js";
import TrackCtrl from "./components/trackCtrl.vue";
import { loadCustomApiData } from "@/utils/api";
import { setStyleObj } from "@/utils/index.js";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    Map,
    TrackCtrl,
    vueSeamlessScroll,
  },
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      options: [],
      userRowid: "",
      personRowid: [],
      slectedUser: "",
      user_rowid: "",
      pictureSearch: {},
      date: [],
      page: 1,
      pageSize: 15,
      total: 0,
      startTime: "",
      endTime: "",
      line_id: "",
      trailStopMark: null,
      duration: 0,
      trailPoints: [], // 轨迹点
      trailPointData: {},
      timeDefaultShow: "",
      trackPlayback: [],
      flag: true,
      timer2: "",
      trackData: {},
      moveData: {},
      rowid: "",
      content: "",
      userData: [],
      soldierUserData: {},
      pointIData: {},
      isShow: false,
      isShowSelect: true,
    };
  },
  computed: {
    defaultOption1() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    sassStyle() {
      let color = this.config.box.mainColor.slice(
        0,
        this.config.box.mainColor.lastIndexOf(",")
      );
      let bcolor = this.config.box.selectBg.slice(
        0,
        this.config.box.selectBg.lastIndexOf(",")
      );
      return {
        width: this.config.width + "px",
        height: this.config.height + "px",
        fontFamily: this.config.box.fontFamily,
        color: this.config.box.color,
        fontSize: this.config.box.fontSize + "px",
        "--color": this.config.box.color,
        "--fontSize1": this.config.box.fontSize + "px",
        "--fontSize2": this.config.box.fontSize * 1 - 2 + "px",
        "--height1": this.config.box.height + "px",
        "--height2": this.config.box.height - 6 + "px",
        "--rgbaColor1": color + ",1)",
        "--rgbaColor2": color + ",.5)",
        "--rgbaColor3": color + ",.1)",
        "--rgbaBg1": bcolor + ",1)",
        "--rgbaBg2": bcolor + ",.5)",
      };
    },
    styleObj1() {
      let d = setStyleObj({ ...this.config.option });
      return d;
    },
  },
  watch: {
    "config.data": {
      handler(val, oVal) {
        this.setSelectUser(val);
      },
      deep: true,
    },
    "config.box.ismultiple"(val, oVal) {
      this.isShowSelect = false;
      this.setShowUser();
    },
    personRowid: {
      handler(val, oVal) {
        this.slectedUser = val[0];
      },
      deep: true,
    },
  },
  created() {
    this.startTime = this.formatDate();
    this.endTime = this.formatDate1();
    this.date.push(this.startTime), this.date.push(this.endTime);
  },
  beforeDestroy() {},
  mounted() {
    this.setSelectUser(this.config.data);
    this.getSoldierUserList();
  },
  methods: {
    showPopper() {
      setTimeout(() => {
        let color = this.config.box.mainColor.slice(
          0,
          this.config.box.mainColor.lastIndexOf(",")
        );
        let daterangeDom = document.getElementsByClassName("cockpit-daterange");
        let timeDom = document.getElementsByClassName("el-time-panel");
        for (let item of daterangeDom) {
          item.style.background = this.config.box.selectBg;
          item.style.border = "1px" + " solid " + color + ",0.5)";
        }
      }, 0);
    },
    setSelectUser(d) {
      this.userData = d;
      this.personRowid = d.map((item) => item.rowid);
      this.slectedUser = this.personRowid[0];
      this.setShowUser();
    },
    setShowUser() {
      if (this.config.box.ismultiple) {
        this.userRowid = this.personRowid;
      } else {
        this.userRowid = this.slectedUser;
      }
      setTimeout(() => {
        this.isShowSelect = true;
      }, 0);
    },
    loadComplete() {
      this.isShow = true;
    },
    // 两个日期相差的天时分秒   倒着走
    getDiff(d1, d2) {
      var ss = Math.abs(d2 - d1) / 1000;
      var d = Math.floor(ss / (24 * 60 * 60));
      var h = Math.floor((ss / 3600) % 24);
      var m = Math.floor((ss / 60) % 60);
      var s = Math.floor(ss % 60);
      return [d, h, m, s];
    },
    formatDate() {
      const date = new Date();
      const YY = date.getFullYear();
      const MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const DD =
        date.getDate() < 10 ? "0" + (date.getDate() - 1) : date.getDate() - 1;
      const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    },
    formatDate1() {
      const date = new Date();
      const YY = date.getFullYear();
      const MM =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const mm =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
    },
    timeChange() {
      if (this.date && this.date.length > 0) {
        this.startTime = this.date[0];
        this.endTime = this.date[1];
      }
    },
    async confirm(trackArr, rowid) {
      this.trailPointData[rowid] = trackArr;
      const lineArr = trackArr; // 111
      this.trailPoints = lineArr;
      this.duration =
        (new Date(lineArr[lineArr.length - 1].time) -
          new Date(lineArr[0].time)) /
        1000; // 单位-秒
      this.createTrail(lineArr, rowid);
      this.$nextTick(() => {
        this.$refs.trackCtrl.changeMove(0);
      });
    },
    createTrail(points, rowid) {
      const start = positionToGCJ02(points[0].pos); // 起始点--wgs84转高德坐标系
      const end = positionToGCJ02(points[points.length - 1].pos); // 终点
      window.AMap.DMarker.addMark({
        id: rowid + "_start",
        type: "trail",
        image: this.config.track.startPointIcon,
        position: start,
      });
      window.AMap.DMarker.addMark({
        id: rowid + "_end",
        image: this.config.track.endPointIcon,
        type: "trail",
        position: end,
      });
      window.AMap.DMarker.addMark({
        id: rowid + "_move",
        image: this.config.track.movePointIcon,
        type: "trail",
        position: start,
        content: this.content,
        isLabel: true,
        click: (e) => {
          const opts = e.target.getExtData();
          const id = opts.id.split("_")[0];
          this.getTrackData(id);
        },
      });
      this.trailStopMark = window.AMap.DMarker.getMarkerById(
        "trail",
        rowid + "_move"
      );
      window.AMap.DMap.setZoomAndCenter(13, start); // 以起点为初始地图中心点
      let path;
      let p = points.map((item) => item.pos);
      if (this.config.polyline.isShow) {
        path = p.slice(0, p.length - 1);
      } else {
        path = p.slice(0, 2);
      }
      window.AMap.DGeometry.addPolyline({
        path: path,
        strokeWeight: this.config.polyline.width,
        strokeColor: this.config.polyline.color,
        type: "Track_Line", // ----
        id: rowid,
        strokeStyle: this.config.polyline.style,
        strokeDasharray: [15, 5],
      }); // 画线
    },
    handleMove(percent) {
      const getGeometry = window.AMap.DGeometry.getGeometryById(
        "Track_Line",
        this.rowid
      );
      const i = Math.round(percent * this.trailPoints.length);
      this.pointIData[this.rowid] = i;
      let angle = 0;
      if (i < this.trailPoints.length - 1 && i >= 0) {
        if (!this.config.polyline.isShow) {
          const point = this.trailPoints.slice(0, i + 1);
          const pos = point.map((item) => item.pos);
          getGeometry && getGeometry.setPath(pos);
        }
        const p = positionToGCJ02(this.trailPoints[i].pos);
        p && this.trailStopMark.setPosition([p[0], p[1]]);
        this.moveData[this.rowid] = {
          percent: percent,
        };
        angle = this.calcAngle(
          [this.trailPoints[i].pos[0], this.trailPoints[i].pos[1]],
          [this.trailPoints[i + 1].pos[0], this.trailPoints[i + 1].pos[1]]
        );
        angle = 0; // 111
        angle && this.trailStopMark.setAngle(angle);
      }
    },

    calcAngle(start, end) {
      var p_start = window.AMap.DMap.lngLatToContainer(start);
      var p_end = window.AMap.DMap.lngLatToContainer(end);
      var diff_x = p_end.x - p_start.x;
      var diff_y = p_end.y - p_start.y;
      return (360 * Math.atan2(diff_y, diff_x)) / (2 * Math.PI) + 90;
    },
    exit() {
      this.config.data = "";
      // this.$store.commit("setPersonInterStatu", true);
      // this.$store.commit("setShowTrack", {
      //   name: "",
      //   date: "", // 人员id
      // });
      // this.$store.commit("setExitTrack", "ExitTrack");
      this.trailStopMark = null; // 111
      window.AMap.DMarker.removeMarkByType("trail"); // 移除的起点和终点
      window.AMap.DGeometry.removePolygonByType("Track_Line"); // 移除线
      window.AMap.DMarker.removeLabelMarkerByType("normal_point"); // 移除点
      Object.keys(window.AMap.DMarker.labelMarks).forEach((v) => {
        if (v.includes("post")) {
          window.AMap.DMarker.toggleMarkerByType(v, true);
        }
        if (v.includes("trail")) {
          window.AMap.DMarker.removeLabelMarkerByType(v);
        }
      });
      Object.keys(window.AMap.DGeometry.geometries).forEach((item) => {
        if (item.includes("post")) {
          window.AMap.DGeometry.toggleGeometryByType(item, true);
        }
      });
    },

    // 获取人员轨迹
    async getSoldierLocationList() {
      window.AMap.DMarker.removeMarkByType("trail"); // 移除的起点和终点
      window.AMap.DGeometry.removePolygonByType("Track_Line"); // 移除线
      window.AMap.DMarker.removeLabelMarkerByType("normal_point"); // 移除点
      this.duration = 0;
      this.$store.commit("setPersonInterStatu", false);
      Object.keys(window.AMap.DMarker.labelMarks).forEach((v) => {
        if (v.includes("post")) {
          window.AMap.DMarker.toggleMarkerByType(v, false);
        }
        if (v.includes("personnel")) {
          window.AMap.DMarker.removeLabelMarkerByType(v);
        }
      });
      Object.keys(window.AMap.DGeometry.geometries).forEach((item) => {
        if (item.includes("post")) {
          window.AMap.DGeometry.toggleGeometryByType(item, false);
        }
      });
      // 获取单兵设备轨迹信息
      const date1 = new Date(this.date[0].replace(/-/g, "/"));
      const date2 = new Date(this.date[1].replace(/-/g, "/"));
      const time = this.getDiff(date1, date2);
      if (time[0] > 2) {
        this.$message.error("提示：仅可查看48小时内的足迹");
        return;
      }
      if (this.personRowid.length === 1) {
        this.getTrackData(this.personRowid[0]);
      } else {
        this.addLabelsLayer(this.userData, {
          icon: this.config.track.movePointIcon,
          type: "trail_default",
          isLabel: true,
          isClick: true,
        });
      }
    },
    addLabelsLayer(d, m) {
      window.AMap.DMarker.addLabelsLayer(d, {
        image: m.icon,
        sImage: m.icon,
        type: m.type,
        isLabel: m.isLabel,
        zooms: [8, 30],
        labelZooms: [8, 30],
        click: (e) => {
          if (m.isClick) {
            const opts = e.target.getExtData();
            this.content = opts.data.name;
            this.getTrackData(opts.data.rowid);
          }
        },
      });
      // setTimeout(() => {
      //   window.AMap.DMap.setZoomAndCenter(18, [
      //     121.17110520325764,
      //     31.097256051459418,
      //   ]); // 以起点为初始地图中心点
      // }, 1000);
    },
    async getTrackData(rowid) {
      this.rowid = rowid;
      if (!this.trackData[rowid]) {
        // const result = await this.$ssapi.getSoldierLocationList({
        //   rowid: rowid,
        //   end_time:
        //     this.date && this.date.length > 0 ? this.date[1] : this.endTime,
        //   start_time:
        //     this.date && this.date.length > 0 ? this.date[0] : this.startTime,
        //   pageSize: "1000",
        // });
        let result = await loadCustomApiData({
          api: this.config.track.trackRecordApi,
          type: "get",
          data: {
            rowid: rowid,
            end_time:
              this.date && this.date.length > 0 ? this.date[1] : this.endTime,
            start_time:
              this.date && this.date.length > 0 ? this.date[0] : this.startTime,
            pageSize: "1000",
          },
        });
        if (result.msg !== "success") {
          this.$message.error(
            "未查询到此人员到单兵设备信息，请检查设备绑定关系！"
          );
        } else {
          if (result.data.total == 0) {
            this.$message.error("未查询到人员轨迹");
            return;
          }
          const pos = [];
          result.data.list.forEach((item) => {
            pos.unshift({
              time: item.create_time,
              pos: [...item.postion],
            });
          });
          window.AMap.DMarker.removeLabelMarkerById("trail_default", rowid);
          this.trackData[rowid] = pos;
          this.confirm(pos, rowid);
        }
      } else {
        this.trailStopMark = window.AMap.DMarker.getMarkerById(
          "trail",
          rowid + "_move"
        );
        this.trailPoints = this.trailPointData[rowid];
        const percent =
          this.pointIData[rowid] >= this.trailPoints.length - 1
            ? 0
            : this.moveData[rowid].percent;
        this.handleMove(percent);
        this.$nextTick(() => {
          this.$refs.trackCtrl.changeMove(percent);
        });
      }
    },
    async getSoldierUserList() {
      // 获取单兵绑定用户列表
      // const res = await this.$ssapi.getSoldierUserList({});
      let res = await loadCustomApiData({
        api: this.config.track.trackPersonApi,
        type: "get",
      });
      res.data.list.forEach((item) => {
        item.title = item.user_name;
        this.soldierUserData[item.rowid] = item;
      });
      this.options = res.data.list;
      if (this.userData.length > 0) {
        this.personRowid = this.userData.map((item) => item.rowid);
      }
    },
    // 获取人员轨迹回放
    async getPlayBlackList() {
      if (this.config.box.ismultiple) {
        this.userData = [];
        this.personRowid = [...this.userRowid];
        this.personRowid.forEach((v) => {
          this.userData.push(this.soldierUserData[v]);
        });
      } else {
        this.personRowid = [this.userRowid];
      }
      // const rowids = this.personRowid.join(",");
      // const result = await this.$ssapi.getSoldierLocationList({
      //   rowid: rowids,
      //   pageSize: "1000",
      // });
      // if (result.msg !== "success" || result.data.total == 0) {
      //   this.flag = false;
      // } else {
      //   this.flag = true;
      // }
      // this.trackPlayback = result.data.list;
    },
  },
};
</script>
<style lang="scss" scoped>
.track-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  color: #fff;
  z-index: 99;
  pointer-events: none;
  .trackList {
    width: 462px;
    height: calc(100% - 120px);
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: linear-gradient(
      180deg,
      rgba(8, 35, 54, 0.5) 0%,
      rgba(31, 73, 103, 0.5) 45%,
      rgba(8, 35, 54, 0.5) 100%
    );
    border: 1px solid rgba(188, 220, 255, 0.5);
    border-radius: 20px;
    z-index: 9999;
    padding: 15px;
    pointer-events: all;

    .user-info {
      width: 100%;
      height: 140px;
      background: rgba(187, 251, 255, 0.1);
      border: 1px solid rgba(166, 240, 255, 0.2);
      border-radius: 4px;
      background: rgba(187, 251, 255, 0.1);
      border: 1px solid rgba(166, 240, 255, 0.2);
      margin: 15px 0;
      padding: 10px;
      display: flex;

      .avatar {
        width: 120px;
        height: 120px;
        margin-right: 10px;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        span {
          display: inline-block;
          width: 50px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          border-radius: 3px;
          background: rgba(57, 174, 255, 0.2);
          color: #39aeff;
          margin-right: 10px;

          &:nth-last-of-type(1) {
            margin-right: 0;
          }
        }
      }
    }

    .table {
      width: 100%;

      .table-head {
        height: 36px;
        line-height: 36px;
        margin-top: 12px;
        text-align: center;
        display: flex;
        background-color: rgba(6, 41, 64, 0.5);

        > span {
          border-right: 1px solid rgba(255, 255, 255, 0.5);

          &:nth-last-child(1) {
            border: none;
          }
        }
      }

      .table-body {
        height: calc(100% - 48px);
        overflow: auto;

        .table-row {
          height: 45px;
          display: flex;
          align-items: center;
          text-align: center;

          &:nth-child(even) {
            background-color: rgba(6, 41, 64, 0.5);
          }
        }
      }

      .table-head,
      .table-row {
        > span {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden; //溢出内容隐藏
          text-overflow: ellipsis; //文本溢出部分用省略号表示
          display: -webkit-box; //特别显示模式
          -webkit-line-clamp: 2; //行数
          line-clamp: 2;
          -webkit-box-orient: vertical; //盒子中内容竖直排列
        }
        > span:nth-child(1) {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        > span:nth-child(2) {
          width: 100px;
        }

        > span:nth-child(3) {
          width: 100px;
        }

        > span:nth-child(4) {
          width: 140px;
        }

        > span:nth-child(5) {
          width: 80px;
        }

        > span:nth-child(6) {
          display: inline-block;
          width: 57px;
          height: 100%;
        }
      }
    }

    .el-pagination {
      margin-top: 10px;
    }
  }

  .options {
    height: 80px;
    border-radius: 3px;
    background: var(--rgbaBg1);
    border: 1px solid var(--rgbaColor1);
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    top: 110px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    pointer-events: all;
    ::v-deep {
      .el-input__inner {
        background: var(--rgbaColor3);
        border: 1px solid var(--rgbaColor2);
        color: var(--color);
        font-size: var(--fontSize1);
      }
      .el-range-input {
        border: 0;
        background: transparent;
        color: var(--color);
        font-size: var(--fontSize1);
      }
      .el-range-separator {
        line-height: var(--height1);
        height: var(--height1);
        font-size: var(--fontSize1);
        color: var(--color);
        margin: 0 20px;
      }
    }
    ::v-deep .el-select {
      .el-select__tags {
        max-width: 100% !important;
        .el-tag {
          background: transparent;
          border: 0;
          color: var(--color) !important;
          font-size: var(--fontSize1);
          line-height: var(--height1);
          height: var(--height1);
        }
      }
      .el-select-dropdown {
        border: 1px solid var(--rgbaColor2);
        background-color: var(--rgbaBg1);
        left: 0 !important;
        top: var(--height1) !important;
        position: absolute !important;
        .el-scrollbar__wrap {
          background: var(--rgbaColor3);
          .el-select-dropdown__list {
            width: 100%;
            padding: 0 !important;
            .el-select-dropdown__item {
              width: 100%;
              color: var(--color);
            }
          }
        }
      }
      .el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background: var(--rgbaColor2);
      }
      .el-select-dropdown__item.selected {
        background: var(--rgbaColor1);
        color: var(--color);
      }
    }
    .btn {
      width: 76px;
      height: var(--height2);
      line-height: var(--height2);
      border-radius: 3px;
      cursor: pointer;
      text-align: center;
      font-size: var(--fontSize2);
    }
    .confirm-btn {
      background-color: var(--rgbaColor1);
      margin-left: 40px;
    }

    .exit-btn {
      border: 1px solid var(--rgbaColor1);
      color: var(--rgbaColor1);
      margin-left: 20px;
    }
  }
  .inForm {
    position: absolute;
    right: 20px;
    top: 120px;
    width: 350px;
    height: 258px;
    pointer-events: all;
    background: #061729;
    border: 1px solid;
    border-image: linear-gradient(
        180deg,
        rgba(33, 163, 255, 0) 0%,
        #21a3ff 100%
      )
      1;
    > div:nth-child(1) {
      height: 40px;
      color: white;
      line-height: 40px;
      padding: 0px 20px;
      background: #010e1d;
      display: flex;
      justify-content: space-between;
    }
    > div:nth-child(2) {
      color: #ccc;
      width: 100%;
      text-align: center;
      line-height: 200px;
    }
    ul {
      padding: 0px 20px;
      height: 190px;
      font-size: var(--fontSize2);
      line-height: 40px;
      overflow: hidden;
      li {
        height: 40px;
        display: flex;
        position: relative;
        > span:first-child {
          width: 6px;
          height: 6px;
          border-radius: 3px;
          position: absolute;
          top: 0;
          bottom: 0;
          // margin-right: 3px;
          margin: auto;
        }
        > span:nth-child(2) {
          margin-left: 10px;
        }
        > span {
          margin: 0px 5px;
        }
      }
      > div li:nth-child(even) {
        background: #0c1f35;
      }
    }
  }
}
</style>
