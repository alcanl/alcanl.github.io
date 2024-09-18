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
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("API response:", data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('404 not found');
      });

    } else {
      setErrorMessage('404 not found');
    }
  }, []);

  return (
    <div>
      <p id="error-message">{errorMessage}</p>
    </div>
  );
}

export default App;
