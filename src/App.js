function TokenPage() {
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const eMail = queryParams.get('eMail');
      const token = queryParams.get('token');

      if (token && eMail) {
          const redirectUrl = `http://localhost:50531/api/ear-technic/auth/reset-password?eMail=${eMail}&token=${token}`;
          console.log('Redirecting to:', redirectUrl);
          window.location.href = redirectUrl;
      } else {
          setErrorMessage('Token or eMail not found in the URL.');
      }
  }, [location.search]);

  return (
      <div>
          <p id="error-message">{errorMessage}</p>
      </div>
  );
}
