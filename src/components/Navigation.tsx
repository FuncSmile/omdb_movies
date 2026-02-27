import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import '../styles/Navigation.css';

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>🎬 OMDb Movies</h2>
        </div>

        <ul className="navbar-menu">
          <li>
            <button
              onClick={() => navigate('/movies')}
              className={`nav-link ${location.pathname === '/movies' ? 'active' : ''}`}
            >
              {t('nav.movies')}
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/favorites')}
              className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              {t('nav.favorites')}
            </button>
          </li>
          <li>
            <button onClick={toggleLanguage} className="nav-link language-toggle">
              {i18n.language === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
            </button>
          </li>
          {user && (
            <li className="user-info">
              <span>{user.username}</span>
              <button onClick={handleLogout} className="nav-link logout-btn">
                {t('nav.logout')}
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
