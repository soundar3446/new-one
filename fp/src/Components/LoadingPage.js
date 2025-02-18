import React, { useEffect, useState } from 'react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Apply styles to body for full-screen background
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#36393f';
    
    // Progress animation
    const duration = 3000; // 3 seconds in milliseconds
    const interval = 30; // Update every 30ms for smooth animation
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    // Cleanup function
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.backgroundColor = '';
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={styles.loadingContainer}>
      <div style={styles.centerBox}>
        <div style={styles.progressBarContainer}>
          <div 
            style={{
              ...styles.progressBar,
              width: `${progress}%`,
              transition: 'width 30ms linear'
            }}
          ></div>
        </div>
        <h2 style={styles.loadingText}>Loading...</h2>
      </div>
    </div>
  );
};

const styles = {
  loadingContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#36393f', // Keeping the dark theme from your LoginPage
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '400px',
  },
  progressBarContainer: {
    width: '100%',
    height: '4px', // Thin bar
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5865f2', // Using the blue color from your login button
    width: '0%',
  },
  loadingText: {
    color: '#fff',
    marginTop: '20px',
    fontFamily: 'sans-serif',
    fontWeight: '500',
  }
};

export default LoadingPage;