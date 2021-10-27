/*
 * @Author: kingford
 * @Date: 2021-10-25 19:46:10
 * @LastEditTime: 2021-10-27 09:33:26
 */
const { whenDev, whenProd } = require("@craco/craco");
const fastRefreshCracoPlugin = require("craco-fast-refresh");
const cracoVtkPlugin = require("craco-vtk");

const webpackBar = require("webpackbar");
const simpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const compressionWebpackPlugin = require("compression-webpack-plugin");

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

      //生产环境
      ...whenProd(
        () => [
          new terserWebpackPlugin({
            // sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              ecma: undefined,
              parse: {},
              compress: {
                warnings: false,
                drop_console: true, // 生产环境下移除控制台所有的内容
                drop_debugger: true, // 移除断点
                pure_funcs: ["console.log"], // 生产环境下移除console
              },
            },
          }),

          // 打压缩包,注意版本
          new compressionWebpackPlugin({
            algorithm: "gzip",
            test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
            threshold: 1024,
            minRatio: 0.8,
          }),
        ],
        []
      ),
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },

  // 配置插件
  plugins: [
    ...whenDev(
      () => [
        {
          plugin: fastRefreshCracoPlugin,
        },
        {
          plugin: cracoVtkPlugin(),
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
