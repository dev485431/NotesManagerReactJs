const express = require("express");
var path = require('path');
const axios = require("axios");
var bodyParser = require('body-parser')


let server = axios.create({
    baseURL: 'http://localhost:3001'
});

const FOLDERS_PATH = "/directories";

module.exports = (app, dir) => {
    "use strict";

    app.use("/public", express.static(path.join(dir, 'public')));
    app.use( bodyParser.json() );

    app.get('/', (req, res) => {
        res.sendFile(path.join(dir, 'public', 'index.html'));
    });

    app.get(FOLDERS_PATH, (req, res) => {
        server.get(FOLDERS_PATH)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    })

    app.post(FOLDERS_PATH, (req, res) => {
        server.post(FOLDERS_PATH, {
            parentId: req.body.parentId,
            name: req.body.name
        })
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    })

    return app
};
