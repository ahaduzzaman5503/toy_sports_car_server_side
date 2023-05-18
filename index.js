const express = require('express');
const app = express();
const port = 5000;


app.get('/', (req, res) => {
  res.send('Server is Running Now')
});

app.listen(port, () => {
  console.log(`Server side running on this port ${port}`)
})