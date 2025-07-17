from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

# Add this at the top of your file
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)

# Load movies data from JSON file
def load_movies_data():
    """Load movies data from JSON file"""
    try:
        json_path = os.path.join(SCRIPT_DIR, "movies_data.json")
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                return json.load(f)
        else:
            print("Warning: movies_data.json not found. Using sample data.")
            return load_sample_data()
    except Exception as e:
        print(f"Error loading movies data: {e}")
        return load_sample_data()

def load_sample_data():
    """Fallback to sample data if JSON file is not available"""
    return [
        {
            "id": "tt0119094",
            "title": "Face/Off",
            "year": 1997,
            "rating": 7.3,
            "genres": ["Action", "Crime", "Thriller"],
            "cast": ["John Travolta", "Nicolas Cage", "Len"],
            "runtime": 138,
            "votes": 450,
            "poster_url": "https://via.placeholder.com/300x450?text=No+Image"
        },
        {
            "id": "tt0368891",
            "title": "National Treasure",
            "year": 2004,
            "rating": 6.9,
            "genres": ["Action", "Adventure", "Mystery"],
            "cast": ["Nicolas Cage", "Diane Kruger", "Justin Bartha"],
            "runtime": 131,
            "votes": 250,
            "poster_url": "https://via.placeholder.com/300x450?text=No+Image"
        }
    ]
 
# Load movies data
movies = load_movies_data()

@app.route('/api/movies', methods=['GET'])
def get_movies():
    # Just return all movies (Nicolas Cage movies or TV shows)
    return jsonify(movies)

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    movie = next((m for m in movies if m['id'] == movie_id), None)
    if movie:
        return jsonify(movie)
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get statistics about the movie collection"""
    if not movies:
        return jsonify({'error': 'No movies loaded'}), 500 
    total_movies = len(movies)
    years = [movie['year'] for movie in movies if movie.get('year')]
    ratings = [movie['rating'] for movie in movies if movie.get('rating')]    
    # Get all unique genres
    all_genres = set()
    for movie in movies:
        all_genres.update(movie.get('genres', []))
    
    # Get all unique actors
    all_actors = set()
    for movie in movies:
        all_actors.update(movie.get('cast', []))
    
    stats = {
        'total_movies': total_movies,
        'year_range': {
            'min': min(years) if years else None,
            'max': max(years) if years else None
        },
        'rating_range': {
            'min': min(ratings) if ratings else None,
            'max': max(ratings) if ratings else None,
            'average': sum(ratings) / len(ratings) if ratings else None
        },
        'total_genres': len(all_genres),
        'total_actors': len(all_actors),
        'genres': sorted(list(all_genres)),
        'actors': sorted(list(all_actors))[:20]  # Top 20 actors
    }
    
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 