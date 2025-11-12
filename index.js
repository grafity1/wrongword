const express = require('express');
const path = require('path');
const app = express();
// Render가 제공하는 PORT 환경변수 사용 (없을 때는 로컬 테스트용 3000)
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// 정적 파일 경로
app.use(express.static(path.join(__dirname, 'public')));

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

// MongoDB 연결
//const MONGO_URI = 'mongodb+srv://<qdata>:<p@ngdang11>@clusterqzdb.4htxnn3.mongodb.net/<database>?retryWrites=true&w=majority';
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});