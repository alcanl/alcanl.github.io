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
}

function TokenPage() {
  console.log("TEST")
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      console.log("useEffect triggered");
      const hashParams = new URLSearchParams(location.hash.split('?')[1]);
      const eMail = hashParams.get('eMail');
      const token = hashParams.get('token');

      console.log("Hash Params:", { eMail, token });

      if (token && eMail) {
          window.location.href = `http://localhost:50531/api/ear-technic/auth/reset-password?eMail=${eMail}&token=${token}`;
      } else {
          setErrorMessage('404 not found');
      }
  }, [location.hash]);

  return (
      <div>
          <p id="error-message">{errorMessage}</p>
      </div>
  );
}

export default App;
