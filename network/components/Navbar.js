
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CurrencySelector from './CurrencySelector'

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.reduce((acc, item) => acc + item.qty, 0))
    const handler = () => {
      const updated = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartCount(updated.reduce((acc, item) => acc + item.qty, 0))
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/"><span className="font-semibold text-lg">PakOrigin</span></Link>
          <Link href="/products" className="text-sm text-gray-600 hover:text-black">Products</Link>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-black">Admin</Link>
        </div>
        <div className="flex items-center gap-4">
          <CurrencySelector />
          <Link href="/cart" className="relative text-sm">
            🛒 Cart
            <span className="ml-1 inline-flex items-center justify-center text-xs bg-black text-white rounded-full w-5 h-5">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
