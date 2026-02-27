import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import type { AuthContextType, FavoritesContextType } from '../types';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
