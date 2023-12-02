const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({message: 'Hi from the server!', app: 'Natours'});
});
app.post('/', (req, res) => {
  res.status(200).send('this is the post route');
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});