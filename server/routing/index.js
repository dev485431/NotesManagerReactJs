const express = require("express");
var path = require('path');
const axios = require("axios");
var bodyParser = require('body-parser')


let server = axios.create({
    baseURL: 'http://localhost:3001'
});

const FOLDERS_PATH = "/directories";
const NOTES_PATH = "/notices";

module.exports = (app, dir) => {
    "use strict";

    app.use("/public", express.static(path.join(dir, 'public')));
    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.sendFile(path.join(dir, 'public', 'index.html'));
    });

    // folders
    app.get(FOLDERS_PATH, (req, res) => {
        server.get(FOLDERS_PATH)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

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
    });

    app.delete(FOLDERS_PATH + "/:id", (req, res) => {
        let id = req.params.id;

        server.delete(FOLDERS_PATH + "/" + id)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

    app.put(FOLDERS_PATH + "/:id", (req, res) => {
        let id = req.params.id;

        server.put(FOLDERS_PATH + "/" + id, {
            id: req.body.id,
            parentId: req.body.parentId,
            name: req.body.name
        })
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

    // notes
    app.get(NOTES_PATH, (req, res) => {
        server.get(NOTES_PATH)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

    app.post(NOTES_PATH, (req, res) => {
        server.post(NOTES_PATH, {
            directoryId: req.body.directoryId,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags
        })
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

    app.delete(NOTES_PATH + "/:id", (req, res) => {
        let id = req.params.id;

        server.delete(NOTES_PATH + "/" + id)
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });

    app.put(NOTES_PATH + "/:id", (req, res) => {
        let id = req.params.id;

        server.put(NOTES_PATH + "/" + id, {
            id: req.body.id,
            directoryId: req.body.directoryId,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags,
            position: req.body.position
        })
            .then((data) => {
                res.json(data.data)
            })
            .catch(data => {
                res.status(400).json(data.response.data)
            });
    });


    return app
};
