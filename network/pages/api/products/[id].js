
import { getAllProducts, saveAllProducts } from '@/lib/data'
import { verifyToken } from '@/lib/auth'

export default function handler(req, res) {
  const { id } = req.query
  const list = getAllProducts()
  const index = list.findIndex(p => p.id === id)

  if (req.method === 'GET') {
    if (index === -1) return res.status(404).json({ message: 'Not found' })
    return res.status(200).json(list[index])
  }

  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  const payload = token ? verifyToken(token) : null
  if (!payload || payload.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' })

  if (req.method === 'PUT') {
    if (index === -1) return res.status(404).json({ message: 'Not found' })
    list[index] = { ...list[index], ...req.body }
    saveAllProducts(list)
    return res.status(200).json(list[index])
  }

  if (req.method === 'DELETE') {
    if (index === -1) return res.status(404).json({ message: 'Not found' })
    const removed = list.splice(index, 1)
    saveAllProducts(list)
    return res.status(200).json({ ok: true, removed: removed[0] })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
