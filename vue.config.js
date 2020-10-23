const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/website/puzzle/mianguanfree",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  configureWebpack: {
    name: "谜案馆试玩版",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
};
