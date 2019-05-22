const express = require('express');
const app = express();



app.use(require('./UsersApi'));
app.use(require('./CategoryApi'));
app.use(require('./ProductApi'));
app.use(require('./IdentityApi'));



module.exports = app;