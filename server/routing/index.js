const express = require("express");
var path = require('path');
const axios = require("axios");


let server = axios.create({
    baseURL: 'http://localhost:3001'
});

const FOLDER_LIST = "/directories";

module.exports = (app, dir) => {
    "use strict";

    app.use("/public", express.static(path.join(dir, 'public')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(dir, 'public', 'index.html'));
    });

    app.get(FOLDER_LIST, (req, res) => {
        server.get(FOLDER_LIST)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    })

    return app
};
