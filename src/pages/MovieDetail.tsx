import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { omdbService } from '../services/omdbService';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import type { MovieDetail as MovieDetailType, Movie } from '../types';

export function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addFavorite, isFavorited } = useFavorites();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) return;

      setIsLoading(true);
      setError('');

      try {
        const data = await omdbService.getMovieDetails(id);
        if (data.Response === 'False') {
          setError(t('movieDetail.notFound'));
        } else {
          setMovie(data);
        }
      } catch {
        setError(t('movieDetail.fetchError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, t]);

  const handleAddFavorite = () => {
    if (movie) {
      const favoriteMovie: Movie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster,
      };
      addFavorite(favoriteMovie);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12 gap-2">
          <div className="spinner"></div>
          <span className="text-gray-600">{t('movieDetail.loading')}</span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          {error || t('movieDetail.notFound')}
        </div>
        <button
          onClick={() => navigate('/movies')}
          className="btn-secondary"
        >
          ← {t('movieDetail.backToList')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/movies')}
        className="mb-6 px-4 py-2 text-primary hover:text-secondary font-medium transition-colors"
      >
        ← {t('movieDetail.backToList')}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="card p-0 overflow-hidden">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full aspect-video bg-gray-300 flex items-center justify-center text-gray-600">
                {t('movieDetail.noPosterAvailable')}
              </div>
            )}
          </div>
          <button
            className={`mt-4 w-full btn-primary ${isFavorited(movie.imdbID) ? 'bg-red-500 hover:bg-red-600' : ''}`}
            onClick={handleAddFavorite}
          >
            ♥ {isFavorited(movie.imdbID) ? t('movieDetail.inFavorites') : t('movieDetail.addToFavorites')}
          </button>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{movie.Title}</h1>
          <p className="text-2xl text-yellow-500 font-semibold mb-6">⭐ {movie.imdbRating}/10</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.year')}</p>
              <p className="text-gray-800">{movie.Year}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.rated')}</p>
              <p className="text-gray-800">{movie.Rated}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.runtime')}</p>
              <p className="text-gray-800">{movie.Runtime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.genre')}</p>
              <p className="text-gray-800">{movie.Genre}</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.director')}</p>
              <p className="text-gray-800">{movie.Director}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.writer')}</p>
              <p className="text-gray-800">{movie.Writer}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.actors')}</p>
              <p className="text-gray-800">{movie.Actors}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.country')}</p>
              <p className="text-gray-800">{movie.Country}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.language')}</p>
              <p className="text-gray-800">{movie.Language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">{t('movieDetail.awards')}</p>
              <p className="text-gray-800">{movie.Awards}</p>
            </div>
          </div>

          <div className="card p-6 bg-blue-50">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{t('movieDetail.plot')}</h2>
            <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            {t('movieDetail.votes')}: <span className="font-semibold text-gray-800">{movie.imdbVotes}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
