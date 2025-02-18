import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import LoadingPage from './LoadingPage';  // Import the LoadingPage component

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null); // To capture errors
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    // Apply styles to body and html for full-screen background
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = '#36393f';
    document.documentElement.style.height = '100%';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    
    // If you're using a root div (like when using create-react-app)
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.height = '100%';
    }
    
    // Cleanup function
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.height = '';
      document.body.style.backgroundColor = '';
      document.documentElement.style.height = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      
      if (rootElement) {
        rootElement.style.height = '';
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);  // Set loading state to true when submitting form
      
      try {
        const response = await axios.post('http://localhost:5000/login', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token); // Save token to localStorage
        
        // Instead of immediately calling onLogin, wait for the loading animation
        // to run for 4 seconds before completing
        setTimeout(() => {
          onLogin(username); // Handle login success after loading completes
          setError(null); // Clear any previous error
          setIsLoading(false); // Hide loading screen after successful login
        }, 4000); // 4 seconds loading time
        
      } catch (err) {
        console.error('Login error:', err);
        setError('Invalid credentials or server error');
        
        // Even on error, show loading for a short time to avoid flashing
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen after delay
        }, 1000);
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  const buttonStyle = {
    backgroundColor: isHovered ? '#7289da' : '#5865f2', // Blue color similar to Discord
    borderColor: isHovered ? '#7289da' : '#5865f2',
    color: '#fff',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  if (isLoading) {
    return <LoadingPage />;  // Show loading screen when isLoading is true
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 className="text-center" style={styles.title}>Login</h2>
        {error && <div style={{ color: '#ff4747', marginBottom: '10px' }}>{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label style={styles.label}>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label style={styles.label}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3 w-100"
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)} // On hover start
            onMouseLeave={() => setIsHovered(false)} // On hover end
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#36393f', // Dark background color like Discord
    height: '100vh', // Full screen height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff', // Light text color for dark theme
    margin: 0, // Remove any margin
    padding: 0, // Remove any padding
    width: '100%', // Ensure full width
    position: 'absolute', // Position absolute to cover entire viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    backgroundColor: '#2f3136', // Darker card background color like Discord
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Slight shadow for card
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    color: '#fff', // White text for the title
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  label: {
    color: '#b9bbbe', // Lighter label color for dark theme
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#40444b', // Darker input background, slightly lighter than the card
    color: '#fff', // Light text for inputs
    borderColor: '#2f3136', // Border color that blends in with the background
    borderRadius: '5px',
    padding: '10px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
};

export default LoginPage;