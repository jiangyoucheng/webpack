const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // 指定webpack打包入口文件，可以是字符串、数组、对象
    entry: "./src/index.js",
    // entry: ["./src/index.js"],
    // entry: {
    //     main: "./src/index.js"
    // },
    // 多文件入口
    // entry: {
    //     index: "./src/index.js",
    //     login: "./src/login.js"
    // },
    // 打包后的输出结果
    output: {
        // 文件名
        // 可以使用占位符：[name] [hash] [chunkhash]
        filename: "[name]-[chunkhash:6].js",
        // 文件路径，必须是绝对路径
        path: path.resolve(__dirname, "./dist")
    },
    // mode用来指定当前的构建环境：none development production
    // 默认为production
    mode: 'production',
    // webpack默认只支持.json和.js模块，不支持、不认识其它格式的模块
    // webpack会从配置的entry开始递归找出所有依赖的模块
    // 当webpack遇到不认识的模块时，需要在webpack中的module处进行配置
    // 当检测到是什么格式的模块，使用什么loader来处理
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader匹配顺序为从右到左,从下到上
                loader: ["style-loader", "css-loader"]
            },
            // file-loader：处理静态资源模块，txt,svg,csv,excel,图片资源等
            // {
            //     test: /\.(png|jpe?g|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name]-[hash].[ext]",
            //             // 打包后存放的位置
            //             outputPath: "images/"
            //         }
            //     }
            // },
            // url-loader：内部使用了file-loader，所以可以处理file-loader所有的事情
            // 但是遇到jpg格式的模块，会把该图片转换成base64格式字符串，并打包到js里
            // 对小体积的图片比较合适，大图片不合适
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:6].[ext]",
                        outputPath: "images/",
                        limit: 8 * 1024
                    }
                }
            },
            // less-loader：把less语法转换成css
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: "My App",
            filename: "index.html",
            template: "./src/index.html"
        })
    ]
};
