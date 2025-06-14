import { useEffect, useRef, useState } from 'react';

export default function ChatWindow({ contact, onSend, isTyping }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [contact]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  }

  return (
    <section style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: '60px',
      backgroundColor: '#fff',
    }}>
      {}
      <header style={{
        padding: '1rem',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f5f5f5',
      }}>
        {contact ? (
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{contact.name}</div>
            {contact.isOnline && (
              <div style={{ fontSize: '0.9rem', color: '#4CAF50' }}>Online</div>
            )}
          </div>
        ) : (
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Select a contact</span>
        )}
      </header>

      {}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        backgroundColor: '#e5ddd5',
      }}>
        {contact?.messages?.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.from === 'Me' ? 'flex-end' : 'flex-start',
            backgroundColor: msg.from === 'Me' ? '#dcf8c6' : '#fff',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            maxWidth: '70%',
            boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
          }}>
            {msg.text}
            <div style={{
              fontSize: '0.7rem',
              color: '#555',
              textAlign: 'right',
              marginTop: '2px'
            }}>
              {msg.status}{msg.time ? ` • ${msg.time}` : ''}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ fontStyle: 'italic', color: '#777' }}>
            {contact.name} is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        borderTop: '1px solid #ddd',
        padding: '0.5rem'
      }}>
        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '20px',
            border: '1px solid #ccc',
            outline: 'none',
          }}
        />
        <button type="submit" style={{
          marginLeft: '0.5rem',
          padding: '0 1rem',
          borderRadius: '20px',
          border: 'none',
          backgroundColor: '#075E54',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          Send
        </button>
      </form>
    </section>
  );
}
