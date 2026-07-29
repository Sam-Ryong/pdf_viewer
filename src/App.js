import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // 현재 URL 경로 확인
  const isMeeting = window.location.pathname === '/meeting';

  // /meeting 이면 meeting.pdf, 나머지는 portfolio.pdf
  const pdfPath = isMeeting ? '/meeting.pdf' : '/portfolio.pdf';

  const downloadFileName = isMeeting
    ? 'meeting.pdf'
    : '백엔드_포트폴리오.pdf';

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
        padding: width > 600 ? '30px 0' : '10px 0',
      }}
    >
      <a
        href={pdfPath}
        download={downloadFileName}
        style={{
          marginBottom: '20px',
          padding: width > 600 ? '10px 20px' : '8px 16px',
          backgroundColor: '#0070f3',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: width > 600 ? '16px' : '14px',
        }}
      >
        {isMeeting ? 'Meeting PDF 원본 다운로드' : '포트폴리오 원본 다운로드'}
      </a>

      <Document
        file={pdfPath}
        externalLinkTarget="_blank"
        externalLinkRel="noopener noreferrer"
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div style={{ padding: '20px' }}>
            PDF를 불러오는 중입니다...
          </div>
        }
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div
            key={`page_${index + 1}`}
            style={{
              marginBottom: '20px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Page
              pageNumber={index + 1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={width > 800 ? 800 : width - 40}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}

export default App;
