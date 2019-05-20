const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { tokenVerify } = require('../middleware/AuthInfrastructure');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenVerify);

module.exports = app;