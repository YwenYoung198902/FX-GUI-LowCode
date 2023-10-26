const base = require("./webpack.config.base");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(base, {
  output: {
    filename: "js/[name][hash].js",
    chunkFilename: "js/vendor[id][hash].js",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
  //     },
  //   ],
  // },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[hash].css" }),
    new CleanWebpackPlugin(),
    //   new HtmlWebpackPlugin({
    //     template:'./index.html',
    //     inject: 'body',
    //     minify: {
    //         removeComments: true
    //     }
    // })
  ],
});
