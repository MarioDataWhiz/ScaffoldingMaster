import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h2>ScaffoldMaster</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/member-management">Member Management</Link>
      </nav>
    </header>
  );
};

export default Header;
