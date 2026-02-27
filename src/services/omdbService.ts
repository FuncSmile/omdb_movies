import axios from 'axios';
import type { MovieSearchResponse, MovieDetail } from '../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'eefb70be';
const BASE_URL = 'https://www.omdbapi.com/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export const omdbService = {
  searchMovies: async (searchQuery: string, page: number = 1): Promise<MovieSearchResponse> => {
    try {
      const response = await apiClient.get<MovieSearchResponse>('', {
        params: {
          s: searchQuery,
          type: 'movie',
          page,
        },
      });
      return response.data;
    } catch {
      throw new Error('Failed to search movies');
    }
  },

  getMovieDetails: async (imdbID: string): Promise<MovieDetail> => {
    try {
      const response = await apiClient.get<MovieDetail>('', {
        params: {
          i: imdbID,
          plot: 'full',
        },
      });
      return response.data;
    } catch {
      throw new Error('Failed to fetch movie details');
    }
  },

  searchByType: async (searchQuery: string, type: 'movie' | 'series' | 'episode' = 'movie', page: number = 1): Promise<MovieSearchResponse> => {
    try {
      const response = await apiClient.get<MovieSearchResponse>('', {
        params: {
          s: searchQuery,
          type,
          page,
        },
      });
      return response.data;
    } catch {
      throw new Error('Failed to search movies by type');
    }
  },
};
