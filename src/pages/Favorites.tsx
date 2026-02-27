import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import '../styles/Favorites.css';

export function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleRemove = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    removeFavorite(movieId);
  };

  return (
    <div className="favorites-container">
      <h1>{t('favorites.title')}</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>{t('favorites.empty')}</h2>
          <p>{t('favorites.emptyDescription')}</p>
          <button onClick={() => navigate('/movies')} className="explore-button">
            {t('favorites.explorMovies')}
          </button>
        </div>
      ) : (
        <>
          <p className="favorites-count">
            {t('favorites.count', { count: favorites.length })}
          </p>
          <div className="favorites-grid">
            {favorites.map(favorite => (
              <div
                key={favorite.imdbID}
                className="favorite-card"
                onClick={() => handleMovieClick(favorite.imdbID)}
              >
                <div className="favorite-poster-container">
                  {favorite.poster && favorite.poster !== 'N/A' ? (
                    <img
                      src={favorite.poster}
                      alt={favorite.title}
                      className="favorite-poster"
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-poster">{t('favorites.noPosterAvailable')}</div>
                  )}
                </div>
                <div className="favorite-info">
                  <h3 className="favorite-title">{favorite.title}</h3>
                  <p className="favorite-year">{favorite.year}</p>
                  <button
                    className="remove-btn"
                    onClick={(e) => handleRemove(e, favorite.imdbID)}
                    title={t('favorites.removeFromFavorites')}
                  >
                    🗑️ {t('favorites.remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
