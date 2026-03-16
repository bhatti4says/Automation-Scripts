
import { getUsers } from '@/lib/data'
import { signToken } from '@/lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
  const users = getUsers()
  const user = users.find(u => u.email === email)
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  // DEV ONLY: plaintext password compare. For production: use bcrypt.
  if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' })
  const token = signToken({ sub: user.id, role: user.role, email: user.email })
  return res.status(200).json({ token })
}
