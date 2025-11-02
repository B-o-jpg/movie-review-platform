# 🎬 Movie Review Platform

A full-stack movie review application built with React, Node.js, and Firebase.

## Features

- 🔐 User Authentication (Login/Register)
- 🎥 Browse Popular Movies (TMDB API)
- 🔍 Search Movies
- ⭐ Create, Read, Update, Delete Reviews
- 👤 User Profile with Review History
- 📱 Responsive Design with Bootstrap

## Tech Stack

**Frontend:**
- React
- React Router
- Bootstrap 5
- Axios
- Firebase Authentication

**Backend:**
- Node.js
- Express
- Firebase Admin SDK
- Firebase Firestore

**APIs:**
- TMDB API (The Movie Database)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- TMDB API key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd movie-review-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
```

Download Firebase service account key:
1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate New Private Key"
3. Save as `serviceAccountKey.json` in `backend/config/`

Start backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder with your Firebase config:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Start frontend:
```bash
npm start
```

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Set up Firestore security rules (see firestore.rules)

### 5. Get TMDB API Key

1. Go to [TMDB](https://www.themoviedb.org/)
2. Create account
3. Go to Settings > API
4. Request API key (free)
5. Add to backend `.env` file

## Deployment

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init

# Build frontend
cd frontend
npm run build

# Deploy
firebase deploy
```

## Project Structure

```
movie-review-platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contexts/
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── firebase.json
└── README.md
```

## Pages

1. **Home** - Browse and search movies
2. **Movie Details** - View movie info and reviews
3. **Login** - User authentication
4. **Register** - User registration
5. **Profile** - View and manage user reviews

## API Endpoints

### Movies
- `GET /api/movies/popular?page=1` - Get popular movies
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/:id` - Get movie details

### Reviews
- `GET /api/reviews/movie/:movieId` - Get movie reviews
- `GET /api/reviews/user/:userId` - Get user reviews (auth required)
- `POST /api/reviews` - Create review (auth required)
- `PUT /api/reviews/:id` - Update review (auth required)
- `DELETE /api/reviews/:id` - Delete review (auth required)

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License

## Contact

Your Name - boitumelompelane7@gmail.com
Project Link: [https://github.com/B-o-jpg/movie-review-platform](https://github.com/B-o-jpg/movie-review-platform)