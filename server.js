require("./config/config");
const express = require('express');
const mongoose = require('mongoose');
const app = require('./Api/BaseApi');
const path = require('path');

app.use(express.static(path.resolve(__dirname , 'public')));

mongoose.connect( process.env.ConnectionString, {useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

      if(err)
        throw new Error(err);

      console.log("Database Online");
});

app.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`))