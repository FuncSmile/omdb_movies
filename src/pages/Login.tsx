import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import '../styles/Login.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(username, password);
      if (success) {
        navigate('/movies');
      } else {
        setError(t('login.invalidCredentials'));
      }
    } catch {
      setError(t('login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">{t('login.title')}</h1>
        <p className="login-subtitle">{t('login.subtitle')}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t('login.username')}</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('login.usernamePlaceholder')}
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.passwordPlaceholder')}
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <button type="submit" disabled={isLoading} className="login-button">
            {isLoading ? t('login.loading') : t('login.submit')}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-label">{t('login.demoLabel')}</p>
          <p>👤 {t('login.username')}: <code>aldmic</code></p>
          <p>🔐 {t('login.password')}: <code>123abc123</code></p>
        </div>
      </div>
    </div>
  );
}
