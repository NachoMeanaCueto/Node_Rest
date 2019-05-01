require("../server/config/config");
const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
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