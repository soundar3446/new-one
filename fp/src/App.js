import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginPage from './Components/LoginPage'; // Adjust the import based on your file structure
import ChatPage from './Components/ChatPage'; // Import ChatPage

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username); // Set the username on login
  };

  return (
    <Container fluid style={{ height: '100vh', padding: 0 }}>
      {!user ? (
        // If no user is logged in, show the LoginPage
        <LoginPage onLogin={handleLogin} />
      ) : (
        // If a user is logged in, show the ChatPage
        <ChatPage user={user} />
      )}
    </Container>
  );
};

export default App;
