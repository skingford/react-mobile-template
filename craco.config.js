/*
 * @Author: kingford
 * @Date: 2021-10-25 19:46:10
 * @LastEditTime: 2021-10-26 14:27:49
 */
const path = require("path");

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  // 配置别名
  webpack: {
    alias: {
      "@": pathResolve("src"),
    },
  },
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
