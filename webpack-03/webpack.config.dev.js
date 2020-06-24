const merge = require("webpack-merge")
const commonConfig = require("./webpack.config.common.js")

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const devConfig = {
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, "./src"),
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "document",
            filename: "index.html",
            template: "./public/index.html"
        })
    ],
    devServer: {
        contentBase: "./dist",
        port: 8080,
        open: true
    }
}

module.exports = merge(commonConfig, devConfig)