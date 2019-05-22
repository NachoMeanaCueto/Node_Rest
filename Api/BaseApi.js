const express = require('express');
const { tokenVerify } = require('../middleware/AuthInfrastructure');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(tokenVerify);

app.use(require('./IdentityApi'));
app.use(require('./ImagesApi'));
app.use(require('./UsersApi'));
app.use(require('./CategoryApi'));
app.use(require('./ProductApi'));
app.use(require('./UploadApi'));



module.exports = app;