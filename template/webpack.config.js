const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        app: [path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        }]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        overlay: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin()
    ]
}