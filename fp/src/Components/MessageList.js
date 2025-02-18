import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages }) => {
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            ...styles.message,
            ...(message.isUser ? styles.userMessage : styles.otherMessage),
          }}
        >
          <div style={styles.messageContent}>{message.content}</div>
          <div style={styles.messageTime}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

const styles = {
  messageList: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    backgroundColor: '#36393f',
  },
  message: {
    maxWidth: '75%',
    margin: '8px 0',
    padding: '12px 16px',
    borderRadius: '16px',
    color: 'white',
    position: 'relative',
  },
  userMessage: {
    backgroundColor: '#5865f2',
    marginLeft: 'auto',
    borderRadius: '16px 16px 0 16px',
  },
  otherMessage: {
    backgroundColor: '#40444b',
    marginRight: 'auto',
    borderRadius: '16px 16px 16px 0',
  },
  messageContent: {
    fontSize: '15px',
    lineHeight: '1.4',
    wordBreak: 'break-word',
  },
  messageTime: {
    fontSize: '12px',
    color: '#dcddde',
    marginTop: '4px',
    opacity: '0.8',
    textAlign: 'right',
  },
};

export default MessageList;