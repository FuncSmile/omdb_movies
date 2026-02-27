import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { omdbService } from '../services/omdbService';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import type { Movie } from '../types';
import '../styles/MovieList.css';

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('movie');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const navigate = useNavigate();
  const { addFavorite, isFavorited } = useFavorites();
  const { t } = useTranslation();
  const observerTarget = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isSearching) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, isSearching]);

  // Fetch movies
  const fetchMovies = useCallback(async (query: string, pageNum: number, reset: boolean = false) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await omdbService.searchMovies(query, pageNum);

      if (response.Response === 'False') {
        setError(response.Error || t('movieList.noMoviesFound'));
        if (reset) setMovies([]);
        setTotalResults(0);
        setHasMore(false);
      } else {
        const newMovies = response.Search || [];
        setMovies(prev => reset ? newMovies : [...prev, ...newMovies]);
        setTotalResults(parseInt(response.totalResults, 10));
        setHasMore(pageNum * 10 < parseInt(response.totalResults, 10));
      }
    } catch {
      setError(t('movieList.fetchError'));
      if (reset) setMovies([]);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [t]);

  // Handle search with debounce
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Wait 500ms after user stops typing before executing search
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      fetchMovies(query, 1, true);
    }, 500);
  };

  // Initial load
  useEffect(() => {
    fetchMovies(searchQuery, 1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more on page change
  useEffect(() => {
    if (page > 1 && !isSearching) {
      fetchMovies(searchQuery, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleAddFavorite = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    addFavorite(movie);
  };

  return (
    <div className="movie-list-container">
      <div className="search-header">
        <h1>{t('movieList.title')}</h1>
        <div className="search-box">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('movieList.searchPlaceholder')}
            className="search-input"
          />
          {isSearching && <div className="search-spinner"></div>}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {movies.length === 0 && !isLoading && !error && (
        <div className="empty-state">
          <h2>{t('movieList.empty')}</h2>
          <p>{t('movieList.emptyDescription')}</p>
        </div>
      )}

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(movie => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <div className="movie-poster-container">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="movie-poster lazy-load"
                    loading="lazy"
                  />
                ) : (
                  <div className="no-poster">{t('movieList.noPosterAvailable')}</div>
                )}
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
                <button
                  className={`favorite-btn ${isFavorited(movie.imdbID) ? 'favorited' : ''}`}
                  onClick={(e) => handleAddFavorite(e, movie)}
                  title={isFavorited(movie.imdbID) ? t('movieList.removeFromFavorites') : t('movieList.addToFavorites')}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isLoading && <div className="loading-indicator">{t('movieList.loading')}</div>}

      <div ref={observerTarget} className="scroll-observer" />

      {totalResults > 0 && (
        <p className="results-info">
          {t('movieList.resultCount', { count: movies.length, total: totalResults })}
        </p>
      )}
    </div>
  );
}
