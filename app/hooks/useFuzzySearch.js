import { useState, useEffect, useMemo } from 'react';
import useSWR from 'swr';
import Fuse from 'fuse.js';

const fetcher = url => fetch(url).then(r => r.json());

export function useFuzzySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterParams, setFilterParams] = useState({
    genres: [],
    yearMin: null,
    yearMax: null,
    minRating: null
  });
  
  // Fetch all movies from Flask backend
  const { data: allMovies, error, isLoading } = useSWR(
    'http://localhost:5000/api/movies',
    fetcher,
    {
      onError: (err) => {
        console.error('API Error:', err);
      }
    }
  );

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    if (!allMovies) return null;
    
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'genres', weight: 0.2 },
        { name: 'cast', weight: 0.25 },
        { name: 'year', weight: 0.15 },
        { name: 'rating', weight: 0.1 },
      ],
      threshold: 0.3, // more strict matching
      includeScore: true,
      minMatchCharLength: 2,
      shouldSort: true
    };
    
    return new Fuse(allMovies, fuseOptions);
  }, [allMovies]);

  // Perform fuzzy search
  const searchResults = useMemo(() => {
    if (!fuse || !searchQuery.trim()) {
      return allMovies || [];
    }
    
    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [fuse, searchQuery, allMovies]);

  // Apply additional filters to search results
  const filteredResults = useMemo(() => {
    let results = searchResults;
    
    // Genre filter
    if (filterParams.genres && filterParams.genres.length > 0) {
      results = results.filter(movie => 
        filterParams.genres.some(genre => 
          movie.genres.includes(genre)
        )
      );
    }
    
    // Year range filter
    if (filterParams.yearMin || filterParams.yearMax) {
      const minYear = filterParams.yearMin || 1900;
      const maxYear = filterParams.yearMax || 2300;
      results = results.filter(movie => 
        movie.year >= minYear && movie.year <= maxYear
      );
    }
    
    // Rating filter
    if (filterParams.minRating) {
      results = results.filter(movie => 
        movie.rating >= filterParams.minRating
      );
    }
    
    return results;
  }, [searchResults, filterParams]);

  return {
    movies: filteredResults,
    searchQuery,
    setSearchQuery,
    setFilterParams,
    isLoading,
    error,
    hasSearchQuery: searchQuery.trim().length > 0
  };
} 