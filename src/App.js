import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import config from './config';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return <TokenPage />;
}

function TokenPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [htmlErrorContent, setHtmlErrorContent] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash.substring(2); // URL hash parametresinden token'ı al

    if (token) {
      fetch(`${config.apiUrl}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apiAuthKey': config.apiKey,
        },
        mode: 'cors',
      })
      .then(response => response.text())
      .then(data => {
        if (data.includes('<html')) {
          // Eğer HTML içerik geldiyse hata mesajını göster
          setHtmlErrorContent(data);
        } else {
          // Gelen veri JSON ise ve bir redirect URL'si varsa
          const jsonData = JSON.parse(data);
          if (jsonData.error) {
            setErrorMessage(jsonData.error);
          } else if (jsonData.redirectUrl) {
            // Yönlendirme URL'si geldiyse, bunu window.location.href ile yönlendir
            window.location.replace = jsonData.redirectUrl;
          }
        }
      })
      .catch(error => {
        console.error('Fetch işlemi sırasında bir sorun oluştu:', error);
        setErrorMessage('İstek sırasında bir hata oluştu.');
      });
    } else {
      setErrorMessage('URL\'de token bulunamadı.');
    }
  }, []);

  if (htmlErrorContent) {
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlErrorContent }} />
    );
  }

  return (
    <div>
      {errorMessage && <p id="error-message">{errorMessage}</p>}
    </div>
  );
}

export default App;
