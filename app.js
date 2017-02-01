const express = require("express");

const routing  = require("./server/routing");

let app = express();

app = routing(app, __dirname);
app.listen(3000, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://localhost:3000/');
})
