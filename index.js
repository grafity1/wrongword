const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;// MongoDB 연결

const MONGO_URI = process.env.MONGO_URI; //mongodb+srv://<qdata>:<p@ngdang11>@clusterqzdb.4htxnn3.mongodb.net/<database>?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// 데이터 모델 정의 (Schema)
const wrongwordSchema = new mongoose.Schema({
  wordid: String,
  wrongname: String,
  rightname: String,
});

const WrongWord = mongoose.model('wrongword', wrongwordSchema, 'wrongword'); 

// 정적 파일 경로
app.use(express.static(path.join(__dirname, 'public')));

// API 라우트 (데이터 조회)
app.get('/api/words', async (req, res) => {
  try {
    const words = await WrongWord.find();
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 오류' });
  }
});

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


// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});