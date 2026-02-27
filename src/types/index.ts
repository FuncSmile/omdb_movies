export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  imdbVotes: string;
  Response: string;
}

export interface MovieSearchResponse {
  Search?: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface Favorite {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
  addedAt: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (imdbID: string) => void;
  isFavorited: (imdbID: string) => boolean;
}
