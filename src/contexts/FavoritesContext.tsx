import React, { createContext, useState } from 'react';
import type { Favorite, Movie, FavoritesContextType } from '../types';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const addFavorite = (movie: Movie) => {
    const newFavorite: Favorite = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      addedAt: Date.now(),
    };

    setFavorites(prev => {
      if (prev.some(fav => fav.imdbID === movie.imdbID)) {
        return prev;
      }
      const updated = [...prev, newFavorite];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (imdbID: string) => {
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.imdbID !== imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorited = (imdbID: string): boolean => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}
