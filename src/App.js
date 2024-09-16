import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  console.log("App component loaded");
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<TokenPage />} />
          </Routes>
      </Router>
  );
}

function HomePage() {
    TokenPage()
    return <div>Redirecting</div>;
}

function TokenPage() {
  console.log("TEST");
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      console.log("useEffect triggered");

      // window.location.hash ile # sonrasını alıyoruz
      const hash = window.location.hash;
      console.log("Hash:", hash);

      // Eğer hash varsa token kısmını ayıklıyoruz
      const token = hash.substring(2); // #/ kısmını atlayarak token alınıyor
      console.log("Extracted token:", token);

      if (token) {
          window.location.href = `http://192.168.2.143:50531/api/ear-technic/auth/reset-password?token=${token}`;
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
