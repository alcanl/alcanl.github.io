import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, redirect } from 'react-router-dom';
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
    const token = hash.substring(2);

    if (token) {
      fetch(`${config.apiUrl}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apiAuthKey': config.apiKey,
        },
        mode: 'cors',
      })
      .then(response => {
        if (response.redirected)
          window.location.href = response.url;
        else if (!response.ok)
          setErrorMessage(response.text())
        else {
          response.text().then(data => {
            if (data.includes('<!DOCTYPE html>'))
              setHtmlErrorContent(data);
          })
        }
      })
      .catch(error => {
        console.error('Error occurred while fetching the data:', error);
        setErrorMessage('An unknown error occurred, please try later.');
      });
    } else {
      setErrorMessage('Invalid try for password reset transaction.');
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
