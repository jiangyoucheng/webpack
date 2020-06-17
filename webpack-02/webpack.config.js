const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name]-[chunkhash:6].js",
        path: path.resolve(__dirname, "./dist")
    },
    mode: 'production',
    module: {
        rules: [
            // babel-loader：将ES6代码转换成ES5代码,可以在.babelrc文件中配置options
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     presets: [
                    //         [
                    //             "@babel/preset-env",
                    //             {
                    //                 targets: {
                    //                     edge: "17",
                    //                     firefox: "60",
                    //                     chrome: "67",
                    //                     safari: "11.1"
                    //                 },
                    //                 corejs: 2,
                    //                 useBuiltIns: "usage"
                    //             }
                    //         ]
                    //     ]
                    // }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "./public/index.html"
        })
    ],
    devServer: {
        contentBase: "./dist",
        open: false,
        port: 8080,
        // 解决跨域
        proxy: {
            "/api": {
                target: "http://localhost:9001"
            }
        }
    }
};
