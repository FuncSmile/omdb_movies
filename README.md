# OMDb Movies - React Vite Application

A modern, fully-featured movie discovery application built with React and Vite, featuring authentication, favorites management, infinite scrolling, and multi-language support.

## 🎯 Features

### Core Features
- **Authentication System**: Secure login with username/password validation
- **Movie Search & Discovery**: Search millions of movies from OMDb API
- **Movie Details**: View comprehensive information about each movie
- **Infinite Scroll**: Auto-load more movies as you scroll down
- **Lazy Loading**: Optimize image loading with lazy load attributes
- **Favorites Management**: Add/remove movies to your personal favorites list
- **Multi-Language Support**: Toggle between English (EN) and Indonesian (ID)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Security
- Protected routes that require authentication
- Login credentials validation (aldmic / 123abc123)
- Session persistence with localStorage
- Error handling for invalid credentials

## 🏗️ Architecture

### Technology Stack

**Frontend Framework:**
- React 19.2.0 - UI library for building interactive components
- TypeScript 5.9 - Type-safe JavaScript development
- Vite 7.3.1 - Fast build tool and development server

**Routing & State Management:**
- React Router DOM 7.0.0 - Client-side routing and protected routes
- React Context API - Lightweight state management for auth and favorites

**HTTP Client:**
- Axios 1.7.0 - Promise-based HTTP client for API requests

**Internationalization:**
- i18next 24.1.0 - Framework for multi-language support
- react-i18next 15.0.2 - React bindings for i18next

**Styling:**
- CSS3 - Modern CSS with flexbox and grid layouts
- Responsive design with media queries

### Folder Structure

```
src/
├── components/              # Reusable React components
│   ├── Navigation.tsx       # Top navigation bar with language toggle
│   └── ProtectedRoute.tsx   # Higher-order component for auth protection
├── contexts/                # React Context for state management
│   ├── AuthContext.tsx      # Authentication context and provider
│   └── FavoritesContext.tsx # Favorites management context
├── pages/                   # Page components
│   ├── Login.tsx            # Login page
│   ├── MovieList.tsx        # Movie list with infinite scroll
│   ├── MovieDetail.tsx      # Movie details page
│   └── Favorites.tsx        # Favorites list page
├── services/                # API services
│   └── omdbService.ts       # OMDb API integration
├── types/                   # TypeScript types/interfaces
│   └── index.ts             # All type definitions
├── utils/                   # Utility functions and hooks
│   └── hooks.ts             # Custom React hooks
├── styles/                  # CSS stylesheets
│   ├── Navigation.css
│   ├── Login.css
│   ├── MovieList.css
│   ├── MovieDetail.css
│   └── Favorites.css
├── locales/                 # Internationalization (i18n)
│   ├── i18n.ts              # i18n configuration
│   ├── en.json              # English translations
│   └── id.json              # Indonesian translations
├── App.tsx                  # Main app component with routing
├── index.css                # Global styles
└── main.tsx                 # Application entry point
```

### Data Flow

1. **Authentication Flow**:
   - User enters credentials on Login page
   - AuthContext validates against stored credentials
   - On success, auth token is saved to localStorage
   - User is redirected to Movie List page
   - All protected routes check auth status via ProtectedRoute component

2. **Movie Search Flow**:
   - User types in search box (with debouncing)
   - MovieList component calls omdbService.searchMovies()
   - Results are fetched from OMDb API
   - Movies are displayed in a grid with poster images
   - Intersection Observer triggers loading of next page (infinite scroll)

3. **Favorites Management Flow**:
   - User clicks heart icon on movie card
   - FavoritesContext adds movie to favorites array
   - Data is persisted to localStorage
   - Favorites page displays all saved movies
   - User can remove favorites anytime

## 📦 Libraries & Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| React | ^19.2.0 | UI Library |
| React DOM | ^19.2.0 | React DOM rendering |
| React Router DOM | ^7.0.0 | Client-side routing |
| TypeScript | ~5.9.3 | Type checking |
| Vite | ^7.3.1 | Build tool & dev server |
| Axios | ^1.7.0 | HTTP client |
| i18next | ^24.1.0 | Internationalization |
| react-i18next | ^15.0.2 | i18next React bindings |
| ESLint | ^9.39.1 | Code linting |

## 🔐 Authentication

**Demo Credentials:**
- Username: `aldmic`
- Password: `123abc123`

The application uses a simple credential-based authentication system for demonstration purposes. Credentials are validated against hardcoded values and a session token is stored in localStorage.

## 🌍 Multi-Language Support

The application supports two languages:
- **English (EN)** - Default language
- **Indonesian (ID)** - Available via language toggle in navigation

Language preference is saved in localStorage and persists across sessions.

### Translation Scope
- ✅ Static UI text (buttons, labels, messages)
- ❌ OMDb API response data (titles, descriptions, actor names remain in original language)

## 🎬 OMDb API Integration

**API Endpoint:** https://www.omdbapi.com/

### Available Methods:
- **searchMovies()**: Search for movies by title
  - Parameter: `searchQuery` (movie title to search)
  - Returns: Array of movies with basic info
  
- **getMovieDetails()**: Get full details of a specific movie
  - Parameter: `imdbID` (unique movie identifier)
  - Returns: Complete movie information with plot, ratings, etc.

