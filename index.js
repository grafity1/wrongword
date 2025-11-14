const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

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
app.get('/api/wrongwords', async (req, res) => {
  try {
    const data = await WrongWord.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// React 빌드 파일 서빙
app.use(express.static(path.join(__dirname, 'client/build')));

// SPA fallback (모든 React 라우트 처리)
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 서버 실행
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
