const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name]-[chunkhash:6].js",
        path: path.resolve(__dirname, "./dist")
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: [
                    //   "style-loader",  // 不再需要style-loader，用MiniCssExtractPlugin.loader代替
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ],
                include: path.resolve(__dirname, "./src")
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, "./src")
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "./public/index.html",
            minify: {
                removeComments: true,  // 移除HTML中的注释
                collapseWhitespace: true,  // 删除空白符与换行符
                minifyCSS: true  // 压缩内联css
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
            chunkFilename: "[id].css"
        }),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                removeAll: true
            }
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, "./node_modules")],
        alias: {
            react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
        }
    },
    externals: {
        "jquery": "jQuery"
    }
}