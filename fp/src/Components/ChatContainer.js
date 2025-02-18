import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatContainer = ({ currentUser }) => {
  // State to manage all conversations
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, content: 'Hello!', isUser: false, timestamp: Date.now() - 3600000 },
      { id: 2, content: 'Hi there!', isUser: true, timestamp: Date.now() - 1800000 }
    ],
    2: [
      { id: 3, content: 'How are you?', isUser: false, timestamp: Date.now() - 900000 }
    ]
  });

  // State to track the currently active conversation
  const [activeConversationId, setActiveConversationId] = useState(null);

  // Function to send a new message
  const handleSendMessage = (conversationId, messageContent) => {
    if (messageContent.trim()) {
      const newMessage = {
        id: Date.now(),
        content: messageContent,
        isUser: true,
        timestamp: Date.now()
      };

      setConversations(prev => ({
        ...prev,
        [conversationId]: [...prev[conversationId], newMessage]
      }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Render a ChatWindow for each conversation */}
      {Object.entries(conversations).map(([conversationId, messages]) => (
        <ChatWindow
          key={conversationId}
          isActive={activeConversationId === Number(conversationId)}
          messages={messages}
          onSendMessage={(message) => handleSendMessage(conversationId, message)}
          onFocus={() => setActiveConversationId(Number(conversationId))}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#36393f',
    position: 'relative',
  }
};

export default ChatContainer;