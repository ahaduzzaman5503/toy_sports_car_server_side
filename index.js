const express = require('express');
const app = express();
const cors = require('cors')
const toycars = require('./toycar.json')
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is Running Now')
});

app.get('/toy', (req, res) => {
  res.send(toycars)
});

app.get('/toy/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const toy = toycars.find(toy => toy.id === id) || {};
  res.send(toy)
})

app.listen(port, () => {
  console.log(`Server side running on this port ${port}`)
})