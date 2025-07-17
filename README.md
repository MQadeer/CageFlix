# Cageflix - Nicolas Cage Movie Library

A modern web application for browsing and filtering Nicolas Cage movies, built with Next.js and Bootstrap.

## Features

- 🎬 **Movie Library**: Browse Nicolas Cage's filmography
- 🔍 **Advanced Filtering**: Filter by genres, year range, and minimum rating
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Next.js and SWR for optimal performance
- 🎨 **Modern UI**: Dark theme with yellow accents

## Tech Choices

- **Next.js**: Chosen for its fast development workflow, built-in routing, and server-side rendering capabilities, which improve SEO and performance.
- **React 19**: Provides a modern, component-based UI architecture and excellent developer experience.
- **Bootstrap 5 & React-Bootstrap**: Used for rapid, responsive, and consistent UI design.
- **SWR**: Enables efficient data fetching and caching on the frontend.
- **Flask (Python)**: Lightweight and easy-to-use backend framework for serving the movie API and handling data processing.
- **Pandas**: Used in the backend for efficient data manipulation and processing of large IMDb datasets.

## Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Python 3.8+
- pip (Python package manager)

### 1. Clone the repository
```bash
git clone <repository-url>
cd cageflix
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. (Optional) Process IMDb Data for Full Movie List
The backend uses a `movies_data.json` file to serve Nicolas Cage movies. By default, sample data is used. To generate a full movie list:

1. **Download IMDb Datasets** (from [IMDb Datasets](https://datasets.imdbws.com/)) and place these files in the `backend/` folder:
   - `title.basics.tsv.gz`
   - `title.principals.tsv.gz`
   - `title.ratings.tsv.gz`
   - `name.basics.tsv.gz`

2. **Run the data processing script:**
   ```bash
   cd backend
   python data_processor.py
   cd ..
   ```
   This will generate or update `backend/movies_data.json` with all Nicolas Cage movies from IMDb.

> **What is the data processing script?**
>
> `data_processor.py` extracts all Nicolas Cage movies from raw IMDb data files and creates a `movies_data.json` file used by the backend API. This ensures your app has the most complete and up-to-date list of movies. If you skip this step, the backend will use a small sample dataset instead.

### 5. Run the backend server
```bash
cd backend
python app.py
```
The backend Flask API will start on [http://localhost:5000](http://localhost:5000).

### 6. Run the frontend (Next.js) development server
In a new terminal, from the project root:
```bash
npm run dev
```
The frontend will start on [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Browse Movies**: Scroll through the movie grid to see all available films
- **Search**: Use the search bar in the navbar to find specific movies
- **Filter**: Click the "Filters" dropdown on the left to filter by:
  - Genres (Action, Comedy, Drama, etc.)
  - Year range (1980-2024)
  - Minimum rating (0.0-100)
- **Navigation**: Use the navbar links to navigate between different sections

## Tech Stack

- **Frontend**: Next.js 15, React 19, Bootstrap 5
- **Data Fetching**: SWR
- **Styling**: Custom CSS with Bootstrap
- **Backend**: Flask (Python)

## Project Structure

```
cageflix/
├── app/
│   ├── components/          # React components
│   ├── styles/             # CSS files
│   ├── layout.js           # Root layout
│   └── page.jsx            # Main page
├── backend/
│   ├── app.py              # Flask backend API
│   ├── data_processor.py   # IMDb data processing script
│   ├── movies_data.json    # Generated movie data
│   └── requirements.txt    # Python dependencies
└── package.json            # Frontend dependencies
```

## Customization

### Adding Movies
Edit the movies data in the API route or backend file, or re-run the data processor with updated IMDb data.

### Styling
- Global styles: `app/styles/global.css`
- Component styles: `app/styles/custom.css`

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## Known Issues

- The app defaults to sample data unless IMDb datasets are downloaded and processed.
- Some features (e.g., "My List") are placeholders and not yet implemented.
- No authentication or user accounts are currently supported.
- inefficient data handling: we are recieving information on around 500 movies at once, could cause performance issues, slow loading increased resource usage. 

## Future Enhancements

- Deploy a persistent backend (e.g., on Render, Railway, or Fly.io) and update the frontend to use the live API.
- Add user authentication and functionality to all menu items.
- Improve error handling and loading states in the UI.
- Add support for TV shows and more advanced filtering.
- Enhance the UI/UX with animations and more detailed movie pages.
- Add pagination or lazy loading for optimized performance.
- Move the filtering to server side to get proper responses based on the data handling startegy.

## License

MIT License - feel free to use this project for your own purposes!
