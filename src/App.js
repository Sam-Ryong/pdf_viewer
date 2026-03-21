import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// 스타일 기본 적용 (버전에 따라 경로가 다를 수 있으나 최신 기준 esm 사용)
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// PDF.js 워커 CDN 연결 (CRA 환경 에러 방지용)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '30px 0' }}>
      
      <a href="/portfolio.pdf" download="백엔드_포트폴리오.pdf" style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
        포트폴리오 원본 다운로드
      </a>

      <Document
        file="/portfolio.pdf" // public 폴더 기준 경로
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div style={{ padding: '20px' }}>PDF를 불러오는 중입니다...</div>}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <div key={`page_${index + 1}`} style={{ marginBottom: '20px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <Page 
              pageNumber={index + 1} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={800} // 데스크탑 기준 너비 (원하시는 대로 조절하세요)
            />
          </div>
        ))}
      </Document>
    </div>
  );
}

export default App;