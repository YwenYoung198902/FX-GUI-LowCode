/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:13
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-10 10:20:09
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from "js-md5";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import directive from "./utils/directives";
import { isShowModuleFunc } from "./utils/index";

Vue.use(directive);
Vue.use(ElementUI);

import SvgIcon from "vue-svgicon";
import "./icons"; //引入svg-icon

Vue.use(SvgIcon, {
  tagName: "svgicon",
});

import lodash from "lodash";
Vue.prototype.$lodash = lodash;
Vue.prototype.isShowModuleFunc = isShowModuleFunc;
Vue.prototype.$md5 = md5;
window.$lodash = lodash;
import "@/assets/style/common.scss";
import "@/styles/index.scss";

import "@/icons/index";

// import CodeEditor from "bin-code-editor";
// Vue.use(CodeEditor);
try {
  const rowid =
    sessionStorage.getItem("rowid") ||
    window.location.href.split("#")[1].split("/")[2] ||
    "051d669c-e83e-40db-abcf-0921120c6f23";
  sessionStorage.setItem("rowid", rowid);
  const systemInfo = localStorage.getItem("systemInfo");
  !systemInfo &&
    localStorage.setItem("systemInfo", {
      app_key: "4381923389e27cd4",
      sign:
        "Yzg1NDU3MWJhZjUwOTQ1NTY0OThmZjM0NjAzOGZkNGY3MWEzOWJiMjQ4NmZhNmMyMDlhZTk1N2QwYTI5NzM5ZQ==",
    });
} catch (error) {}

// Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
