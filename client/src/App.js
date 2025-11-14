import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WrongWordTable from './components/WrongWordTable';
import AddWordForm from './components/AddWordForm';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('table');
  const API_URL = 'https://wrongword.onrender.com'; // Render 배포 URL

  // 서버에서 단어 목록 불러오기
  const fetchWords = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wrongwords`);
      setData(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div className="app-container">
      <h1>많이 틀리는 맞춤법</h1>

      <div className="tab-menu">
        <button
          className={activeTab === 'table' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('table')}
        >
          단어 목록
        </button>
        <button
          className={activeTab === 'add' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('add')}
        >
          단어 추가
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'table' && <WrongWordTable data={data} />}
        {activeTab === 'add' && <AddWordForm onAdd={(newWord) => setData([...data, newWord])} />}
      </div>
    </div>
  );
}

export default App;