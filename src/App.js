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
    TokenPage(); 
}

function TokenPage() {
  console.log("TEST");
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      console.log("useEffect triggered");

      const pathname = location.pathname;
      console.log("Pathname:", pathname);
      const token = pathname.substring(pathname.lastIndexOf('/') + 1);
      console.log("Extracted token:", token);

      if (token) {
          window.location.href = `http://192.168.2.143:50531/api/ear-technic/auth/reset-password?token=${token}`;
      } else {
          setErrorMessage('404 not found');
      }
  }, [location.pathname]);

  return (
      <div>
          <p id="error-message">{errorMessage}</p>
      </div>
  );
}

export default App;
