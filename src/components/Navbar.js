import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavbarItem to="/">Home</NavbarItem>
        <NavbarItem to="/search">Search</NavbarItem>
      </ul>
    </nav>
  );
}

function NavbarItem({ to, children }) {
  return (
    <li className="navbar-item">
      <NavLink
        exact
        to={to}
        className="navbar-link"
        activeClassName="navbar-link--active"
      >
        {children}
      </NavLink>
    </li>
  );
}
