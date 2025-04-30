import React from 'react';

const MainPage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.topIcons}>
        <a href="#" style={styles.iconLink}>Login</a>
        <a href="#" style={styles.iconLink}>Register</a>
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
    position: 'relative', // To position the top icons absolutely within this container
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