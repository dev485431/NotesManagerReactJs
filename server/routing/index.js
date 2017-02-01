const express = require("express");
var path = require('path');
const axios = require("axios");








module.exports = (app, dir) => {
    "use strict";

    app.use("/public", express.static(path.join(dir, 'public')));

    app.get('/', function (req, res) {
        res.sendFile(path.join(dir, 'public', 'index.html'));
    });

    return app
};
