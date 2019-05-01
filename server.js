require("./config/config");
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/user', function (req, res) {
  res.json('getUser')
});
 
app.post('/user', function (req, res) {
  let body = req.body;

  res.json({ body });
});

app.put('/user/:id', function (req, res) {
  let id = req.params.id;
  res.json({ id })
});

app.delete('/user/:id', function (req, res) {

  let id = req.params.id;

  res.json({ userToDelete: id })
});

app.listen(process.env.PORT, () => console.log(`Escuchando el puerto ${process.env.PORT}`))