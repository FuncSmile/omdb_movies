import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { useTranslation } from 'react-i18next';

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          🎬 {t('login.title')}
        </h1>
        <p className="text-center text-gray-600 mb-6">{t('login.subtitle')}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              {t('login.username')}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('login.usernamePlaceholder')}
              disabled={isLoading}
              className="input-base w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('login.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.passwordPlaceholder')}
              disabled={isLoading}
              className="input-base w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <div className="spinner" />}
            {isLoading ? t('login.loading') : t('login.submit')}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">{t('login.demoLabel')}</p>
          <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <p>👤 {t('login.username')}: <code className="font-mono font-bold text-primary">aldmic</code></p>
            <p>🔐 {t('login.password')}: <code className="font-mono font-bold text-primary">123abc123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
