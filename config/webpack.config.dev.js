/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:07
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-10-20 13:11:27
 */
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(base, {
  devServer: {
    port: 9529,
    open: true,
    hot: true,
    proxy: {
      // "/mdy/v1": {
      //   // target: "http://skyinfor.yikuaida.cn",
      //   // target: "https://www.sjxks.com/v1",
      //   target: "https://www.sjxks.com/v1",
      //   pathRewrite: { "^/mdy/v1": "" },
      //   changeOrigin: true,
      // },
      "/xks": {
        // target: "http://skyinfor.yikuaida.cn",
        target: "https://www.sjxks.com/v1",
        // target: "http://192.168.6.92",
        pathRewrite: { "^/xks": "" },
        changeOrigin: true,
      },
      // "http://192.168.6.92/xks": {
      //   // target: "http://skyinfor.yikuaida.cn",
      //   target: "https://www.sjxks.com/v1",
      //   // target: "http://192.168.6.92",
      //   pathRewrite: { "^/xks": "" },
      //   changeOrigin: true,
      // },
      "/mdy": {
        // target: "http://skyinfor.yikuaida.cn",
        // target: "https://www.sjxks.com/v1",
        // target: "http://skyinfor.yikuaida.cn",
        target: "http://192.168.6.66",
        // target: "http://101.227.231.145:81",
        // target: "http://192.168.6.120",
        pathRewrite: { "^/mdy": "" },
        changeOrigin: true,
      },
      "/api": {
        // target: "http://skyinfor.yikuaida.cn",
        // target: "https://www.sjxks.com/v1",
        // target: "http://192.168.6.66",
        target: "http://101.227.231.145:81",
        // target: "http://192.168.6.120",
        // pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
  module: {
    rules: [
      //   {
      //     test: /\.html$/,
      //     loader: "raw-loader",
      //   },
    ],
  },
  // devtool: "cheap-module-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
