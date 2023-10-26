<!--
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2022-11-18 16:55:39
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-16 14:44:46
-->
<template>
  <div
    :class="[
      'camera-play-box',
      config && config.splitVideo && config.splitVideo.noControl
        ? 'no-control'
        : '',
    ]"
  >
    <template v-if="isShowUnLine">
      <img src="../../../assets/component/img/cameraUnline.png" alt="" />
    </template>
    <!--  -->
    <template v-else-if="isShowNoVideo">
      <div
        class="no-video-box"
        :style="{
          background:
            (config && config.splitVideo && config.splitVideo.background) || '',
        }"
      >
        <img
          v-if="config.cameraType === 'splitCamera'"
          :src="config && config.splitVideo && config.splitVideo.whmtp"
          alt=""
        />
        <img
          class="img"
          v-else
          :src="config && config.video && config.video.background"
          alt=""
        />
      </div>
    </template>
    <template v-else>
      <LivePlayer
        id="live-player-container"
        :video-url="videoUrl"
        alt="加载中..."
        fluent
        autoplay
        live
        style="width: 100%"
      />
      <!-- <live-player
          id="live-player-container"
          :video-url="videoUrl"
          alt="加载中..."
          fluent
          autoplay
          live
          style="width: 100%"
        /> -->
    </template>
  </div>
</template>

<script>
import { loadCustomApiData } from "@/utils/api";
import LivePlayer from "@liveqing/liveplayer";
export default {
  name: "CameraPlay",
  props: ["camera_data", "address", "config",'svs_url'],
  components: {
    LivePlayer,
  },

  data() {
    return {
      videoUrl: "",
      isShowUnLine: false,
      isShowNoVideo: false,
    };
  },
  watch: {
    camera_data: {
      handler(nval, oval) {
        if (nval.rowid !== oval.rowid) {
          this.getStreamStart();
        }
      },
    },
    address: {
      handler(nval, oval) {
        if (nval !== oval) {
          this.getStreamStart();
        }
      },
    },
    svs_url: {
      handler(nval, oval) {
        if (nval !== oval) {
          this.getStreamStart();
        }
      },
    },
  },
  mounted() {
    if (this.camera_data.device_status === "离线") {
      this.isShowUnLine = true;
    } else {
      this.isShowUnLine = false;
      this.getStreamStart();
    }
  },
  methods: {
    getStreamStart() {
      loadCustomApiData({
        api: this.address,
        type: "get",
        data: {
          serial:
            this.camera_data.national_num ||
            this.camera_data.master_national_num,
          code:
            this.camera_data.master_channel || this.camera_data.master_channel,
          svs_url:this.svs_url,
          // svs_url: "https://www.sjxks.com",
          // svs_url:  `${document.location.protocol}//${window.location.host}`,
          // account_id: 'eb71dac7-a4dc-4cbb-9022-251c93acca1e'
        },
      })
        .then((res) => {
          const url = res.WS_FLV;
          this.videoUrl = url;
          this.isShowNoVideo = !url;
        })
        .catch(() => {
          this.videoUrl = "";
          this.isShowNoVideo = true;
        });
    },
  },
};
</script>

<style lang="scss">
.camera-play-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #031820;
  .no-video-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    .img {
      width: 100%;
      height: 100%;
    }
    // .img {
    //   background: var(--whmtp);
    // }
  }
}
.no-control {
  .vjs-control-bar {
    display: none !important;
  }
}
</style>
