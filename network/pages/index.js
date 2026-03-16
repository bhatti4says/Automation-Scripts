
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Natural & Ethical Goods from Pakistan</h1>
          <p className="text-gray-700 mb-6">Sustainably sourced walnuts, forest honey, buffalo ghee, and handwoven Pashmina shawls. Fair pricing, authentic quality.</p>
          <Link className="inline-block bg-black text-white px-5 py-3 rounded" href="/products">Shop Products</Link>
        </div>
        <img src="/products/hero.jpg" alt="Pakistani organic products" className="w-full rounded-lg shadow" />
      </section>
    </Layout>
  )
}
