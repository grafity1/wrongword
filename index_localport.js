const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Home 페이지 라우트
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

// About 페이지 라우트
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

// Product 페이지 라우트
app.get('/product', (req, res) => {
  res.sendFile(__dirname + '/public/product.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});