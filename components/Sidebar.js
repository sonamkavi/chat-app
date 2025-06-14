export default function Sidebar({ contacts, onSelect, selected }) {
  return (
    <aside
      style={{
        width: '280px',
        height: '100vh',
        borderRight: '1px solid #ddd',
        paddingTop: '60px',
        overflowY: 'auto',
        backgroundColor: '#f7f7f7',
        boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {contacts.map((contact) => {
        const lastMessage = contact.messages[contact.messages.length - 1];
        const initial = contact.name.charAt(0).toUpperCase();
        const isSelected = selected?.id === contact.id;

        return (
          <div
            key={contact.id}
            onClick={() => onSelect(contact)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: isSelected ? '#e6f7ff' : 'transparent',
              borderLeft: isSelected ? '4px solid #1890ff' : '4px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              transition: 'background-color 0.25s, border-left 0.25s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f5ff')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = isSelected ? '#e6f7ff' : 'transparent')
            }
          >
            {}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#1890ff',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                position: 'relative',
                flexShrink: 0,
                userSelect: 'none',
              }}
            >
              {initial}
              {}
              {isSelected && contact.isOnline && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#52c41a',
                    borderRadius: '50%',
                    border: '2px solid #fff',
                  }}
                />
              )}
            </div>

            {}
            <div style={{ flexGrow: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: '600',
                  fontSize: '1rem',
                  color: '#262626',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {contact.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                  color: '#595959',
                  marginTop: '4px',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '75%',
                  }}
                >
                  {lastMessage?.text || 'No messages yet'}
                </span>
                <span style={{ flexShrink: 0, marginLeft: '8px', whiteSpace: 'nowrap' }}>
                  {lastMessage?.time || ''}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
