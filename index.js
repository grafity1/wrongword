const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Body parser
app.use(express.json()); // POST 요청 body 처리

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 모델 정의
const WrongWord = mongoose.model('wrongword', new mongoose.Schema({
  wordid: String,
  wrongname: String,
  rightname: String
}), 'wrongword');

// API 엔드포인트

// 단어 목록 조회
app.get('/api/wrongwords', async (req, res) => {
  try {
    const data = await WrongWord.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 단어 추가
app.post('/api/wrongwords', async (req, res) => {
  try {
    const { wrongname, rightname } = req.body;

    // DB에서 현재 최대 wordid 구하기
    const maxWord = await WrongWord.findOne().sort({ wordid: -1 }).exec();
    const newWordId = maxWord ? String(Number(maxWord.wordid) + 1) : '1'; // 첫번째 단어면 1

    const newWord = await WrongWord.create({
      wordid: newWordId,
      wrongname,
      rightname
    });

    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// React 빌드 파일 서빙
app.use(express.static(path.join(__dirname, 'client/build')));

// SPA fallback: 모든 React 경로 처리
// 정규식 대신 문자열 '*' 사용 가능
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// 서버 실행
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
