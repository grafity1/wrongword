import React, { useEffect, useState } from 'react';
import WrongWordTable from './components/WrongWordTable';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/wrongwords')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Wrong Word List</h1>
      <WrongWordTable data={data} />
    </div>
  );
}

export default App;