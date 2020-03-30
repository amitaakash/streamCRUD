import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        STREA<strong>MY</strong>
      </Navbar.Brand>
      <Nav className="ml-auto" activeKey="/">
        <Nav.Item>
          <Link to="/" className="btn btn-outline-light mr-2">
            All Streams
          </Link>
        </Nav.Item>
        <Nav.Item>
          <GoogleAuth />
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Header;
