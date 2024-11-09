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
    const token = hash.substring(2);  

    if (token) {
      fetch(`${config.apiUrl}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'apiAuthKey': config.apiKey
        },
        mode: 'cors'
      })
      .then(response => {
        return response.text(); 
      })
      .then(data => {
       
        if (data.includes('<html')) {
         
          setHtmlErrorContent(data);
        } else {
    
          const jsonData = JSON.parse(data);

          if (jsonData.error) {
            setErrorMessage(jsonData.error);
          }
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('There was an error with the request.');
      });

    } else {
      setErrorMessage('Token not found in URL.');
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

