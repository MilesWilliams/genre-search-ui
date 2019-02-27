var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: '/build'
    },
    watch: true,
    module: {

    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
