const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var packageJson = require("../package.json");
var version = packageJson.version;

module.exports = {
  //输入
  entry: {
    path: path.join(__dirname, "../src/index.js"),
  },
  //输出
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", //配置别名 确保webpack可以找到.vue文件
      "@": path.resolve("src"),
    },
    extensions: ['.js', '.ts', '.vue', '.json', '.css', '.node', '.sass', ".jsx"],
  },
  externals: {
    cesium: "Cesium",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf|topojson|ktx)$/,
        loader: "url-loader",
        options: {
          limit: 819200,
          name: "[name].[hash].[ext]",
        },
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: "vue-html-loader",
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
      minify: {
        removeComments: true,
      },
    }),
  ],
};

module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    VERSION: JSON.stringify(version),
  }),
  new webpack.HotModuleReplacementPlugin(),
]);
