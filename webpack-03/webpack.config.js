const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
              use: ["style-loader", "css-loader", "less-loader"],
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
            template: "./public/index.html"
        })
    ],
    resolve: {
        modules: [path.resolve(__dirname, "./node_modules")],
        alias: {
            react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
        }
    }
}