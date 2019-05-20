require("./config/config");
const express = require('express');

const mongoose = require('mongoose');
const ApplicationApi = require('./Api/ApplicationApi');

// const app = express();


// app.use(ApplicationApi);


mongoose.connect( process.env.ConnectionString, {useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

      if(err)
        throw new Error(err);

      console.log("Database Online");
});

ApplicationApi.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`))