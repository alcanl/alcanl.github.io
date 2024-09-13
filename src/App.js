import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function App() {
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
    return <div>Welcome to the Home Page</div>;
}

function TokenPage() {
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log("Current location:", location);
        const queryParams = new URLSearchParams(location.search);
        const eMail = queryParams.get('eMail');
        const token = queryParams.get('token');

        console.log("eMail:", eMail);
        console.log("Token:", token);

        if (token && eMail) {
            // Yönlendirme yapıyoruz
            console.log("test")
            window.location.href = `http://localhost:50531/api/ear-technic/auth/reset-password?eMail=${eMail}&token=${token}`;
        } else {
            // Token veya eMail bulunamazsa hata mesajı gösteriyoruz
            setErrorMessage('Token or eMail not found in the URL.');
        }
    }, [location.search]);

    return (
        <div>
            <p id="error-message">{errorMessage}</p>
        </div>
    );
}

export default App;
