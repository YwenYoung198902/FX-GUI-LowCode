<template>
  <div class="main relative">
    <div class="main-container-wrap flex">
      <div class="left flex">
        <div class="left-list">
          <div
            v-for="(item, index) in silderList"
            :key="item.title"
            class="left-item pointer"
            @click="toJump(item)"
            :class="{ active: currentIcon === item.title, home: index === 0 }"
            :style="{
              borderBottom: `${index === 0 ? 1 : 0}px solid #0C0D0D`,
              padding: `${index === 0 ? '10px 0' : '20px 0'}`,
            }"
            @mouseenter="nodeMouseEnter(item)"
            @mouseleave="nodeMouseleave(item)"
          >
            <div v-show="item.title">
              <div
                class="silder-icon"
                :style="{ marginBottom: `${index === 0 ? 0 : 6}px` }"
              >
                <img
                  :src="
                    currentIcon === item.title || hoverIcon === item.title
                      ? item.icon_active
                      : item.icon
                  "
                  alt=""
                  srcset=""
                />
              </div>
              <div>
                {{ item.title }}
              </div>
            </div>
            <div v-show="!item.title">
              <div
                class="silder-icon"
                :style="{ marginBottom: `${index === 0 ? 0 : 6}px` }"
              >
                <img :src="item.icon" alt="" srcset="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 100%; position: relative">
      <div class="content-header">数据孪生驾驶舱</div>
      <router-view name="main" />
    </div>
  </div>
</template>

<script>
import { getKey, getAppkeyList } from "@/utils/api";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentIcon: "",
      hoverIcon: "",
      silderList: [
        {
          title: "",
          url: "",
          key: "home",
          icon: require("../../assets/image/logo.png"),
        },
        {
          title: "场景",
          url: "/earth",
          icon: require("../../assets/image/scene.png"),
          icon_active: require("../../assets/image/scene_active.png"),
        },
        {
          title: "数据",
          url: "/data",
          icon: require("../../assets/image/data.png"),
          icon_active: require("../../assets/image/data_active.png"),
        },
        {
          title: "面板",
          url: "/chart",
          icon: require("../../assets/image/panel.png"),
          icon_active: require("../../assets/image/panel_active.png"),
        },
      ],
      key: "",
    };
  },
  computed: {},
  watch: {
    $route(to, form) {
      const { title = "" } =
        this.silderList.find(
          (item) => item.url && location.hash.includes(item.url)
        ) || {};
      this.currentIcon = title;
    },
  },
  async mounted() {
    console.log("location.hash:::::::", location.hash);
    const { title = "" } =
      this.silderList.find(
        (item) => item.url && location.hash.includes(item.url)
      ) || {};
    this.currentIcon = title;
    // await this.loadKey();
    // this.loadAppkeyList();
  },
  methods: {
    async loadKey() {
      const {
        data: { key },
      } = await getKey();
      this.key = key;
    },
    async loadAppkeyList() {
      const { data } = await getAppkeyList(this.key);
      console.log("result:::::::::::::", data);
      data.length &&
        localStorage.setItem(
          "systemInfo",
          JSON.stringify({ app_key: data[0].app_key, sign: data[0].sign })
        );
    },
    nodeMouseEnter(data) {
      this.hoverIcon = data.title;
    },
    nodeMouseleave() {
      this.hoverIcon = "";
    },
    toJump(data) {
      this.currentIcon = data.title;
      if (data.key === "home") {
        window.location.href = window.origin + "/custom/cockpit";
        // window.location.href = "http://localhost:30001/custom/cockpit";
        return;
      }

      this.$router.push({ path: data.url });
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #000000;
  .content-header {
    width: 100%;
    height: 40px;
    background: #25262a;
    line-height: 40px;
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #999999;
    border-left: 1px solid #0c0d0d;
    border-bottom: 1px solid #0c0d0d;
    box-sizing: border-box;
  }
  .content {
    flex: 1;
  }

  .main-container-wrap {
    position: relative;
    height: calc(100%);
    background-color: #2e2f33;
    .left {
      height: 100%;
      .left-list {
        width: 60px;
        height: 100%;
        .left-item {
          width: 100%;
          //   min-height: 60px;
          text-align: center;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          font-size: 14px;
          padding: 20px 0;
          &.home {
            border-bottom: 1px solid rgb(12, 13, 13);
            padding: 0;
            box-sizing: border-box;
            background-color: #2e2f33 !important;
            height: 40px;
            img {
              width: 40px;
              height: 40px;
            }
          }

          .silder-icon {
            line-height: 1;
          }

          .line {
            width: 100%;
            height: 1px;
            background: #0c0d0d;
          }

          img {
            width: 19px;
            height: 19px;
            display: block;
            margin: 0 auto;
          }
          &:hover {
            background: #2879ff;
            color: #ffffff;
          }
          &.active {
            background: #2879ff;
            color: #ffffff;
          }
          // &.active::before {
          //   content: "";
          //   width: 4px;
          //   position: absolute;
          //   right: 0;
          //   top: 0;
          //   bottom: 0;
          //   background: linear-gradient(90deg, #5171fd, #c97afd);
          // }
        }
      }
    }
  }
}
</style>
