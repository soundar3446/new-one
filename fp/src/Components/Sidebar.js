// Sidebar.jsx
import React from 'react';

const Sidebar = ({ onSelectConversation, selectedConversationId }) => {
  const conversations = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/40?img=1',
        status: 'online'
      },
      lastMessage: 'Hi there!',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        avatar: 'https://i.pravatar.cc/40?img=2',
        status: 'offline'
      },
      lastMessage: 'How are you?',
      unread: 0
    }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.title}>Conversations</h2>
      </div>
      <div style={styles.conversationList}>
        {conversations.map(convo => (
          <div
            key={convo.id}
            style={{
              ...styles.conversationItem,
              ...(selectedConversationId === convo.id && styles.selectedItem)
            }}
            onClick={() => onSelectConversation(convo.id)}
          >
            <img 
              src={convo.user.avatar} 
              alt={convo.user.name}
              style={styles.avatar}
            />
            <div style={styles.conversationInfo}>
              <div style={styles.userName}>
                {convo.user.name}
                {convo.unread > 0 && (
                  <span style={styles.unreadBadge}>{convo.unread}</span>
                )}
              </div>
              <div style={styles.lastMessage}>{convo.lastMessage}</div>
            </div>
            <div style={{
              ...styles.statusIndicator,
              backgroundColor: convo.user.status === 'online' ? '#3ba55d' : '#747f8d'
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '280px',
    backgroundColor: '#2f3136',
    borderRight: '1px solid #202225',
    height: '100vh',
    overflowY: 'auto'
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #202225'
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '16px'
  },
  conversationList: {
    padding: '8px 0'
  },
  conversationItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#36393f'
    }
  },
  selectedItem: {
    backgroundColor: '#40444b'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '12px'
  },
  conversationInfo: {
    flex: 1,
    minWidth: 0
  },
  userName: {
    color: 'white',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  lastMessage: {
    color: '#b9bbbe',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  unreadBadge: {
    backgroundColor: '#5865f2',
    color: 'white',
    borderRadius: '10px',
    padding: '2px 8px',
    fontSize: '12px'
  },
  statusIndicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginLeft: '12px'
  }
};

export default Sidebar;