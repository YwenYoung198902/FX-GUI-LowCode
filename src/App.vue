<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const appName = "九里亭";
import { getKey, getAppkeyList, getAppInfo } from "@/utils/api";
import { projectId } from "@/utils/const.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      key: "",
    };
  },
  computed: {},
  watch: {},
  async created() {
    await this.loadKey();
    this.loadAppkeyList();
    this.loadAppInfo();
  },
  mounted() {},
  methods: {
    async loadAppInfo() {
      const {
        data: { apps },
      } = await getAppInfo({ projectId: projectId, containsLinks: true });
      const appInfo = apps.find((item) => item.name === appName);
      localStorage.setItem("appInfo", JSON.stringify(appInfo));
    },
    async loadKey() {
      const {
        data: { key },
      } = await getKey();

      this.key = key;
    },
    async loadAppkeyList() {
      const { data } = await getAppkeyList(this.key);
      if (data && data.length > 0) {
        localStorage.setItem("appkeyList", JSON.stringify(data));
        const dataInfo = data.find((item) => item.app_name === appName);
        localStorage.setItem(
          "systemInfo",
          JSON.stringify({
            app_key: dataInfo.app_key,
            sign: dataInfo.sign,
          })
        );
      }
    },
  },
};
</script>
<style>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

.flex {
  display: flex;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.xbsj-template {
  width: 100% !important;
}

.el-message {
  z-index: 99999 !important;
}

/*整体部分*/
::-webkit-scrollbar {
  width: 5px !important;
  height: 5px !important;
}

/*滑动轨道*/
::-webkit-scrollbar-track {
  border-radius: 0px !important;
  background: #25262a !important;
}

/*滑块*/
::-webkit-scrollbar-thumb {
  border-radius: 5px !important;
  box-shadow: inset 0 0 6px rgba(180, 30, 30, 0.2) !important;
  background-color: #2879ff !important;
}

/*滑块效果*/
::-webkit-scrollbar-thumb:hover {
  border-radius: 5px !important;
  box-shadow: inset 0 0 6px rgba(197, 14, 14, 0.2) !important;
  background-color: #2879ff !important;
}

.el-button--primary {
  background-color: #2879ff !important;
  border-color: #2879ff !important;
}

.xbsj-title-item-on,
.xbsj-title-ul li:hover {
  background-color: #25262a;
}

.xbsj-title-ul {
  background-color: #1a1b1d !important;
}

.xbsj-nav {
  z-index: 999 !important;
}
</style>
