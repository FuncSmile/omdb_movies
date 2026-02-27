# Quick Start Guide - OMDb Movies Application

## 🚀 Start the Application (Development)

```bash
cd /home/moon/Worksheet/react-omdb-movies
npm run dev
```

**Access the app at:** `http://localhost:5173/`

---

## 🔐 Login Credentials

```
Username: aldmic
Password: 123abc123
```

---

## 📋 What to Test

### 1. Login Page
- [x] Try invalid credentials → See error message
- [x] Use demo credentials → Login successfully
- [x] Get redirected to Movie List page

### 2. Movie Search
- [x] Type "Inception" in search box
- [x] Results appear in grid format
- [x] Scroll down to load more (infinite scroll)
- [x] Click on movie → See details page

### 3. Movie Details
- [x] Full movie information displayed
- [x] Movie poster, rating, plot, actors shown
- [x] Click heart button → Add to favorites
- [x] Click back button → Return to list

### 4. Favorites
- [x] Click "Favorites" in navigation
- [x] See all saved favorite movies
- [x] Click remove button → Movie removed
- [x] Empty state when no favorites

### 5. Language Toggle
- [x] Click language button (EN/ID)
- [x] UI text changes to Indonesian
- [x] Reload page → Language persists
- [x] Click again → Back to English

---

## 🏗️ Project Structure

```
src/
├── components/        # Reusable components
├── contexts/         # State management (Auth, Favorites)
├── pages/            # Page components (Login, MovieList, MovieDetail, Favorites)
├── services/         # API service (OMDb)
├── types/            # TypeScript types
├── utils/            # Custom hooks
├── styles/           # CSS stylesheets
├── locales/          # Language translations (EN, ID)
├── App.tsx           # Main app with routing
├── main.tsx          # App entry point
└── index.css         # Global styles
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

Output will be in `dist/` folder, ready to deploy.

---

## 🔧 Key Features Implemented

✅ Authentication with login page
✅ Movie search with debouncing  
✅ Infinite scroll pagination
✅ Movie details page
✅ Add/remove favorites
✅ Favorites page
✅ Multi-language support (EN/ID)
✅ Lazy image loading
✅ Responsive design
✅ Error handling
✅ Protected routes

---

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **IMPLEMENTATION_SUMMARY.md** - Implementation details and features

---

## 🎨 Design System

- **Primary Color**: Purple gradient (#667eea → #764ba2)
- **Accent Color**: Pink (#e91e63) for favorites
- **Background**: Light gray (#f5f5f5)
- **Text**: Dark gray (#333)

---

## ⚡ Performance Features

- ✅ Lazy loading for images
- ✅ Debounced search (500ms)
- ✅ Intersection Observer for infinite scroll
- ✅ Minimal bundle size (~107KB gzipped)

---

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Want to clean install?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Application not responding?**
- Check browser console for errors (F12)
- Verify API key in `src/services/omdbService.ts`
- Check network tab for API calls

---

## 📞 Support

All dependencies are already installed via `npm install`.

The application is fully functional and ready to use!

---

**Happy coding! 🎬**
