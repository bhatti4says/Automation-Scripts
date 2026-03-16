
import Layout from '@/components/Layout'
import { convertFromUSD, formatPrice } from '@/lib/currency'

export default function Cart() {
  if (typeof window === 'undefined') return null
  const currency = localStorage.getItem('currency') || 'USD'
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const totalUSD = cart.reduce((acc, i) => acc + i.priceUSD * i.qty, 0)
  const total = convertFromUSD(totalUSD, currency)

  const updateQty = (id, delta) => {
    const updated = cart.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.location.reload()
  }

  const removeItem = (id) => {
    const updated = cart.filter(i => i.id != id)
    localStorage.setItem('cart', JSON.stringify(updated))
    window.location.reload()
  }

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between border p-3 rounded bg-white">
              <div className="flex items-center gap-3">
                <img src={item.image || '/products/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">Qty: {item.qty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={() => updateQty(item.id, -1)}>-</button>
                <button className="px-2 py-1 border rounded" onClick={() => updateQty(item.id, 1)}>+</button>
                <button className="px-2 py-1 border rounded text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right text-xl font-semibold">Total: {formatPrice(total, currency)}</div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded opacity-70 cursor-not-allowed" title="Checkout in test mode later">Checkout (disabled in dev)</button>
        </div>
      )}
    </Layout>
  )
}
