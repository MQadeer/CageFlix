'use client';
import Image from 'next/image';

export default function MovieGrid({ movies, hasSearchQuery }) {
  return (
    <div className="movie-section">
      <h2 className="movie-section-title">
        {hasSearchQuery ? 'SEARCH RESULTS' : 'ALL NICOLAS CAGE MOVIES'}
      </h2>
      <div className="movie-grid">
        {movies && movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                {movie.poster_url ? (
                  <Image
                    src={movie.poster_url}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="card-img-top"
                  />
                ) : (
                  <div className="placeholder-poster">
                    <i className="bi bi-film"></i>
                  </div>
                )}
              </div>
              <div className="movie-info">
                <h5 className="movie-title">{movie.title}</h5>
                <p className="movie-year">{movie.year}</p>
                {movie.rating && (
                  <div className="movie-rating">
                    <i className="bi bi-star-fill"></i>
                    <span>{movie.rating}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-movies">
            <p>No movies found</p>
          </div>
        )}
      </div>
    </div>
  );
}