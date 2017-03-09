var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './react-app/index.js',
        "babel-polyfill"
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'app.min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),

    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'react-app')
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?modules&camelCase'],
                include: path.join(__dirname, 'public/css')
            }
        ]
    }
};
