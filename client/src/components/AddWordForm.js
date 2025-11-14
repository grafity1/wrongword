import React, { useState } from 'react';
import axios from 'axios';

function AddWordForm({ onAdd }) {
  const [wrongword, setWrongword] = useState('');
  const [rightword, setRightword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wrongword || !rightword) return;

    try {
      const res = await axios.post('https://wrongword.onrender.com/api/wrongwords', {
        wrongword,
        rightword
      });

      setMessage(`단어 추가 완료! ID: ${res.data.wordid}`);
      setWrongword('');
      setRightword('');
      if (onAdd) onAdd(res.data); // 부모 컴포넌트에게 새 데이터 전달
    } catch (err) {
      console.error(err);
      setMessage('단어 추가 중 오류 발생');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>단어 추가</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>잘못된 단어:</label>
          <input
            type="text"
            value={wrongword}
            onChange={(e) => setWrongword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label>올바른 단어:</label>
          <input
            type="text"
            value={rightword}
            onChange={(e) => setRightword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>추가</button>
      </form>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
}

export default AddWordForm;