import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import userService from './services/userService'

const FILTERS = ['Tous', 'admin', 'user']

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)   // Bonus A
  const [filterRole, setFilterRole] = useState('Tous')     // Bonus B

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await userService.getAll()
      setUsers(res.data.data)
    } catch {
      setError('Impossible de charger les utilisateurs')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(data) {
    const res = await userService.create(data)
    const newUser = res.data.data
    setUsers([...users, newUser])
  }

  async function handleUpdate(id, data) {
    const res = await userService.update(id, data)
    const updated = res.data.data
    setUsers(users.map((u) => (u._id === id ? updated : u)))
    setSelectedUser(null)
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    await userService.remove(id)
    setUsers(users.filter((u) => u._id !== id))
    if (selectedUser?._id === id) setSelectedUser(null)
  }

  const filteredUsers = filterRole === 'Tous'
    ? users
    : users.filter((u) => u.role === filterRole)

  return (
    <div style={styles.page}>
      <Navbar count={users.length} />
      <main style={styles.main}>
        <div style={styles.grid}>

          <UserForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            selectedUser={selectedUser}
            onCancel={() => setSelectedUser(null)}
          />

          <section>
            {/* Bonus B — Filtres */}
            <div style={styles.filters}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  style={{ ...styles.filterBtn, ...(filterRole === f ? styles.filterActive : {}) }}
                  onClick={() => setFilterRole(f)}
                >
                  {f === 'Tous' ? 'Tous' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              <span style={styles.filterCount}>{filteredUsers.length} résultat{filteredUsers.length !== 1 ? 's' : ''}</span>
            </div>

            <UserList
              users={filteredUsers}
              loading={loading}
              error={error}
              onDelete={handleDelete}
              onEdit={setSelectedUser}
            />
          </section>

        </div>
      </main>
    </div>
  )
}

const styles = {
  page:        { minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  main:        { maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' },
  grid:        { display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' },
  filters:     { display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' },
  filterBtn:   { padding: '0.35rem 0.85rem', borderRadius: '999px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' },
  filterActive:{ backgroundColor: '#4f46e5', color: '#fff', borderColor: '#4f46e5' },
  filterCount: { marginLeft: 'auto', fontSize: '0.8rem', color: '#94a3b8' },
}
