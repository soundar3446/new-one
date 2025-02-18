// ChatHeader.jsx
import React from 'react';

const ChatHeader = ({ conversationId }) => {
  // In real app, fetch conversation details
  const conversation = {
    1: { name: 'John Doe', status: 'online' },
    2: { name: 'Jane Smith', status: 'offline' }
  }[conversationId];

  return (
    <div style={styles.header}>
      <div style={styles.userInfo}>
        <h2 style={styles.userName}>{conversation?.name}</h2>
        <div style={styles.userStatus}>
          {conversation?.status === 'online' ? 'Online' : 'Offline'}
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    padding: '16px',
    borderBottom: '1px solid #202225',
    backgroundColor: '#2f3136'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    color: 'white',
    margin: 0,
    fontSize: '16px'
  },
  userStatus: {
    color: '#b9bbbe',
    fontSize: '14px'
  }
};

export default ChatHeader;