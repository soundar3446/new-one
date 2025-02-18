import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';

const ChatWindow = ({ isActive, messages, onSendMessage, onFocus }) => {
  const [newMessage, setNewMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isActive) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isActive]);

  // Handle sending a new message
  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div
      style={{
        ...styles.chatWindow,
        display: isActive ? 'flex' : 'none',
      }}
      onClick={onFocus}
    >
      <MessageList messages={messages} />
      <div style={styles.inputArea}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.messageInput}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
      <div ref={endOfMessagesRef} />
    </div>
  );
};

const styles = {
  chatWindow: {
    flex: 1,
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#36393f',
  },
  inputArea: {
    display: 'flex',
    padding: '16px',
    gap: '12px',
    backgroundColor: '#2f3136',
    borderTop: '1px solid #202225',
  },
  messageInput: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#40444b',
    color: 'white',
    border: 'none',
    resize: 'none',
    minHeight: '44px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#5865f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ChatWindow;