import React from 'react';
import { Link } from 'gatsby'; // Import the Link component from Gatsby

const MainPage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.topIcons}>
        <Link to="/login" style={styles.iconLink}>Login</Link>
        <Link to="/register" style={styles.iconLink}>Register</Link>
      </div>
      <div style={styles.mainContent}>
        This is the main page
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'sans-serif',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
    position: 'relative',
  },
  topIcons: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  iconLink: {
    marginLeft: '20px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  },
  mainContent: {
    textAlign: 'center',
    fontSize: '2em',
    color: '#555',
  },
};

export default MainPage;