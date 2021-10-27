/*
 * @Author: kingford
 * @Date: 2021-10-25 19:46:10
 * @LastEditTime: 2021-10-26 20:54:44
 */
const { whenDev } = require("@craco/craco");
const fastRefreshCracoPlugin = require("craco-fast-refresh");

const webpackBar = require("webpackbar");
const simpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");

const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      "@": pathResolve("src"),
    },
    plugins: [
      // webpack构建进度条
      new webpackBar({
        profile: true,
      }),

      // 查看打包的进度
      new simpleProgressWebpackPlugin(),
    ],
  },

  // 配置插件
  plugins: [
    ...whenDev(
      () => [
        {
          plugin: fastRefreshCracoPlugin,
        },
      ],
      []
    ),
  ],

  // 配置开发服务
  devServer: {
    port: 9000,
    proxy: {
      "/api": {
        target: "http://stevekingford.com/",
        changeOrigin: true,
        secure: false,
        xfwd: false,
      },
    },
  },
};
