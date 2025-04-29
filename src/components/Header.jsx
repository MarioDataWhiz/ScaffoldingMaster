import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useAuthContext } from '@asgardeo/auth-react';
import { Button } from '@mui/material';

const Header = () => {
  const { userName } = useContext(UserContext);
  const { state, signIn, signOut } = useAuthContext();

  const handleSignIn = () => {
    console.log("Sign In button clicked");
    signIn();
  };

  const handleSignOut = () => {
    console.log("Sign Out button clicked");
    signOut();
  };

  return (
    <header className="header">
      <h2>ScaffoldMaster</h2>
      <div className="nav-auth">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {state.isAuthenticated && (
            <>
              <Link to="/customer-management">MemberManagement</Link>
              <Link to="/courseman">CourseManagement</Link>
            </>
          )}
          <Link to="/courses">Courses</Link>
          <Link to="/form">Enrollment Form</Link>
        </nav>
        <div className="auth-buttons">
          {state.isAuthenticated ? (
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              Instructor Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
