export default function UserCard({ user, onDelete, onEdit }) {
  const date = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div style={styles.card}>
      <div style={styles.info}>
        <strong style={styles.name}>{user.name}</strong>
        <span style={styles.email}>{user.email}</span>
        <div style={styles.footer}>
          <span style={{ ...styles.badge, ...(user.role === 'admin' ? styles.admin : styles.user) }}>
            {user.role}
          </span>
          <span style={styles.date}>Créé le {date}</span>
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.btnEdit} onClick={() => onEdit(user)}>
          Modifier
        </button>
        <button style={styles.btnDelete} onClick={() => onDelete(user._id)}>
          Supprimer
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
  },
  info:    { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  name:    { fontSize: '1rem', color: '#1e293b' },
  email:   { fontSize: '0.875rem', color: '#64748b' },
  footer:  { display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' },
  badge:   { padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600 },
  admin:   { backgroundColor: '#dbeafe', color: '#1d4ed8' },
  user:    { backgroundColor: '#f0fdf4', color: '#15803d' },
  date:    { fontSize: '0.75rem', color: '#94a3b8' },
  actions: { display: 'flex', gap: '0.5rem' },
  btnEdit: {
    padding: '0.4rem 0.9rem',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  btnDelete: {
    padding: '0.4rem 0.9rem',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
}
