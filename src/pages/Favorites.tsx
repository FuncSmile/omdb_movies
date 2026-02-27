import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{t('favorites.title')}</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">{t('favorites.empty')}</h2>
          <p className="text-gray-500 mb-6">{t('favorites.emptyDescription')}</p>
          <button
            onClick={() => navigate('/movies')}
            className="btn-primary"
          >
            {t('favorites.explorMovies')}
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6 text-sm">
            {t('favorites.count', { count: favorites.length })}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(favorite => (
              <div
                key={favorite.imdbID}
                className="card cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleMovieClick(favorite.imdbID)}
              >
                <div className="relative w-full bg-gray-200 overflow-hidden" style={{ paddingBottom: '150%' }}>
                  {favorite.poster && favorite.poster !== 'N/A' ? (
                    <img
                      src={favorite.poster}
                      alt={favorite.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600">
                      {t('favorites.noPosterAvailable')}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{favorite.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{favorite.year}</p>
                  <button
                    className="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-300 text-sm font-medium"
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
