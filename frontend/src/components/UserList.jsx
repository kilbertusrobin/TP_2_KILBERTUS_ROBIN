import UserCard from './UserCard'

export default function UserList({ users, loading, error, onDelete, onEdit }) {
  if (loading) return <p style={styles.info}>Chargement...</p>
  if (error)   return <p style={styles.error}>{error}</p>
  if (users.length === 0) return <p style={styles.info}>Aucun utilisateur.</p>

  return (
    <div style={styles.grid}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

const styles = {
  grid:  { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  info:  { color: '#64748b', margin: 0 },
  error: { color: '#dc2626', margin: 0 },
}
