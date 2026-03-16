
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, lowStock: 0 })
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/admin/login'
      return
    }
    setAuth(true)
    fetch('/api/products').then(r=>r.json()).then(list=>{
      const low = list.filter(p=>p.inventory <= 5).length
      setStats({ products: list.length, lowStock: low })
    })
  }, [])

  if (!auth) return null
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Back Office</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-600">Products</div>
          <div className="text-2xl font-bold">{stats.products}</div>
        </div>
        <div className="p-4 border rounded bg-white">
          <div className="text-sm text-gray-600">Low Stock</div>
          <div className="text-2xl font-bold">{stats.lowStock}</div>
        </div>
        <a href="/admin/products" className="p-4 border rounded bg-black text-white text-center">Manage Inventory →</a>
      </div>
    </Layout>
  )
}
