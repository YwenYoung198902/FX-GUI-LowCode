<template>
  <div class="moreVideo">
    <div class="title">
      <span>数字单兵连接</span>
      <div class="close" @click="closeModel()" />
    </div>
    <div v-if="moreVideoNum.length < 5" class="four">
      <div
        v-for="(item, index) in moreVideoNum.slice(0, 4)"
        :key="index"
        class="four_video"
      >
        <moreVideo
          ref="child"
          :danbin="item"
          :close-more-video="'closeMoreVideo'"
        />
      </div>
    </div>
    <div v-else class="nine">
      <div
        v-for="(item, index) in moreVideoNum.slice(0, 9)"
        :key="index"
        class="nine_video"
      >
        <moreVideo :danbin="item" :close-more-video="'closeMoreVideo'" />
      </div>
    </div>
  </div>
</template>
<script>
import moreVideo from "./sinngle.vue";
export default {
  components: {
    moreVideo,
  },
  data() {
    return {
      closeMoreVideo: "closeMoreVideo",
      arr: "",
    };
  },
  computed: {
    moreVideoNum() {
      console.log(
        this.$store.state.xiaokunshan.moreVideoNum,
        "this.$store.state.xiaokunshan.moreVideoNum"
      );
      return this.$store.state.xiaokunshan.moreVideoNum;
    },
  },
  watch: {},
  mounted() {
    this.arr = this.moreVideoNum.filter((item) => item.danbin_type == "电信");
    if (this.arr.length > 0) {
      this.$store.commit("setLoginReqString", "111");
    }
  },
  beforeDestroy() {},
  methods: {
    closeModel() {
      this.$nextTick(() => {
        if (this.arr.length > 0) {
          console.log("=================");
          // this.$refs.child[0].logoutReq1()
          this.$store.commit("setLoginReqString", "loginReqString");
        } else {
          this.$store.commit("setDragPopupName", "");
          this.$store.commit("setMoreVideoNum", "");
          this.closeMoreVideo = "";
        }
      });

      //
    },
  },
};
</script>

<style lang="scss">
.moreVideo {
  color: #000;
  width: 1578px;
  height: 941px;
  pointer-events: all;
  background: #010e1d;
  border: 1px solid #21a3ff;
  position: relative;
  // box-shadow: 0px 0px 30px 0px rgba(33, 163, 255, 0.3);
  // padding: 10px;
  .title {
    width: 100%;
    height: 50px;
    // background: url("../../../assets/img/xiaokunshan/soldier/titlebg.png")
    //   no-repeat;
    > span {
      background: linear-gradient(180deg, #ffffff 0%, #68aeff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      font-size: 24px;
      font-weight: 900;
      font-family: " MicrosoftYaHei-Bold";
      line-height: 50px;
      margin-left: 20px;
    }
  }
  .close {
    width: 36px;
    height: 36px;
    position: absolute;
    top: 10px;
    right: 0px;
    z-index: 2;
    // background: url("../../../assets/img/xiaokunshan/soldier/close.png")
    //   no-repeat;
  }
  .four,
  .nine {
    width: 1578px;
    height: 891px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 10px;

    .four_video {
      width: 49.9%;
      height: 49.9%;
      margin-right: 2px;
      &:nth-child(even) {
        margin-right: 0px !important;
      }
    }
    .nine_video {
      width: 33%;
      height: 33%;
      margin-right: 4px;
      margin-bottom: 3px;
    }
  }
}
</style>
