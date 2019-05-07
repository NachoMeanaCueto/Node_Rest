require("./config/config");
const express = require('express');

const mongoose = require('mongoose');
const userApi = require('./Api/UsersApi');

const app = express();


app.use(userApi);


mongoose.connect('mongodb://localhost:27017/cafe', {useNewUrlParser: true}, (err, res) => {

      if(err)
        throw new Error(err);

      console.log("Database Online");
});

app.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`))