require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const mongoDB = require('./src/databases/mongodb/index');

app.use(express.json())
app.use(cors());
const server = require('http').createServer(app);
app.use('/', require('./src/router'));
server.listen('8081', () => {
    console.log("Listening on port 8081");
    mongoDB.connect();
});
