require("./Config/Config");
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/User', function (req, res) {
  res.json('getUser')
});
 
app.post('/User', function (req, res) {
  let body = req.body;

  res.json(body)
});

app.put('/User/:id', function (req, res) {
  let id = req.params.id;
  res.json({ id })
});

app.delete('/User/:id', function (req, res) {
  res.json('deleteUser')
});

app.listen(process.env.port, () => console.log(`Escuchando el puerto ${process.env.port}`))