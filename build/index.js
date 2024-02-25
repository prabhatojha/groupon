var express = require("express");
global.fetch = require('node-fetch');
var wikipediaAPI = require('./src/routes/wikipedia');
var cors = require('cors');
var app = express();
var port = 3002;
var corsOptions = {
    origin: ['http://localhost:3003'],
};
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use('/api/search', cors(corsOptions), wikipediaAPI);
app.listen(port, function () {
    console.log("App listening on port ".concat(port, "!"));
});
