
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout'

const emptyForm = { name:'', slug:'', priceUSD:0, short:'', description:'', origin:'', inventory:0, images:['/products/placeholder.png'], category:'' }

export default function AdminProducts() {
  const [auth, setAuth] = useState(false)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (!token) { window.location.href = '/admin/login'; return }
    setAuth(true)
    load()
  }, [])

  const load = async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    setProducts(data)
  }

  const save = async (e) => {
    e.preventDefault()
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/products/${editingId}` : '/api/products'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(form) })
    if (res.ok) {
      setForm(emptyForm)
      setEditingId(null)
      load()
    } else {
      alert('Save failed')
    }
  }

  const edit = (p) => {
    setForm({ ...p })
    setEditingId(p.id)
  }

  const del = async (id) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } })
    if (res.ok) load()
  }

  if (!auth) return null
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Inventory Management</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">{editingId ? 'Edit Product' : 'Add Product'}</h3>
          <form onSubmit={save} className="grid gap-2">
            <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            <input className="border rounded px-3 py-2" placeholder="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} required />
            <input className="border rounded px-3 py-2" type="number" step="0.01" placeholder="Price (USD)" value={form.priceUSD} onChange={e=>setForm({...form, priceUSD: parseFloat(e.target.value)})} required />
            <input className="border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Origin" value={form.origin} onChange={e=>setForm({...form, origin:e.target.value})} />
            <input className="border rounded px-3 py-2" type="number" placeholder="Inventory" value={form.inventory} onChange={e=>setForm({...form, inventory: parseInt(e.target.value || '0')})} />
            <input className="border rounded px-3 py-2" placeholder="Short description" value={form.short} onChange={e=>setForm({...form, short:e.target.value})} />
            <textarea className="border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.images?.[0] || ''} onChange={e=>setForm({...form, images:[e.target.value]})} />
            <div className="flex gap-2">
              <button className="bg-black text-white px-4 py-2 rounded" type="submit">{editingId ? 'Update' : 'Add'}</button>
              {editingId && <button className="border px-4 py-2 rounded" type="button" onClick={()=>{setForm(emptyForm); setEditingId(null)}}>Cancel</button>}
            </div>
          </form>
        </div>
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Products</h3>
          <div className="grid gap-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-600">Inventory: {p.inventory} • ${'{'}p.priceUSD{'}'} USD</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded" onClick={()=>edit(p)}>Edit</button>
                  <button className="px-3 py-1 border rounded text-red-600" onClick={()=>del(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
