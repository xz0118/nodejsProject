const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
console.log(process.cwd())
module.exports = {
    mode: "production", //生产模式
    entry: path.resolve(process.cwd(), "./src/index.js"),  //入口文件
    output: {
        path: path.resolve((process.cwd(), "./dist")),
        filename: "[name].js",
        publicPath:"/"
    },
    module: {
        rules: [
            {
                test: /\.(html)$/i,
                loader: "html-loader"
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    variable: 'data', // 可以在模块当中使用data进行数据处理
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "login system",
            filename: "index.html",
            template: "./public/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "./",
                    globOptions: {
                        ignore: ["**/index.html"] // 排除index.html
                    }
                },
                {
                    from: "./src/static",
                    to: "./"
                }
            ]
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(process.cwd(), "src/views")
        }
    }
}