### Rate Limiting:
- Free tier allows 1,000 requests per day
- Requests are cached where possible to optimize API usage

## ✨ Special Features

### Infinite Scroll Implementation
- Uses Intersection Observer API for performance
- Automatically loads next page when user scrolls near bottom
- Shows loading indicator while fetching
- Prevents duplicate requests

### Lazy Loading Images
- HTML5 `loading="lazy"` attribute on poster images
- Browser handles native lazy loading
- Fallback placeholder for missing posters
- Optimizes initial page load performance

### Responsive Layout
- Mobile-first approach
- Grid adjusts from 4 columns (desktop) to 1-2 columns (mobile)
- Touch-friendly buttons and interactive elements
- Proper padding and spacing for all screen sizes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Install missing packages if needed
npm install react-router-dom axios i18next react-i18next
```

### Development

```bash
# Start development server
npm run dev

# The server will run at http://localhost:5173/
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm preview
```

## 📝 Usage Guide

### 1. Login
- Navigate to the login page
- Enter username: `aldmic`
- Enter password: `123abc123`
- Click "Sign In"

### 2. Search Movies
- Type a movie title in the search box (e.g., "Inception", "Avatar")
- Results update as you type (with 500ms debounce for API efficiency)
- Scroll down to load more results automatically

### 3. View Movie Details
- Click on any movie card
- See full details including plot, runtime, ratings, actors, etc.
- Add to favorites with the heart button

### 4. Manage Favorites
- Add movies to favorites from movie list or detail page
- View all favorites on the Favorites page
- Remove unwanted favorites anytime

### 5. Change Language
- Click language toggle button in navigation (🇮🇩 ID / 🇬🇧 EN)
- UI language changes immediately
- Preference is saved for next visit

## 🎨 UI/UX Design Highlights

### Color Scheme
- Primary gradient: #667eea to #764ba2 (purple/blue)
- Neutral backgrounds: #f5f5f5, #ffffff
- Text colors: #333 (dark), #666 (medium), #999 (light)
- Accent colors: #e91e63 (pink for favorites), #c33 (red for errors)

### Typography
- System fonts for optimal rendering across devices
- Consistent font sizing: h1 (2rem), labels (0.95rem), body (1rem)
- Proper line-height for readability (1.5 for body, 1.4 for titles)

### Interactive Elements
- Smooth hover transitions (0.3s ease)
- Transform effects for depth perception
- Box shadows for elevation
- Clear visual feedback for button states

## 📊 Screenshots & Usage

### Login Page
- Clean card-based design on gradient background
- Demo credentials displayed for reference
- Error message display for invalid credentials

### Movie List Page
- Grid layout with movie posters
- Search bar at the top
- Movie cards with title, year, and favorite button
- Loading indicator and empty states
- Responsive column count based on screen size

### Movie Detail Page
- Large poster on the left
- Detailed information on the right
- Movie rating, genres, cast, plot
- Add to favorites button
- Back button to return to list

### Favorites Page
- Similar grid layout to movie list
- Shows only saved favorite movies
- Remove button on each card
- Empty state when no favorites

## 🔄 State Management

### AuthContext
- `isAuthenticated`: Boolean indicating login status
- `user`: Current user object with username
- `login()`: Authenticate user with username/password
- `logout()`: Clear auth session and redirect to login

### FavoritesContext
- `favorites`: Array of saved favorite movies
- `addFavorite()`: Add a movie to favorites
- `removeFavorite()`: Remove a movie from favorites
- `isFavorited()`: Check if a movie is favorited

Both contexts use localStorage for persistence across browser sessions.

## 🐛 Error Handling

- **Invalid Credentials**: User-friendly error message on login
- **API Errors**: Graceful error messages when API fails
- **Network Errors**: Timeout and connectivity error handling
- **Empty States**: Custom empty state layouts when no data available

## ✅ Testing Credentials

| Field | Value |
|-------|-------|
| Username | aldmic |
| Password | 123abc123 |

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Key Code Patterns

### Protected Routes
```tsx
<ProtectedRoute>
  <MovieList />
</ProtectedRoute>
```

### Using Context Hooks
```tsx
const { isAuthenticated, login, logout } = useAuth();
const { favorites, addFavorite, isFavorited } = useFavorites();
```

### Infinite Scroll Implementation
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  });
  observer.observe(observerTarget.current);
}, [hasMore, isLoading]);
```

### Debounced Search
```tsx
const handleSearch = (query) => {
  clearTimeout(searchTimeoutRef.current);
  searchTimeoutRef.current = setTimeout(() => {
    fetchMovies(query, 1, true);
  }, 500);
};
```

## 📚 API Documentation

Visit [OMDb API Documentation](http://www.omdbapi.com/) for complete API reference.

## 🎯 Performance Optimizations

1. **Infinite Scroll**: Load data only when needed
2. **Lazy Image Loading**: HTML5 native lazy loading
3. **Debounced Search**: Prevent excessive API calls
4. **Context API**: Lightweight state management
5. **CSS Grid/Flexbox**: Hardware-accelerated layouts
6. **localStorage**: Avoid repeated remote calls

## 📄 License

This project is created for demonstration purposes as part of a technical assessment.

## 🤝 Support

For issues or questions about this application, please contact the development team.

---

**Created with ❤️ using React + Vite + TypeScript**

*Last Updated: February 2026*
