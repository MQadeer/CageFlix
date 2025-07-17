import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-warning" href="#">CAGEFLIX</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Movies</a></li>
            <li className="nav-item"><a className="nav-link" href="#">TV Shows</a></li>
            <li className="nav-item"><a className="nav-link" href="#">My List</a></li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search Nicolas Cage movies..." aria-label="Search" />
          </form>
          {/* Add icons here if needed */}
        </div>
      </div>
    </nav>
  );
} 