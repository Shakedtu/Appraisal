const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },
};
