let production = require("./webpack.config.prod.js");
module.exports = {
    ...production,
    mode: "development", // 配置模式为开发模式
    devServer: {
        port: 8080, // 端口号
        open: true,  // 自动打开浏览器
        liveReload: true,//启动自动更新
        historyApiFallback: true, //允许前端通过history模式访问
        proxy: {
            "/api": {
                target: "http://localhost:8585",
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}
