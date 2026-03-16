
import Link from 'next/link'
import { convertFromUSD, formatPrice } from '@/lib/currency'

export default function ProductCard({ product }) {
  const currency = typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'USD') : 'USD'
  const price = convertFromUSD(product.priceUSD, currency)

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Link href={`/products/${product.slug}`}>
        <img src={product.images?.[0] || '/products/placeholder.png'} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.short}</p>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{formatPrice(price, currency)}</div>
          <Link href={`/products/${product.slug}`} className="text-sm text-white bg-black px-3 py-1 rounded">View</Link>
        </div>
      </div>
    </div>
  )
}
