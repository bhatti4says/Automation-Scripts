
import { useState } from 'react'
import Layout from '@/components/Layout'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@local')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
    const data = await res.json()
    if (!res.ok) return setError(data.message || 'Login failed')
    localStorage.setItem('token', data.token)
    window.location.href = '/admin'
  }

  return (
    <Layout>
      <div className="max-w-sm mx-auto bg-white border rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={onSubmit} className="grid gap-3">
          <input className="border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          <input className="border rounded px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="bg-black text-white px-4 py-2 rounded" type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )
}
