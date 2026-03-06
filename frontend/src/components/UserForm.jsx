import { useEffect, useState } from 'react'

const emptyForm = { name: '', email: '', role: 'user' }

export default function UserForm({ onCreate, onUpdate, selectedUser, onCancel }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isEditing = selectedUser !== null

  // Bonus A — pré-remplir le formulaire quand selectedUser change
  useEffect(() => {
    if (selectedUser) {
      setForm({ name: selectedUser.name, email: selectedUser.email, role: selectedUser.role })
      setError('')
    } else {
      setForm(emptyForm)
    }
  }, [selectedUser])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isEditing) {
        await onUpdate(selectedUser._id, form)
      } else {
        await onCreate(form)
        setForm(emptyForm)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...styles.form, ...(isEditing ? styles.formEditing : {}) }}>
      <h2 style={styles.title}>{isEditing ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}</h2>

      {error && <p style={styles.error}>{error}</p>}

      <label style={styles.label}>Nom
        <input
          style={styles.input}
          name="name"
          type="text"
          placeholder="Alice Martin"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label style={styles.label}>Email
        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="alice@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label style={styles.label}>Rôle
        <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </label>

      <div style={styles.actions}>
        <button
          style={{ ...styles.btn, opacity: loading ? 0.7 : 1, ...(isEditing ? styles.btnUpdate : {}) }}
          type="submit"
          disabled={loading}
        >
          {loading ? '...' : isEditing ? 'Mettre à jour' : 'Créer'}
        </button>
        {isEditing && (
          <button type="button" style={styles.btnCancel} onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    transition: 'border-color 0.2s',
  },
  formEditing: { borderColor: '#4f46e5', boxShadow: '0 0 0 3px rgba(79,70,229,0.1)' },
  title:   { margin: '0 0 0.25rem', fontSize: '1rem', color: '#1e293b' },
  label:   { display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.875rem', color: '#475569' },
  input:   { padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' },
  actions: { display: 'flex', gap: '0.5rem', marginTop: '0.25rem' },
  btn: {
    flex: 1,
    padding: '0.6rem',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  btnUpdate: { backgroundColor: '#0284c7' },
  btnCancel: {
    padding: '0.6rem 1rem',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  error: { color: '#dc2626', fontSize: '0.875rem', margin: 0, padding: '0.5rem', backgroundColor: '#fef2f2', borderRadius: '6px' },
}
