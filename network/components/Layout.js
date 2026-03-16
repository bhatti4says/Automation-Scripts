
import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} PakOrigin</footer>
    </div>
  )
}
