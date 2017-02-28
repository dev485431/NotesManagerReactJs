var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './react-app/index.js',
        "babel-polyfill"
    ],
    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'app.min.js',
        publicPath: '/public/js/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: path.join(__dirname, 'react-app')
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'react-app')
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ],
                options: { modules: true },
                include: path.join(__dirname, 'public/css')
            }]
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    }
};
