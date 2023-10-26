<!--
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-17 09:11:27
 * @LastEditors: ydl
 * @LastEditTime: 2023-07-18 13:58:11
-->
<template>
  <div class="soleVideo">
    <div class="title">
      <span>数字单兵连接</span>
    </div>

    <div class="sole">
      <moreVideo :danbin="danbin" />
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
    return {};
  },
  computed: {
    danbin() {
      return this.$store.state.xiaokunshan.danBinData;
    },
  },
  watch: {},
  mounted() {
    //   console.log('选中的数据', this.moreVideoNum);
  },
  beforeDestroy() {},
  methods: {
    // closeModel() {
    //   this.$store.commit('setMoreVideoNum', '');
    //   this.$store.commit('setDragPopupName', '');
    // }
  },
};
</script>

<style lang="scss">
.soleVideo {
  color: #000;
  width: 1604px;
  height: 967px;
  pointer-events: all;
  background: rgba(14, 39, 70, 0.9);
  border: 1px solid rgba(27, 126, 242, 0.5);
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
  //     .close {
  //     width: 36px;
  //     height: 36px;
  //     position: absolute;
  //     top: -13px;
  //     right: -13px;
  //     z-index: 2;
  //     background: url("../../../assets/img/xiaokunshan/soldier/close.png")
  //           no-repeat;
  //   }
  .sole {
    width: 1604px;
    height: calc(100% - 50px);
    padding: 10px;
  }
}
</style>
