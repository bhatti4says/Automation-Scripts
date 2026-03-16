
import Layout from '@/components/Layout'
import ProductCard from '@/components/ProductCard'
import { getAllProducts } from '@/lib/data'

export async function getStaticProps() {
  const products = getAllProducts()
  return { props: { products } }
}

export default function Products({ products }) {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </Layout>
  )
}
