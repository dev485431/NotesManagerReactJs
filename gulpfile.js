"use strict";

const gulp = require("gulp");
const path = require("path");
const gutil = require("gulp-util");
const webpack = require("webpack");
const devWebpackConfig = require("./webpack.config");
const prodWebpackConfig = require("./webpack.config.prod");
const express = require("express");

const postcss  = require("gulp-postcss");
const cssnano = require("cssnano");

gulp.task("serve", () => {
    let compiler = webpack(devWebpackConfig);
    let app = express();
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: devWebpackConfig.output.publicPath,
        historyApiFallback: true,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
    app = require("./server/routing")(app, __dirname);
    app.listen(3000, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log('Listening at http://localhost:3000/');
    })
});

gulp.task("build", (c)=> {
    let compiler = webpack(prodWebpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);

        }
        gutil.log("[webpack]", stats.toString({}));
        c();
    })
});

gulp.task("css",()=>{
    let processors = [
        cssnano
    ];
    gulp.src("./assets/css/*.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest("./public/css"))
})
gulp.task("css_watch", ()=>{
    gulp.watch("./assets/css/*.css", ["css"])
})