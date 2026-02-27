import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { useTranslation } from 'react-i18next';

export function Navigation() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isLoginPage = location.pathname === '/login';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'id' : 'en';
    i18n.changeLanguage(newLang);
  };

  if (isLoginPage) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎬</span>
            <h2 className="text-xl font-bold text-white">OMDb Movies</h2>
          </div>

          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li>
              <button
                onClick={() => navigate('/movies')}
                className={`transition-colors duration-300 font-medium ${
                  isActive('/movies')
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {t('nav.movies')}
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/favorites')}
                className={`transition-colors duration-300 font-medium ${
                  isActive('/favorites')
                    ? 'text-white border-b-2 border-blue-400'
                    : 'text-gray-200 hover:text-white'
                }`}
              >
                {t('nav.favorites')}
              </button>
            </li>
            <li>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white transition-colors duration-300 font-medium"
              >
                {i18n.language === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
              </button>
            </li>
            {user && (
              <li className="flex items-center gap-4 pl-4 border-l border-blue-700">
                <span className="text-white font-medium">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-300 font-medium"
                >
                  {t('nav.logout')}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
