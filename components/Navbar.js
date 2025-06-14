export default function Navbar() {
  return (
    <nav style={{
      height: '60px',
      backgroundColor: '#075E54',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 10,
      fontWeight: 'bold',
      fontSize: '1.25rem',
    }}>
      Chat App
    </nav>
  );
}
