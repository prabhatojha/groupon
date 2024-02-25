const express = require("express");
global.fetch = require('node-fetch');
var wikipediaAPI = require('./src/routes/wikipedia');
const cors = require('cors')
const app = express();
const port = 3002;

let corsOptions = {
  origin : ['http://localhost:3003'],
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/search', cors(corsOptions), wikipediaAPI);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
