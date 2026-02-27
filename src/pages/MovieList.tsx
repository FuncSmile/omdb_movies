import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { omdbService } from '../services/omdbService';
import { useFavorites } from '../utils/hooks';
import { useTranslation } from 'react-i18next';
import type { Movie } from '../types';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('movieList.title')}</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('movieList.searchPlaceholder')}
            className="input-base flex-1"
          />
          {isSearching && <div className="spinner"></div>}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}

      {movies.length === 0 && !isLoading && !error && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">{t('movieList.empty')}</h2>
          <p className="text-gray-500">{t('movieList.emptyDescription')}</p>
        </div>
      )}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {movies.map(movie => (
            <div
              key={movie.imdbID}
              className="card cursor-pointer overflow-hidden hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleMovieClick(movie.imdbID)}
            >
              <div className="relative w-full bg-gray-200 overflow-hidden" style={{ paddingBottom: '150%' }}>
                {movie.Poster && movie.Poster !== 'N/A' ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-600">
                    {t('movieList.noPosterAvailable')}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{movie.Title}</h3>
                <p className="text-sm text-gray-600 mb-3">{movie.Year}</p>
                <button
                  className={`text-2xl transition-colors duration-300 ${
                    isFavorited(movie.imdbID) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
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

      {isLoading && (
        <div className="flex items-center justify-center py-8 gap-2">
          <div className="spinner"></div>
          <span className="text-gray-600">{t('movieList.loading')}</span>
        </div>
      )}

      <div ref={observerTarget} className="py-4 text-center" />

      {totalResults > 0 && (
        <p className="text-center text-gray-600 text-sm">
          {t('movieList.resultCount', { count: movies.length, total: totalResults })}
        </p>
      )}
    </div>
  );
}
