# webpack性能优化

## 缩小文件范围Loader

优化loader配置：

* include： 需要被loader处理的文件或文件夹

* exclude：排除不需要处理的文件夹

* 推荐include

  ``````javascript
  include: path.resolve(__dirname, "./src")
  ``````

  

## 优化resolve.modules配置

`resolve.modules`用于配置webpack去哪些目录下寻找第三方模块，默认是`['node_modules']`

寻找第三方模块，默认是在当前项目目录下的`node_modules`里面去找，如果没有找到，就会去上一级目录`../mode_modules`找，再没有会去`../../node_modules`中找，以此类推，和node.js的模块寻找机制很类似。

如果我们的第三方模块都安装在了项目根目录下，就可以直接指明这个路径。

``````javascript
module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, "./node_modules")]
    }
}
``````



## 优化resolve.alias配置

`resolve.alias`配置通过别名来将原导入路径映射成一个新的导入路径。

以react为例，默认情况下，webpack会从入口文件`./node_modules/bin/react/index`开始递归解析和处理依赖的文件。我们可以直接指定文件，避免这处的耗时。

``````javascript
module.exports = {
    resolve: {
        alias: {
            react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
            "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
        }
    }
}
``````



## 优化resolve.extensions配置

`resolve.extensions`在导入语句没带文件后缀时，webpack会自动带上后缀后，去尝试查找是否存在。

默认值：

``````javascript
extensions: ['.js', '.json', '.jsx', '.ts']
``````

* 后缀尝试列表尽量的小

* 导入语句尽量带上后缀

  

## 使用externals优化cdn静态资源

我们可以将一些`JS`文件存储在`CDN`上（减少`webpack`打包出来的js体积），在`index.html`中通过标签引入。

``````html
<body>
    <div id="app"></div>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
</body>
``````

我们希望在使用时，仍然通过`import`的方式去引用（如`import $ from 'jquery'`），并且希望`webpack`不会对其进行打包，此时就可以配置`externals`。

``````javascript
module.exports = {
    externals: {
        "jquery": "jQuery"
    }
}
``````



## 使用静态资源路径publicPath(CDN)

CDN通过将资源部署到世界各地，使得用户可以就近访问资源，加快访问速度。要接入CDN，需要把网页的静态资源上传到CDN服务器上，在访问这些资源时，使用CDN服务提供的URL。

``````javascript
module.exports = {
    output: {
        publickPath: "//cdnURL.com"  // 指定存放JS文件的CDN地址
    }
}
``````

* 公司得有CDN服务器
* 确保静态资源文件的上传与否



## CSS文件的处理

* 使用less或者sass当作css技术栈
* 使用postcss为样式自动补齐浏览器前缀



## 借助MiniCssExtractPlugin完成抽离css

如果不做抽取配置，我们的css是直接打包进js里面的，我们希望能单独生成css文件。因为单独生成css，css可以和js并行下载，提高页面加载效率。

``````javascript
npm install mini-css-extract-plugin -D

// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use:[
                    // "style-loader",  // 不再需要styloader，用MiniCssExtractPlugin.loader代替
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
            chunkFilename: "[id].css"
        })
    ]
}
``````



## 压缩CSS

* 借助 `optimize-css-assets-webpack-plugin`
* 借助 `caanano`

``````javascript
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        })
    ]
}
``````



## 压缩HTML

借助 `html-webpack-plugin`

``````javascript
module.exports = {
    plugins: [
        new htmlWebpackPlugin({
            title: "document",
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true,  // 删除空白符与换行符
                minifyCSS: true  // 压缩内联css
            }
        })
    ]
}
``````



## development vs production 模式区分打包

将生产环境和开发环境分开配置。

``````javascript
// webpack.config.common.js
module.exports = {
    // 公共配置
}

// webpack.config.dev.js
const merge = require("webpack-merge")
const commonConfig = require("./webpack.config.common.js")
const devConfig = {
    // 开发环境配置
}

module.exports = merge(commonConfig, devConfig)

// webpack.config.pro.js
const merge = require("webpack-merge")
const commonConfig = require("./webpack.config.common.js")
const proConfig = {
    // 生产环境配置
}

module.exports = merge(commonConfig, proConfig)

// package.js
"scripts": {
    "dev": "webpack-dev-server --config ./webpack.config.dev.js",
    "build": "webpack --config ./webpack.config.pro.js"
}
``````

### 基于环境变量区分

* 借助cross-env

``````
npm install cross-env -D
``````

* package里面配置命令脚本，传入参数

``````json
"test": "cross-env NODE_ENV=test webpack --config ./webpack.config.test.js"
``````

* 在webpack.config.js里拿到参数

``````javascript
process.env.NODE_ENV
``````

``````javascript
module.exports = env => {
    if(env && env.production) {
        return merge(commonConfig, proConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}
``````

