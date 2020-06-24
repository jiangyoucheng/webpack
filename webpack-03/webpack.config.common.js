const path = require('path')

module.exports = {
    entry: "./src/index.js",
    
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
