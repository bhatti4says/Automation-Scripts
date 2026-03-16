
import Layout from '@/components/Layout'
import { getAllProducts } from '@/lib/data'
import { convertFromUSD, formatPrice } from '@/lib/currency'

export async function getStaticPaths() {
  const products = getAllProducts()
  const paths = products.map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const products = getAllProducts()
  const product = products.find(p => p.slug === params.slug) || null
  return { props: { product } }
}

export default function ProductDetail({ product }) {
  const currency = typeof window !== 'undefined' ? (localStorage.getItem('currency') || 'USD') : 'USD'
  const price = convertFromUSD(product.priceUSD, currency)

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const idx = cart.findIndex(i => i.id === product.id)
    if (idx > -1) cart[idx].qty += 1
    else cart.push({ id: product.id, name: product.name, priceUSD: product.priceUSD, qty: 1, slug: product.slug, image: product.images?.[0] })
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.images?.[0] || '/products/placeholder.png'} alt={product.name} className="w-full rounded" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-semibold mb-4">{formatPrice(price, currency)}</div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button onClick={addToCart} className="bg-black text-white px-4 py-2 rounded">Add to Cart</button>
          <div className="mt-4 text-sm text-gray-600">Origin: {product.origin} • Inventory: {product.inventory}</div>
        </div>
      </div>
    </Layout>
  )
}
