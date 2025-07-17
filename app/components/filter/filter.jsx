'use client';
import { useState, useEffect } from 'react';

const GENRES = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'];
const CURRENT_YEAR = new Date().getFullYear();

export default function Filters({ onChange }) {
  const [genres, setGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1980, CURRENT_YEAR]);
  const [minRating, setMinRating] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange({ 
      genres, 
      yearMin: yearRange[0], 
      yearMax: yearRange[1], 
      minRating 
    });
  }, [ genres, yearRange, minRating, onChange]);

  return (
    <div className="filters-dropdown ">
      <button className="btn btn-warning mb-2" onClick={() => setOpen(v => !v)}>
        Filters {open ? <span>&#9650;</span> : <span>&#9660;</span>}
      </button>
      {open && (
        <div className="filters-section p-3">
          <div className="filter-group mb-3">
            <h3 className="filter-subtitle">GENRES</h3>
            <div className="genre-buttons">
              {GENRES.map(genre => (
                <button
                  key={genre}
                  className={`genre-btn ${genres.includes(genre) ? 'active' : ''}`}
                  onClick={() => {
                    setGenres(prev => 
                      prev.includes(genre) 
                        ? prev.filter(x => x !== genre) 
                        : [...prev, genre]
                    );
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 filter-group mb-3">
              <h3 className="filter-subtitle">YEAR RANGE</h3>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  min="1900"
                  max={yearRange[1]}
                  value={yearRange[0]}
                  onChange={e => setYearRange([parseInt(e.target.value) || 1900, yearRange[1]])}
                  style={{ width: '90px' }}
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  className="form-control"
                  min={yearRange[0]}
                  max={CURRENT_YEAR}
                  value={yearRange[1]}
                  onChange={e => setYearRange([yearRange[0], parseInt(e.target.value) || CURRENT_YEAR])}
                  style={{ width: '90px' }}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="col-md-6 filter-group mb-3">
              <h3 className="filter-subtitle">MINIMUM RATING</h3>
              <div className="rating-container">
                <input
                  type="range"
                  className="form-range rating-slider custom-slider"
                  min="0"
                  max="10"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                />
                <div className="rating-label">
                  <span>{minRating.toFixed(1)}+</span>
                  <i className="bi bi-star-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}