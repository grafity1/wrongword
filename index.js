const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const PORT = 3000; // 원하는 포트 직접 지정
const MONGODB_URI = 'mongodb+srv://qdata:p%40ngdang11@clusterqzdb.4htxnn3.mongodb.net/qdb'; // URI 직접 입력

// MongoDB 연결
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 모델 정의
const WrongWord = mongoose.model('wrongword', new mongoose.Schema({
  wordid: String,
  wrongname: String,
  rightname: String
}), 'wrongword');

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'public')));

// 홈 라우트
app.get('/', async (req, res) => {
  try {
    const data = await WrongWord.find();
    let html = `
      <h1>Wrong Word List</h1>
      <table border="1" cellpadding="8">
        <tr><th>ID</th><th>잘못된 단어</th><th>올바른 단어</th></tr>
        ${data.map(d => `<tr><td>${d.wordid}</td><td>${d.wrongname}</td><td>${d.rightname}</td></tr>`).join('')}
      </table>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send('❌ DB 조회 오류: ' + err.message);
  }
});

// 서버 실행
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
