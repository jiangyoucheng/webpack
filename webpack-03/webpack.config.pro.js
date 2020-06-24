const path = require("path")
const merge = require("webpack-merge")
const commonConfig = require("./webpack.config.common.js")

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const proConfig = {
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js",
        publicPath: "https://cdn.kaikeba.com/assets/",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ],
                include: path.resolve(__dirname, "./src")
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, "./src"),
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "proDocument",
            filename: "index.html",
            template: "./public/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                removeAll: true
            }
        })
    ]
}

module.exports = merge(commonConfig, proConfig)
