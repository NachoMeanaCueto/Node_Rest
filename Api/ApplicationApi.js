const express = require('express');
const app = express();

app.use(require('./UsersApi'));
app.use(require('./IdentityApi'));


// app.use(require('../middleware/Auth'))

module.exports = app;