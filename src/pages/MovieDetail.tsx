import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { omdbService } from '../services/omdbService';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import type { MovieDetail as MovieDetailType, Movie } from '../types';
import '../styles/MovieDetail.css';

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
      <div className="movie-detail-container">
        <div className="loading-indicator">{t('movieDetail.loading')}</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-detail-container">
        <div className="error-message">{error || t('movieDetail.notFound')}</div>
        <button onClick={() => navigate('/movies')} className="back-button">
          {t('movieDetail.backToList')}
        </button>
      </div>
    );
  }

  return (
    <div className="movie-detail-container">
      <button onClick={() => navigate('/movies')} className="back-button">
        ← {t('movieDetail.backToList')}
      </button>

      <div className="movie-detail-content">
        <div className="movie-detail-poster">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={movie.Title} className="detail-poster-image" />
          ) : (
            <div className="no-poster">{t('movieDetail.noPosterAvailable')}</div>
          )}
          <button
            className={`favorite-btn-detail ${isFavorited(movie.imdbID) ? 'favorited' : ''}`}
            onClick={handleAddFavorite}
          >
            ♥ {isFavorited(movie.imdbID) ? t('movieDetail.inFavorites') : t('movieDetail.addToFavorites')}
          </button>
        </div>

        <div className="movie-detail-info">
          <h1>{movie.Title}</h1>
          <p className="rating">⭐ {movie.imdbRating}/10</p>

          <div className="detail-grid">
            <div className="detail-item">
              <label>{t('movieDetail.year')}:</label>
              <span>{movie.Year}</span>
            </div>
            <div className="detail-item">
              <label>{t('movieDetail.rated')}:</label>
              <span>{movie.Rated}</span>
            </div>
            <div className="detail-item">
              <label>{t('movieDetail.runtime')}:</label>
              <span>{movie.Runtime}</span>
            </div>
            <div className="detail-item">
              <label>{t('movieDetail.genre')}:</label>
              <span>{movie.Genre}</span>
            </div>
            <div className="detail-item">
              <label>{t('movieDetail.director')}:</label>
              <span>{movie.Director}</span>
            </div>
            <div className="detail-item">
              <label>{t('movieDetail.writer')}:</label>
              <span>{movie.Writer}</span>
            </div>
            <div className="detail-item full-width">
              <label>{t('movieDetail.actors')}:</label>
              <span>{movie.Actors}</span>
            </div>
            <div className="detail-item full-width">
              <label>{t('movieDetail.country')}:</label>
              <span>{movie.Country}</span>
            </div>
            <div className="detail-item full-width">
              <label>{t('movieDetail.language')}:</label>
              <span>{movie.Language}</span>
            </div>
            <div className="detail-item full-width">
              <label>{t('movieDetail.awards')}:</label>
              <span>{movie.Awards}</span>
            </div>
          </div>

          <div className="plot-section">
            <h2>{t('movieDetail.plot')}:</h2>
            <p>{movie.Plot}</p>
          </div>

          <div className="votes-section">
            <p>{t('movieDetail.votes')}: {movie.imdbVotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
