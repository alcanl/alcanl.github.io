import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, useParams, useNavigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:token" element={<TokenPage />} />
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

function HomePage() {
    return <div>Welcome to the Home Page</div>;
}

function TokenPage() {
    const { token } = useParams();  // URL'den token'ı al
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (token) {
            // Token varsa API'ye yönlendirme yap
            window.location.href = `http://localhost:50531/api/ear-technic/auth/reset-password/${token}`;
        } else {
            // Token yoksa hata mesajı göster
            setErrorMessage('Token not found in the URL path.');
        }
    }, [token]);

    return (
        <div>
            <p id="error-message">{errorMessage}</p>
        </div>
    );
}

export default App;
