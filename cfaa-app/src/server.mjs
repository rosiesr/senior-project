import express from "express";

const app = express();
const port = 2000;

app.get('/', (req, res) => {
  res.send('welcome to server');
});

app.get('/test', (req, res) => {
  res.send('hit the test endpoint!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});