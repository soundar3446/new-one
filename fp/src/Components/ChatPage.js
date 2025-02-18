// ChatPage.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import ChatHeader from './ChatHeader';

const ChatPage = ({ currentUser }) => {
  const [conversations, setConversations] = useState({
    1: [
      { id: 1, content: 'Hello!', isUser: false, timestamp: Date.now() - 3600000 },
      { id: 2, content: 'Hi there!', isUser: true, timestamp: Date.now() - 1800000 }
    ],
    2: [
      { id: 3, content: 'How are you?', isUser: false, timestamp: Date.now() - 900000 }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversationId) {
      const newMsg = {
        id: Date.now(),
        content: newMessage,
        isUser: true,
        timestamp: Date.now()
      };

      setConversations(prev => ({
        ...prev,
        [selectedConversationId]: [...prev[selectedConversationId], newMsg]
      }));
      setNewMessage('');
    }
  };

  return (
    <div style={styles.chatPage}>
      <Sidebar 
        onSelectConversation={setSelectedConversationId}
        selectedConversationId={selectedConversationId}
      />
      
      <div style={styles.mainChat}>
        {selectedConversationId ? (
          <>
            <ChatHeader conversationId={selectedConversationId} />
            <MessageList messages={conversations[selectedConversationId] || []} />
            <div style={styles.inputArea}>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={styles.messageInput}
                placeholder="Type a message..."
              />
              <button 
                onClick={handleSendMessage}
                style={styles.sendButton}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div style={styles.placeholder}>
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  chatPage: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#36393f'
  },
  mainChat: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  inputArea: {
    display: 'flex',
    padding: '16px',
    gap: '12px',
    backgroundColor: '#2f3136',
    borderTop: '1px solid #202225'
  },
  messageInput: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#40444b',
    color: 'white',
    border: 'none',
    resize: 'none',
    minHeight: '44px'
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#5865f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  placeholder: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#72767d',
    fontSize: '18px'
  }
};

export default ChatPage;