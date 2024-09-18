import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import config from './config';

function App() {
  console.log("App component loaded");
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
    console.log("useEffect triggered");
    const hash = window.location.hash;
    console.log("Hash:", hash);
    const token = hash.substring(2);  
    console.log("Extracted token:", token);

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
        console.log("API response:", data);

    
        if (data.includes('<html')) {
         
          setHtmlErrorContent(data);
        } else {
    
          const jsonData = JSON.parse(data);
          console.log("JSON Data:", jsonData);

    
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

