
import { getAllProducts, saveAllProducts } from '@/lib/data'
import { verifyToken } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const list = getAllProducts()
    return res.status(200).json(list)
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    const payload = token ? verifyToken(token) : null
    if (!payload || payload.role !== 'admin') return res.status(401).json({ message: 'Unauthorized' })

    const body = req.body || {}
    const list = getAllProducts()
    const id = uuidv4()
    const newProduct = { id, ...body }
    list.push(newProduct)
    saveAllProducts(list)
    return res.status(201).json(newProduct)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
