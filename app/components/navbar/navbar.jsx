'use client';
import Link from 'next/link';
import { Navbar, Nav, Container} from 'react-bootstrap';

export default function MyNavbar() {
  return (
    <Navbar bg="black" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} href="/">
          <span className="cage">CAGE</span>FLIX
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link className="nav-link" as={Link} href="/">Home</Nav.Link>
            <Nav.Link className="nav-link" as={Link} href="/movies">Movies</Nav.Link>
            <Nav.Link className="nav-link" as={Link} href="/tv-shows">TV Shows</Nav.Link>
            <Nav.Link className="nav-link" as={Link} href="/my-list">My List</Nav.Link>
          </Nav>
          <form className="d-flex" role="search">
            <input className="search-input" type="search" placeholder="Search Nicolas Cage movies..." />
          </form>
          <div className="nav-icons">
            <i className="bi bi-bell me-3"></i>
            <i className="bi bi-person-circle"></i>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}