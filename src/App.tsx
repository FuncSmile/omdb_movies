import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Navigation } from './components/Navigation';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { MovieList } from './pages/MovieList';
import { MovieDetail } from './pages/MovieDetail';
import { Favorites } from './pages/Favorites';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <div className="app-container">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/movies"
                  element={
                    <ProtectedRoute>
                      <MovieList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/movie/:id"
                  element={
                    <ProtectedRoute>
                      <MovieDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/movies" replace />} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
