export default function Navbar({ count }) {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Gestion des utilisateurs</span>
      <span style={styles.count}>{count} utilisateur{count !== 1 ? 's' : ''}</span>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#1a1a2e',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { color: '#fff', fontSize: '1.2rem', fontWeight: 600 },
  count: { color: '#94a3b8', fontSize: '0.9rem' },
}
