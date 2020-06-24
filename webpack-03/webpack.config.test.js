const merge = require("webpack-merge")
const commonConfig = require("./webpack.config.common.js")
const devConfig = require("./webpack.config.dev.js")
const proConfig = require("./webpack.config.pro.js")

module.exports = env => {
    if (env && env.production) {
        return merge(commonConfig, proConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}