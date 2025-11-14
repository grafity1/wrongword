import React, { useState } from 'react';
import './WrongWordTable.css';

function WrongWordTable({ data }) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 한 페이지당 10개

  // data가 배열인지 확인, 아니라면 빈 배열로
  const safeData = Array.isArray(data) ? data : [];

  // 검색어 기준 필터링
  const filteredData = safeData.filter(d =>
    (d.wrongname || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.rightname || '').toLowerCase().includes(search.toLowerCase())
  );

  // 페이지 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // 페이지 이동
  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 검색 입력 */}
      <input
        type="text"
        placeholder="검색어 입력..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setCurrentPage(1); // 검색 시 1페이지로 초기화
        }}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}
      />

      {/* 테이블 */}
      <table className="wrongword-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>잘못된 단어</th>
            <th>올바른 단어</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(d => (
            <tr key={d.wordid}>
              <td>{d.wordid}</td>
              <td>{d.wrongname}</td>
              <td>{d.rightname}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && <p>검색 결과가 없습니다.</p>}

      {/* 페이지 네비게이션 */}
      {totalPages > 1 && (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button>
          <span style={{ margin: '0 10px' }}>
            {currentPage} / {totalPages}
          </span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default WrongWordTable;