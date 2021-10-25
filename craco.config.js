/*
 * @Author: kingford
 * @Date: 2021-10-25 19:46:10
 * @LastEditTime: 2021-10-25 20:30:30
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
};
