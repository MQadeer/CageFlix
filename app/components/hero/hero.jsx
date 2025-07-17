'use client';
export default function Hero() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">CAGEFLIX</h1>
        <p className="hero-description">
          The ultimate cinematic journey through Nicolas Cage's legendary filmography. 
          From <strong>National Treasure</strong> to <strong>Face/Off</strong>, discover every iconic performance.
        </p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-label">Movies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4K</span>
            <span className="stat-label">Quality</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">IMDB</span>
            <span className="stat-label">Data</span>
          </div>
        </div>
      </div>
    </section>
  );
}