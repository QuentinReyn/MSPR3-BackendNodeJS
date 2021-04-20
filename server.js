const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // This will help in encoding.
app.use(bodyParser.json()); // this will support json format

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});